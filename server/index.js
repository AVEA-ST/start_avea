const express = require('express');
const cors = require('cors');
const path = require('path');
// Load environment variables from .env next to this file, regardless of CWD
try {
  const envPath = path.resolve(__dirname, '.env');
  require('dotenv').config({ path: envPath });
} catch {}

const app = express();
const PORT = process.env.PORT || 5000;
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const LLM_PROVIDER = (process.env.LLM_PROVIDER || 'groq').toLowerCase(); // 'groq' | 'ollama'
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.1:8b';
// (deduped) provider/model envs defined above

// Log whether GROQ_API_KEY is present (masked)
if (GROQ_API_KEY) {
  const masked = GROQ_API_KEY.slice(0, 6) + '...' + GROQ_API_KEY.slice(-4);
  console.log(`[env] GROQ_API_KEY detected: ${masked}`);
} else {
  console.warn('[env] GROQ_API_KEY is missing');
}

app.use(cors());
app.use(express.json());

// Simple per-IP rate limiter (default: 20 req / 10 min)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '20', 10);
const ipBuckets = new Map();

function rateLimit(req, res, next) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const bucket = ipBuckets.get(ip) || { count: 0, windowStart: now };
  if (now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
    bucket.count = 0; bucket.windowStart = now;
  }
  bucket.count += 1;
  ipBuckets.set(ip, bucket);
  if (bucket.count > RATE_LIMIT_MAX) {
    return res.status(429).json({ error: 'Rate limit exceeded. Try again later.' });
  }
  return next();
}

// Simple in-memory cache with TTL (default: 6 hours)
const cache = new Map();
const CACHE_TTL_MS = parseInt(process.env.CACHE_TTL_MS || String(6 * 60 * 60 * 1000), 10);
function getCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.time > CACHE_TTL_MS) { cache.delete(key); return null; }
  return entry.value;
}
function setCache(key, value) { cache.set(key, { value, time: Date.now() }); }

// (deduped) limiter/cache implemented above

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'learning-mentor', time: new Date().toISOString() });
});

// Minimal curated free resources per domain
const resources = {
  'Full Stack Development': {
    foundation: [
      {
        title: 'HTML & CSS basics',
        video: 'https://www.youtube.com/watch?v=mU6anWqZJcc', // freeCodeCamp
        article: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web',
        project: 'Build a personal profile page with responsive layout.'
      },
      {
        title: 'JavaScript fundamentals',
        video: 'https://www.youtube.com/watch?v=PkZNo7MFNFg', // freeCodeCamp
        article: 'https://javascript.info/',
        project: 'Create a TODO app with add/remove/filter.'
      },
    ],
    skill: [
      {
        title: 'React essentials',
        video: 'https://www.youtube.com/watch?v=bMknfKXIFA8', // freeCodeCamp React course
        article: 'https://react.dev/learn',
        project: 'Build a multi-page React app (router) with state and forms.'
      },
      {
        title: 'Node & Express basics',
        video: 'https://www.youtube.com/watch?v=Oe421EPjeBE', // freeCodeCamp Node
        article: 'https://expressjs.com/en/starter/installing.html',
        project: 'Build a REST API with CRUD and validation.'
      },
      {
        title: 'Databases (PostgreSQL)',
        video: 'https://www.youtube.com/watch?v=qw--VYLpxG4', // freeCodeCamp SQL
        article: 'https://www.postgresql.org/docs/current/tutorial.html',
        project: 'Attach a Postgres DB to your API (users/tasks).'
      },
    ],
    advanced: [
      {
        title: 'Auth & Security',
        video: 'https://www.youtube.com/watch?v=Ud5xKCYQTjM', // Node JWT
        article: 'https://owasp.org/www-project-top-ten/',
        project: 'Add JWT auth, roles, and input sanitization.'
      },
      {
        title: 'Deployment',
        video: 'https://www.youtube.com/watch?v=K9Pz-DMY6ps', // Render deploy guides exist; using FCC general
        article: 'https://render.com/docs/deploy-node-express-app',
        project: 'Deploy client (static) + server (API) on Render.'
      },
    ]
  },
  'AI/ML & Data Science': {
    foundation: [
      {
        title: 'Python basics',
        video: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
        article: 'https://docs.python.org/3/tutorial/',
        project: 'Write scripts for file I/O and simple algorithms.'
      },
      {
        title: 'Numpy & Pandas',
        video: 'https://www.youtube.com/watch?v=vmEHCJofslg',
        article: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/',
        project: 'Analyze a Kaggle dataset and compute summary stats.'
      },
    ],
    skill: [
      {
        title: 'Machine Learning basics',
        video: 'https://www.youtube.com/watch?v=Gv9_4yMHFhI',
        article: 'https://scikit-learn.org/stable/tutorial/basic/tutorial.html',
        project: 'Train a classifier and evaluate with cross-validation.'
      },
      {
        title: 'Deep Learning intro',
        video: 'https://www.youtube.com/watch?v=aircAruvnKk',
        article: 'https://pytorch.org/tutorials/beginner/basics/intro.html',
        project: 'Build a small MLP/CNN on MNIST or CIFAR-10.'
      },
    ],
    advanced: [
      {
        title: 'MLOps basics',
        video: 'https://www.youtube.com/watch?v=cHZONQ2-x7I',
        article: 'https://ml-ops.org/content/mlops-principles',
        project: 'Package a model with a FastAPI/Flask service and CI.'
      }
    ]
  }
};

function buildRoadmap({ domain, level, style, time }) {
  const d = resources[domain] || resources['Full Stack Development'];
  const phases = {
    foundation: d.foundation || [],
    skill: d.skill || [],
    advanced: d.advanced || []
  };
  return {
    meta: { domain, level, style, time },
    phases: {
      foundation: {
        title: 'PHASE 1: Foundation',
        steps: phases.foundation,
        quiz: [
          'Explain key concepts from this phase in your own words.',
          'Build and submit the proposed mini projects.'
        ],
        capstone: 'Build a small end-to-end project demonstrating this phase.'
      },
      skill: {
        title: 'PHASE 2: Skill Building',
        steps: phases.skill,
        quiz: [
          'Complete a medium-sized project integrating multiple topics.',
          'Document trade-offs and tech choices.'
        ],
        capstone: 'Build a full-featured portfolio project.'
      },
      advanced: {
        title: 'PHASE 3: Advanced Mastery',
        steps: phases.advanced,
        quiz: [
          'Solve advanced challenges; contribute to OSS.',
          'Prepare for interviews with mock sessions.'
        ],
        capstone: 'Production-grade project with deployment and monitoring.'
      }
    }
  };
}

app.post('/api/roadmap', (req, res) => {
  const { domain = 'Full Stack Development', level = 'Beginner', style = 'Mixed', time = '5-7 hrs' } = req.body || {};
  const roadmap = buildRoadmap({ domain, level, style, time });
  res.json(roadmap);
});

// Optional: LLM-powered roadmap using Groq (free API key available). Returns structured JSON.
app.post('/api/llm-roadmap', rateLimit, async (req, res) => {
  try {
    const { domain = 'Full Stack Development', level = 'Beginner', style = 'Mixed', time = '5-7 hrs' } = req.body || {};
    const cacheKey = JSON.stringify({ provider: LLM_PROVIDER, domain, level, style, time });
    const cached = getCache(cacheKey);
    if (cached) return res.json(cached);

    const systemPrompt = `ROLE: You are an AI-powered learning mentor for a global, free-to-access tech education platform. Use only high-quality, free, legitimate resources.\n\nSCOPE includes Full Stack, AI/ML & Data Science, Blockchain & Web3, Cybersecurity, Cloud & DevOps, Core CS, Emerging Tech.\n\nAPPROVED SOURCES: YouTube (CodeWithHarry, Apna College, GeeksforGeeks, freeCodeCamp, Tech with Tim, Fireship, Sentdex), Official docs, Wikipedia, GitHub, Dev.to, Hashnode, Medium (free only), arXiv, Roadmap.sh, Kaggle.\nNOT ALLOWED: paid/geo-locked/subscription content.\n\nUSER FLOW: Generate a Zero-to-Hero roadmap with PHASE 1 (Foundation), PHASE 2 (Skill Building), PHASE 3 (Advanced Mastery).\nEach step must have: short explanation (<=3 sentences), 1 video link (approved), 1 article link (approved), 1 hands-on project/exercise, optional GitHub repo/starter.\nEach phase must end with a short quiz/checklist and a capstone project idea.\nOUTPUT strictly as JSON with keys: meta {domain, level, style, time}, phases {foundation, skill, advanced} where each phase has {title, steps[], quiz[], capstone}.`;

    const userPrompt = {
      domain, level, style, time,
      format: {
        meta: { domain: 'string', level: 'string', style: 'string', time: 'string' },
        phases: {
          foundation: { title: 'string', steps: [{ title: 'string', explanation: 'string', video: 'url', article: 'url', project: 'string', repo: 'url?' }], quiz: ['string'], capstone: 'string' },
          skill: { title: 'string', steps: [{ title: 'string', explanation: 'string', video: 'url', article: 'url', project: 'string', repo: 'url?' }], quiz: ['string'], capstone: 'string' },
          advanced: { title: 'string', steps: [{ title: 'string', explanation: 'string', video: 'url', article: 'url', project: 'string', repo: 'url?' }], quiz: ['string'], capstone: 'string' }
        }
      },
      constraints: [
        'Only use approved free sources',
        'Links must be globally accessible',
        'Max 3 sentences per step explanation',
        'Number of steps per phase: 3-5'
      ]
    };

    if (LLM_PROVIDER === 'ollama') {
      // Use local Ollama API
      const resp = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          stream: false,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: JSON.stringify(userPrompt) }
          ]
        })
      });
      if (!resp.ok) {
        const text = await resp.text();
        return res.status(500).json({ error: 'Ollama request failed', details: text });
      }
      const data = await resp.json();
      const content = data?.message?.content || '';
      let json;
      try { json = JSON.parse(content); } catch {
        return res.status(500).json({ error: 'Ollama returned non-JSON content' });
      }
      setCache(cacheKey, json);
      return res.json(json);
    } else {
      // Groq (default)
      if (!GROQ_API_KEY) {
        return res.status(400).json({ error: 'GROQ_API_KEY not set on server; set LLM_PROVIDER=ollama to use local model.' });
      }
      const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: JSON.stringify(userPrompt) }
          ],
          temperature: 0.4,
          response_format: { type: 'json_object' }
        })
      });
      if (!resp.ok) {
        const text = await resp.text();
        return res.status(500).json({ error: 'LLM request failed', details: text });
      }
      const data = await resp.json();
      const content = data?.choices?.[0]?.message?.content || '';
      let json;
      try { json = JSON.parse(content); } catch {
        return res.status(500).json({ error: 'LLM returned non-JSON content' });
      }
      setCache(cacheKey, json);
      return res.json(json);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unexpected error', message: String(err?.message || err) });
  }
});

// ...
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

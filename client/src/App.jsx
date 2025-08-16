import { useEffect, useMemo, useState } from 'react'
import './App.css'

// Approved domains per ROLE/SCOPE
const DOMAINS = [
  'Full Stack Development',
  'AI/ML & Data Science',
  'Blockchain & Web3 Development',
  'Cybersecurity & Ethical Hacking',
  'Cloud Computing & DevOps',
  'Core Computer Science',
  'Emerging Technologies',
]

function App() {
  const [domain, setDomain] = useState('Full Stack Development')
  const [level, setLevel] = useState('Beginner')
  const [style, setStyle] = useState('Mixed')
  const [time, setTime] = useState('5-7 hrs')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [roadmap, setRoadmap] = useState(null)
  const [completed, setCompleted] = useState(() => {
    try {
      const raw = localStorage.getItem('mentor.completed')
      return raw ? JSON.parse(raw) : {}
    } catch { return {} }
  })

  useEffect(() => {
    try { localStorage.setItem('mentor.completed', JSON.stringify(completed)) } catch {}
  }, [completed])

  const canSubmit = useMemo(() => !!domain && !!level && !!style && !!time, [domain, level, style, time])

  async function generateRoadmap(e) {
    e?.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    setError('')
    setRoadmap(null)
    try {
      const res = await fetch('/api/llm-roadmap', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain, level, style, time })
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setError(j?.error || `LLM error (HTTP ${res.status})`)
        return
      }
      const data = await res.json()
      setRoadmap(data)
    } catch (err) {
      setError(err.message || 'Failed to generate roadmap')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h1>AI Learning Mentor (Free Resources)</h1>
      <p className="muted">Generate a Zero-to-Hero roadmap using curated, free resources.</p>

      <form onSubmit={generateRoadmap} className="card" style={{ display: 'grid', gap: 12 }}>
        <label>
          <div>Domain</div>
          <select value={domain} onChange={(e) => setDomain(e.target.value)}>
            {DOMAINS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </label>

        <label>
          <div>Current Level</div>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </label>

        <label>
          <div>Preferred Style</div>
          <select value={style} onChange={(e) => setStyle(e.target.value)}>
            <option>Video</option>
            <option>Reading</option>
            <option>Project-based</option>
            <option>Mixed</option>
          </select>
        </label>

        <label>
          <div>Time / week</div>
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option>2-3 hrs</option>
            <option>5-7 hrs</option>
            <option>10+ hrs</option>
          </select>
        </label>

        <button className="btn" type="submit" disabled={!canSubmit || loading}>
          {loading ? 'Generating...' : 'Generate Roadmap'}
        </button>
      </form>

      {error && (
        <div className="card" style={{ marginTop: 16, color: 'crimson' }}>
          Error: {error}
        </div>
      )}

      {roadmap && (
        <div className="card" style={{ marginTop: 16 }}>
          <h2>Roadmap for {roadmap?.meta?.domain} ({roadmap?.meta?.level})</h2>
          {['foundation', 'skill', 'advanced'].map((phaseKey) => {
            const phase = roadmap.phases[phaseKey]
            if (!phase) return null
            return (
              <div key={phaseKey} style={{ marginTop: 12 }}>
                <h3>{phase.title}</h3>
                <ol>
                  {phase.steps?.map((s, idx) => {
                    const stepId = `${roadmap?.meta?.domain}|${phaseKey}|${idx}`
                    const done = !!completed[stepId]
                    return (
                      <li key={idx} style={{ marginBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <input type="checkbox" checked={done} onChange={(e) => {
                            setCompleted((prev) => ({ ...prev, [stepId]: e.target.checked }))
                          }} />
                          <strong>{s.title}</strong>
                        </div>
                        {s.explanation && <div style={{ margin: '4px 0' }}>{s.explanation}</div>}
                        <div>
                          {s.video && <a href={s.video} target="_blank">Video</a>}
                          {s.video && s.article && '  |  '}
                          {s.article && <a href={s.article} target="_blank">Article</a>}
                          {(s.repo) && '  |  '}
                          {s.repo && <a href={s.repo} target="_blank">Repo</a>}
                        </div>
                        {s.project && <div><em>Project:</em> {s.project}</div>}
                      </li>
                    )
                  })}
                </ol>
                <div>
                  <strong>Quiz/Checklist:</strong>
                  <ul>
                    {phase.quiz?.map((q, i) => (<li key={i}>{q}</li>))}
                  </ul>
                </div>
                <div><strong>Capstone:</strong> {phase.capstone}</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default App

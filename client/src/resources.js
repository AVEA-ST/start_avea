// Curated free resources for static, no-backend usage
export const RESOURCES = {
  'Full Stack Development': {
    foundation: [
      {
        title: 'HTML & CSS basics',
        explanation: 'Learn how the web works, structure pages with HTML and style them with CSS, including responsive layouts.',
        video: 'https://www.youtube.com/watch?v=mU6anWqZJcc', // freeCodeCamp
        article: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web',
        project: 'Build a personal profile page with responsive layout.',
        repo: 'https://github.com/topics/html5-css3'
      },
      {
        title: 'JavaScript fundamentals',
        explanation: 'Master JS basics: variables, functions, arrays, objects, DOM, events, and asynchronous programming.',
        video: 'https://www.youtube.com/watch?v=PkZNo7MFNFg', // freeCodeCamp
        article: 'https://javascript.info/',
        project: 'Create a TODO app with add/remove/filter.',
        repo: 'https://github.com/public-apis/public-apis'
      },
    ],
    skill: [
      {
        title: 'React essentials',
        explanation: 'Build interactive UIs using components, props, state, hooks, and routing.',
        video: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
        article: 'https://react.dev/learn',
        project: 'Build a multi-page React app (router) with state and forms.',
        repo: 'https://github.com/facebook/react'
      },
      {
        title: 'Node & Express basics',
        explanation: 'Create REST APIs with routing, middleware, validation, and error handling.',
        video: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
        article: 'https://expressjs.com/en/starter/installing.html',
        project: 'Build a REST API with CRUD and validation.',
        repo: 'https://github.com/expressjs/express'
      },
      {
        title: 'Databases (PostgreSQL)',
        explanation: 'Understand relational modeling, SQL queries, and connecting Node to Postgres.',
        video: 'https://www.youtube.com/watch?v=qw--VYLpxG4',
        article: 'https://www.postgresql.org/docs/current/tutorial.html',
        project: 'Attach a Postgres DB to your API (users/tasks).',
        repo: 'https://github.com/brianc/node-postgres'
      },
    ],
    advanced: [
      {
        title: 'Auth & Security',
        explanation: 'Implement secure auth (JWT/sessions), protect routes, and follow OWASP best practices.',
        video: 'https://www.youtube.com/watch?v=Ud5xKCYQTjM',
        article: 'https://owasp.org/www-project-top-ten/',
        project: 'Add JWT auth, roles, and input sanitization.',
        repo: 'https://github.com/typicode/json-server-auth'
      },
      {
        title: 'Deployment',
        explanation: 'Deploy the frontend as a static site and the backend API on a cloud platform like Render.',
        video: 'https://www.youtube.com/watch?v=K9Pz-DMY6ps',
        article: 'https://render.com/docs/deploy-node-express-app',
        project: 'Deploy client (static) + server (API) on Render.',
        repo: 'https://github.com/render-examples/express-hello-world'
      },
    ]
  },
  'AI/ML & Data Science': {
    foundation: [
      {
        title: 'Python basics',
        explanation: 'Get comfortable with Python syntax, control flow, functions, and standard library.',
        video: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
        article: 'https://docs.python.org/3/tutorial/',
        project: 'Write scripts for file I/O and simple algorithms.',
        repo: 'https://github.com/TheAlgorithms/Python'
      },
      {
        title: 'Numpy & Pandas',
        explanation: 'Manipulate arrays and dataframes, handling missing data, joins, and aggregations.',
        video: 'https://www.youtube.com/watch?v=vmEHCJofslg',
        article: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/',
        project: 'Analyze a Kaggle dataset and compute summary stats.',
        repo: 'https://github.com/ageron/handson-ml2'
      },
    ],
    skill: [
      {
        title: 'Machine Learning basics',
        explanation: 'Learn supervised learning workflow: preprocessing, training, metrics, and validation.',
        video: 'https://www.youtube.com/watch?v=Gv9_4yMHFhI',
        article: 'https://scikit-learn.org/stable/tutorial/basic/tutorial.html',
        project: 'Train a classifier and evaluate with cross-validation.',
        repo: 'https://github.com/scikit-learn/scikit-learn'
      },
      {
        title: 'Deep Learning intro',
        explanation: 'Understand neural nets, tensors, and build simple models with PyTorch.',
        video: 'https://www.youtube.com/watch?v=aircAruvnKk',
        article: 'https://pytorch.org/tutorials/beginner/basics/intro.html',
        project: 'Build a small MLP/CNN on MNIST or CIFAR-10.',
        repo: 'https://github.com/pytorch/examples'
      },
    ],
    advanced: [
      {
        title: 'MLOps basics',
        explanation: 'Version data/models, package services, automate testing and CI/CD for ML systems.',
        video: 'https://www.youtube.com/watch?v=cHZONQ2-x7I',
        article: 'https://ml-ops.org/content/mlops-principles',
        project: 'Package a model with a FastAPI/Flask service and CI.',
        repo: 'https://github.com/zenml-io/zenml'
      }
    ]
  }
};

export function buildRoadmap({ domain, level, style, time }) {
  const d = RESOURCES[domain] || RESOURCES['Full Stack Development'];
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

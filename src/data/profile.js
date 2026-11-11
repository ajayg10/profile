// Single source of truth for site content.
// Rule: every claim here must be checkable in a linked repo, its README/docs, or git history.

const profile = {
  name: "Ajay Garg",
  siteUrl: "https://www.agdev10.online",
  location: "Delhi, India",

  hero: {
    status: "Available to join immediately · NCR / Hybrid / Remote",
    headline: "I build backend services, cloud pipelines and AI agents.",
    accent: "backend services",
    subheading:
      "Open to SDE-1, software engineering intern (6 months), and AI developer / AI engineer roles. B.Tech CSE (Cloud Computing), SRMIST, Class of 2027.",
  },

  about: {
    narrative: `I'm a B.Tech CSE (Cloud Computing) student at SRM Institute of Science and Technology, and I lean towards the backend: APIs, auth, data stores, and the infrastructure that runs them.

My early projects were full-stack apps where I spent most of my time on the server side. In Digital Vault, refresh tokens are stored only as SHA-256 hashes and revoked the moment they are used, and login supports TOTP two-factor auth.

Since then most of my work has been AI agents with guardrails around them. VEDA splits an agent into Orchestrator, Planner, Memory (FAISS) and Executor services, each in its own Docker container. In hackathons I've built agents that propose payments but cannot execute them without passing a deterministic policy engine (TapRemit), coordinate through a graph database without application locks (Hindsight), and roll back their own bad deploys (GreenGate).

I also co-authored a paper on self-healing cloud infrastructure using autoencoder-based anomaly detection with automated remediation. It has been submitted and is not yet published.`,

    timeline: [
      {
        year: "2023",
        title: "Started B.Tech CSE (Cloud Computing)",
        description: "SRM Institute of Science and Technology. Current CGPA 8.58.",
      },
      {
        year: "Dec 2025",
        title: "Email AI Agent",
        description: "FastAPI + Gmail API (OAuth 2.0) + LangChain: summarises and tags unread email and drafts replies for review.",
      },
      {
        year: "Apr 2026",
        title: "Digital Vault & self-healing cloud prototype",
        description: "Hashed single-use refresh tokens and TOTP 2FA; autoencoder-based anomaly detection prototype for the research paper.",
      },
      {
        year: "May 2026",
        title: "VEDA",
        description: "Agentic AI system split into Orchestrator, Planner, Memory (FAISS) and Executor services, each in its own Docker container.",
      },
      {
        year: "Sep–Nov 2026",
        title: "Hackathons & NKRA internship",
        description: "TapRemit, Hindsight, RXCLEAR, Threshold and GreenGate; built the “Ask NKRA” assistant as an intern at NKRA.",
      },
    ],

    currentFocus: ["Agentic AI", "LLM workflows", "Backend APIs", "AWS serverless", "CI/CD"],
  },

  experience: [
    {
      role: "Associate Software Developer (Intern)",
      org: "NKRA",
      period: "17 Oct 2026 – 10 Nov 2026",
      points: [
        "Built the “Ask NKRA” AI chat assistant for the NKRA website, in JavaScript.",
      ],
      tech: ["JavaScript", "LLM integration"],
    },
  ],

  research: [
    {
      title: "Self-healing cloud infrastructure with autoencoder-based anomaly detection and automated remediation",
      status: "Submitted, not yet published",
      role: "Co-author",
      summary:
        "An autoencoder learns normal behaviour from Prometheus metrics; anomalies trigger automated remediation such as restarting the degraded container.",
      code: "https://github.com/ajayg10/self-healing-cloud",
    },
  ],

  // Featured first, in order of how much verifiable evidence the repo carries.
  projects: [
    {
      title: "TapRemit",
      tagline: "Guardrailed AI payments on Monad testnet",
      context: "Team project · Monad Metropolis hackathon",
      problem: "Giving an AI agent direct access to a wallet risks prompt injection, wrong recipients and drained funds.",
      description:
        "The LLM only proposes a transfer. A deterministic policy engine (per-transaction and 24-hour limits, first-time-recipient confirmation), SHA-256 proposal binding and a hash-chained audit log enforced by SQLite triggers gate every send before it settles on Monad testnet.",
      evidence: "87 tests across 7 backend test files (Vitest + Supertest); README links a finalized testnet transfer.",
      tech: ["TypeScript", "Node.js", "Express", "SQLite", "viem", "Next.js", "Vitest"],
      github: "https://github.com/ajayg10/tapremit",
      featured: true,
      architectureFlow: ["Prompt", "Policy engine", "Proposal hash", "Audit chain", "Monad"],
    },
    {
      title: "Hindsight",
      tagline: "SRE agent crew on a live operational graph",
      context: "Team project · hackathon",
      problem: "Incident agents that rely on text search recommend runbooks for infrastructure that has since been migrated.",
      description:
        "A crew of incident-response agents that reads a FalkorDB operational graph, so a runbook invalidated by a later architecture change is refused. Workers claim tasks through an atomic Cypher state machine instead of application locks.",
      evidence: "5 agent workers; race harness at 20–32 concurrent threads recorded 0 double-claimed tasks (docs/VERIFIED.md).",
      tech: ["Python", "FastAPI", "FalkorDB", "Cypher", "MCP", "Docker Compose", "Caddy"],
      github: "https://github.com/ajayg10/hindsight",
      live: "https://hindsight.agdev10.online",
      featured: true,
      architectureFlow: ["Alerts", "Sentinel", "Investigators", "Graph", "Responder"],
    },
    {
      title: "GreenGate",
      tagline: "Carbon-aware CI/CD with GitLab Duo agents",
      context: "GitLab “Life After Code” hackathon",
      problem: "CI pipelines waste runner time, and deploys ignore how carbon-intensive the grid is at that moment.",
      description:
        "Two GitLab Duo flows: greengate-optimizer measures each pipeline's carbon (SCI) and opens MRs that remove CI waste; phoenix-responder handles failed deploys. Releases go through an AWS Lambda canary at 10% traffic with automatic rollback.",
      evidence: "Measured −23.1% gCO2e and −23.2% runner minutes per pipeline after the bot MR, plus one real automatic canary rollback (docs/RESULTS.md); 56 pytest tests.",
      tech: ["Python", "GitLab CI", "GitLab Duo", "AWS Lambda", "EventBridge", "S3", "DynamoDB", "OIDC"],
      github: "https://github.com/ajayg10/greengate",
      live: "https://main.d28t6c9al9r6ob.amplifyapp.com/",
      liveLabel: "Carbon dashboard",
      featured: true,
      architectureFlow: ["Pipeline", "SCI meter", "Duo optimizer", "Canary 10%", "Rollback"],
    },
    {
      title: "VEDA",
      tagline: "Agentic AI system as separate services",
      context: "Personal project · since May 2026",
      problem: "Turning a natural-language goal into a multi-step workflow that runs steps in the right order.",
      description:
        "An Orchestrator routes requests to a Planner (LLM via Groq or Ollama), a Memory service (FAISS vector search) and an Executor that runs steps in dependency order using a topological sort. Each service is a FastAPI app in its own Docker container behind Nginx.",
      evidence: "docker-compose.yml defines the 4 services plus Nginx, Prometheus and Grafana; 26 test files; GitHub Actions CI.",
      tech: ["Python", "FastAPI", "FAISS", "Docker", "Nginx", "Prometheus", "GitHub Actions"],
      github: "https://github.com/ajayg10/VEDA",
      featured: true,
      architectureFlow: ["Orchestrator", "Planner", "Memory", "Executor"],
    },
    {
      title: "Digital Vault",
      tagline: "File vault with hardened auth",
      context: "Personal project",
      problem: "A stolen refresh token or database dump should not let an attacker keep a session alive.",
      description:
        "FastAPI + PostgreSQL + React vault for files, projects and meetings. Refresh tokens are stored only as SHA-256 hashes and revoked on use; login supports TOTP 2FA with hashed backup codes; meetings use the Agora SDK.",
      evidence: "Token hashing, rotation and backup-code logic in backend/app/core/security.py.",
      tech: ["FastAPI", "PostgreSQL", "SQLAlchemy", "React", "JWT", "PyOTP", "Agora"],
      github: "https://github.com/ajayg10/Digi_vault",
      live: "https://digi-vault-three.vercel.app/",
      featured: false,
      architectureFlow: ["React", "FastAPI", "JWT + TOTP", "PostgreSQL"],
    },
    {
      title: "Email AI Agent",
      tagline: "Gmail summaries and draft replies",
      context: "Personal project",
      problem: "Triaging a full inbox takes time.",
      description:
        "Signs in with Google OAuth 2.0, fetches unread primary-inbox email through the Gmail API, asks an LLM (LangChain + OpenAI) for a three-line summary and a tag as JSON, and drafts a reply for the user to review. It does not send email on its own.",
      evidence: "Summarise/tag/reply logic in email_service.py, with a fallback when the LLM returns invalid JSON.",
      tech: ["Python", "FastAPI", "Gmail API", "OAuth 2.0", "LangChain", "OpenAI", "SQLite", "React"],
      github: "https://github.com/ajayg10/ai_email_agent",
      featured: false,
      architectureFlow: ["Gmail", "OAuth", "LLM summary + tag", "Draft reply"],
    },
    {
      title: "Self-Healing Cloud (research prototype)",
      tagline: "Code behind the submitted paper",
      context: "Research prototype",
      problem: "Outages get worse while waiting for a human to notice degraded metrics.",
      description:
        "Docker Compose stack with a sample app, Prometheus and Grafana. A PyTorch autoencoder is trained on healthy-baseline metrics; a detector flags anomalies and a healer restarts the target container with a cooldown and a post-restart health check.",
      evidence: "Prototype code only: the repo has no README or published results yet.",
      tech: ["Python", "PyTorch", "Prometheus", "Grafana", "Docker"],
      github: "https://github.com/ajayg10/self-healing-cloud",
      featured: false,
      architectureFlow: ["Prometheus", "Autoencoder", "Detector", "Healer"],
    },
  ],

  hackathons: [
    {
      name: "GreenGate",
      event: "GitLab “Life After Code” Transcend hackathon",
      summary: "Carbon-aware CI/CD: GitLab Duo flows (greengate-optimizer and phoenix-responder), AWS Lambda canary deploys with automatic rollback.",
      github: "https://github.com/ajayg10/greengate",
      live: "https://main.d28t6c9al9r6ob.amplifyapp.com/",
    },
    {
      name: "RXCLEAR",
      event: "Hackathon · team project",
      summary: "Serverless prescription decoder on AWS: Bedrock (Claude Haiku) extracts medicines and timings from a photo; DynamoDB, S3 presigned uploads, Amplify hosting.",
      github: "https://github.com/ajayg10/rxclear",
      live: "https://main.d2mcosl2ts0tqi.amplifyapp.com/",
    },
    {
      name: "Threshold",
      event: "Amazon Developer Hackathon · Ring track",
      summary: "Doorbell interpreter for residents who are deaf or don't share the visitor's language: Transcribe → Bedrock → Polly, and it never unlocks anything. 119 pytest tests.",
      github: "https://github.com/ajayg10/Threshold",
    },
  ],

  skills: {
    "Languages": ["Python", "TypeScript", "JavaScript", "SQL", "Cypher"],
    "Backend & Data": [
      "FastAPI", "Node.js", "Express", "REST APIs", "JWT / OAuth 2.0", "PostgreSQL", "SQLite", "SQLAlchemy", "DynamoDB", "FalkorDB",
    ],
    "AI & Agents": [
      "LangChain", "OpenAI API", "Amazon Bedrock", "Groq / Ollama", "FAISS", "PyTorch", "MCP", "GitLab Duo Agent Platform",
    ],
    "Cloud & DevOps": [
      "Docker", "Docker Compose", "Nginx", "GitHub Actions", "GitLab CI", "AWS Lambda", "AWS S3", "AWS Amplify", "Prometheus", "Grafana", "Vercel",
    ],
    "Frontend & Testing": ["React", "Next.js", "Vite", "Tailwind CSS", "pytest", "Vitest"],
  },

  education: {
    institution: "SRM Institute of Science and Technology",
    degree: "B.Tech CSE (Cloud Computing)",
    cgpa: "8.58",
    graduation: "2027",
  },

  social: {
    github: "https://github.com/ajayg10",
    linkedin: "https://www.linkedin.com/in/ajayg10",
    leetcode: "https://leetcode.com/u/Ajay-10/",
    email: "ajaygarg200r@gmail.com",
    phone: "+91 9821617252",
  },

  availability: "Currently available: immediate joiner · 6 months · NCR, hybrid or remote",

  githubUsername: "ajayg10",
  resumeUrl: "/Ajay_Garg_resume.pdf",
};

export default profile;

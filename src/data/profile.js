const profile = {
  name: "Ajay Garg",
  subtitle: "Backend Engineer · Cloud Computing Student · Agentic AI Builder",
  typewriterPhrases: [
    "Building agentic AI systems",
    "Architecting scalable backends",
    "Designing cloud-native infrastructure",
    "Shipping production-grade APIs",
  ],

  about: {
    narrative: `I started where most CS students do — building full-stack CRUD apps to learn how the pieces fit together. But I got more interested in what happens behind the UI: how authentication actually works at the token level, how payment flows handle failure states, how WebSocket connections scale under load.

That led me deeper into backend architecture — building real auth systems with hash-stored single-use refresh tokens, integrating Agora SDK for real-time video, and deploying services across Railway and Vercel with proper CI/CD pipelines.

More recently, I've been building agentic AI systems — not wrappers around ChatGPT, but actual multi-service architectures where an Orchestrator routes tasks to specialized Planner, Memory, and Executor services, each running in its own Docker container. The system (VEDA) uses LLM-driven task decomposition, vector-based memory retrieval via FAISS, and automated deployment through GitHub Actions.

I also co-authored research on self-healing cloud infrastructure, combining autoencoder-based anomaly detection with automated remediation — the kind of system that detects a memory leak before the on-call engineer's pager fires.`,

    timeline: [
      {
        year: "2025",
        title: "CSE (Cloud Computing) @ SRMIST",
        description: "Started B.Tech with a focus on distributed systems and cloud architecture. CGPA 8.58.",
      },
      {
        year: "2024",
        title: "Full-Stack Foundations",
        description: "Built production-style systems: JWT auth with hashed single-use refresh tokens, real-time video (Agora SDK), PostgreSQL schemas.",
      },
      {
        year: "2024",
        title: "AI/LLM Integration",
        description: "Built an autonomous email agent using LangChain + Gmail API (OAuth 2.0) — summarization, categorization, and reply drafting without human intervention.",
      },
      {
        year: "2025",
        title: "VEDA — Multi-Service Agentic Architecture",
        description: "Designed a microservice-based agentic AI system: Orchestrator, Planner, Memory (FAISS), Executor — each containerized, communicating via internal APIs, deployed with CI/CD.",
      },
      {
        year: "2026",
        title: "Self-Healing Cloud Infrastructure (Research)",
        description: "Co-authored research on autoencoder-based anomaly detection + automated remediation for cloud systems. Prometheus + Grafana observability stack.",
      },
    ],
  },

  projects: [
    {
      title: "VEDA",
      tagline: "Agentic AI Personal Operating System",
      description: "A multi-service agentic AI system where an Orchestrator decomposes user requests and routes them to specialized services. The Planner uses LLM-driven task decomposition, Memory stores and retrieves context via FAISS vector embeddings, and the Executor handles tool calls and API interactions. Each service runs in its own Docker container, communicating over an internal Docker network.",
      architectureDetail: "Services communicate via internal REST APIs on a shared Docker Compose network. Nginx reverse-proxies external traffic to the Orchestrator, which manages the request lifecycle across all services.",
      tech: ["FastAPI", "Docker", "Docker Compose", "Nginx", "FAISS", "GitHub Actions", "Python"],
      github: "https://github.com/ajayg10",
      featured: true,
    },
    {
      title: "Digital Vault",
      tagline: "Secure Data Management Platform",
      description: "A full-stack platform with a security-first auth system: JWT access tokens paired with single-use, hash-stored refresh tokens — meaning even if the database is compromised, stolen refresh tokens can't be replayed. Includes real-time video rooms via Agora SDK for collaborative sessions.",
      architectureDetail: "Refresh tokens are SHA-256 hashed before storage. Each token is single-use — on rotation, the old hash is invalidated and a new one is issued. This prevents token replay attacks even with database access.",
      tech: ["FastAPI", "React", "PostgreSQL", "JWT", "Agora SDK", "Railway", "Vercel"],
      github: "https://github.com/ajayg10",
      featured: true,
    },
    {
      title: "Email AI Agent",
      tagline: "Autonomous Email Processing",
      description: "An AI agent that connects to Gmail via OAuth 2.0, reads incoming emails, and autonomously summarizes content, categorizes by intent (urgent / informational / action-required), and drafts contextual replies. Uses LangChain's agent framework for multi-step reasoning over email threads.",
      architectureDetail: "Uses LangChain's ReAct agent pattern: the LLM reasons about each email, decides which tools to invoke (summarize, categorize, draft), and chains outputs across steps.",
      tech: ["FastAPI", "LangChain", "Gmail API", "OAuth 2.0", "Python"],
      github: "https://github.com/ajayg10",
      featured: false,
    },
    {
      title: "Self-Healing Cloud Infrastructure",
      tagline: "Research — Anomaly Detection & Auto-Remediation",
      description: "A research project building infrastructure that detects anomalies before they cause outages. An autoencoder neural network learns normal system behavior from Prometheus metrics, flags deviations, and triggers automated remediation actions — restarting containers, scaling resources, or rolling back deployments.",
      architectureDetail: "Prometheus scrapes container metrics → autoencoder reconstructs expected patterns → reconstruction error above threshold triggers Grafana alerts → remediation scripts execute corrective actions automatically.",
      tech: ["Prometheus", "Grafana", "Docker", "Python", "Autoencoder", "Bash"],
      github: "https://github.com/ajayg10",
      featured: false,
    },
  ],

  skills: {
    "Backend": [
      "FastAPI", "Node.js", "Express.js", "REST API Design", "JWT / OAuth 2.0", "PostgreSQL", "MySQL", "MongoDB",
    ],
    "AI & Agentic Systems": [
      "LangChain", "LLM Integration", "Vector Embeddings (FAISS)", "Agentic Pipelines", "Prompt Engineering",
    ],
    "Cloud & DevOps": [
      "Docker", "Docker Compose", "Nginx", "GitHub Actions (CI/CD)", "Railway", "Vercel", "Prometheus", "Grafana",
    ],
    "Languages": [
      "Python", "Java", "JavaScript", "Go",
    ],
  },

  education: {
    institution: "SRM Institute of Science and Technology",
    degree: "B.Tech CSE (Cloud Computing)",
    cgpa: "8.58",
    graduation: "2027",
  },

  social: {
    github: "https://github.com/ajayg10",
    linkedin: "https://linkedin.com/in/ajayg10",
    leetcode: "https://leetcode.com/u/Ajay-10",
    email: "ajaygarg200r@gmail.com",
  },

  githubUsername: "ajayg10",
  resumeUrl: "/images/Ajayy_Garg_Resume.pdf",
};

export default profile;

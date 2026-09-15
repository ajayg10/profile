const profile = {
  name: "Ajay Garg",
  heroHeading: "I build backend systems\nand AI architectures.",
  heroSubheading: "Computer Science Student focused on AI Systems, Backend Engineering, and Cloud Infrastructure.",
  typewriterPhrases: [
    "Building Agentic AI Systems",
    "Designing Scalable Backends",
    "Engineering SaaS Products",
    "Creating Intelligent Applications",
  ],

  about: {
    narrative: `I started where most CS students do — building full-stack CRUD apps to learn how the pieces fit together. But I got more interested in what happens behind the UI: how authentication actually works at the token level, how payment flows handle failure states, how WebSocket connections scale under load.

That led me deeper into backend architecture — building real auth systems with hash-stored single-use refresh tokens, integrating Agora SDK for real-time video, and deploying services across Railway and Vercel with proper CI/CD pipelines.

More recently, I've been building agentic AI systems — not wrappers around ChatGPT, but actual multi-service architectures where an Orchestrator routes tasks to specialized Planner, Memory, and Executor services, each running in its own Docker container. The system (VEDA) uses LLM-driven task decomposition, vector-based memory retrieval via FAISS, and automated deployment through GitHub Actions.

I also co-authored research on self-healing cloud infrastructure, combining autoencoder-based anomaly detection with automated remediation — the kind of system that detects a memory leak before the on-call engineer's pager fires.`,

    timeline: [
      {
        year: "2023",
        title: "Started Learning Development",
        description: "Started B.Tech with a focus on distributed systems and cloud architecture. SRMIST CGPA 8.58.",
      },
      {
        year: "2024",
        title: "Built Full-Stack Applications",
        description: "Built production-style systems: JWT auth with hashed single-use refresh tokens, real-time video (Agora SDK), PostgreSQL schemas.",
      },
      {
        year: "2025",
        title: "Built AI-Powered Systems",
        description: "Built an autonomous email agent using LangChain + Gmail API (OAuth 2.0) — summarization, categorization, and reply drafting without human intervention.",
      },
      {
        year: "2026",
        title: "Building Agentic AI Platforms",
        description: "Designed VEDA, a microservice-based agentic AI system: Orchestrator, Planner, Memory (FAISS), Executor — each containerized, deployed with CI/CD.",
      },
    ],

    currentFocus: [
      "Agentic AI",
      "LLM Workflows",
      "System Design",
      "Distributed Systems",
      "Cloud-Native",
    ],
  },

  projects: [
    {
      title: "VEDA",
      tagline: "Agentic AI Operating System",
      description: "A multi-service agentic AI system where an Orchestrator decomposes user requests and routes them to specialized services. The Planner uses LLM-driven task decomposition, Memory stores and retrieves context via FAISS vector embeddings, and the Executor handles tool calls and API interactions. Each service runs in its own Docker container.",
      problem: "Traditional software runs on rigid, predefined logic paths, making it unable to adapt to open-ended, complex user tasks or self-correct when API/tool executions fail.",
      solution: "Designed a microservices-based agentic operating system where requests are dynamically planned, memory-recalled, and executed through autonomous agents.",
      challenge: "Managing multi-step tasks.",
      remediation: "Dependency-aware task graph using topological sorting.",
      tech: ["FastAPI", "Docker", "FAISS", "Nginx", "GitHub Actions", "LLMs"],
      github: "https://github.com/ajayg10",
      featured: true,
      impact: "92% autonomous task success rate across multi-step digital workflows.",
      architectureFlow: ["User", "Planner", "Memory", "Executor", "LLM"],
    },
    {
      title: "Email AI Agent",
      tagline: "Autonomous Email Processing",
      description: "An AI agent that connects to Gmail via OAuth 2.0, reads incoming emails, and autonomously summarizes content, categorizes by intent (urgent / informational / action-required), and drafts contextual replies. Uses LangChain's agent framework for multi-step reasoning over email threads.",
      problem: "Manual email management, categorization, and reply drafting consume hours of developer and operations time daily.",
      solution: "Integrated Gmail APIs, OAuth authentication, LLM-powered email summarization and automated replies.",
      challenge: "Handling rate limits and context window token limits on large email threads.",
      remediation: "Implemented incremental context pruning and queue-based batching.",
      tech: ["FastAPI", "LangChain", "Gmail API", "OAuth", "Python"],
      github: "https://github.com/ajayg10",
      featured: true,
      impact: "Fully automated reply generation and intent classification for email boxes.",
      architectureFlow: ["Gmail", "OAuth", "AI Processing", "Generated Response"],
    },
    {
      title: "Digital Vault",
      tagline: "Secure Data Management Platform",
      description: "A full-stack platform with a security-first auth system: JWT access tokens paired with single-use, hash-stored refresh tokens — meaning even if the database is compromised, stolen refresh tokens can't be replayed. Includes real-time video rooms via Agora SDK for collaborative sessions.",
      problem: "Modern web applications suffer from token hijacking and replay attacks if access/refresh tokens are stored insecurely or not rotated.",
      solution: "Implemented JWT authentication, PostgreSQL persistence, real-time communication, and cloud deployment.",
      challenge: "Stolen refresh token replay attacks.",
      remediation: "Single-use, hash-stored refresh tokens with rotating invalidation.",
      tech: ["React", "FastAPI", "PostgreSQL", "JWT", "Agora", "Railway", "Vercel"],
      github: "https://github.com/ajayg10",
      featured: true,
      impact: "Secured file storage and meeting rooms, preventing unauthorized access even in database leaks.",
      architectureFlow: ["Authentication", "Storage", "Meetings", "Collaboration"],
    },
    {
      title: "Celestia",
      tagline: "Personalized Content & Paywall Engine",
      description: "A rule-based engine and AI tier that curates customized outputs based on user profile inputs, behind a payment gateway.",
      problem: "Educators and creators struggle to deliver dynamic learning tracks and restrict premium access without heavy custom development.",
      solution: "Developed a rule-based engine and AI tier that curates customized outputs based on user profile inputs, behind a payment gateway.",
      challenge: "Integrating real-time paywalls with structured outputs.",
      remediation: "Dynamic middleware validation linked with Razorpay callback webhooks.",
      tech: ["React", "FastAPI", "OpenAI", "Razorpay"],
      github: "https://github.com/ajayg10",
      featured: true,
      impact: "Automated content generation and paywall restriction for personalized learning paths.",
      architectureFlow: ["User Input", "Rule Engine", "AI Layer", "Personalized Output"],
    },
    {
      title: "Crisp",
      tagline: "High-Performance API Middleware",
      description: "A high-throughput API gateway and database connection orchestration layer to handle authentication, routing, and database queries securely.",
      problem: "Direct API-to-database calls experience connection exhaustion and latency spikes under heavy concurrent request spikes.",
      solution: "Engineered a high-throughput API gateway and database connection orchestration layer.",
      challenge: "High connection latency under burst loads.",
      remediation: "Implemented PostgreSQL connection pooling with Express routing middleware.",
      tech: ["Node.js", "Express", "PostgreSQL"],
      github: "https://github.com/ajayg10",
      featured: false,
      impact: "Stable sub-50ms API response times under mock load tests.",
      architectureFlow: ["Client App", "Auth Layer", "Database Layer", "API Layer"],
    },
    {
      title: "Self-Healing Cloud Infrastructure",
      tagline: "Research — Anomaly Detection & Auto-Remediation",
      description: "A research project building infrastructure that detects anomalies before they cause outages. An autoencoder neural network learns normal system behavior from Prometheus metrics, flags deviations, and triggers automated remediation actions.",
      problem: "Production cloud setups experience outages due to delayed alert response times by human on-call engineers.",
      solution: "Co-authored research on autoencoder-based anomaly detection + automated remediation for cloud systems.",
      challenge: "High false-positive alert rates in noisy cloud metrics.",
      remediation: "Reconstruction error threshold optimization based on autoencoder validation loss.",
      tech: ["Prometheus", "Grafana", "Docker", "Python", "Autoencoder", "Bash"],
      github: "https://github.com/ajayg10",
      featured: false,
      impact: "Automatically restarts degraded containers and logs incidents before failures scale.",
      architectureFlow: ["Prometheus Metrics", "Autoencoder Analysis", "Alert Trigger", "Auto-Remediation Script"],
    },
  ],

  skills: {
    "Backend Engineering": [
      "FastAPI", "Node.js", "Express.js", "REST APIs", "Authentication", "PostgreSQL", "MySQL", "MongoDB",
    ],
    "AI Systems": [
      "LLM Integration", "LangChain", "Prompt Engineering", "RAG", "Embeddings", "Vector Databases", "Agentic AI",
    ],
    "Cloud & DevOps": [
      "Docker", "Nginx", "GitHub Actions", "Linux", "AWS", "Vercel", "Railway",
    ],
    "Programming": [
      "Python", "Java", "JavaScript", "SQL",
    ],
  },

  experience: {
    systemFlow: [
      { label: 'User Request',    log: 'POST /api/v1/veda HTTP/2',          metric: 'Payload: 2.1kb' },
      { label: 'API Gateway',     log: 'CORS & Token check: OK',             metric: 'Rate: 14/100s' },
      { label: 'Backend Service', log: 'Routing to task decomposition',     metric: 'Event loop: 0.8ms' },
      { label: 'Database / AI',   log: 'FAISS vector search + PG query',   metric: 'Query: 4ms' },
      { label: 'Response',        log: 'HTTP 200 OK → client',              metric: 'Total: 48ms' },
    ],
    highlights: [
      { text: 'Built 5+ production-style applications',          detail: 'Multi-service architectures, real-time video modules, and email agents from scratch.' },
      { text: 'JWT Authentication, OAuth 2.0 & RBAC',            detail: 'Token rotation with hash-stored single-use refresh tokens to secure access points.' },
      { text: 'Microservices Architecture',                       detail: 'Isolated service networks via Docker Compose with reverse-proxying via Nginx.' },
      { text: 'LLMs integrated into real-world workflows',        detail: 'LangChain pipelines, FAISS vector indexing, and autonomous agent loops.' },
      { text: 'FastAPI, React, PostgreSQL & Docker',              detail: 'Full-stack building with database pooling, type-safe API routers, and containerization.' },
      { text: 'Cloud-hosted CI/CD deployed systems',              detail: 'Automated pipelines via GitHub Actions deployed to Railway, Vercel, and VPS.' },
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

# Cortex-AI 🤖

> A modular AI-powered application built with **React, Node.js, Express, LangChain/LangGraph, Redis, Docker, Firebase, MongoDB, AWS services, and multiple specialized AI agents**.

Cortex-AI is a full-stack AI platform designed around a **microservices architecture**. It provides a centralized API Gateway and multiple backend services for authentication, conversations, AI-agent execution, billing, and supporting infrastructure.

The system uses specialized AI agents for tasks such as chat, coding, web search, PDF processing, PDF-based RAG, presentation generation, image analysis, and vision-related workflows.

---

## 📌 Overview

Modern AI applications often need more than a single LLM API call. Different tasks require different tools, models, memory mechanisms, file-processing pipelines, and external services.

Cortex-AI addresses this by separating application responsibilities into independent services.

### Core architecture

```text
                         ┌──────────────────────┐
                         │      React / Vite     │
                         │      Frontend         │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      API Gateway     │
                         │   Node.js / Express  │
                         └──────────┬───────────┘
                                    │
                ┌───────────────────┼───────────────────┐
                │                   │                   │
                ▼                   ▼                   ▼
        ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
        │ Auth Service │    │ Chat Service │    │Billing Service│
        └──────────────┘    └──────────────┘    └──────────────┘
                                    │
                                    ▼
                           ┌──────────────────┐
                           │  Agent Service   │
                           │ LangChain/       │
                           │ LangGraph        │
                           └────────┬─────────┘
                                    │
                    ┌───────────────┼────────────────┐
                    │               │                │
                    ▼               ▼                ▼
                 LLMs            Tools            Memory
                    │               │                │
                    │        ┌──────┴──────┐         │
                    │        │             │         │
                    ▼        ▼             ▼         ▼
                 AI APIs   Tavily        S3      Vector DB
                                                   
                         ┌──────────────┐
                         │    Redis     │
                         └──────────────┘
```

---

# ✨ Features

## 🤖 Multi-Agent AI

Cortex-AI contains specialized AI agents rather than relying on a single general-purpose workflow.

Current agent modules include:

- 💬 Chat Agent
- 💻 Coding Agent
- 🔎 Search Agent
- 📄 PDF Agent
- 🧠 PDF RAG Agent
- 🖼️ Image Analyzer Agent
- 👁️ Vision Agent
- 📊 PowerPoint Agent

The agent service contains the logic required to route and execute different AI workflows.

---

## 💬 AI Chat

The platform provides conversational AI functionality with backend-managed conversations and messages.

The chat system separates:

- Conversation management
- Message management
- AI processing
- User authentication
- Agent execution

This allows the application to maintain a cleaner separation between the frontend and backend responsibilities.

---

## 📄 PDF Processing & RAG

Cortex-AI includes dedicated workflows for working with PDF documents.

The PDF-related agent architecture supports workflows such as:

```text
PDF
 │
 ▼
Document Processing
 │
 ▼
Text Extraction / Processing
 │
 ▼
Chunking
 │
 ▼
Embeddings
 │
 ▼
Vector Database
 │
 ▼
Retrieval
 │
 ▼
LLM
 │
 ▼
Context-Aware Response
```

This enables document-based question answering and retrieval-augmented generation workflows.

---

## 💻 Coding Agent

The coding agent is designed for programming-related AI interactions.

It can be used for tasks such as:

- Code generation
- Programming assistance
- Code-related explanations
- Debugging-oriented workflows

---

## 🔎 Web Search

The application integrates a search tool through LangChain/Tavily.

The search agent can provide external information to AI workflows instead of relying exclusively on the model's internal knowledge .

---

## 🖼️ Image & Vision Processing

Dedicated image-related agents provide support for image analysis and vision-oriented AI workflows.

The architecture separates image analysis from the general chat workflow, allowing the system to route specialized requests to appropriate agent logic.

---

## 📊 Presentation Generation

Cortex-AI contains a dedicated PowerPoint-generation workflow.

The agent service includes utilities for generating presentation files, allowing AI-generated content to be transformed into downloadable artifacts.

---

## 📄 PDF Generation

The backend includes PDF-generation functionality that can be used by AI workflows to transform generated content into PDF artifacts.

---

# 🏗️ Architecture

Cortex-AI follows a **microservices architecture**.

Instead of putting all backend functionality into a single Express application, responsibilities are divided into separate services.

```text
cortex-ai/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── backend/
│   │
│   ├── docker-compose.yml
│   ├── package.json
│   │
│   ├── gateway/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── utils/
│   │   ├── Dockerfile
│   │   └── index.js
│   │
│   ├── services/
│   │
│   ├── agent/
│   │   ├── agents/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── graph/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── Dockerfile
│   │   └── index.js
│   │
│   ├── auth/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── Dockerfile
│   │   └── index.js
│   │
│   ├── billing/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── Dockerfile
│   │   └── index.js
│   │
│   └── chat/
│       ├── config/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── Dockerfile
│       └── index.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── utils/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── LICENSE
└── README.md
```

---

# 🚪 API Gateway

The API Gateway acts as the main entry point for backend requests.

Instead of allowing the frontend to communicate directly with every microservice, requests can flow through the gateway.

```text
React
  │
  ▼
API Gateway
  │
  ├──► Auth Service
  │
  ├──► Chat Service
  │
  ├──► Agent Service
  │
  └──► Billing Service
```

### Benefits

- Centralized API entry point
- Authentication middleware
- Service routing
- Easier frontend integration
- Separation of backend responsibilities
- Simplified deployment architecture

---

# 🔐 Authentication

Authentication is handled through a dedicated authentication service.

The project contains Firebase Admin integration for backend authentication workflows and Firebase client integration on the frontend.

Authentication-related functionality is separated from:

- AI agents
- Chat
- Billing
- Gateway logic

This prevents authentication logic from being tightly coupled to individual business services.

---

# 💳 Billing

Cortex-AI includes a dedicated billing service.

The billing service contains:

- Payment configuration
- Payment controllers
- Payment models
- Billing routes
- Plan configuration
- Razorpay integration

Payment credentials are loaded from environment variables rather than being hard-coded into the source code.

```text
Frontend
   │
   ▼
Gateway
   │
   ▼
Billing Service
   │
   ▼
Razorpay
```

---

# 🧠 LangChain & LangGraph

The agent service uses AI orchestration concepts through LangChain and LangGraph.

The project contains a graph-based agent architecture with components for:

- Graph state
- Graph routing
- Agent execution
- Model configuration
- Memory
- Embeddings
- Retrieval
- External tools

Conceptually:

```text
User Request
     │
     ▼
Agent Router
     │
     ├──────────────┐
     │              │
     ▼              ▼
 Chat Agent     Coding Agent
     │              │
     ├──────┐ ┌─────┤
     │      │ │     │
     ▼      ▼ ▼     ▼
 Search   Tools   Memory
     │
     ▼
    LLM
     │
     ▼
Response
```

---

# 🗃️ Data Layer

The backend uses database configuration modules across the services.

Different services maintain their own database-related responsibilities instead of forcing all business logic into a single backend module.

The project also includes:

- Redis integration
- Vector database configuration
- Embedding configuration
- S3 integration
- MongoDB-related configuration

---

# ⚡ Redis

Redis is included as part of the backend infrastructure.

The local development environment provides Redis through Docker Compose.

```yaml
services:
  redis:
    image: redis
    ports:
      - "6379:6379"
```

Redis can be used for fast, temporary, shared application state and other infrastructure-level workloads.

---

# 📦 Amazon S3

The agent service contains an S3 integration for object storage.

AWS credentials are loaded through environment variables:

```env
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

Credentials should **never be committed to GitHub**.

---

# 🐳 Docker

Each backend microservice contains its own Dockerfile.

Example architecture:

```text
Docker
 │
 ├── Gateway Container
 │
 ├── Auth Container
 │
 ├── Chat Container
 │
 ├── Agent Container
 │
 └── Billing Container
```

This allows each service to be built and deployed independently.

---

# 🔄 Local Development

## Prerequisites

Install:

- Node.js
- npm
- Git
- Docker Desktop
- MongoDB or an accessible MongoDB deployment
- Redis
- Required AI/API credentials
- Firebase project configuration

---

# 📥 Installation

Clone the repository:

```bash
git clone https://github.com/jaadu123bot/cortex-ai.git
```

Move into the project:

```bash
cd cortex-ai
```

---

# ⚙️ Environment Variables

The project intentionally does **not** commit real environment files.

Create the required `.env` files locally.

Typical backend variables may include:

```env
PORT=
MONGO_URI=

JWT_SECRET=

AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

TAVILY_API_KEY=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

REDIS_URL=

OPENAI_API_KEY=
```

The exact variables depend on the individual service configuration.

### Firebase Admin

The backend authentication service requires the Firebase Admin service-account configuration.

The service-account JSON file must remain local and must **never be uploaded to GitHub**.

---

# 🖥️ Frontend Configuration

The React application uses Vite.

Frontend environment variables use the `VITE_` prefix.

Example:

```env
VITE_API_URL=
VITE_FIREBASE_API_KEY=
```

### Important

Vite variables are exposed to the client-side application.

Therefore:

> Never place private API keys, database passwords, AWS secret keys, JWT secrets, or payment secrets inside `VITE_*` variables.

Only values that are safe to expose to the browser should use the `VITE_` prefix.

---

# ▶️ Running the Backend

Install dependencies for the backend:

```bash
cd backend
npm install
```

Individual microservices have their own `package.json` files and may also need their dependencies installed.

For example:

```bash
cd backend/gateway
npm install
```

Then start the gateway using the script defined in its `package.json`.

The same approach applies to:

```text
backend/services/auth
backend/services/chat
backend/services/agent
backend/services/billing
```

---

# ▶️ Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

Vite will provide a local development URL, normally similar to:

```text
http://localhost:5173
```

---

# 🐳 Running Redis with Docker

From the backend directory:

```bash
docker compose up -d redis
```

Check running containers:

```bash
docker ps
```

Stop the Redis container:

```bash
docker compose down
```

---

# 🔁 Request Flow

A typical AI request can follow this architecture:

```text
User
 │
 ▼
React Frontend
 │
 ▼
API Gateway
 │
 ▼
Authentication
 │
 ▼
Agent Service
 │
 ▼
LangGraph Router
 │
 ├── Chat Agent
 ├── Coding Agent
 ├── Search Agent
 ├── PDF Agent
 ├── PDF RAG Agent
 ├── Vision Agent
 ├── Image Analyzer Agent
 └── PPT Agent
 │
 ▼
LLM / External Tools
 │
 ▼
Agent Response
 │
 ▼
Gateway
 │
 ▼
React Frontend
```

---

# 🔒 Security

Security considerations implemented in the project include:

- Environment-based secrets
- `.gitignore` protection
- Firebase authentication infrastructure
- Backend authentication middleware
- Separate service boundaries
- Docker isolation
- Externalized AWS credentials
- Externalized Razorpay credentials
- Externalized AI API credentials

Sensitive files intentionally excluded from Git include:

```text
.env
node_modules/
dist/
build/
serviceAccountKey.json
```

---

# ☁️ CI/CD

The repository contains a GitHub Actions workflow:

```text
.github/workflows/deploy.yml
```

The workflow is designed around AWS deployment.

The backend deployment process builds Docker images for:

```text
Gateway
Auth
Chat
Agent
Billing
```

and pushes the images to Amazon ECR.

The frontend workflow builds the Vite application and uploads the resulting static files to Amazon S3.

Conceptually:

```text
Git Push
   │
   ▼
GitHub Actions
   │
   ├─────────────── Backend ───────────────┐
   │                                       │
   ▼                                       ▼
Docker Build                              ECR
   │                                       │
   └───────────────────────────────────────┘
                       │
                       ▼
                     ECS


Git Push
   │
   ▼
GitHub Actions
   │
   ▼
npm run build
   │
   ▼
frontend/dist
   │
   ▼
Amazon S3
   │
   ▼
CloudFront
```

AWS credentials and deployment configuration should be stored as **GitHub Actions Secrets**, never directly inside the workflow source code.

---

# 🧪 Testing

Before deploying changes, verify:

### Frontend

```bash
npm run build
```

### Backend

Start the required services and verify:

- Authentication
- Gateway routing
- Chat
- AI agents
- Billing
- Database connectivity
- Redis connectivity
- External API integrations

### Docker

Build individual services using their Dockerfiles:

```bash
docker build -f backend/gateway/Dockerfile backend
```

Repeat for the required services.

---

# 📁 Service Responsibilities

| Service | Responsibility |
|---|---|
| Gateway | Central API entry point and request routing |
| Auth | Authentication and user identity |
| Chat | Conversations and messages |
| Agent | AI orchestration and specialized agents |
| Billing | Plans and payment processing |
| Redis | Fast shared infrastructure/cache layer |
| Frontend | React-based user interface |

---

# 🧩 Technology Stack

## Frontend

- React
- Vite
- JavaScript
- Redux
- Axios
- Firebase Authentication

## Backend

- Node.js
- Express.js
- JavaScript
- REST APIs
- Microservices architecture

## AI

- LangChain
- LangGraph
- LLM integrations
- Embeddings
- Vector database
- Retrieval-Augmented Generation
- AI tool integration

## Infrastructure

- Docker
- Docker Compose
- Redis
- Amazon ECR
- Amazon ECS
- Amazon S3
- Amazon CloudFront
- AWS IAM
- GitHub Actions

## Authentication & Payments

- Firebase
- Firebase Admin SDK
- Razorpay

## Storage / Data

- MongoDB
- Redis
- Amazon S3
- Vector database

---

# 📈 Why Microservices?

The project separates major responsibilities into independent services.

Instead of:

```text
One Huge Express Application
```

the architecture uses:

```text
                  Gateway
                     │
       ┌─────────────┼─────────────┐
       │             │             │
      Auth          Chat          Billing
       │             │             │
       └─────────────┼─────────────┘
                     │
                   Agent
```

This makes it easier to:

- Deploy services independently
- Scale individual workloads
- Isolate failures
- Maintain separate responsibilities
- Modify AI functionality without changing authentication
- Scale compute-heavy AI workloads independently

---

# 🚀 Future Improvements

Potential future improvements include:

- Kubernetes deployment
- Automated database migrations
- Centralized observability
- Distributed tracing
- Prometheus/Grafana monitoring
- Better service-to-service authentication
- AWS Secrets Manager integration
- GitHub Actions OIDC instead of long-lived AWS credentials
- Automated testing in CI
- Horizontal autoscaling
- Queue-based asynchronous AI jobs
- Improved agent evaluation
- Model routing based on task complexity
- Rate limiting
- API versioning
- Production-grade Redis deployment
- Automated infrastructure provisioning with Terraform

---

# 🛡️ Secret Management

**Never commit:**

```text
.env
.env.local
.env.production
serviceAccountKey.json
AWS credentials
Razorpay secrets
LLM API keys
database passwords
private keys
```

If a secret is accidentally committed:

1. Revoke/rotate the secret immediately.
2. Remove it from the working tree.
3. Remove it from Git history if necessary.
4. Update the application with the new credential.
5. Check whether the exposed credential was used.

---

# 🤝 Contributing

Contributions are welcome.

Typical workflow:

```bash
git clone <repository>
cd cortex-ai

git checkout -b feature/my-feature

# Make changes

git add .
git commit -m "Add my feature"

git push origin feature/my-feature
```

Then create a Pull Request.

---

# 📜 License

This project is licensed under the terms specified in the repository's `LICENSE` file.

---

# 👨‍💻 Project

**Cortex-AI**

A full-stack AI application demonstrating:

- Full-stack development
- React
- Node.js
- Express
- Microservices
- API Gateway architecture
- AI agents
- LangChain
- LangGraph
- RAG
- Vector search
- Redis
- Docker
- Firebase
- Payment integration
- AWS infrastructure
- CI/CD

---


https://github.com/jaadu123bot/cortex-ai

If you find the project useful, consider giving the repository a ⭐.

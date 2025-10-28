# Onebox - AI-Powered Email Aggregator

A modern email aggregation platform with real-time IMAP sync, AI-powered categorization, and intelligent reply suggestions using RAG (Retrieval-Augmented Generation).

## Features

- **Real-time Email Sync**: IMAP integration with IDLE support for instant email updates
- **AI Email Categorization**: Automatic classification into 5 categories (Interested, Meeting Booked, Not Interested, Spam, Out of Office)
- **Smart Search**: Full-text search powered by Elasticsearch
- **RAG-Based Replies**: AI-generated email replies using context from similar emails
- **Slack Integration**: Automatic notifications for important emails
- **Webhook Support**: Custom integrations for external systems
- **Vector Search**: Semantic similarity search for finding related emails

## Tech Stack

**Frontend:**
- Next.js 16 with React 19
- TypeScript
- Tailwind CSS
- shadcn/ui components

**Backend:**
- Node.js with Express
- PostgreSQL with pgvector for embeddings
- Elasticsearch for full-text search
- IMAP for email sync
- OpenAI API for AI features

**Infrastructure:**
- Docker & Docker Compose
- Vercel deployment ready

## Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- OpenAI API key
- PostgreSQL (or use Docker)
- Elasticsearch (or use Docker)

### Installation

1. **Clone and install dependencies:**
\`\`\`bash
git clone <your-repo>
cd onebox-email-aggregator
npm install
cd backend && npm install && cd ..
\`\`\`

2. **Set up environment variables:**
\`\`\`bash
cp .env.example .env.local
# Edit .env.local with your API keys
\`\`\`

3. **Start Docker services:**
\`\`\`bash
docker-compose up -d
\`\`\`

4. **Run database migrations:**
\`\`\`bash
npm run migrate
\`\`\`

5. **Start development servers:**
\`\`\`bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
cd backend && npm run dev
\`\`\`

The app will be available at `http://localhost:3000`

## Environment Variables

\`\`\`
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001

# Backend
DATABASE_URL=postgresql://onebox:onebox_password@localhost:5432/onebox
ELASTICSEARCH_URL=http://localhost:9200
OPENAI_API_KEY=your_openai_api_key
PORT=3001

# Optional: Slack & Webhooks
SLACK_WEBHOOK_URL=your_slack_webhook
\`\`\`

## Project Structure

\`\`\`
onebox-email-aggregator/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── emails/              # Email endpoints
│   │   ├── accounts/            # Account management
│   │   └── suggested-reply/     # AI reply generation
│   ├── page.tsx                 # Main dashboard
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── email-list.tsx           # Email list view
│   ├── email-detail.tsx         # Email detail view
│   ├── sidebar.tsx              # Navigation sidebar
│   ├── search-bar.tsx           # Search interface
│   ├── header.tsx               # Top header
│   └── ui/                      # shadcn/ui components
├── lib/                          # Utilities
│   ├── services.ts              # API service functions
│   └── utils.ts                 # Helper functions
├── types/                        # TypeScript types
│   └── index.ts                 # Type definitions
├── backend/                      # Express backend
│   ├── src/
│   │   ├── config/              # Database config
│   │   ├── services/            # Business logic
│   │   │   ├── ai-service.ts
│   │   │   ├── imap-service.ts
│   │   │   ├── elasticsearch-service.ts
│   │   │   ├── embedding-service.ts
│   │   │   └── notification-service.ts
│   │   ├── routes/              # API routes
│   │   ├── types/               # Backend types
│   │   └── index.ts             # Server entry
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml           # Docker services
├── package.json
├── tsconfig.json
└── README.md
\`\`\`

## API Endpoints

### Emails
- `GET /api/emails` - Get emails with filters
- `GET /api/emails/:id` - Get email details
- `POST /api/suggested-reply` - Generate AI reply

### Accounts
- `GET /api/accounts` - List email accounts
- `POST /api/accounts` - Add new account
- `DELETE /api/accounts/:id` - Remove account

### Search
- `GET /api/search?q=query` - Full-text search

### Webhooks
- `POST /api/webhooks/configure` - Setup webhook
- `POST /api/webhooks/slack` - Setup Slack integration

## Key Features Explained

### Real-time Email Sync
Uses IMAP IDLE mode to receive instant notifications of new emails. Automatically fetches emails from the last 30 days on first connection.

### AI Categorization
Each email is automatically categorized using OpenAI's GPT-4 mini model into one of 5 categories with confidence scores.

### RAG for Suggested Replies
When generating a reply, the system:
1. Generates embeddings for the current email
2. Searches for similar emails using vector similarity
3. Uses similar emails as context for the LLM
4. Generates contextually aware replies

### Vector Search
Emails are stored with embeddings in PostgreSQL using pgvector extension, enabling semantic similarity search.

## Deployment

### Deploy to Vercel

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

For backend, use Railway, Render, or similar services.

## Development

### Adding a New Email Category

1. Update `EmailCategory` type in `backend/src/types/index.ts`
2. Update categorization prompt in `backend/src/services/ai-service.ts`
3. Update UI colors in `components/email-list.tsx`

### Customizing AI Behavior

Edit prompts in:
- `backend/src/services/ai-service.ts` - Categorization & reply generation
- `backend/src/services/embedding-service.ts` - Context generation

## Troubleshooting

**IMAP Connection Issues:**
- Verify email credentials
- Check IMAP host and port
- Enable "Less secure app access" for Gmail

**Elasticsearch Connection:**
- Ensure Docker container is running: `docker-compose ps`
- Check logs: `docker-compose logs elasticsearch`

**Database Issues:**
- Reset database: `docker-compose down -v && docker-compose up -d`
- Check migrations ran successfully

## License

MIT

## Support

For issues and questions, open a GitHub issue or contact support.

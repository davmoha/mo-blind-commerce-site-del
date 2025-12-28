# System Architecture
## SAM.gov Procurement Assistant

**Version:** 1.0  
**Date:** December 28, 2024

---

## 1. Overview

This document describes the technical architecture for the SAM.gov Procurement Assistant, a SaaS application that helps small businesses find federal contracting opportunities and generate AI-powered proposals.

---

## 2. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  React + TypeScript + Vite + Shadcn UI + TailwindCSS       │
│                    (Deployed on Vercel)                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTPS/REST API
                       │
┌──────────────────────┴──────────────────────────────────────┐
│                      API Layer                               │
│            Supabase Edge Functions / REST API                │
└──────────────────────┬──────────────────────────────────────┘
                       │
          ┌────────────┼────────────┬──────────────┐
          │            │            │              │
┌─────────▼───┐  ┌────▼────┐  ┌───▼────┐   ┌─────▼──────┐
│  Supabase   │  │  OpenAI │  │SAM.gov │   │  Storage   │
│  PostgreSQL │  │   API   │  │  API   │   │ (Supabase) │
│  Database   │  │ (GPT-4) │  │        │   │  (Files)   │
└─────────────┘  └─────────┘  └────────┘   └────────────┘
```

---

## 3. Frontend Architecture

### 3.1 Technology Stack
- **Framework:** React 18.3+
- **Language:** TypeScript
- **Build Tool:** Vite
- **UI Components:** Shadcn UI (Radix UI primitives)
- **Styling:** TailwindCSS
- **Routing:** React Router v6
- **State Management:** React Query (TanStack Query)
- **Forms:** React Hook Form + Zod
- **HTTP Client:** Fetch API / Axios

### 3.2 Directory Structure
```
src/
├── components/
│   ├── ui/                 # Shadcn UI components
│   ├── layout/             # Layout components (Header, Footer, Sidebar)
│   ├── auth/               # Authentication components
│   ├── profile/            # Company profile components
│   ├── opportunities/      # Opportunity search & display
│   ├── proposals/          # Proposal editor & generation
│   └── common/             # Shared components
├── pages/
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Profile.tsx
│   ├── OpportunitySearch.tsx
│   ├── OpportunityDetails.tsx
│   ├── ProposalEditor.tsx
│   └── Repository.tsx
├── services/
│   ├── api.ts              # API client configuration
│   ├── auth.ts             # Authentication service
│   ├── opportunities.ts    # SAM.gov API service
│   ├── proposals.ts        # Proposal service
│   └── storage.ts          # File storage service
├── hooks/
│   ├── useAuth.ts          # Authentication hook
│   ├── useProfile.ts       # Profile management hook
│   ├── useOpportunities.ts # Opportunities hook
│   └── useProposals.ts     # Proposals hook
├── types/
│   ├── auth.ts
│   ├── profile.ts
│   ├── opportunity.ts
│   └── proposal.ts
├── lib/
│   └── utils.ts            # Utility functions
├── context/
│   └── AuthContext.tsx     # Global auth context
└── App.tsx
```

### 3.3 Key Features

**Authentication Flow:**
1. User enters credentials
2. Frontend validates form
3. Calls Supabase Auth API
4. Receives JWT token
5. Stores token in local storage
6. Includes token in all API requests

**State Management:**
- React Query for server state (caching, background updates)
- React Context for global state (auth, theme)
- Local component state for UI state

**Error Handling:**
- Global error boundary
- Toast notifications for user feedback
- Retry logic for failed requests
- Graceful degradation

---

## 4. Backend Architecture

### 4.1 Technology Stack
- **Platform:** Supabase
- **Database:** PostgreSQL 15+
- **Authentication:** Supabase Auth (JWT-based)
- **API:** Supabase PostgREST + Edge Functions
- **Storage:** Supabase Storage (S3-compatible)
- **Real-time:** Supabase Realtime (WebSockets)

### 4.2 Database Schema

**Core Tables:**

```sql
-- Users (managed by Supabase Auth)
auth.users

-- Company Profiles
CREATE TABLE company_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  company_name TEXT NOT NULL,
  duns_uei TEXT,
  address JSONB,
  contact_info JSONB,
  services TEXT[],
  products TEXT[],
  classifications JSONB DEFAULT '{}'::jsonb,
  custom_tags TEXT[],
  naics_codes TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Opportunities
CREATE TABLE opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sam_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  agency TEXT,
  description TEXT,
  naics_code TEXT,
  set_aside TEXT,
  posted_date DATE,
  response_deadline DATE,
  award_amount DECIMAL,
  document_url TEXT,
  requirements JSONB,
  raw_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Opportunities (tracking)
CREATE TABLE user_opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  opportunity_id UUID REFERENCES opportunities NOT NULL,
  status TEXT NOT NULL DEFAULT 'saved',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, opportunity_id)
);

-- Proposals
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  opportunity_id UUID REFERENCES opportunities,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  version INTEGER DEFAULT 1,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Winning Proposals Repository
CREATE TABLE winning_proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  industry TEXT,
  agency TEXT,
  year INTEGER,
  content TEXT,
  keywords TEXT[],
  file_url TEXT,
  is_public BOOLEAN DEFAULT false,
  uploaded_by UUID REFERENCES auth.users,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_opportunities_sam_id ON opportunities(sam_id);
CREATE INDEX idx_opportunities_naics ON opportunities(naics_code);
CREATE INDEX idx_opportunities_deadline ON opportunities(response_deadline);
CREATE INDEX idx_user_opportunities_user_id ON user_opportunities(user_id);
CREATE INDEX idx_proposals_user_id ON proposals(user_id);
CREATE INDEX idx_winning_proposals_keywords ON winning_proposals USING GIN(keywords);
```

### 4.3 Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE company_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- Policies
-- Company Profiles
CREATE POLICY "Users can view own profile"
  ON company_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON company_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON company_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- User Opportunities
CREATE POLICY "Users can view own opportunities"
  ON user_opportunities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own opportunities"
  ON user_opportunities FOR ALL
  USING (auth.uid() = user_id);

-- Proposals
CREATE POLICY "Users can view own proposals"
  ON proposals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own proposals"
  ON proposals FOR ALL
  USING (auth.uid() = user_id);

-- Opportunities (public read)
CREATE POLICY "Anyone can view opportunities"
  ON opportunities FOR SELECT
  TO authenticated
  USING (true);

-- Winning Proposals (public read for public proposals)
CREATE POLICY "Authenticated users can view public proposals"
  ON winning_proposals FOR SELECT
  TO authenticated
  USING (is_public = true OR uploaded_by = auth.uid());
```

### 4.4 API Endpoints

**Supabase Auto-Generated REST API:**
- `GET /rest/v1/company_profiles?user_id=eq.{userId}`
- `POST /rest/v1/company_profiles`
- `PATCH /rest/v1/company_profiles?id=eq.{id}`
- `GET /rest/v1/opportunities`
- `GET /rest/v1/proposals?user_id=eq.{userId}`
- etc.

**Custom Edge Functions:**

```typescript
// supabase/functions/search-opportunities/index.ts
// Searches SAM.gov API based on user profile

// supabase/functions/generate-proposal/index.ts
// Calls OpenAI API to generate proposal

// supabase/functions/export-proposal/index.ts
// Converts proposal to Word/PDF format

// supabase/functions/scrape-rfp/index.ts
// Extracts requirements from RFP documents
```

---

## 5. External Integrations

### 5.1 SAM.gov API

**Purpose:** Fetch federal contracting opportunities

**Configuration:**
```typescript
const SAM_API_CONFIG = {
  baseUrl: 'https://api.sam.gov/opportunities/v2',
  apiKey: process.env.SAM_API_KEY,
  version: 'v2',
  rateLimit: 10 // requests per second
};
```

**Key Endpoints:**
- `GET /search` - Search opportunities
- `GET /{noticeId}` - Get opportunity details
- `GET /{noticeId}/resources` - Get attachments

**Data Mapping:**
```typescript
interface SAMOpportunity {
  noticeId: string;
  title: string;
  solicitationNumber: string;
  department: string;
  subTier: string;
  office: string;
  postedDate: string;
  responseDeadLine: string;
  naicsCode: string;
  classificationCode: string;
  setAside: string;
  description: string;
  // ... more fields
}

// Map to internal structure
function mapSAMOpportunity(sam: SAMOpportunity): Opportunity {
  return {
    sam_id: sam.noticeId,
    title: sam.title,
    agency: `${sam.department} - ${sam.subTier}`,
    description: sam.description,
    naics_code: sam.naicsCode,
    set_aside: sam.setAside,
    posted_date: new Date(sam.postedDate),
    response_deadline: new Date(sam.responseDeadLine),
    // ...
  };
}
```

**Error Handling:**
- Rate limit handling (exponential backoff)
- API unavailability (cache fallback)
- Invalid responses (validation)

### 5.2 OpenAI API

**Purpose:** Generate AI-powered proposals

**Configuration:**
```typescript
const OPENAI_CONFIG = {
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4-turbo-preview',
  maxTokens: 8000,
  temperature: 0.7
};
```

**Proposal Generation Flow:**
1. Extract RFP requirements
2. Retrieve relevant winning proposals
3. Format company profile
4. Construct prompt with context
5. Call GPT-4 API
6. Parse and structure response
7. Return generated proposal

**Prompt Engineering:**
```typescript
const proposalPrompt = `
You are an expert proposal writer specializing in federal government contracts.

COMPANY PROFILE:
${companyProfile}

RFP REQUIREMENTS:
${rfpRequirements}

WINNING PROPOSAL EXAMPLES:
${winningExamples}

Generate a professional proposal that:
1. Addresses all RFP requirements
2. Highlights company qualifications
3. Follows federal proposal structure
4. Is clear, concise, and compelling
5. Includes: Executive Summary, Technical Approach, Management Plan, Past Performance, Pricing

Output as structured JSON with sections.
`;
```

**Cost Optimization:**
- Use GPT-4 Turbo (cheaper)
- Implement token limits
- Cache similar requests
- Batch processing where possible

---

## 6. Security Architecture

### 6.1 Authentication & Authorization

**Flow:**
```
User Login
  ↓
Supabase Auth validates credentials
  ↓
Returns JWT token (short-lived)
  ↓
Frontend stores in memory (not localStorage for security)
  ↓
Token included in Authorization header
  ↓
Supabase validates token + RLS policies
  ↓
Access granted/denied
```

**Token Management:**
- Access tokens: 1 hour expiry
- Refresh tokens: 30 days expiry
- Auto-refresh before expiry
- Logout invalidates tokens

### 6.2 Data Protection

**Encryption:**
- HTTPS/TLS for all communications
- Database encryption at rest (Supabase default)
- API keys stored in environment variables
- Sensitive fields encrypted in database

**API Key Management:**
```typescript
// .env (never commit)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...public-key
SUPABASE_SERVICE_ROLE_KEY=eyJ...secret-key
SAM_API_KEY=SAM-e71b5953-a043-4423-8792-f40c384e9493
OPENAI_API_KEY=sk-...
```

**Input Validation:**
- Zod schemas for all inputs
- SQL injection prevention (parameterized queries)
- XSS prevention (sanitize HTML)
- CSRF protection

### 6.3 Rate Limiting

```typescript
// Supabase Edge Function rate limiting
const rateLimit = {
  search: { requests: 100, window: '1m' },
  generate: { requests: 10, window: '1h' },
  api: { requests: 1000, window: '1h' }
};
```

---

## 7. Deployment Architecture

### 7.1 Infrastructure

**Frontend Deployment (Vercel):**
```
GitHub Repository
  ↓ (push to main)
Automatic Build & Deploy
  ↓
Vercel CDN (Global)
  ↓
User Access
```

**Backend Deployment (Supabase):**
- Managed service (fully hosted)
- Automatic scaling
- Built-in CDN
- Edge functions deployed via CLI

### 7.2 Environments

**Development:**
- Local Supabase (Docker)
- Local Vite dev server
- Test API keys

**Staging:**
- Supabase staging project
- Vercel preview deployments
- Staging API keys

**Production:**
- Supabase production project
- Vercel production domain
- Production API keys
- Custom domain

### 7.3 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Install dependencies
      - Run linter
      - Run type check
      - Run tests
      
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - Deploy to Vercel
      - Deploy Supabase migrations
      - Deploy Edge functions
      - Run smoke tests
```

---

## 8. Monitoring & Observability

### 8.1 Logging

**Frontend:**
- Sentry for error tracking
- Google Analytics for usage
- Custom events for key actions

**Backend:**
- Supabase Dashboard logs
- Edge Function logs
- Database query logs

### 8.2 Metrics

**Application Metrics:**
- User registration rate
- Opportunity searches per user
- Proposal generations per user
- API response times
- Error rates

**Business Metrics:**
- Active users (DAU/MAU)
- Conversion rate
- Churn rate
- Feature adoption

### 8.3 Alerts

```typescript
const alerts = {
  errorRate: { threshold: 5, window: '5m' },
  responseTime: { threshold: 2000, unit: 'ms' },
  apiFailure: { threshold: 10, window: '5m' }
};
```

---

## 9. Scalability Considerations

### 9.1 Database Scaling

**Current Setup (MVP):**
- Supabase free tier: 500MB database
- Expected: ~1000 users, 10k opportunities

**Growth Strategy:**
- Upgrade to paid tier at 80% capacity
- Implement data archiving
- Optimize queries with indexes
- Use materialized views for analytics

### 9.2 API Scaling

**Rate Limiting:**
- Per-user limits to prevent abuse
- Graduated limits by subscription tier

**Caching:**
```typescript
// Cache SAM.gov opportunities
const CACHE_TTL = {
  opportunities: 6 * 60 * 60, // 6 hours
  opportunityDetails: 24 * 60 * 60, // 24 hours
  profile: 5 * 60 // 5 minutes
};
```

**CDN:**
- Static assets via Vercel CDN
- Image optimization
- Gzip compression

### 9.3 Cost Optimization

**Supabase:**
- Start with free tier ($0/month)
- Pro tier at scale ($25/month)
- Optimize query performance
- Archive old data

**OpenAI:**
- Use GPT-4 Turbo ($10/1M tokens)
- Implement smart caching
- Token optimization
- Estimated cost: $0.50-2.00 per proposal

**Vercel:**
- Free tier for MVP
- Pro tier at scale ($20/month)

---

## 10. Development Workflow

### 10.1 Local Development

```bash
# Install dependencies
npm install

# Start Supabase locally (requires Docker)
npx supabase start

# Start frontend dev server
npm run dev

# Run type checking
npm run type-check

# Run linter
npm run lint
```

### 10.2 Database Migrations

```bash
# Create new migration
npx supabase migration new <name>

# Apply migrations locally
npx supabase db reset

# Apply migrations to production
npx supabase db push
```

### 10.3 Testing Strategy

**Unit Tests:**
- Utility functions
- Hooks
- Components (React Testing Library)

**Integration Tests:**
- API services
- Database queries
- Auth flows

**E2E Tests:**
- Critical user flows (Playwright)
- Proposal generation workflow
- Search and save flow

---

## 11. Disaster Recovery

### 11.1 Backup Strategy

**Database:**
- Supabase automatic daily backups
- Point-in-time recovery (7 days)
- Manual backups before major changes

**Files:**
- Supabase Storage backups
- Redundant storage (S3 backend)

### 11.2 Recovery Plan

**Database Failure:**
1. Switch to Supabase backup
2. Restore from point-in-time
3. Notify users of any data loss

**API Failure:**
1. SAM.gov: Use cached data
2. OpenAI: Queue requests, retry later
3. Display maintenance message

---

## 12. Future Enhancements

### 12.1 Potential Improvements

**Performance:**
- Implement GraphQL for efficient data fetching
- Server-side rendering for SEO
- Progressive Web App (PWA)

**Features:**
- Real-time collaboration
- Mobile apps (React Native)
- Browser extension
- Slack/Teams integration

**Infrastructure:**
- Multi-region deployment
- Redis caching layer
- Message queue for async tasks
- Microservices architecture

### 12.2 Technology Alternatives

**If scaling becomes an issue:**
- Migrate to AWS (ECS/Lambda)
- Use dedicated Redis cluster
- Implement Elasticsearch for search
- CDN for global performance

---

## 13. Compliance & Legal

### 13.1 Data Compliance

- GDPR compliance (EU users)
- Data retention policies
- User data export
- Right to deletion

### 13.2 Terms of Service

- SAM.gov API terms
- OpenAI API terms
- User agreement
- Privacy policy

---

## Appendix A: Technology Decision Matrix

| Criteria | Supabase | Firebase | AWS | Self-Hosted |
|----------|----------|----------|-----|-------------|
| Time to Market | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐ |
| Cost (MVP) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Scalability | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| PostgreSQL | ⭐⭐⭐⭐⭐ | ❌ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Auth Built-in | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| Complexity | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐ |

**Winner: Supabase** ✅

---

**Document Control:**
- Version: 1.0
- Last Updated: December 28, 2024
- Next Review: January 15, 2025
- Owner: Development Team

# SAM.gov Procurement Assistant

An AI-powered federal procurement platform designed to help small businesses discover and respond to federal contracting opportunities efficiently.

## Overview

The SAM.gov Procurement Assistant is a SaaS application that streamlines the federal contracting process for small businesses, particularly disabled veteran-owned, women-owned, minority-owned, and HubZone businesses. The platform uses AI to automate proposal generation and opportunity matching, reducing proposal creation time by 80%.

## Features

### ✅ Implemented (MVP)

#### Authentication & User Management
- User registration and login pages
- Email verification flow (UI ready)
- Password recovery (UI ready)
- Secure session management (ready for backend integration)

#### Company Profile Management
- Complete company information forms
- Business classification checkboxes (SDVOSB, WOSB, Minority-Owned, HubZone, 8(a), Small Business)
- Custom tags and keywords for opportunity matching
- NAICS code management
- Services and products description

#### Opportunity Search & Discovery
- Advanced search interface with multiple filters
- Set-aside type filtering (SDVOSB, WOSB, etc.)
- NAICS code search
- Location-based filtering
- Award amount range filtering
- Sort by relevance, deadline, posted date, or amount
- Opportunity cards with key information
- Save/bookmark functionality

#### Opportunity Details
- Comprehensive opportunity view with all RFP details
- Tabbed interface (Overview, Requirements, Documents, Contacts)
- Technical requirements display
- Evaluation criteria
- Submission guidelines
- Key contacts and POCs
- Document downloads
- Deadline tracking with visual alerts
- Status management (Saved, In Progress, Applied, Declined)

#### Dashboard & Analytics
- Active opportunities overview
- Upcoming deadlines tracker
- Recent activity feed
- Statistics cards (opportunities, proposals, success rate)
- Quick action buttons
- Alert notifications

#### AI-Powered Proposal Generation
- Proposal list view with status tracking
- Full-featured proposal editor
- Multiple proposal sections:
  - Executive Summary
  - Technical Approach
  - Past Performance
  - Key Personnel
  - Management Plan
  - Pricing/Cost Breakdown
- Section-by-section regeneration capability
- Rich text editing
- Export to Word/PDF (ready for backend)
- Draft saving functionality
- Progress tracking

#### User Interface
- Modern, responsive design using Shadcn UI and TailwindCSS
- Intuitive navigation
- Mobile-friendly layouts
- Accessible components
- Loading states and error handling
- Toast notifications for user feedback

## Technology Stack

### Frontend
- **React 18.3+** with TypeScript
- **Vite** - Build tool
- **Shadcn UI** - Component library
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **React Query** - Data fetching (ready for backend)
- **React Hook Form** - Form management
- **Zod** - Validation (ready for implementation)

### Backend (Recommended - Not Yet Implemented)
- **Supabase** - PostgreSQL database, authentication, storage
- **OpenAI GPT-4** - AI proposal generation
- **SAM.gov API** - Federal opportunity data (API Key available)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/davmoha/mo-blind-commerce-site-del.git
cd mo-blind-commerce-site-del
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── App.tsx                 # Main app component with routing
├── main.tsx               # Application entry point
├── pages/
│   ├── Index.tsx          # Landing page
│   ├── Login.tsx          # Login page
│   ├── Register.tsx       # Registration page
│   ├── Dashboard.tsx      # Main dashboard
│   ├── CompanyProfile.tsx # Company profile management
│   ├── OpportunitySearch.tsx  # Search opportunities
│   ├── OpportunityDetail.tsx  # Opportunity details
│   ├── ProposalList.tsx   # List of proposals
│   └── ProposalEditor.tsx # Proposal editor
├── components/
│   └── ui/                # Shadcn UI components
├── context/               # React contexts
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── types/                 # TypeScript types
```

## Key User Flows

### 1. First-Time Setup
1. Navigate to landing page
2. Click "Start Free Trial" → Register
3. Log in with credentials
4. Complete company profile with classifications and tags
5. View dashboard

### 2. Finding Opportunities
1. Navigate to Search from dashboard
2. Apply filters (auto-populated from profile)
3. Browse results sorted by relevance
4. View opportunity details
5. Save interesting opportunities

### 3. Generating a Proposal
1. Select saved opportunity from dashboard
2. View opportunity details and RFP
3. Click "Generate Proposal"
4. AI generates draft with all sections
5. Review and edit proposal sections
6. Export to Word/PDF
7. Mark opportunity as "Applied"

## Next Steps for Full Implementation

### Backend Integration
1. Set up Supabase project
2. Implement authentication flow
3. Create database schema (see PRD for complete schema)
4. Set up API endpoints
5. Integrate SAM.gov API for real opportunity data

### AI Integration
1. Set up OpenAI API integration
2. Implement proposal generation logic
3. Build winning proposal repository
4. Create prompt engineering templates
5. Add quality validation

### Additional Features
1. Email notifications
2. Calendar integration
3. Team collaboration features
4. Advanced analytics
5. Payment integration (Stripe)
6. Mobile app

## API Configuration

### SAM.gov API
- **API Key**: SAM-e71b5953-a043-4423-8792-f40c384e9493
- **Base URL**: https://api.sam.gov/opportunities/v2/
- **Documentation**: https://open.gsa.gov/api/opportunities-api/

## Pricing Strategy (Planned)

- **Starter**: $49/month - 10 proposals, basic search, email alerts
- **Professional**: $99/month - Unlimited proposals, advanced features, analytics
- **Team**: $199/month - Team collaboration, dedicated support
- **Enterprise**: Custom pricing

## Contributing

This is a private project. For questions or contributions, please contact the project owner.

## License

Proprietary - All rights reserved

## Support

For support or questions, please contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: December 28, 2024  
**Status**: MVP Complete - Ready for Backend Integration
# Achás Portfolio

A professional photography portfolio and content management system designed to showcase photography work, organize projects, and provide a platform for potential clients to make inquiries.

## Overview

Achás Portfolio is a full-stack web application built to serve as a centralized online portfolio.

The platform consists of:

- Public photography portfolio
- Photography categories
- Project galleries
- About page
- Contact and inquiry form
- Private administrator dashboard
- Photo management system
- Project management
- Featured photography management

## Portfolio Categories

The initial photography categories are:

- All
- Events
- Portraits
- Sports
- Street Photography

The category system is designed to be expandable in the future.

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | Web application framework |
| React | User interface |
| TypeScript | Programming language |
| Tailwind CSS | Styling |
| Supabase | Backend services |
| PostgreSQL | Database |
| Supabase Storage | Image storage |
| Supabase Auth | Administrator authentication |
| Vercel | Deployment |
| Git | Version control |
| GitHub | Source code repository |

## Project Structure

```text
achas-portfolio/
│
├── app/
│   ├── admin/
│   ├── about/
│   ├── contact/
│   ├── portfolio/
│   ├── projects/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
├── lib/
├── types/
├── public/
│
├── docs/
│   ├── PRD.md
│   └── ARCHITECTURE.md
│
├── README.md
└── package.json

Documentation

Detailed project documentation can be found in the docs directory.

Product Requirements Document

See:

docs/PRD.md

The PRD contains:

Product overview
Product goals
Target users
Features
Portfolio requirements
Admin requirements
MVP scope
Future features
System Architecture

See:

docs/ARCHITECTURE.md

The architecture document contains:

Technology stack
Application architecture
Project structure
Database architecture
Storage architecture
Authentication
Security
Deployment architecture
Getting Started
1. Install dependencies
npm install
2. Start the development server
npm run dev

Open:

http://localhost:3000
3. Build for production
npm run build
4. Start the production server
npm start
Environment Variables

The project uses environment variables for Supabase configuration.

Create a file named:

.env.local

Add:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

Do not commit .env.local to GitHub.

Development Workflow

The general development workflow is:

Develop
   ↓
Test Locally
   ↓
Git Add
   ↓
Git Commit
   ↓
Git Push
   ↓
GitHub
   ↓
Vercel
Current Development Status
Foundation
 Next.js project created
 TypeScript configured
 Tailwind CSS configured
 App Router configured
 GitHub repository
 Supabase project
Public Website
 Homepage
 Portfolio
 Category filtering
 Photo viewer
 Projects
 About
 Contact
Admin CMS
 Authentication
 Dashboard
 Photo upload
 Photo management
 Category management
 Project management
 Featured photography
 Inquiry management
Deployment
 Vercel deployment
 Production environment variables
 Custom domain
Project Documentation
docs/
├── PRD.md
└── ARCHITECTURE.md

These documents should be updated whenever major product or architectural decisions change.

License

This project is a personal portfolio project.

Photography and other original creative works displayed through the portfolio remain the property of their respective creator.



### One important thing


Since we're still building the project, **don't worry about making the README perfect yet**.


Think of the three files this way:


```text
README.md
    ↓
"How do I understand and run this project?"


docs/PRD.md
    ↓
"What are we building?"


docs/ARCHITECTURE.md
    ↓
"How are we building it?"
# Achás Portfolio

## System Architecture

**Version:** 1.0
**Status:** Initial Development

---

# 1. Architecture Overview

Achás Portfolio uses a modern full-stack web architecture consisting of a Next.js application, Supabase services, and Vercel deployment.

The architecture separates the public portfolio experience from the private administration system while allowing both to use the same backend services.

```text
                         INTERNET
                            │
                            ▼
                     ┌─────────────┐
                     │   Vercel    │
                     │   Hosting   │
                     └──────┬──────┘
                            │
                            ▼
                  ┌──────────────────┐
                  │     Next.js      │
                  │   Application    │
                  └────────┬─────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
       ┌──────────────┐          ┌──────────────┐
       │ Supabase Auth│          │  PostgreSQL   │
       │              │          │   Database   │
       └──────────────┘          └───────┬──────┘
                                         │
                                         ▼
                                  ┌──────────────┐
                                  │   Supabase   │
                                  │    Storage   │
                                  │    Images    │
                                  └──────────────┘
```

---

# 2. Technology Stack

| Layer              | Technology                                                  |
| ------------------ | ----------------------------------------------------------- |
| Framework          | Next.js                                                     |
| Language           | TypeScript                                                  |
| UI Styling         | Tailwind CSS                                                |
| Frontend           | React                                                       |
| Backend            | Next.js Server Components / Server Actions / Route Handlers |
| Authentication     | Supabase Auth                                               |
| Database           | Supabase PostgreSQL                                         |
| File Storage       | Supabase Storage                                            |
| Hosting            | Vercel                                                      |
| Version Control    | Git / GitHub                                                |
| Image Optimization | Next.js Image                                               |
| Database Security  | Supabase Row Level Security                                 |

---

# 3. Application Architecture

The application follows a modular architecture.

```text
Presentation Layer
        │
        ▼
Next.js Application
        │
        ├── Public Pages
        │
        ├── Admin Pages
        │
        └── Reusable Components
        │
        ▼
Application Layer
        │
        ├── Photo Services
        ├── Project Services
        ├── Category Services
        └── Inquiry Services
        │
        ▼
Data Layer
        │
        ├── Supabase PostgreSQL
        └── Supabase Storage
```

---

# 4. Project Structure

The initial project structure is:

```text
achas-portfolio/
│
├── app/
│   ├── admin/
│   │   └── page.tsx
│   │
│   ├── about/
│   │   └── page.tsx
│   │
│   ├── contact/
│   │   └── page.tsx
│   │
│   ├── portfolio/
│   │   └── page.tsx
│   │
│   ├── projects/
│   │   └── page.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── gallery/
│   ├── photos/
│   ├── projects/
│   ├── forms/
│   └── ui/
│
├── lib/
│   └── supabase/
│       ├── client.ts
│       └── server.ts
│
├── types/
│   ├── photo.ts
│   ├── project.ts
│   └── category.ts
│
├── utils/
│
├── public/
│   └── images/
│
├── docs/
│   ├── PRD.md
│   └── ARCHITECTURE.md
│
├── .env.local
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

---

# 5. Next.js Routing Architecture

Next.js App Router uses the filesystem to define application routes.

```text
app/
│
├── page.tsx
│       → /
│
├── portfolio/
│   └── page.tsx
│       → /portfolio
│
├── projects/
│   └── page.tsx
│       → /projects
│
├── about/
│   └── page.tsx
│       → /about
│
├── contact/
│   └── page.tsx
│       → /contact
│
└── admin/
    └── page.tsx
        → /admin
```

Future dynamic project pages can use:

```text
app/projects/[slug]/page.tsx
```

which creates routes such as:

```text
/projects/commencement-2026
/projects/sports-festival
/projects/street-series
```

---

# 6. Component Architecture

Reusable UI components should be stored inside the `components` directory.

### Layout Components

```text
components/layout/
├── Navbar.tsx
└── Footer.tsx
```

### Gallery Components

```text
components/gallery/
├── PhotoGrid.tsx
├── PhotoCard.tsx
└── PhotoLightbox.tsx
```

### Photo Components

```text
components/photos/
├── FeaturedPhotos.tsx
├── PhotoDetails.tsx
└── PhotoUpload.tsx
```

### Project Components

```text
components/projects/
├── ProjectCard.tsx
├── ProjectGrid.tsx
└── ProjectDetails.tsx
```

### Form Components

```text
components/forms/
└── ContactForm.tsx
```

Components should be reusable across multiple pages where possible.

---

# 7. Database Architecture

Supabase PostgreSQL will store application metadata.

The initial database consists of:

```text
categories
    │
    │ 1
    │
    │ *
photos
    │
    │ *
    │
    │ 1
projects

inquiries
```

Authentication is handled separately through Supabase Auth.

---

# 8. Database Schema

## 8.1 Categories

```text
categories
├── id
├── name
├── slug
├── description
└── created_at
```

### Purpose

Stores portfolio categories such as:

* Events
* Portraits
* Sports
* Street Photography

---

## 8.2 Photos

```text
photos
├── id
├── title
├── description
├── image_url
├── thumbnail_url
├── category_id
├── project_id
├── date_taken
├── location
├── featured
├── status
├── created_at
└── updated_at
```

### Relationships

Each photo:

* Belongs to one category.
* May optionally belong to one project.
* May be marked as featured.
* Has a publication status.

---

## 8.3 Projects

```text
projects
├── id
├── title
├── slug
├── description
├── cover_photo_id
├── date
├── location
├── published
├── created_at
└── updated_at
```

A project can contain multiple photographs.

---

## 8.4 Inquiries

```text
inquiries
├── id
├── name
├── email
├── project_type
├── message
├── status
└── created_at
```

The inquiry status may include:

```text
New
Read
Archived
```

---

# 9. Entity Relationship Diagram

```text
┌─────────────────┐
│   CATEGORIES    │
├─────────────────┤
│ id              │
│ name            │
│ slug            │
│ description     │
│ created_at      │
└────────┬────────┘
         │
         │ 1
         │
         │ *
┌────────▼────────┐
│     PHOTOS      │
├─────────────────┤
│ id              │
│ title           │
│ description     │
│ image_url       │
│ thumbnail_url   │
│ category_id     │
│ project_id      │
│ date_taken      │
│ location        │
│ featured        │
│ status          │
│ created_at      │
│ updated_at      │
└────────┬────────┘
         │
         │ *
         │
         │ 1
┌────────▼────────┐
│    PROJECTS     │
├─────────────────┤
│ id              │
│ title           │
│ slug            │
│ description     │
│ cover_photo_id  │
│ date            │
│ location        │
│ published       │
│ created_at      │
│ updated_at      │
└─────────────────┘


┌─────────────────┐
│    INQUIRIES    │
├─────────────────┤
│ id              │
│ name            │
│ email           │
│ project_type    │
│ message         │
│ status          │
│ created_at      │
└─────────────────┘
```

---

# 10. Storage Architecture

Supabase Storage will store portfolio images.

Recommended storage structure:

```text
portfolio-images/
│
├── optimized/
│
└── thumbnails/
```

Original RAW files should remain outside the web application's public storage.

The website should use optimized versions of photographs.

---

# 11. Image Upload Architecture

The photo upload workflow is:

```text
Administrator
      │
      ▼
Select Photo(s)
      │
      ▼
Next.js Admin Interface
      │
      ▼
File Validation
      │
      ├── File Type
      ├── File Size
      └── Image Dimensions
      │
      ▼
Supabase Storage
      │
      ▼
Image URL Generated
      │
      ▼
PostgreSQL Photo Record
      │
      ▼
Draft
      │
      ▼
Administrator Publishes
      │
      ▼
Public Portfolio
```

---

# 12. Public Data Flow

When a visitor opens the portfolio:

```text
Visitor
   │
   ▼
Next.js
   │
   ▼
Supabase PostgreSQL
   │
   ▼
Retrieve Published Photos
   │
   ▼
Retrieve Image URLs
   │
   ▼
Supabase Storage
   │
   ▼
Optimized Images
   │
   ▼
Next.js Gallery
   │
   ▼
Visitor
```

Only published content should be displayed publicly.

---

# 13. Admin Data Flow

The administrator's workflow:

```text
Administrator
      │
      ▼
Supabase Authentication
      │
      ▼
Authenticated Session
      │
      ▼
Admin Dashboard
      │
      ▼
Photo Management
      │
      ├── Create
      ├── Read
      ├── Update
      └── Delete
      │
      ▼
Supabase
      │
      ├── PostgreSQL
      └── Storage
```

---

# 14. Authentication Architecture

Supabase Auth will manage administrator authentication.

```text
Administrator
      │
      ▼
Admin Login
      │
      ▼
Supabase Auth
      │
      ▼
Authenticated Session
      │
      ▼
Admin Route
      │
      ▼
Admin Dashboard
```

Public portfolio pages do not require authentication.

---

# 15. Authorization and Security

Supabase Row Level Security (RLS) should be used to protect database operations.

### Public Users

Public users should only be able to access published portfolio content.

### Administrator

Authenticated administrators can:

* Create photos
* Update photos
* Delete photos
* Create projects
* Update projects
* Manage categories
* View inquiries

Administrative permissions must be enforced at the backend/database level rather than relying only on frontend route protection.

---

# 16. Environment Variables

Sensitive and environment-specific configuration should be stored in `.env.local`.

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Environment files containing secrets must not be committed to GitHub.

---

# 17. Supabase Client Architecture

The application should have separate Supabase clients for browser and server environments.

```text
lib/
└── supabase/
    ├── client.ts
    └── server.ts
```

### client.ts

Used for browser-side operations.

### server.ts

Used for server-side operations and authenticated requests.

This separation helps maintain proper authentication and server/client boundaries in Next.js.

---

# 18. Deployment Architecture

The production architecture will use Vercel for application hosting.

```text
Developer
    │
    ▼
Git
    │
    ▼
GitHub
    │
    ▼
Vercel
    │
    ▼
Next.js Application
    │
    ├──────────────┐
    ▼              ▼
Supabase       Supabase
Database       Storage/Auth
```

A future custom domain can point to the Vercel deployment.

---

# 19. Development Workflow

The recommended development workflow is:

```text
Create Feature
      ↓
Develop Locally
      ↓
npm run dev
      ↓
Test
      ↓
Git Add
      ↓
Git Commit
      ↓
Git Push
      ↓
GitHub
      ↓
Vercel Deployment
```

---

# 20. Development Phases

## Phase 1 — Foundation

* Next.js setup
* TypeScript
* Tailwind CSS
* Git
* GitHub
* Project structure

## Phase 2 — Public Portfolio

* Navigation
* Homepage
* Portfolio
* Gallery
* Category filtering
* Projects
* About
* Contact

## Phase 3 — Backend

* Supabase project
* Database schema
* Storage
* Supabase clients
* Environment configuration

## Phase 4 — Admin CMS

* Authentication
* Dashboard
* Photo management
* Upload
* Categories
* Projects
* Featured photographs
* Publish/unpublish

## Phase 5 — Optimization

* Image optimization
* SEO
* Accessibility
* Responsive design
* Performance
* Security testing

## Phase 6 — Deployment

* GitHub integration
* Vercel deployment
* Environment variables
* Production testing
* Custom domain

---

# 21. Future Architecture Expansion

The architecture should allow future features without requiring a complete rewrite.

Potential future modules include:

```text
Client Galleries
      │
      ├── Private Gallery
      ├── Password Protection
      ├── Favorites
      └── Downloads

Booking
      │
      ├── Services
      ├── Availability
      └── Requests

Client Management
      │
      ├── Accounts
      ├── Projects
      └── Deliverables
```

These features should only be introduced after the MVP is stable.

---

# 22. Architecture Principles

The project should follow these principles:

### Modularity

Features should be separated into reusable components and services.

### Scalability

The database and application structure should support additional photographs, projects, and categories.

### Security

Authentication and authorization should be enforced at the backend and database levels.

### Performance

Images should be optimized and loaded efficiently.

### Maintainability

Code should use TypeScript, reusable components, clear naming conventions, and modular files.

### Simplicity

The MVP should avoid unnecessary complexity and only implement features required by the current product requirements.

---

# 23. Final System Architecture

```text
                         ┌───────────────────┐
                         │      VISITOR      │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │    NEXT.JS APP    │
                         │                   │
                         │ Home              │
                         │ Portfolio         │
                         │ Projects          │
                         │ About             │
                         │ Contact           │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │     SUPABASE      │
                         │                   │
             ┌───────────┼───────────┬───────┘
             │           │           │
             ▼           ▼           ▼
       ┌──────────┐ ┌──────────┐ ┌──────────┐
       │PostgreSQL│ │ Storage  │ │   Auth   │
       │          │ │          │ │          │
       │ Photos   │ │ Images   │ │ Admin    │
       │ Projects │ │ Thumbs   │ │ Login    │
       │ Categories│ │          │ │          │
       │ Inquiries│ │          │ │          │
       └──────────┘ └──────────┘ └────┬─────┘
                                      │
                                      ▼
                              ┌───────────────┐
                              │     ADMIN     │
                              │   DASHBOARD   │
                              │               │
                              │ Photos        │
                              │ Projects      │
                              │ Categories    │
                              │ Featured Work │
                              │ Inquiries     │
                              └───────────────┘
```

The system is deployed through:

```text
GitHub → Vercel → Next.js
                    │
                    └── Supabase
                        ├── PostgreSQL
                        ├── Storage
                        └── Authentication
```

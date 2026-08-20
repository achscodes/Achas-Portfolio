# Achás Portfolio

## Product Requirements Document (PRD)

**Version:** 1.0
**Status:** Initial Development
**Project Type:** Personal Photography Portfolio and Content Management System

---

## 1. Product Overview

### 1.1 Product Name

**Achás Portfolio**

### 1.2 Product Description

Achás Portfolio is a professional, responsive web-based photography portfolio designed to showcase photography work, organize photographs into categories and projects, and provide potential clients with an accessible way to view the photographer's work and submit inquiries.

The system will include a public-facing portfolio website and a private administration dashboard. The public website will focus on visual presentation, while the administration dashboard will allow the photographer to manage photographs, projects, categories, featured work, and inquiries without directly modifying the application's source code.

### 1.3 Product Purpose

The primary purpose of the system is to establish a professional online presence where photography work can be presented in an organized, visually appealing, and easily maintainable platform.

The system should allow the portfolio to grow over time as new photographs, projects, and categories are added.

---

# 2. Product Goals

## 2.1 Primary Goals

1. Provide a professional online photography portfolio.
2. Showcase selected photography work through a visually focused interface.
3. Organize photographs into categories and projects.
4. Allow photographs to be uploaded and managed through an administration dashboard.
5. Allow the photographer to feature selected photographs on the homepage.
6. Provide potential clients with an easy way to contact the photographer.
7. Ensure the website works properly on desktop, tablet, and mobile devices.
8. Provide a scalable architecture that can support future features.

## 2.2 Secondary Goals

1. Improve portfolio discoverability through search engine optimization.
2. Optimize photography images for fast web delivery.
3. Maintain a centralized digital portfolio archive.
4. Provide a foundation for future private client galleries.
5. Maintain a clean and professional user experience.

---

# 3. Target Users

## 3.1 Photographer / Administrator

The photographer is the primary administrator of the system.

The administrator should be able to:

* Log in securely.
* Upload photographs.
* Upload multiple photographs.
* Edit photograph information.
* Delete photographs.
* Categorize photographs.
* Assign photographs to projects.
* Create and manage projects.
* Mark photographs as featured.
* Publish and unpublish photographs.
* Manage portfolio categories.
* View submitted inquiries.

## 3.2 Portfolio Visitor

A portfolio visitor may be a potential client, organization, employer, collaborator, or general visitor.

Visitors should be able to:

* View the homepage.
* Browse photographs.
* Filter photographs by category.
* View individual photographs.
* Browse photography projects.
* Read information about the photographer.
* Submit a contact inquiry.

---

# 4. Portfolio Categories

The initial portfolio categories are:

* All
* Events
* Portraits
* Sports
* Street Photography

The category system should be database-driven so additional categories can be added in the future without modifying the application's source code.

### Category Definitions

**All**
Displays all published photographs.

**Events**
Photographs taken during events, celebrations, graduations, organizational activities, and similar occasions.

**Portraits**
Individual, group, creative, and environmental portraits.

**Sports**
Sports events, competitions, athletes, action photography, and related activities.

**Street Photography**
Candid moments, everyday life, people, architecture, environments, and urban scenes.

---

# 5. Public Website

## 5.1 Home Page

The homepage should serve as the main introduction to the photographer and the portfolio.

### Required Sections

* Navigation
* Hero section
* Featured photography
* Selected projects
* About preview
* Contact call-to-action
* Footer

### Hero Section

The hero section should contain:

* Photographer's name
* Short professional tagline
* Featured photograph
* Portfolio call-to-action
* Contact call-to-action

Example positioning:

> Photographer & Visual Storyteller

The website should not be restricted to a specific professional identity or photography specialization.

---

# 6. Portfolio Page

The Portfolio page is the primary gallery of the website.

### Required Features

* Responsive photography grid
* Masonry or visually balanced gallery layout
* Category filtering
* Photo lightbox
* Photo details
* Lazy loading
* Responsive images

### Category Navigation

```text
All | Events | Portraits | Sports | Street Photography
```

Only published photographs should appear in the public portfolio.

---

# 7. Photo Details

Each photograph should contain metadata.

## Required Fields

* Title
* Image
* Category
* Publication status

## Optional Fields

* Description
* Date taken
* Location
* Project
* Featured status

### Example

```text
Title:
Graduation Day

Category:
Events

Project:
Commencement 2026

Date Taken:
August 2026

Location:
Dasmariñas, Cavite

Description:
Selected photographs from the 2026 commencement exercises.
```

---

# 8. Projects

Projects allow related photographs to be grouped together.

### Example Projects

* Commencement 2026
* Sports Festival
* Portrait Collection
* Street Series

Each project should contain:

* Project title
* Project slug
* Description
* Cover photograph
* Date
* Location
* Related photographs
* Publication status

### Project Page

A project page should display:

1. Project title
2. Project description
3. Project metadata
4. Project cover photograph
5. Related photographs

---

# 9. About Page

The About page introduces the photographer.

### Content

* Profile photograph
* Short biography
* Photography interests
* Experience
* Skills
* Optional equipment information
* Social media links

The page should maintain a general photography-focused identity.

---

# 10. Contact Page

The Contact page allows visitors and potential clients to submit inquiries.

## Contact Form Fields

* Name
* Email
* Project Type
* Message

### Project Types

* Event
* Portrait
* Sports
* Street / Creative
* Other

### Requirements

The system should:

* Validate required fields.
* Validate email format.
* Display a success message after submission.
* Display an error message if submission fails.
* Store submitted inquiries securely.

---

# 11. Administration Dashboard

The administration dashboard is a private section of the application.

### Dashboard Structure

```text
Admin Dashboard
│
├── Overview
├── Photos
├── Projects
├── Categories
├── Featured Work
├── Inquiries
└── Settings
```

The dashboard should only be accessible to authenticated administrators.

---

# 12. Photo Management

The administrator should be able to:

* Upload photographs.
* Upload multiple photographs.
* View all uploaded photographs.
* Search and filter photographs.
* Edit photograph information.
* Change photograph categories.
* Assign photographs to projects.
* Mark photographs as featured.
* Publish photographs.
* Unpublish photographs.
* Archive photographs.
* Delete photographs.

---

# 13. Photo Status

Photographs should have a publication status.

### Draft

The photograph has been uploaded but is not visible to the public.

### Published

The photograph is visible on the public portfolio.

### Archived

The photograph is retained in the system but removed from the active public portfolio.

---

# 14. Bulk Photo Upload

The system should support uploading multiple photographs simultaneously.

### Example Workflow

```text
Select Multiple Photos
        ↓
Validate Files
        ↓
Upload Images
        ↓
Add Metadata
        ↓
Create Database Records
        ↓
Draft
        ↓
Publish
```

The system should validate:

* File type
* File size
* Image dimensions

---

# 15. Image Management

Public portfolio images should be optimized for web delivery.

### Recommended Workflow

```text
Original Photograph
        ↓
Edit / Export
        ↓
Upload
        ↓
Optimization
        ↓
Web Image
        ↓
Thumbnail
        ↓
Public Portfolio
```

Original RAW files should not be publicly accessible through the website.

The portfolio should use optimized versions of photographs.

---

# 16. Featured Photography

The administrator should be able to mark photographs as featured.

Featured photographs should automatically appear in the homepage's Featured Work section.

Example:

```text
Photo A → Featured
Photo B → Not Featured
Photo C → Featured
```

The homepage should automatically display Photo A and Photo C.

---

# 17. Authentication

The administration dashboard must require authentication.

### Public Users

Public users do not need an account to browse the portfolio.

### Administrator

The administrator must authenticate before accessing:

* Admin Dashboard
* Photo Management
* Project Management
* Category Management
* Inquiry Management
* Settings

---

# 18. Search and Filtering

## MVP

The initial version should support category filtering.

```text
All
Events
Portraits
Sports
Street Photography
```

## Future

Future versions may support:

* Search by title
* Search by location
* Search by project
* Date filtering
* Tags

---

# 19. Non-Functional Requirements

## 19.1 Performance

The system should:

* Optimize images.
* Lazy-load gallery images.
* Use responsive image sizes.
* Minimize unnecessary network requests.
* Use caching where appropriate.
* Maintain reasonable page loading performance.

## 19.2 Responsiveness

The website should support:

* Desktop
* Laptop
* Tablet
* Mobile

## 19.3 Security

The system should:

* Protect administrative routes.
* Require authentication for administrative operations.
* Validate uploaded files.
* Restrict allowed file types.
* Restrict upload sizes.
* Protect database operations with Row Level Security.
* Prevent unauthorized modifications.

## 19.4 Accessibility

The system should:

* Provide alternative text for images.
* Use semantic HTML.
* Provide keyboard-accessible navigation.
* Maintain sufficient color contrast.
* Provide accessible form labels and messages.

## 19.5 Maintainability

The application should use:

* Reusable components.
* TypeScript types.
* Modular application logic.
* Environment variables for sensitive configuration.
* Clear project documentation.

---

# 20. MVP Scope

The Minimum Viable Product should contain:

## Public Website

* [ ] Home
* [ ] Portfolio
* [ ] Category filtering
* [ ] Photo viewer
* [ ] Projects
* [ ] About
* [ ] Contact
* [ ] Responsive design

## Admin

* [ ] Admin authentication
* [ ] Dashboard
* [ ] Photo upload
* [ ] Multiple photo upload
* [ ] Photo editing
* [ ] Photo deletion
* [ ] Categories
* [ ] Projects
* [ ] Featured photographs
* [ ] Publish / unpublish
* [ ] Inquiry management

---

# 21. Future Features

The following features are outside the initial MVP.

## Phase 2

* Private client galleries
* Password-protected galleries
* Client favorites
* Photo downloads
* Tags
* Advanced search
* EXIF metadata

## Phase 3

* Client accounts
* Client photo selection
* Download permissions
* High-resolution downloads
* Digital proofing
* Booking system
* Photography packages
* Online payments

---

# 22. Success Criteria

The MVP will be considered successful when:

1. Visitors can browse the photography portfolio.
2. Visitors can filter photographs by category.
3. Visitors can view individual photographs.
4. Visitors can browse projects.
5. Visitors can submit inquiries.
6. The administrator can securely log in.
7. The administrator can upload photographs.
8. The administrator can organize photographs.
9. The administrator can publish and unpublish photographs.
10. Featured photographs can be managed without changing source code.
11. The website is responsive.
12. The website can be deployed to production.

---

# 23. Development Priorities

Development should follow this order:

```text
1. Project Foundation
        ↓
2. Public Portfolio UI
        ↓
3. Database Setup
        ↓
4. Supabase Integration
        ↓
5. Admin Authentication
        ↓
6. Photo Management
        ↓
7. Project Management
        ↓
8. Contact / Inquiries
        ↓
9. Optimization
        ↓
10. Deployment
```

---

# 24. Out of Scope for MVP

The following will not be included in the first release:

* Online payments
* Client accounts
* Booking management
* Private galleries
* Digital proofing
* E-commerce
* Photography package management
* Automatic RAW file management
* Complex analytics

These features may be considered for future versions.

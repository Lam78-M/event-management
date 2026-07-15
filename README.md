# 🎪 EventSphere - Ultimate Event Booking & Management Platform

**EventSphere** is a fully responsive, production-ready, Full-Stack Event Booking and Management application built with **Next.js 14/15, TypeScript, and MongoDB**. The platform offers seamless experience for three distinct roles: **Users** (who book and download tickets), **Organizers** (who launch and manage events), and **Admins** (who oversee users and platform activities).

✨ **Live Demo:** [Deploy Link Here]  
📂 **GitHub Repository:** [GitHub Repo Link Here]

---

## 🚀 Key Features

### 👤 Role-Based Portals & Dashboards
* **User Dashboard:** * Browse and book upcoming events.
    * View booked events in a clean, personalized layout.
    * **Download PDF Tickets** for booked events.
    * Cancel/Delete existing bookings.
* **Organizer Dashboard:**
    * Launch/Create new events with interactive forms.
    * Edit existing event details (title, description, price, location, date, banner image).
    * Cancel/Delete created events.
* **Admin Dashboard:**
    * Comprehensive overview of the platform (using analytical charts).
    * View all registered users and organizer information.
    * Manage user base (Ability to delete users/organizers).
    * Track all active bookings across the system.

### 🛡️ Authentication & Authorization
* Powered by **Better Auth** with MongoDB adapter.
* Secured **Role-Based Access Control (RBAC)** ensuring users, organizers, and admins only access their respective dashboards.
* **Google Social Login** integration.
* Credentials login with auto-fill **Demo Credentials** for easy evaluation.

### 🎨 Visuals & UI/UX
* **Aesthetics:** Modern UI using **Tailwind CSS**, **Lucide UI**, and **Gravity UI**.
* **Animations:** Ultra-smooth transitions and micro-interactions powered by **Framer Motion** and **Animate.css**.
* **Data Visualization:** Sleek charts powered by **Recharts/Chart.js** in dashboards.
* **UX Features:** Shimmer Skeleton loaders, dynamic search, multi-field filtering (category, price, date), sorting, and pagination.

---

## 🛠️ Tech Stack & NPM Packages

| Layer | Technology / Package |
| :--- | :--- |
| **Frontend Framework** | Next.js (App Router), React.js |
| **Language** | TypeScript (Mandatory Type Safety) |
| **Styling & Animations** | Tailwind CSS, Framer Motion, Animate.css |
| **UI Components** | Lucide React, Gravity UI |
| **Authentication** | Better Auth, `@better-auth/mongodb-adapter` |
| **Database** | MongoDB (via Native MongoClient / Mongoose) |
| **Data Visualization** | Recharts / Chart.js |
| **Utility Packages** | Axios / TanStack Query, PDF Generation library (e.g., `jspdf` or `react-pdf`) |

---

## 🗺️ Website Structure & Page Map

### 🌐 Public Pages
* ` / ` (Home Page) - Includes Sticky Navbar, Hero Section (with slides/CTA), and **7+ descriptive sections** (Features, Categories, Highlights, Stats, Testimonials, FAQ, Newsletter).
* `/explore` - Event Listing Page with real-time Search, Multi-field Filtering (Price, Date, Location), Sorting, and Pagination (Grid of 4 cards per row with Skeletons).
* `/events/[id]` - Event Details Page showing images, specifications, description, and "Book Now" CTA.
* `/about` - Platform vision, team, and journey.
* `/contact` - Working contact form.
* `/blog` - Event management tips and community updates.
* `/login` & `/register` - Beautifully designed auth pages with Demo Login support.

### 🔒 Protected Pages & Dashboards
* `/dashboard/user` - Manage bookings, download tickets, cancel bookings.
* `/dashboard/organizer` - Create Event (`/items/add`), Manage/Edit/Delete Events (`/items/manage`).
* `/dashboard/admin` - Visual statistics of the system, manage users & organizers list.

---

## 🎨 Global UI & Design Rules Applied
* **Color Palette:** Standardized 3-primary color scheme + clean dark/light neutral tones.
* **Consistency:** Exact same border-radius, spacing, and card layouts across all grids.
* **Real Data:** 100% production-ready real-world copy. **No Lorem Ipsum** used.
* **Responsiveness:** Fluid grid and flex layouts optimized from 320px mobile view to 4K ultra-wide screens.

---

## ⚙️ Installation & Setup

Follow these steps to run **EventSphere** locally:

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/eventsphere.git](https://github.com/your-username/eventsphere.git)
cd eventsphere
# 💍 WedPlan — Full Stack Wedding Planning Platform

A modern, full-stack wedding planning and event management platform designed to seamlessly connect customers with wedding service vendors. Customers can explore services, filter by category/location, and book vendors, while vendors can manage their services, track bookings, and upgrade to a premium subscription via Stripe.

---

## 🚀 Live Demo & Repositories

- **Live Website:** [Visit WedPlan Live](https://wedding-plan.vercel.app)
- **Client Repository:** [GitHub - Client Repo](https://github.com/eng-sohid/Wedding-Plan)
- **Server Repository:** [GitHub - Server Repo](https://github.com/eng-sohid/Wedding-Plan-Backend)

---

## ✨ Key Features

### 👤 Customer Features

- **Browse & Search:** Explore approved wedding services with real-time search, category filtering, and location-based filters.
- **Service Details:** View comprehensive information, pricing, locations, and multiple images.
- **Booking Management:** Submit booking requests, track booking statuses (Pending, Accepted, Rejected, Cancelled), and cancel pending bookings.
- **Secure Authentication:** Seamless sign-in and sign-up using Better Auth (Email/Password & Google OAuth).

### 🛠️ Vendor Features

- **Service Management:** Add, update, delete, and manage wedding services with image hosting via ImgBB.
- **Booking Dashboard:** Review customer booking requests and accept/reject them in real-time.
- **Subscription Plans:** Free plan (up to 3 active services) and Premium plan (unlimited services) integrated with **Stripe Checkout & Webhooks**.
- **Vendor Statistics:** Track total services, active listings, and booking analytics.

### 🛡️ Admin Features

- **User Management:** View all registered users, search by name/email, filter by role, and block/unblock users.
- **Service Moderation:** Review pending services submitted by vendors and approve or reject them.
- **Transaction Monitoring:** Monitor platform subscription payments and revenue transactions securely.

---

## 🛠️ Technology Stack

### **Frontend**

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, ShadCN UI
- **Animations:** Framer Motion / Motion
- **State & Auth:** Better Auth Client

### **Backend & Database**

- **Server:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** Better Auth (JWT-based secure sessions)
- **Payment Gateway:** Stripe Checkout & Webhooks
- **Image Hosting:** ImgBB API

---

## 📂 Project Architecture

```text
WedPlan/
│
├── client/                  # Next.js Frontend Application
│   ├── src/app/             # App Router pages (Public, Customer, Vendor, Admin)
│   ├── src/components/      # Reusable UI & Layout components
│   └── public/              # Static assets
│
└── server/                  # Express.js Backend Application
    ├── src/models/          # Mongoose Schemas (Users, Services, Bookings, Transactions)
    ├── src/routes/          # API Endpoints
    ├── src/middlewares/     # Auth & Role Verification Middlewares
    └── server.js            # Entry point
```

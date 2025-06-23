# Kasper Adaptation Project

This is a modern full-stack web application built using [Next.js](https://nextjs.org), bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). The goal of this project is to migrate and re-architect an enterprise .NET-based solution into a full-stack JavaScript ecosystem using **Next.js (React)** for the frontend and **Strapi (Headless CMS)** for the backend.

---

## 🚀 Project Overview

The **Kasper Adaptation Project** is designed to manage and administer transport routes, users, tickets, and other logistics operations through a centralized, responsive, and scalable web application.

This migration aims to:

- Modernize the development stack
- Improve frontend flexibility using React components
- Leverage Strapi for easy content and user management
- Demonstrate how enterprise-grade applications can be developed using JavaScript/TypeScript-based tools

---

## 🛠 Tech Stack

### 🔹 Frontend

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS** – Utility-first styling
- **TypeScript** – Static typing
- **Axios** – HTTP client for API requests
- **Context API** – For client-side state management (Auth)

### 🔹 Backend

- **Strapi v4** – Open-source headless CMS
- **JWT Authentication** – Token-based auth
- **REST API** – Used to fetch and manage resources

### 🔹 Dev Tools

- **ESLint & Prettier** – Code linting and formatting
- **Vercel** – Deployment and hosting
- **.env.local** – Environment-specific configuration

---

## 🧱 Project Architecture

The project follows a **modular and maintainable structure**:

## 🧱 Project Structure

````text
/src
├── /app         → App router entry points & routes
├── /components  → Reusable UI components (e.g., Navbar, LoginForm, Table)
├── /context     → React Context for global state (e.g., AuthContext)
├── /lib         → Axios instance & API helpers
├── /utils       → Utility functions (e.g., tokenUtils, userUtils)
├── /styles      → Global styles (Tailwind & custom CSS)
├── /pages       → (If used) Legacy routing fallback
└── /public      → Static assets


- **Authentication** is managed using JWT tokens stored in localStorage.
- **API Communication** is centralized via a custom Axios instance that attaches the token to every request.
- **State Management** is done using Context API and custom hooks.
- **Dynamic and Static Rendering** is handled using `getServerSideProps` and `getStaticProps` respectively.

---

## 🧪 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/kasper-adaptation-project.git
cd kasper-adaptation-project

````

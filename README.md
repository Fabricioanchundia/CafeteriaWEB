
# ☕ Café Urban Roast – Web Platform (Portfolio)

**Café Urban Roast** is a modern web platform for a coffee shop, developed with **Next.js + TypeScript**, focused on **real user experience**, **scalable architecture**, and a **commercial-grade product experience**.

The application simulates a real purchasing flow, from menu browsing to checkout, using modern frontend best practices and an architecture prepared for a **microservices-based backend**.

## 🚀 Main Features

### ✔️ Realistic User Experience

The application offers:

* Smooth navigation by categories
* Clean and modern interface
* **Mobile-first** design
* Order confirmation animations

Designed as a **real commercial product**, not as an academic demo.

---

### ✔️ Order Management

* Persistent global cart
* Order status updates
* Clear and extensible checkout flow
* Ready for Stripe integration

---

### ✔️ Authentication and Roles

* Role-based authentication:

  * **Admin**
  * **Customer**
* Structure prepared for JWT authentication and backend access control

---

## 🖼️ System Screenshots

### 🔐 Login

![Login](./background-login-urbanroast.png)

![Login Form](https://github.com/Fabricioanchundia/CafeteriaWEB/blob/main/Captura%20de%20pantalla%202025-12-26%20224131.png)

---

### ☕ Home – Admin Panel

![Home Admin](https://github.com/Fabricioanchundia/CafeteriaWEB/blob/main/Captura%20de%20pantalla%202025-12-26%20224221.png)

---

### ☕ Home – Main Menu (Customer)

![Menú Cliente](https://github.com/Fabricioanchundia/CafeteriaWEB/blob/main/Captura%20de%20pantalla%202025-12-26%20224235.png)

---

### 🛒 Product Catalog and Checkout

![Checkout](https://github.com/Fabricioanchundia/CafeteriaWEB/blob/main/Captura%20de%20pantalla%202025-12-26%20224247.png)

---

## 🧱 Technology Stack

### 🎨 Frontend

* Next.js 14 (App Router)
* TypeScript
* Tailwind CSS
* Zustand (global state)
* Component-based architecture

### 🛠️ Backend (microservices – in progress)

* NestJS
* PostgreSQL
* API Gateway
* WebSockets (order status)
* Independent services

---

## 🧩 System Architecture

The system is designed under a **microservices architecture**, with a clear separation of responsibilities and a fully decoupled frontend.

```text
CAFETERIAWEB/
│
├── cafeteriaweb-frontend/
│   ├── app/            # App Router
│   ├── components/     # UI Components
│   ├── stores/         # Zustand (cart, user, orders)
│   ├── styles/         # Global styles
│   └── public/         # Images
│
├── api-gateway/        # Single entry point
├── auth-service/       # Authentication and roles
├── customer-service   # Customer management
├── menu-service       # Menu and products
├── order-service      # Orders
├── web-socket         # Real-time communication
├── analytics-service  # Metrics and reports
├── domain              # Shared DTOs and models
└── config / env        # Configuration
```

---

## 🧠 Why Is This Architecture Correct?

* ✔ **Decoupled frontend** (can scale or change frameworks)
* ✔ **Independent microservices** (separate deployments)
* ✔ **API Gateway** as a professional pattern
* ✔ **WebSocket** for real-time state updates
* ✔ **Shared domain layer** (senior-level best practice)
* ✔ **Separate analytics service** (business insight)

> This is **NOT a school CRUD**, it is a **startup / SaaS-style architecture**.

---

## 🔄 Real System Flow

```text
Client (Frontend)
        ↓
     API Gateway
        ↓
┌────────────────────────┐
│ auth-service           │
│ menu-service           │
│ order-service          │
│ customer-service       │
└────────────────────────┘
        ↓
 web-socket → real-time state
        ↓
 analytics-service
```

---

## 🚀 How to Run the Project

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run in development mode

```bash
npm run dev
```

📍 **Application available at:**
[http://localhost:3007](http://localhost:3007/dashboard/customers)

---

## 🎯 Project Goal

This project was developed as a **professional portfolio piece**, demonstrating:

* Product-oriented thinking
* Realistic user experience
* Scalable architecture
* Clean and maintainable code
* Readiness for real payment and backend environments

---

## 👨‍💻 Author

**Alex Fabricio Anchundia Mero**
Software Engineering – Ecuador 🇪🇨
💼 Backend / Full Stack Developer

🔗 LinkedIn:
[https://www.linkedin.com/in/fabricio-anchundia-978466308/](https://www.linkedin.com/in/fabricio-anchundia-978466308/)

---

⭐ If you find this project interesting, don’t forget to give it a star on GitHub.
---

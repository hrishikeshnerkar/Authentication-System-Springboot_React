# 📘 AuthNest — Full-Stack Authentication System

**AuthNest** is a secure, scalable authentication platform built with **Spring Boot (Java)** on the backend and **React.js** on the frontend. It supports JWT-based login, email verification, password reset, session handling, and responsive UI components — designed for modern web applications.

---

## 🚀 Features

- 🔐 **JWT Authentication** — Stateless login with secure token handling
- 📧 **Email Verification** — OTP-based email verification flow
- 🔁 **Password Reset** — Secure OTP + new password workflow
- 🧠 **Session Persistence** — Automatic login restoration via token
- 📦 **React + Axios Frontend** — Responsive UI with clean UX
- 🛡️ **Spring Security Backend** — Custom filters, entry points, and token validation
- 📨 **Toast Notifications** — Real-time feedback for all user actions

---

## 🧱 Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Frontend     | React, Axios, React Router, Toastify |
| Backend      | Spring Boot, Spring Security, JWT   |
| Database     | MySQL / PostgreSQL (configurable)   |
| Email Service| JavaMailSender / SMTP               |


---

## 🧑‍💻 Setup Instructions

### 🔧 Backend (Spring Boot)

1. Clone the repo and navigate to `/backend`
2. Configure your DB and email credentials in `application.properties`
3. Run the app:
   ```bash
   mvn spring-boot:run

🌐 Frontend (React)
- Navigate to /frontend
- Install dependencies:
npm install
- Start the dev server:
npm run dev





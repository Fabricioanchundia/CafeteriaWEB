# ☕ Café Urban Roast – Plataforma Web (Portafolio)

Plataforma web moderna para una cafetería, desarrollada con **Next.js + TypeScript**, enfocada en **UX real**, **arquitectura escalable** y **experiencia tipo producto comercial**.

Incluye navegación de menú, carrito en tiempo real, checkout, animaciones de confirmación y un **video demo cinematográfico**.

---

## 🎥 Video Demo (Experiencia completa)

> 🎬 Video generado con IA (Sora-style) mostrando la experiencia del cliente:
> entrar al café, navegar el menú y ordenar.

📁 **Archivo:** `urban-roast-demo - copia.mp4`

```md
[▶ Ver video demo](./urban-roast-demo%20-%20copia.mp4)
```

---

## 🖼️ Capturas del sistema

### 🔐 Login

📁 `background-login-urbanroast.png`
📁 `Captura de pantalla 2025-12-26 224131.png`

![Login](./background-login-urbanroast.png)
![Login Form](./Captura%20de%20pantalla%202025-12-26%20224131.png)

---

### ☕ Home – Menú principal

📁 `Captura de pantalla 2025-12-26 224221.png`

![Home](./Captura%20de%20pantalla%202025-12-26%20224221.png)

---

### 🧾 Catálogo de productos

📁 `Captura de pantalla 2025-12-26 224235.png`

![Productos](./Captura%20de%20pantalla%202025-12-26%20224235.png)

---

### 🛒 Carrito y Checkout

📁 `Captura de pantalla 2025-12-26 224247.png`

![Checkout](./Captura%20de%20pantalla%202025-12-26%20224247.png)

---

## ✨ Funcionalidades clave

* ✅ Autenticación por roles (customer / admin)
* ✅ Menú dinámico por categorías
* ✅ Carrito global con Zustand
* ✅ Checkout con:

  * Pago en efectivo
  * Flujo preparado para Stripe
* ✅ Animación PRO de confirmación de pedido
* ✅ Arquitectura preparada para backend real
* ✅ UX moderna (mobile-first)

---

## 🧱 Stack tecnológico

**Frontend**

* Next.js 14 (App Router)
* TypeScript
* Tailwind CSS
* Zustand (state global)
* Stripe (estructura lista)

**Backend (microservicios – en progreso)**

* NestJS
* PostgreSQL
* WebSockets (estado del pedido)
* API Gateway

---

## 🧠 Arquitectura (resumen)

```txt
Frontend (Next.js)
 ├── Auth
 ├── Menu
 ├── Cart (Zustand)
 ├── Checkout
 └── Video Demo

Backend (Microservices)
 ├── auth-service
 ├── menu-service
 ├── order-service
 └── web-socket
```

---

## 🚀 Cómo ejecutar el proyecto

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

📍 App disponible en:
`http://localhost:3007`

---

## 🎯 Objetivo del proyecto

Este proyecto fue desarrollado como **pieza de portafolio profesional**, demostrando:

* Pensamiento de producto
* UX realista
* Código limpio y escalable
* Integración de IA (video demo)
* Preparación para entornos reales de pago y backend

---

## 👨‍💻 Autor

**Alex Fabricio Anchundia Mero**
Ingeniería de Software – Ecuador 🇪🇨
💼 Backend / Full Stack Developer
📫 Contacto vía GitHub / LinkedIn : https://www.linkedin.com/in/fabricio-anchundia-978466308/



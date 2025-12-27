# ☕ Café Urban Roast – Plataforma Web (Portafolio)

Plataforma web moderna para una cafetería, desarrollada con **Next.js + TypeScript**, enfocada en **UX real**, **arquitectura escalable** y **experiencia tipo producto comercial**.

Incluye navegación de menú, carrito en tiempo real, checkout, animaciones de confirmación y un **video demo cinematográfico**.


---

## 🖼️ Capturas del sistema

### 🔐 Login

📁 `background-login-urbanroast.png`
📁 `Captura de pantalla 2025-12-26 224131.png`

![Login](./background-login-urbanroast.png)
![Login Form](./Captura%20de%20pantalla%202025-12-26%20224131.png)

---

### ☕ HOME-ADMIN

📁 `Captura de pantalla 2025-12-26 224221.png`

![Home](./Captura%20de%20pantalla%202025-12-26%20224221.png)

---

### ☕ Home – Menú principal

📁 `Captura de pantalla 2025-12-26 224235.png`

![Productos](./Captura%20de%20pantalla%202025-12-26%20224235.png)

---

### 🛒 CATALOGO DE PRODUCTOS

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

🧱 Arquitectura real del proyecto – Café Urban Roast

El sistema está construido bajo una arquitectura de microservicios, con separación clara de responsabilidades y un frontend desacoplado.

CAFETERIAWEB/
│
├── cafeteriaweb-frontend/        # Frontend (Next.js)
│   ├── app/                      # App Router
│   ├── components/               # UI Components
│   ├── stores/                   # Zustand (cart, user, orders)
│   ├── styles/                   # Estilos globales
│   └── public/                   # Imágenes y video demo
│
├── api-gateway/                  # Punto de entrada único
│   ├── Express / Nest Gateway
│   └── Redirección a microservicios
│
├── auth-service/                 # Autenticación y roles
│   ├── Login / Register
│   ├── JWT
│   └── Roles (admin / customer)
│
├── customer-service/             # Gestión de clientes
│   ├── Perfil
│   └── Datos del cliente
│
├── menu-service/                 # Menú y productos
│   ├── Categorías
│   ├── Productos
│   └── Precios
│
├── order-service/                # Pedidos
│   ├── Orders
│   ├── OrderItems
│   └── Estados (pendiente, preparando, listo)
│
├── web-socket/                   # Comunicación en tiempo real
│   ├── Estado del pedido
│   └── Notificaciones live
│
├── analytics-service/            # Métricas y reportes
│   ├── Ventas
│   ├── Ingresos
│   └── Productos más vendidos
│
├── domain/                       # Modelos compartidos
│   ├── DTOs
│   ├── Interfaces
│   └── Tipos comunes
│
└── .vscode / config / env         # Configuración

🧠 ¿Por qué esta arquitectura es correcta?

✔ Frontend desacoplado (puede escalar o cambiar de framework)
✔ Microservicios independientes (deploy por separado)
✔ API Gateway como patrón profesional
✔ WebSocket para estados en tiempo real
✔ Domain layer compartido (buena práctica senior)
✔ Analytics separado (visión de negocio)

Esto NO es un CRUD escolar, es una arquitectura tipo startup / SaaS.

🔄 Flujo real del sistema
Cliente (Frontend)
   ↓
API Gateway
   ↓
┌───────────────┐
│ auth-service  │
│ menu-service  │
│ order-service │
│ customer-serv │
└───────────────┘
   ↓
web-socket → estado en tiempo real
   ↓
analytics-service

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



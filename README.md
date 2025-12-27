# ☕ Café Urban Roast – Plataforma Web (Portafolio)

**Café Urban Roast** es una plataforma web moderna para una cafetería, desarrollada con **Next.js + TypeScript**, orientada a **UX real**, **arquitectura escalable** y **experiencia tipo producto comercial**.

La aplicación simula un flujo real de compra, desde la navegación del menú hasta el checkout, utilizando buenas prácticas de frontend moderno y una arquitectura preparada para backend por microservicios.

---

## 🚀 Características principales

### ✔️ Experiencia de usuario realista

La aplicación ofrece:

- Navegación fluida por categorías  
- Interfaz clara y moderna  
- Diseño **mobile-first**  
- Animaciones de confirmación de pedido  

Pensada como un **producto comercial real**, no como un demo académico.

---

### ✔️ Gestión de pedidos

- Carrito global persistente  
- Actualización del estado del pedido  
- Flujo de checkout claro y extensible  
- Preparado para integración con Stripe  

---

### ✔️ Autenticación y roles

- Autenticación basada en roles:
  - **Admin**
  - **Customer**
- Estructura preparada para JWT y control de acceso desde backend

---

## 🖼️ Capturas del sistema

### 🔐 Login

![Login](./background-login-urbanroast.png)

![Login Form](https://github.com/Fabricioanchundia/CafeteriaWEB/blob/main/Captura%20de%20pantalla%202025-12-26%20224131.png)

---

### ☕ Home – Panel Admin

![Home Admin](./captura de pantalla 2025-12-26 224221.png)

---

### ☕ Home – Menú principal (Cliente)

![Menú Cliente](./captura de pantalla 2025-12-26 224235.png)

---

### 🛒 Catálogo de productos y Checkout

![Checkout](./captura de pantalla 2025-12-26 224247.png)

---

## 🧱 Stack tecnológico

### 🎨 Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (estado global)
- Arquitectura basada en componentes

### 🛠️ Backend (microservicios – en progreso)
- NestJS
- PostgreSQL
- API Gateway
- WebSockets (estado del pedido)
- Servicios independientes

---

## 🧩 Arquitectura del sistema

El sistema está diseñado bajo una **arquitectura de microservicios**, con separación clara de responsabilidades y un frontend completamente desacoplado.

```text
CAFETERIAWEB/
│
├── cafeteriaweb-frontend/
│   ├── app/            # App Router
│   ├── components/     # UI Components
│   ├── stores/         # Zustand (cart, user, orders)
│   ├── styles/         # Estilos globales
│   └── public/         # Imágenes
│
├── api-gateway/        # Punto de entrada único
├── auth-service/       # Autenticación y roles
├── customer-service/   # Gestión de clientes
├── menu-service/       # Menú y productos
├── order-service/      # Pedidos
├── web-socket/         # Comunicación en tiempo real
├── analytics-service/  # Métricas y reportes
├── domain/             # DTOs y modelos compartidos
└── config / env        # Configuración
````

---

## 🧠 ¿Por qué esta arquitectura es correcta?

* ✔ **Frontend desacoplado** (puede escalar o cambiar de framework)
* ✔ **Microservicios independientes** (deploy por separado)
* ✔ **API Gateway** como patrón profesional
* ✔ **WebSocket** para estados en tiempo real
* ✔ **Domain layer compartido** (buena práctica senior)
* ✔ **Analytics separado** (visión de negocio)

> Esto **NO es un CRUD escolar**, es una arquitectura tipo **startup / SaaS**.

---

## 🔄 Flujo real del sistema

```text
Cliente (Frontend)
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
 web-socket → estado en tiempo real
        ↓
 analytics-service
```

---

## 🚀 Cómo ejecutar el proyecto

### 1️⃣ Instalar dependencias

```bash
npm install
```

### 2️⃣ Ejecutar en desarrollo

```bash
npm run dev
```

📍 **Aplicación disponible en:**
[http://localhost:3007](http://localhost:3007)

---

## 🎯 Objetivo del proyecto

Proyecto desarrollado como **pieza de portafolio profesional**, demostrando:

* Pensamiento de producto
* UX realista
* Arquitectura escalable
* Código limpio y mantenible
* Preparación para entornos reales de pago y backend

---

## 👨‍💻 Autor

**Alex Fabricio Anchundia Mero**
Ingeniería de Software – Ecuador 🇪🇨
💼 Backend / Full Stack Developer
🔗 LinkedIn: [https://www.linkedin.com/in/fabricio-anchundia-978466308/](https://www.linkedin.com/in/fabricio-anchundia-978466308/)

---

⭐ Si este proyecto te resulta interesante, no olvides darle una estrella en GitHub.

````

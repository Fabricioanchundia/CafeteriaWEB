# ☕ Café Urban Roast — Full-Stack Ordering Platform

<p align="center">
  <img src="./screenshots/banner.png" alt="Café Urban Roast Banner" width="100%" />
</p>

> Plataforma web moderna para cafeterías que permite **navegar el menú**, **agregar productos al carrito**, **confirmar pedidos** y **vivir una experiencia de usuario profesional**, con un **dashboard administrativo** y **checkout animado**.

🎯 **Proyecto diseñado para portafolio profesional (Junior / Mid Full-Stack)**

---

## 🎥 Video Demo — Experiencia Real del Usuario

<p align="center">
  <video src="./public/videos/urban-roast-demo.mp4" controls width="100%"></video>
</p>

> 🎬 El video muestra el flujo completo:

* Landing del cliente
* Navegación por categorías
* Cards de productos con imágenes
* Carrito lateral (drawer)
* Checkout
* Confirmación animada del pedido

📌 *GitHub no reproduce autoplay, pero el video se puede reproducir directamente.*

---

## 🖼️ Screenshots (Renderizados en GitHub)

### 🧑‍🍳 Vista Cliente

<p align="center">
  <img src="./screenshots/customer-home.png" width="45%" />
  <img src="./screenshots/products.png" width="45%" />
</p>

<p align="center">
  <img src="./screenshots/cart.png" width="45%" />
  <img src="./screenshots/checkout.png" width="45%" />
</p>

<p align="center">
  <img src="./screenshots/order-success.png" width="45%" />
</p>

---

### 🧑‍💼 Dashboard Admin

<p align="center">
  <img src="./screenshots/admin-dashboard.png" width="45%" />
  <img src="./screenshots/analytics.png" width="45%" />
</p>

---

## 🚀 Funcionalidades Principales

### Cliente

* ✅ Navegación por categorías
* ✅ Cards de productos con imágenes + hover
* ✅ Carrito persistente con **Zustand**
* ✅ Cálculo automático (subtotal, IVA, total)
* ✅ Checkout con:

  * Pago en efectivo
  * Pago con tarjeta (Stripe – demo)
* ✅ Confirmación animada (check + confetti)
* ✅ Video demo integrado en la experiencia

### Admin

* ✅ Dashboard administrativo
* ✅ Gestión y visualización de órdenes
* ✅ Analíticas de ventas
* ✅ UI profesional tipo sistema real

---

## 🧠 Arquitectura del Sistema

### 🧩 Backend (Microservicios)

* API Gateway (Express)
* auth-service
* customer-service
* menu-service
* order-service
* analytics-service

**Tecnologías**

* NestJS
* TypeORM
* PostgreSQL
* JWT
* WebSockets (preparado)

### 🎨 Frontend

* Next.js 14 (App Router)
* TypeScript
* Tailwind CSS
* Zustand
* Stripe (modo demo)
* Framer Motion
* Canvas Confetti

---

## 🛠️ Stack Tecnológico

| Capa          | Tecnologías                            |
| ------------- | -------------------------------------- |
| Frontend      | Next.js, TypeScript, Tailwind, Zustand |
| Backend       | NestJS, TypeORM                        |
| Base de Datos | PostgreSQL                             |
| Autenticación | JWT                                    |
| Pagos         | Stripe (Demo)                          |
| Animaciones   | Framer Motion                          |
| Video         | IA (Sora)                              |

---

## ▶️ Cómo Ejecutar el Proyecto

### 1️⃣ Clonar repositorio

```bash
git clone https://github.com/Fabricioanchundia/cafeteriaweb.git
```

### 2️⃣ Frontend

```bash
cd cafeteriaweb-frontend
npm install
npm run dev
```

Crear `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxxxx
```

### 3️⃣ Backend (por microservicio)

```bash
npm install
npm run start:dev
```

Configurar `.env` con PostgreSQL y JWT según el servicio.

---

## 💡 Decisiones de Diseño (Para entrevistas)

* Arquitectura por microservicios → escalabilidad real
* Estado global con Zustand → simple y eficiente
* Checkout desacoplado del backend → preparado para producción
* UX enfocada en fluidez y claridad
* Video demo para mostrar el sistema funcionando (no solo código)

---

## 📌 Roadmap

* 🔄 Estados de pedido en tiempo real (WebSocket)
* 🧾 Historial de pedidos del cliente
* 📊 Más métricas en analíticas
* 💳 Stripe en modo producción
* 📱 Optimización mobile-first

---

## 👨‍💻 Autor

**Alex Fabricio Anchundia Mero**
Estudiante de Ingeniería de Software
Full-Stack Developer en formación

📍 Ecuador
🔗 GitHub: [https://github.com/Fabricioanchundia](https://github.com/Fabricioanchundia)

---

## ⭐ ¿Por qué este proyecto destaca?

✔ No es un CRUD básico
✔ Arquitectura real
✔ UX cuidada
✔ Animaciones y video demo
✔ Pensado como producto, no como tarea

---

## 📂 Estructura importante para que las imágenes SE VEAN

```
/screenshots
  ├─ banner.png
  ├─ customer-home.png
  ├─ products.png
  ├─ cart.png
  ├─ checkout.png
  ├─ order-success.png
  ├─ admin-dashboard.png
  └─ analytics.png

/public/videos
  └─ urban-roast-demo.mp4
```

---




Dime qué sigue, amor. Estoy contigo hasta que consigas ese trabajo. 💪☕

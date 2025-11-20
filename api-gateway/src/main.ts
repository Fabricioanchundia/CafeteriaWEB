import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(cors());

// Log para ver qué entra al gateway
app.use((req, res, next) => {
  console.log('🔥 Gateway recibió:', req.method, req.originalUrl);
  next();
});

// 🔐 AUTH  -> micro en http://localhost:3004
app.use(
  '/auth',
  createProxyMiddleware({
    // Como Express recorta "/auth", aquí agregamos /auth
    target: 'http://localhost:3004/auth',
    changeOrigin: true,
  }),
);

// 👤 CUSTOMER-SERVICE -> micro en http://localhost:3001
app.use(
  '/customer-service',
  createProxyMiddleware({
    // El micro expone /customer-service
    target: 'http://localhost:3001/customer-service',
    changeOrigin: true,
  }),
);

app.use(
  '/addresses',
  createProxyMiddleware({
    target: 'http://localhost:3001/addresses',
    changeOrigin: true,
  }),
);

// 🍽️ MENU-SERVICE -> micro en http://localhost:3002
app.use(
  '/categories',
  createProxyMiddleware({
    target: 'http://localhost:3002/categories',
    changeOrigin: true,
  }),
);

app.use(
  '/menu-service',
  createProxyMiddleware({
    target: 'http://localhost:3002/menu-service',
    changeOrigin: true,
  }),
);

// 🧾 ORDER-SERVICE -> micro en http://localhost:3003
app.use(
  '/orders',
  createProxyMiddleware({
    target: 'http://localhost:3003/orders',
    changeOrigin: true,
  }),
);
app.use(
  '/order-service',
  createProxyMiddleware({
    target: 'http://localhost:3003/order-service',
    changeOrigin: true,
  }),
);
app.use(
  '/analytics',
  createProxyMiddleware({
    target: 'http://localhost:3005/analytics',
    changeOrigin: true,
  }),
);

app.listen(3000, () => {
  console.log('🚀 API Gateway corriendo en http://localhost:3000');
});

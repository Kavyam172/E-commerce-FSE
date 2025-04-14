# Drip Deals E-commerce Website

An e-commerce website built with React, Vite, and Tailwind CSS featuring a landing page, product catalog, shopping cart, authentication, and checkout functionality.

## Features

- Responsive design for all devices
- Light and dark mode theme toggle
- Product catalog with categories and filtering
- Product detail pages
- Shopping cart with live updates
- User authentication (login/signup)
- Checkout process
- Animation effects using AOS

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or newer)
- npm or yarn

### Installation

1. Install dependencies:
   ```
   npm install
   ```

### Development

2. Start the development server:
   ```
   npm run dev
   ```
   
3. Open your browser and visit:
   ```
   http://localhost:5173
   ```

### Production Build

```
npm run build
```

## Backend Integration Guide

This frontend is designed to be easily integrated with any backend. Here's how to connect your backend:

### 1. API Endpoints

The application expects the following API endpoints:

- **Authentication**
  - `POST /api/auth/login` - User login
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/logout` - User logout

- **Products**
  - `GET /api/products` - Fetch all products
  - `GET /api/products/:id` - Fetch a single product
  - `GET /api/products/categories` - Fetch product categories

- **Cart/Orders**
  - `POST /api/orders` - Create a new order
  - `GET /api/orders` - Get user orders
  - `GET /api/orders/:id` - Get a specific order

### 2. Integration Steps

1. **Configure API Base URL**
   - Create a `.env` file in the project root:
     ```
     VITE_API_BASE_URL=http://your-backend-url/api
     ```

2. **Create API Service**
   - Check the placeholder services in `src/utils/api.js` and replace the dummy implementations with actual API calls.

3. **Authentication Integration**
   - Update the authentication methods in `AppContext.jsx` to use your backend endpoints.

4. **Product Data Integration**
   - Replace the dummy product data in `src/data/products.js` with API calls to your backend.

### Example API Integration

```jsx
// In src/utils/api.js (create this file)
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
```

## Folder Structure

```
src/
├── assets/       # Static assets like images
├── components/   # Reusable UI components
├── config/       # Configuration files, context providers
├── data/         # Dummy data (replace with API calls)
├── layouts/      # Layout components
├── pages/        # Page components
└── utils/        # Utility functions
```

## Built With

- [React](https://reactjs.org/) - UI library
- [React Router](https://reactrouter.com/) - Navigation
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [AOS](https://michalsnik.github.io/aos/) - Animations
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [Vite](https://vitejs.dev/) - Build tool

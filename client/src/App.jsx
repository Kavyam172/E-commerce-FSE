import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './config/AppContext';
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Categories from './pages/Categories';
import AdminLayout from './layouts/AdminLayout';
import AdminHome from './admin/AdminHome';
import AdminPanel from './admin/AdminPanel';

function App() {
  return (
    <AppProvider>
      <Router>
          <Routes>
            <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:category" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
            </Route>

           <Route path="/admin" element={<AdminLayout />}>
            <Route path="home" element={<AdminPanel />} />
          </Route>  


          </Routes>
      </Router>
    </AppProvider>
  )
}

export default App

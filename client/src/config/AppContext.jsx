import { createContext, useContext, useEffect, useState } from 'react';
import theme from './theme';

// Context for global state management
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  
  // Cart state
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  
  // User state
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  
  // Theme toggle function
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };
  
  // Add to cart function
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      
      return [...prevCart, { ...product, quantity }];
    });
  };
  
  // Remove from cart function
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
  // Update quantity function
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  // Login function
  const login = (userData) => {
    // This would typically make an API call to your backend
    // For now, we'll just store the user data
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Comment: Replace with actual API call to backend endpoint
    // Example: const response = await axios.post('/api/auth/login', credentials);
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    
    // Comment: Add API call to logout endpoint if needed
    // Example: await axios.post('/api/auth/logout');
  };
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
    
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);
  
  // Calculate cart totals
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  
  // Create value object with all context data and functions
  const value = {
    theme: isDarkMode ? theme.dark : theme.light,
    isDarkMode,
    toggleTheme,
    cart,
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    user,
    login,
    logout,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook for using the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

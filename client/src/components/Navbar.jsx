import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSun, FiMoon, FiSearch } from 'react-icons/fi';
import { useApp } from '../config/AppContext';

const Navbar = () => {
  const { isDarkMode, toggleTheme, cartCount, user, logout } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);
  
  // Toggle menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Toggle search
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen || isSearchOpen || location.pathname !== '/'
          ? 'bg-white dark:bg-gray-900 shadow-md py-2'
          : 'py-4 bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className={`text-2xl font-bold ${
            isScrolled || isMenuOpen || isSearchOpen || location.pathname !== '/'
              ? 'text-primary dark:text-primary'
              : 'text-gray-900 dark:text-white'
          } flex items-center`}
          data-aos="fade-right"
          data-aos-duration="800"
        >
          Drip Deals
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`nav-link relative py-2 px-1 ${
              location.pathname === '/' 
                ? 'text-primary dark:text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary' 
                : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
            }`}
            data-aos="fade-down"
            data-aos-delay="100"
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`nav-link relative py-2 px-1 ${
              location.pathname.includes('/products') 
                ? 'text-primary dark:text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary' 
                : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
            }`}
            data-aos="fade-down"
            data-aos-delay="200"
          >
            Products
          </Link>
          <Link 
            to="/about" 
            className={`nav-link relative py-2 px-1 ${
              location.pathname === '/about' 
                ? 'text-primary dark:text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary' 
                : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
            }`}
            data-aos="fade-down"
            data-aos-delay="300"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link relative py-2 px-1 ${
              location.pathname === '/contact' 
                ? 'text-primary dark:text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary' 
                : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
            }`}
            data-aos="fade-down"
            data-aos-delay="400"
          >
            Contact
          </Link>
        </div>
        
        {/* Right side icons */}
        <div className="flex items-center gap-4">
          {/* Desktop search icon */}
          <div className="hidden md:block">
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Search"
            >
              <FiSearch className="text-xl" />
            </button>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
            data-aos="fade-left"
          >
            {isDarkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
          </button>
          
          <Link 
            to="/cart" 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative"
            aria-label="Shopping cart"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <FiShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="relative group">
              <button 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                <span className="hidden sm:inline text-sm font-medium">
                  {user.name || 'Account'}
                </span>
                <FiUser className="text-xl" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Profile
                </Link>
                <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Orders
                </Link>
                <button 
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <span className="hidden sm:inline text-sm font-medium">Login</span>
              <FiUser className="text-xl" />
            </Link>
          )}
          
          {/* Mobile search icon */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={toggleSearch}
            aria-label="Search"
          >
            <FiSearch className="text-xl" />
          </button>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </div>
      
      {/* Mobile search bar */}
      {isSearchOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg animate-slide-down">
          <div className="container mx-auto px-4 py-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full px-4 py-2 pr-10 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                autoFocus
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                <FiSearch className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-2 pb-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Trending:</p>
              <div className="flex flex-wrap gap-2">
                {['Headphones', 'Smartwatch', 'Camera', 'Speaker'].map((term) => (
                  <span key={term} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-1 px-2 rounded-full hover:bg-primary hover:text-white cursor-pointer transition-colors">
                    {term}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg animate-slide-down">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className={`py-2 ${location.pathname === '/' ? 'text-primary dark:text-primary' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`py-2 ${location.pathname.includes('/products') ? 'text-primary dark:text-primary' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className={`py-2 ${location.pathname === '/about' ? 'text-primary dark:text-primary' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`py-2 ${location.pathname === '/contact' ? 'text-primary dark:text-primary' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

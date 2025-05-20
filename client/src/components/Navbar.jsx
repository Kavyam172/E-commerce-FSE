import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSun, FiMoon, FiSearch, FiShoppingBag, FiChevronDown, FiGrid, FiTag, FiHeart, FiHome } from 'react-icons/fi';
import { getCategories } from '../data/products';
import { useApp } from '../config/AppContext';

const Navbar = () => {
  const { isDarkMode, toggleTheme, cartCount, user, logout } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const categoryMenuRef = useRef(null);
  
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
    setIsProfileMenuOpen(false);
    setIsCategoryMenuOpen(false);
  }, [location]);
  
  // Load categories
  useEffect(() => {
    setCategories(getCategories().filter(cat => cat !== 'All'));
  }, []);
  
  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target)) {
        setIsCategoryMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Toggle menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Toggle search
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  
  // Toggle profile menu
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  
  // Toggle category menu
  const toggleCategoryMenu = () => setIsCategoryMenuOpen(!isCategoryMenuOpen);
  
  // Navigate to profile
  const goToProfile = () => {
    navigate('/profile');
    setIsProfileMenuOpen(false);
  };
  
  // Navigate to category
  const goToCategory = (category) => {
    navigate(`/categories/${category}`);
    setIsCategoryMenuOpen(false);
    setIsMenuOpen(false);
  };
  
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen || isSearchOpen || isCategoryMenuOpen || isProfileMenuOpen || location.pathname !== '/'
          ? 'bg-white dark:bg-gray-900 shadow-md py-2'
          : 'py-3 bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-8">
          <Link 
            to="/" 
            className={`text-2xl font-bold ${
              isScrolled || isMenuOpen || isSearchOpen || isCategoryMenuOpen || isProfileMenuOpen || location.pathname !== '/'
                ? 'text-primary dark:text-primary'
                : 'text-gray-900 dark:text-white'
            } flex items-center`}
            data-aos="fade-right"
            data-aos-duration="800"
          >
            <span className="flex items-center gap-1">
              <FiTag className="text-primary" />
              Drip Deals
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <Link 
            to="/" 
            className={`nav-link flex items-center gap-1 py-2 px-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
              location.pathname === '/' 
                ? 'text-primary dark:text-primary font-medium' 
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <FiHome className="text-lg" />
            <span>Home</span>
          </Link>
          
          {/* Categories Dropdown */}
          <div className="relative" ref={categoryMenuRef}>
            <button 
              onClick={toggleCategoryMenu}
              className={`flex items-center gap-1 py-2 px-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                location.pathname.includes('/categories') 
                  ? 'text-primary dark:text-primary font-medium' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <FiGrid className="text-lg" />
              <span>Categories</span>
              <FiChevronDown className={`ml-1 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isCategoryMenuOpen && (
              <div className="absolute left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 animate-fadeIn">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => goToCategory(category)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    {category}
                  </button>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                <Link 
                  to="/categories"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-primary font-medium"
                >
                  View All Categories
                </Link>
              </div>
            )}
          </div>
          
          <Link 
            to="/products" 
            className={`nav-link flex items-center gap-1 py-2 px-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
              location.pathname.includes('/products') && !location.pathname.includes('/categories')
                ? 'text-primary dark:text-primary font-medium' 
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <FiTag className="text-lg" />
            <span>Products</span>
          </Link>
          
          <Link 
            to="/about" 
            className={`nav-link flex items-center gap-1 py-2 px-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
              location.pathname === '/about' 
                ? 'text-primary dark:text-primary font-medium' 
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <FiHeart className="text-lg" />
            <span>About</span>
          </Link>
          
          <Link 
            to="/contact" 
            className={`nav-link flex items-center gap-1 py-2 px-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
              location.pathname === '/contact' 
                ? 'text-primary dark:text-primary font-medium' 
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <FiUser className="text-lg" />
            <span>Contact</span>
          </Link>
        </div>
        
        {/* Right side icons */}
        <div className="flex items-center gap-4">
          {/* Desktop search form */}
          <form onSubmit={handleSearch} className="hidden md:flex relative items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="w-60 px-3 py-2 pl-10 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </form>
          
         
          
          <Link 
            to="/cart" 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 relative"
            aria-label="Shopping cart"
          >
            <FiShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                {cartCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="relative" ref={profileMenuRef}>
              <button 
                onClick={toggleProfileMenu}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 text-gray-700 dark:text-gray-300"
                aria-expanded={isProfileMenuOpen}
                aria-haspopup="true"
              >
                <span className="hidden sm:inline text-sm font-medium">
                  {user.name || 'Account'}
                </span>
                <FiUser className="text-xl" />
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 animate-fadeIn border border-gray-100 dark:border-gray-700">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                  </div>
                  <button 
                    onClick={goToProfile}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FiUser className="mr-2 text-primary" />
                    Profile
                  </button>
                  <button 
                    onClick={() => {
                      navigate('/profile?tab=orders');
                      setIsProfileMenuOpen(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FiShoppingBag className="mr-2 text-primary" />
                    Orders
                  </button>
                  <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                  <button 
                    onClick={() => {
                      logout();
                      setIsProfileMenuOpen(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FiX className="mr-2 text-red-500" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login" 
              className="py-2 px-4 rounded-md bg-primary hover:bg-primary-dark text-white font-medium text-sm transition-colors hidden sm:flex items-center gap-2"
            >
              <span>Login</span>
              <FiUser className="text-sm" />
            </Link>
          )}
          
          {/* Mobile search icon */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            onClick={toggleSearch}
            aria-label="Search"
          >
            <FiSearch className="text-xl" />
          </button>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </div>
      
      {/* Mobile search bar */}
      {isSearchOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg animate-fadeIn">
          <div className="container mx-auto px-4 py-3">
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full px-4 py-2 pl-10 pr-10 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary-dark transition-colors"
              >
                <FiSearch className="w-5 h-5" />
              </button>
            </form>
            
            <div className="mt-3 pb-2">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Popular Categories:</p>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 5).map((term) => (
                  <button 
                    key={term} 
                    onClick={() => {
                      goToCategory(term);
                      setIsSearchOpen(false);
                    }}
                    className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-1 px-2 rounded-full hover:bg-primary hover:text-white cursor-pointer transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 shadow-lg animate-fadeIn">
          <div className="container mx-auto px-4 py-4 flex flex-col">
            <Link 
              to="/" 
              className={`py-3 px-2 flex items-center gap-3 ${location.pathname === '/' ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300'} border-b border-gray-100 dark:border-gray-800`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FiHome className="text-lg" />
              Home
            </Link>
            
            <div className="py-3 px-2 border-b border-gray-100 dark:border-gray-800">
              <button 
                onClick={toggleCategoryMenu}
                className={`flex items-center justify-between w-full ${location.pathname.includes('/categories') ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300'}`}
              >
                <div className="flex items-center gap-3">
                  <FiGrid className="text-lg" />
                  Categories
                </div>
                <FiChevronDown className={`transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCategoryMenuOpen && (
                <div className="mt-2 pl-8 space-y-2 py-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => goToCategory(category)}
                      className="block py-1 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors w-full text-left"
                    >
                      {category}
                    </button>
                  ))}
                  <Link 
                    to="/categories"
                    className="block py-1 text-primary font-medium w-full text-left"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    View All Categories
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              to="/products" 
              className={`py-3 px-2 flex items-center gap-3 ${location.pathname.includes('/products') && !location.pathname.includes('/categories') ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300'} border-b border-gray-100 dark:border-gray-800`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FiTag className="text-lg" />
              Products
            </Link>
            
            <Link 
              to="/about" 
              className={`py-3 px-2 flex items-center gap-3 ${location.pathname === '/about' ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300'} border-b border-gray-100 dark:border-gray-800`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FiHeart className="text-lg" />
              About
            </Link>
            
            <Link 
              to="/contact" 
              className={`py-3 px-2 flex items-center gap-3 ${location.pathname === '/contact' ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300'} border-b border-gray-100 dark:border-gray-800`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FiUser className="text-lg" />
              Contact
            </Link>
            
            {!user && (
              <div className="mt-4">
                <Link 
                  to="/login" 
                  className="block w-full py-3 bg-primary hover:bg-primary-dark text-white font-medium text-center rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login / Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiFilter, FiX, FiGrid, FiList, FiChevronDown, FiSliders, FiSearch, FiShoppingBag, FiHeart, FiEye, FiStar, FiPlus } from 'react-icons/fi';
import { useApp } from '../config/AppContext';
import { products, getCategories } from '../data/products';

const Products = () => {
  const { theme, addToCart } = useApp();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortOption, setSortOption] = useState('featured');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);
  const [animateProducts, setAnimateProducts] = useState(false);
  const filterPanelRef = useRef(null);
  const searchInputRef = useRef(null);
  const productsGridRef = useRef(null);
  
  // Handle click outside filter panel
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterPanelRef.current && !filterPanelRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Load categories and products
  useEffect(() => {
    setCategories(['All', ...getCategories()]);
    setFilteredProducts(products);
    
    // Trigger animation after initial load
    setTimeout(() => {
      setAnimateProducts(true);
    }, 100);
  }, []);
  
  // Apply filters
  useEffect(() => {
    // Temporarily disable animations during filtering
    setAnimateProducts(false);
    
    // Apply filters
    let result = [...products];
    
    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Price range filter
    result = result.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(term) || 
          product.description?.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      );
    }
    
    // Sort products
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      case 'newest':
        // In a real app, you would sort by date
        result.sort((a, b) => b.id - a.id);
        break;
      default: // 'featured'
        // No sorting needed for featured
        break;
    }
    
    // Count active filters
    const filters = [];
    if (selectedCategory !== 'All') filters.push('category');
    if (priceRange.min > 0 || priceRange.max < 1000) filters.push('price');
    if (searchTerm) filters.push('search');
    if (sortOption !== 'featured') filters.push('sort');
    setActiveFilters(filters);
    
    // Update filtered products with slight delay for animation
    setTimeout(() => {
      setFilteredProducts(result);
      setAnimateProducts(true);
      
      // Scroll to top when filters change
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  }, [selectedCategory, priceRange, searchTerm, sortOption]);
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  const handleAddToCart = (product) => {
    addToCart(product);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header section with blurred background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Discover Our Products</h1>
            <div className="h-1 w-24 bg-primary mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Explore our curated collection of premium products designed with quality and style in mind.
            </p>
            
            {/* Search bar with animation */}
            <div className="relative max-w-md mx-auto group">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for products..."
                className="w-full px-5 py-4 pr-12 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition-all duration-300 group-hover:shadow-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-300"
                onClick={() => searchInputRef.current.focus()}
              >
                <FiSearch className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        {/* Filters and sort bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <button
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isFilterOpen 
                  ? 'bg-primary text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              } shadow-sm flex items-center gap-2`}
              onClick={toggleFilter}
            >
              <FiSliders className="w-4 h-4" />
              <span>Filters</span>
              {activeFilters.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </button>
            
            {/* View mode toggle */}
            <div className="bg-white dark:bg-gray-800 rounded-full shadow-sm flex">
              <button
                className={`p-2 rounded-l-full transition-colors duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                className={`p-2 rounded-r-full transition-colors duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Sort dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
              <span>Sort by: </span>
              <span className="font-semibold">
                {sortOption === 'price-low' ? 'Price: Low to High' : 
                 sortOption === 'price-high' ? 'Price: High to Low' : 
                 sortOption === 'rating' ? 'Top Rated' : 
                 sortOption === 'newest' ? 'Newest' : 'Featured'}
              </span>
              <FiChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            
            <div className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right group-hover:translate-y-0 translate-y-2">
              <div className="py-1">
                {['featured', 'price-low', 'price-high', 'rating', 'newest'].map((option) => (
                  <button
                    key={option}
                    className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-300 ${
                      sortOption === option 
                        ? 'bg-gray-100 dark:bg-gray-700 text-primary' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setSortOption(option)}
                  >
                    {option === 'price-low' ? 'Price: Low to High' : 
                     option === 'price-high' ? 'Price: High to Low' : 
                     option === 'rating' ? 'Top Rated' : 
                     option === 'newest' ? 'Newest' : 'Featured'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Filter panel */}
        {isFilterOpen && (
          <div 
            ref={filterPanelRef} 
            className="fixed inset-y-0 left-0 w-full md:w-80 bg-white dark:bg-gray-800 z-50 shadow-xl transform transition-transform duration-300 ease-in-out overflow-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h3>
                <button 
                  onClick={toggleFilter} 
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close filters"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              
              {/* Category filter */}
              <div className="mb-8">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Category</h4>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category}`}
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary dark:focus:ring-offset-gray-800"
                      />
                      <label 
                        htmlFor={`category-${category}`} 
                        className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price range filter */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">Price Range</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ${priceRange.min} - ${priceRange.max}
                  </span>
                </div>
                
                <div className="px-2">
                  <div className="relative pt-5 pb-8">
                    <div className="absolute left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="10"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                      className="absolute w-full h-2 appearance-none bg-transparent pointer-events-auto z-10"
                      style={{
                        WebkitAppearance: 'none',
                        appearance: 'none'
                      }}
                    />
                    <div 
                      className="absolute left-0 h-1 bg-primary rounded-full" 
                      style={{ right: `${100 - (priceRange.max / 10)}%` }}
                    ></div>
                    <div
                      className="absolute h-5 w-5 bg-white border-2 border-primary rounded-full shadow transform -translate-y-1/2 top-[8px]"
                      style={{ left: `${priceRange.max / 10}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Active filters */}
              {activeFilters.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">Active Filters</h4>
                    <button 
                      onClick={() => {
                        setSelectedCategory('All');
                        setPriceRange({ min: 0, max: 1000 });
                        setSearchTerm('');
                        setSortOption('featured');
                      }}
                      className="text-xs text-primary hover:text-primary/80 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory !== 'All' && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        Category: {selectedCategory}
                        <button 
                          className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          onClick={() => setSelectedCategory('All')}
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    
                    {(priceRange.min > 0 || priceRange.max < 1000) && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        Price: ${priceRange.min} - ${priceRange.max}
                        <button 
                          className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          onClick={() => setPriceRange({ min: 0, max: 1000 })}
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    
                    {searchTerm && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        Search: {searchTerm}
                        <button 
                          className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          onClick={() => setSearchTerm('')}
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Apply button */}
              <button
                onClick={toggleFilter}
                className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        {/* Overlay */}
        {isFilterOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={toggleFilter}
          ></div>
        )}
        
        {/* Products grid */}
        <div ref={productsGridRef} className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className={`group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${
                    animateProducts ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    transform: animateProducts ? 'translateY(0)' : 'translateY(20px)'
                  }}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {viewMode === 'grid' ? (
                    /* Grid view */
                    <>
                      {/* Product image with hover effects */}
                      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
                        {/* Quick action buttons that appear on hover */}
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 backdrop-blur-sm">
                          <button 
                            onClick={() => handleAddToCart(product)} 
                            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-900 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
                          >
                            <FiShoppingBag size={18} />
                          </button>
                          <button 
                            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-900 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
                          >
                            <FiHeart size={18} />
                          </button>
                          <Link 
                            to={`/products/${product.id}`} 
                            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-900 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
                          >
                            <FiEye size={18} />
                          </Link>
                        </div>
                        
                        {/* Product image */}
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Product badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.isNew && (
                            <span className="bg-green-500 text-white text-xs font-bold py-1 px-2 rounded">
                              NEW
                            </span>
                          )}
                          {product.discount && (
                            <span className="bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
                              {product.discount}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Product details */}
                      <div className="p-4">
                        {/* Category */}
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.category}</div>
                        
                        {/* Product name */}
                        <Link to={`/products/${product.id}`}>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                        </Link>
                        
                        {/* Rating */}
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-xs ${i < Math.floor(product.rating?.rate || 0) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}>★</span>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                            ({product.rating?.count || 0})
                          </span>
                        </div>
                        
                        {/* Price and add button */}
                        <div className="flex justify-between items-center mt-2">
                          <div>
                            {product.oldPrice ? (
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-lg text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                              </div>
                            ) : (
                              <span className="font-bold text-lg text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
                            )}
                          </div>
                          <button 
                            onClick={() => handleAddToCart(product)}
                            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-all duration-300"
                          >
                            <FiPlus size={16} />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* List view */
                    <div className="flex gap-4 p-4">
                      {/* Product image */}
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-110"
                        />
                        {product.discount && (
                          <div className="absolute top-1 left-1 bg-red-500 text-white text-xs font-bold py-0.5 px-1 rounded">
                            {product.discount}% OFF
                          </div>
                        )}
                      </div>
                      
                      {/* Product details */}
                      <div className="flex-grow flex flex-col">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.category}</div>
                        <Link to={`/products/${product.id}`}>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        
                        {/* Ratings */}
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-xs ${i < Math.floor(product.rating?.rate || 0) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}>★</span>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                            ({product.rating?.count || 0})
                          </span>
                        </div>
                        
                        {/* Description for list view */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                          {product.description || "No description available."}
                        </p>
                        
                        {/* Price and actions */}
                        <div className="flex items-center justify-between mt-auto">
                          <div className="font-bold text-lg text-gray-900 dark:text-white">${product.price.toFixed(2)}</div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleAddToCart(product)}
                              className="px-3 py-1 bg-primary text-white text-sm rounded-full hover:bg-primary/90 transition-colors flex items-center gap-1"
                            >
                              <FiShoppingBag size={14} />
                              <span>Add</span>
                            </button>
                            <Link 
                              to={`/products/${product.id}`}
                              className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
                <FiSearch className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We couldn't find any products matching your current filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setPriceRange({ min: 0, max: 1000 });
                  setSearchTerm('');
                  setSortOption('featured');
                }}
                className="px-6 py-2 bg-primary text-white rounded-full text-sm hover:bg-primary/90 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="mt-12 flex justify-center">
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>
                &lt;
              </button>
              {[1, 2, 3].map((page) => (
                <button 
                  key={page}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
                    page === 1 
                      ? 'bg-primary text-white' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

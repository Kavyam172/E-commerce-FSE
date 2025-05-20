import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiShoppingBag, FiList, FiFilter, FiChevronDown, FiGrid, FiX } from 'react-icons/fi';
import { getCategories, getProductsByCategory, products } from '../data/products';
import { useApp } from '../config/AppContext';

const Categories = () => {
  const { addToCart } = useApp();
  const navigate = useNavigate();
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category || 'All');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortOption, setSortOption] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  // Initialize categories and products
  useEffect(() => {
    const categories = getCategories();
    setAllCategories(categories);
    
    // Set filtered products
    if (category) {
      setSelectedCategory(category);
      setFilteredProducts(getProductsByCategory(category));
    } else {
      setFilteredProducts(products);
    }
  }, [category]);
  
  // Update filtered products when category changes
  useEffect(() => {
    let filtered = getProductsByCategory(selectedCategory);
    
    // Apply sorting
    if (sortOption === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating.rate - a.rating.rate);
    } else if (sortOption === 'featured') {
      filtered = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    
    // Apply price filtering
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(filtered);
  }, [selectedCategory, sortOption, priceRange]);
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    navigate(`/categories/${category === 'All' ? '' : category}`, { replace: true });
    setIsMobileFilterOpen(false);
  };
  
  // Quick add to cart function
  const handleQuickAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  // Get max price from all products
  const maxPrice = Math.max(...products.map(product => product.price));
  
  // Toggle mobile filter
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };
  
  // Toggle filter modal
  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page header */}
      <div className="mb-8" data-aos="fade-up">
        <h1 className="text-3xl font-bold mb-2">Browse Categories</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore our products by category and find exactly what you're looking for
        </p>
      </div>
      
      {/* Category pills */}
      <div className="mb-8 overflow-x-auto pb-2 hidden md:block" data-aos="fade-up" data-aos-delay="100">
        <div className="flex gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full border transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-white border-primary'
                  : 'border-gray-300 hover:border-primary dark:border-gray-600 dark:hover:border-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      {/* Mobile category selector */}
      <div className="md:hidden mb-6" data-aos="fade-up" data-aos-delay="100">
        <button 
          onClick={toggleMobileFilter}
          className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
        >
          <span>{selectedCategory} Categories</span>
          <FiChevronDown className={`transition-transform ${isMobileFilterOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isMobileFilterOpen && (
          <div className="mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`w-full text-left px-4 py-2 transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-gray-100 dark:bg-gray-700 text-primary'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Products section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters - desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-20" data-aos="fade-right">
            <h3 className="font-semibold text-lg mb-4">Filters</h3>
            
            {/* Price range */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">${priceRange[0]}</span>
                <span className="text-sm text-gray-500">${priceRange[1]}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max={maxPrice} 
                value={priceRange[1]} 
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            {/* Sort options */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Sort By</h4>
              <div className="space-y-2">
                {[
                  { id: 'featured', label: 'Featured' },
                  { id: 'price-low', label: 'Price: Low to High' },
                  { id: 'price-high', label: 'Price: High to Low' },
                  { id: 'rating', label: 'Customer Rating' }
                ].map((option) => (
                  <div key={option.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`sort-${option.id}`}
                      name="sortOption"
                      checked={sortOption === option.id}
                      onChange={() => setSortOption(option.id)}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <label htmlFor={`sort-${option.id}`} className="ml-2 text-sm">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Categories (desktop sidebar version) */}
            <div>
              <h4 className="font-medium mb-3">Categories</h4>
              <div className="space-y-2">
                {allCategories.map((cat) => (
                  <div key={cat} className="flex items-center">
                    <input
                      type="radio"
                      id={`cat-${cat}`}
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => handleCategoryChange(cat)}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <label htmlFor={`cat-${cat}`} className="ml-2 text-sm">
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          {/* Controls bar */}
          <div className="flex items-center justify-between mb-6 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredProducts.length} products
            </div>
            
            <div className="flex items-center gap-3">
              {/* Mobile filter button */}
              <button 
                onClick={toggleFilterModal}
                className="lg:hidden p-2 rounded-md border border-gray-300 dark:border-gray-600"
              >
                <FiFilter className="w-5 h-5" />
              </button>
              
              {/* View switcher */}
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid' 
                      ? 'bg-primary text-white' 
                      : 'bg-white dark:bg-gray-800'
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${
                    viewMode === 'list' 
                      ? 'bg-primary text-white' 
                      : 'bg-white dark:bg-gray-800'
                  }`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
              
              {/* Sort dropdown - Mobile and tablet */}
              <div className="relative lg:hidden">
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md pl-3 pr-8 py-2 text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
          
          {/* Products grid/list */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium">No products found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your filters or browse other categories.
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md"
                >
                  <Link to={`/products/${product.id}`} className="block">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-primary mb-1">{product.category}</div>
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">${product.price.toFixed(2)}</span>
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm ml-1">{product.rating.rate}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className="mt-3 w-full py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                >
                  <Link to={`/products/${product.id}`} className="flex">
                    <div className="w-32 sm:w-48 h-32 sm:h-48 flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-1">
                      <div className="text-xs text-primary mb-1">{product.category}</div>
                      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">${product.price.toFixed(2)}</span>
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm ml-1">{product.rating.rate} ({product.rating.count} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex items-end">
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile filter modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto lg:hidden">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={toggleFilterModal}
            ></div>
            
            <div className="relative inline-block align-bottom bg-white dark:bg-gray-800 rounded-t-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filter Products</h3>
                <button 
                  onClick={toggleFilterModal}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Price range */}
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">${priceRange[0]}</span>
                    <span className="text-sm text-gray-500">${priceRange[1]}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max={maxPrice} 
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                {/* Sort options */}
                <div>
                  <h4 className="font-medium mb-3">Sort By</h4>
                  <div className="space-y-2">
                    {[
                      { id: 'featured', label: 'Featured' },
                      { id: 'price-low', label: 'Price: Low to High' },
                      { id: 'price-high', label: 'Price: High to Low' },
                      { id: 'rating', label: 'Customer Rating' }
                    ].map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          type="radio"
                          id={`mobile-sort-${option.id}`}
                          name="mobileSortOption"
                          checked={sortOption === option.id}
                          onChange={() => setSortOption(option.id)}
                          className="w-4 h-4 text-primary focus:ring-primary"
                        />
                        <label htmlFor={`mobile-sort-${option.id}`} className="ml-2 text-sm">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Categories */}
                <div>
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    {allCategories.map((cat) => (
                      <div key={cat} className="flex items-center">
                        <input
                          type="radio"
                          id={`mobile-cat-${cat}`}
                          name="mobileCategory"
                          checked={selectedCategory === cat}
                          onChange={() => handleCategoryChange(cat)}
                          className="w-4 h-4 text-primary focus:ring-primary"
                        />
                        <label htmlFor={`mobile-cat-${cat}`} className="ml-2 text-sm">
                          {cat}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button 
                  onClick={toggleFilterModal}
                  className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;

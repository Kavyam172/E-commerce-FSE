import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag, FiTruck, FiCreditCard, FiShield, FiStar, FiBox, FiGift, FiMail, FiSearch, FiHeart, FiTrendingUp, FiPlus, FiX } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts } from '../data/products';
import { useApp } from '../config/AppContext';

const Home = () => {
  const { theme, isDarkMode } = useApp();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const heroRef = useRef(null);
  const imageRefs = useRef([]);
  
  // Load products
  useEffect(() => {
    setFeaturedProducts(getFeaturedProducts());
  }, []);
  
  // Initialize the hero animation
  useEffect(() => {
    // Animate elements sequentially
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, 300 * index);
    });
    
    return () => {
      elements.forEach(el => el.classList.remove('visible'));
    };
  }, []);
  
  // Handle parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height } = heroRef.current.getBoundingClientRect();
      
      const xValue = (clientX - width / 2) / 20;
      const yValue = (clientY - height / 2) / 20;
      
      imageRefs.current.forEach((img, index) => {
        if (!img) return;
        
        const depth = index * 0.2;
        const translateX = xValue * depth * -1;
        const translateY = yValue * depth * -1;
        
        img.style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      {/* Modern Hero Section with Smooth Parallax Effects */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"></div>
        
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-primary/20 to-transparent rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full filter blur-3xl"></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Content container */}
        <div className="container mx-auto px-6 relative z-10 flex min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full py-16 lg:py-0">
            {/* Left side: Text content */}
            <div className="order-2 lg:order-1 max-w-lg mx-auto lg:mx-0">
              <span className="fade-in text-sm font-semibold py-1 px-3 rounded-full bg-primary/10 dark:bg-primary/20 text-primary inline-flex items-center gap-2 mb-6 opacity-0 transform translate-y-8 transition-all duration-700 ease-out">
                <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                REDEFINING E-COMMERCE
              </span>
              
              <h1 className="fade-in text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 opacity-0 transform translate-y-8 transition-all duration-700 ease-out delay-100">
                <span className="block text-gray-900 dark:text-white">Elevate Your</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-secondary">Shopping Experience</span>
              </h1>
              
              <p className="fade-in text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md opacity-0 transform translate-y-8 transition-all duration-700 ease-out delay-200">
                Discover a curated collection of premium products designed to enhance your lifestyle with unmatched quality and style.
              </p>
              
              {/* CTA buttons */}
              <div className="fade-in space-y-4 sm:space-y-0 sm:space-x-4 sm:flex items-center mb-10 opacity-0 transform translate-y-8 transition-all duration-700 ease-out delay-300">
                <button className="w-full sm:w-auto px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-medium hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group relative overflow-hidden">
                  <span className="absolute inset-0 w-0 bg-primary group-hover:w-full transition-all duration-500 ease-out"></span>
                  <span className="relative">Shop Collection</span>
                  <FiArrowRight className="relative transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                
                <button className="w-full sm:w-auto px-8 py-4 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-full font-medium hover:border-gray-900 dark:hover:border-white transition-all duration-300 flex items-center justify-center">
                  Explore Featured
                </button>
              </div>
              
              {/* Trust badges */}
              <div className="fade-in opacity-0 transform translate-y-8 transition-all duration-700 ease-out delay-400">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">TRUSTED BY MILLIONS WORLDWIDE</p>
                <div className="flex flex-wrap items-center gap-6">
                  {['Secure Payments', 'Free Shipping', 'Easy Returns', '24/7 Support'].map((item, i) => (
                    <div key={i} className="flex items-center text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right side: Image & product showcase */}
            <div className="order-1 lg:order-2 relative">
              {/* Main image */}
              <div className="fade-in relative aspect-[4/3] opacity-0 transform translate-y-8 transition-all duration-700 ease-out">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl"></div>
                <div className="absolute inset-0 rounded-2xl overflow-hidden p-4">
                  <div className="relative h-full w-full perspective">
                    {/* Floating product images */}
                    <div 
                      ref={el => imageRefs.current[0] = el}
                      className="absolute top-[10%] left-[5%] w-1/2 z-20"
                    >
                      <div className="relative shadow-2xl rounded-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80" 
                          alt="Smart Watch" 
                          className="w-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <div className="text-white/90 text-sm">Smart Watch</div>
                        </div>
                      </div>
                    </div>

                    <div 
                      ref={el => imageRefs.current[1] = el}
                      className="absolute top-[5%] right-[10%] w-1/3 z-30"
                    >
                      <div className="relative shadow-2xl rounded-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop&q=80" 
                          alt="Headphones" 
                          className="w-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <div className="text-white/90 text-sm">Headphones</div>
                        </div>
                      </div>
                    </div>

                    <div 
                      ref={el => imageRefs.current[2] = el}
                      className="absolute bottom-[15%] left-[15%] w-2/5 z-10"
                    >
                      <div className="relative shadow-2xl rounded-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=80" 
                          alt="Laptop" 
                          className="w-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <div className="text-white/90 text-sm">Laptop</div>
                        </div>
                      </div>
                    </div>

                    <div 
                      ref={el => imageRefs.current[3] = el}
                      className="absolute bottom-[5%] right-[5%] w-1/3 z-40"
                    >
                      <div className="relative shadow-2xl rounded-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=80" 
                          alt="Speakers" 
                          className="w-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <div className="text-white/90 text-sm">Speakers</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Hot deals floating card */}
              <div className="fade-in absolute -bottom-4 -left-4 max-w-xs shadow-xl rounded-xl bg-white dark:bg-gray-800 p-4 opacity-0 transform translate-y-8 transition-all duration-700 ease-out delay-500">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-500">
                    <FiTrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Today's Deal</div>
                    <div className="font-semibold">Up to 50% Off</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Limited time offer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Scroll to explore</span>
            <div className="animate-bounce">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Section with Interactive Tabs */}
      <section className="py-28 px-4 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            color: isDarkMode ? 'white' : 'black'
          }} />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-16" data-aos="fade-up">
            <span className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium mb-3">
              Collections
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">Explore By Category</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Discover our handpicked collections of premium products organized for your convenience.
            </p>
          </div>
          
          {/* Interactive Category Tabs */}
          <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {['All Products', 'Electronics', 'Fashion', 'Home', 'Accessories'].map((category, index) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(index)}
                  className={`relative px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                    activeTab === index 
                      ? 'text-white' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {activeTab === index && (
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full -z-10 animate-scale-in" />
                  )}
                  {category}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-gray-100 dark:bg-gray-800"
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <img 
                    src={`https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhaXJ8ZW58MHx8MHx8fDA%3D`}
                    alt="Category"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-2xl font-bold text-white mb-2">Premium Collection</h3>
                    <p className="text-white/80 mb-4 transform opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                      Discover our exclusive selection of premium products.
                    </p>
                    <Link 
                      to="/products" 
                      className="inline-flex items-center text-white font-medium transform opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-150"
                    >
                      Explore Now <FiArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16" data-aos="fade-up">
            <div>
              <span className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium mb-3">
                Top Products
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mt-3 md:mt-0">
              Browse our selection of top products that our customers love. Quality and satisfaction guaranteed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-16">
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:shadow-lg transition-all duration-300 font-medium group"
            >
              View All Products
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial/CTA Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 lg:p-12 relative">
                  <svg className="absolute text-primary h-16 w-16 -left-6 -top-6 opacity-20" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  
                  <p className="text-xl leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
                    "Drip Deals has completely transformed my online shopping experience. The products are high-quality, delivery is always prompt, and their customer service is exceptional. I won't shop anywhere else!"
                  </p>
                  
                  <div className="flex items-center">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Customer" className="h-12 w-12 rounded-full object-cover" />
                    <div className="ml-4">
                      <h4 className="font-semibold">Sarah Johnson</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Loyal Customer</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div data-aos="fade-left">
                <span className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium mb-3">
                  Special Offer
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Get 15% Off Your First Order</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Subscribe to our newsletter and receive exclusive offers, early access to new products, and personalized recommendations.
                </p>
                
                <form className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow px-4 py-3 bg-gray-100  border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800"
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands/Trust Section */}
      <section className="py-16 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12" data-aos="fade-up">
            TRUSTED BY TOP BRANDS WORLDWIDE
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            <div data-aos="fade-up" data-aos-delay="100">
              <svg viewBox="0 0 24 24" height="48" width="48" fill="currentColor" className="text-gray-500 dark:text-gray-400">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <svg viewBox="0 0 24 24" height="48" width="48" fill="currentColor" className="text-gray-500 dark:text-gray-400">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <svg viewBox="0 0 24 24" height="48" width="48" fill="currentColor" className="text-gray-500 dark:text-gray-400">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
              </svg>
            </div>
            <div data-aos="fade-up" data-aos-delay="400">
              <svg viewBox="0 0 24 24" height="48" width="48" fill="currentColor" className="text-gray-500 dark:text-gray-400">
                <path d="M16.12 4C14.16 3.28 13.12 3 12 3s-2.16.28-3.09.75L6.6 1.44l-.82.83 2.1 2.1C6.14 5.64 5 7.68 5 10v1h14v-1c0-2.32-1.14-4.36-2.88-5.63zM9 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
              </svg>
            </div>
            <div data-aos="fade-up" data-aos-delay="500">
              <svg viewBox="0 0 24 24" height="48" width="48" fill="currentColor" className="text-gray-500 dark:text-gray-400">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionary Features Section with 3D Card Effects */}
      <section className="py-32 relative">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/10 to-transparent rounded-full filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-secondary/10 to-transparent rounded-full filter blur-3xl opacity-50 transform translate-x-1/4 translate-y-1/4"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20" data-aos="fade-up">
            <span className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium mb-3">
              Premium Experience
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">Why Choose Drip Deals</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Discover a shopping experience unlike any other with our premium features and commitment to excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {/* 3D Feature Cards */}
            {[
              {
                icon: <FiShoppingBag className="w-8 h-8" />,
                title: "Premium Selection",
                description: "Carefully curated products of exceptional quality",
                color: "from-blue-500 to-indigo-500"
              },
              {
                icon: <FiTruck className="w-8 h-8" />,
                title: "Fast Delivery",
                description: "Free shipping and quick delivery on all orders over $50",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: <FiCreditCard className="w-8 h-8" />,
                title: "Secure Payments",
                description: "Multiple secure payment options available",
                color: "from-amber-500 to-orange-500"
              },
              {
                icon: <FiShield className="w-8 h-8" />,
                title: "Money-Back Guarantee",
                description: "30-day return policy for complete peace of mind",
                color: "from-purple-500 to-pink-500"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group perspective"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative h-full transform-style-3d transition-transform duration-700 group-hover:rotate-y-12">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden h-full p-8 backface-hidden">
                    <div 
                      className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white transform group-hover:scale-110 transition-transform`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <FiArrowRight className="text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trending Products Section with Magnetic Hover Effects */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"></div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-primary/5 to-secondary/10 dark:from-primary/10 dark:to-secondary/20 animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${15 + Math.random() * 15}s`,
                opacity: 0.3 + Math.random() * 0.4
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div data-aos="fade-up">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-500 mr-3">
                  <FiTrendingUp className="w-4 h-4" />
                </div>
                <span className="text-red-500 font-medium">Trending Now</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-2">This Week's Hottest</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
            </div>
            
            <div className="mt-6 md:mt-0" data-aos="fade-up" data-aos-delay="100">
              <div className="relative magnetic-button">
                <Link 
                  to="/trending" 
                  className="relative inline-flex items-center gap-2 py-3 px-6 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-full font-medium overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <span>View All Trending</span>
                  <span className="relative z-10 transition-transform duration-500 transform group-hover:translate-x-1">
                    <FiArrowRight />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 3).map((product, index) => (
              <div 
                key={product.id}
                className="relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="trending-card bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 dark:opacity-80"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-bold text-2xl group-hover:-translate-y-1 transition-transform duration-300">{product.name}</h3>
                        <div className="relative">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 hover:bg-white/20">
                            <FiHeart className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="text-yellow-400 flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(product.rating.rate) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}>★</span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                          ({product.rating.count})
                        </span>
                      </div>
                      <div className="font-bold text-2xl text-primary">${product.price.toFixed(2)}</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Link 
                        to={`/products/${product.id}`}
                        className="text-gray-700 dark:text-gray-300 font-medium hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <FiArrowRight className="w-4 h-4" />
                      </Link>
                      
                      <button className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all dark:hover:bg-primary">
                        <FiShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Trend label */}
                <div className="absolute -top-3 -right-3 z-10">
                  <div className="relative">
                    <div className="w-24 h-24 absolute top-0 right-0 text-white overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24">
                        <div className="absolute top-0 right-0 transform rotate-45 translate-y-[8px] -translate-x-[15px] w-[120px] text-center text-xs font-bold py-1 bg-gradient-to-r from-red-500 to-orange-500 shadow-md">TRENDING</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Search Component */}
      <div className="fixed bottom-8 right-8 z-50 md:block hidden">
        <div className="relative group">
          <button className="w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:rotate-12 group-hover:shadow-primary/50">
            <FiSearch className="w-6 h-6" />
          </button>
          
          <div className="absolute bottom-full right-0 mb-4 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform group-hover:translate-y-0 translate-y-4 transition-all duration-300">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                <FiSearch className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Trending Searches:</p>
              <div className="flex flex-wrap gap-2">
                {['Headphones', 'Smartwatch', 'Camera', 'Speaker'].map((term) => (
                  <span key={term} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-1 px-2 rounded-full hover:bg-primary hover:text-white cursor-pointer transition-colors">
                    {term}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Search Component */}
      <div className="fixed bottom-8 right-8 z-50 md:hidden block">
        <div className="relative">
          <button 
            className="w-12 h-12 rounded-full bg-primary text-white shadow-lg flex items-center justify-center"
            onClick={() => {
              const searchModal = document.getElementById('mobile-search-modal');
              if (searchModal) {
                searchModal.classList.toggle('hidden');
              }
            }}
          >
            <FiSearch className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Mobile Search Modal */}
      <div id="mobile-search-modal" className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 hidden">
        <div className="absolute top-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-lg animate-slide-down">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
              autoFocus
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
              <FiSearch className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-3">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Trending Searches:</p>
            <div className="flex flex-wrap gap-2">
              {['Headphones', 'Smartwatch', 'Camera', 'Speaker'].map((term) => (
                <span key={term} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-1 px-2 rounded-full hover:bg-primary hover:text-white cursor-pointer transition-colors">
                  {term}
                </span>
              ))}
            </div>
          </div>
          
          <button 
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
            onClick={() => {
              const searchModal = document.getElementById('mobile-search-modal');
              if (searchModal) {
                searchModal.classList.add('hidden');
              }
            }}
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Immersive Product Showcase with Animated Elements */}
      <section className="py-32 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900"></div>
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="product-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#product-grid)" />
          </svg>
        </div>
        
        {/* Decorative shapes */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full filter blur-3xl"></div>
        
        {/* Content */}
        <div className="container mx-auto px-6 relative z-10">
          {/* Section header */}
          <div className="max-w-xl mx-auto text-center mb-20">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
              HANDPICKED COLLECTION
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Featured Products</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300">
              Discover our exclusive selection of premium products that blend style, functionality, and exceptional quality
            </p>
          </div>
          
          {/* Product filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {['All', 'New Arrivals', 'Best Sellers', 'Special Offers', 'Trending'].map((category, index) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  index === 0 
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id}
                className="group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                  {/* Product image with overlay */}
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 flex items-center justify-center">
                      <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 flex space-x-3">
                        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-900 hover:bg-primary hover:text-white transition-colors">
                          <FiShoppingBag size={18} />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-900 hover:bg-primary hover:text-white transition-colors">
                          <FiHeart size={18} />
                        </button>
                        <Link to={`/products/${product.id}`} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-900 hover:bg-primary hover:text-white transition-colors">
                          <FiSearch size={18} />
                        </Link>
                      </div>
                    </div>
                    
                    {/* Product badges */}
                    {product.discount && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
                        {product.discount}% OFF
                      </div>
                    )}
                    {product.new && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded">
                        NEW
                      </div>
                    )}
                  </div>
                  
                  {/* Product info */}
                  <div className="p-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.category}</div>
                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xs ${i < Math.floor(product.rating.rate) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}>★</span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        ({product.rating.count})
                      </span>
                    </div>
                    
                    {/* Price */}
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-lg text-gray-900 dark:text-white">${product.price.toFixed(2)}</div>
                      <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-primary hover:text-white transition-all dark:hover:bg-primary">
                        <FiPlus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* View all button */}
          <div className="flex justify-center mt-16">
            <Link 
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:shadow-lg transition-all duration-300 font-medium group"
            >
              View All Products
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Interactive Testimonial/CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800"></div>
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Testimonial Card */}
              <div data-aos="fade-right">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 lg:p-12 relative">
                  {/* Quote icon */}
                  <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.13 5.42C6.64 5.77 4.43 7.42 3.5 9.72C2.73 11.55 2.77 13.74 3.14 16.54C6.1 15.54 8.12 14.14 8.87 12.65C9.54 11.32 9.26 9.72 8.91 8.8C8.58 7.94 8.01 7.42 7.39 7.21C7.95 6.96 8.55 6.96 9.13 7.11C11.06 7.6 12.03 9.59 12.03 9.59C12.88 11.42 12.99 15.32 12.03 18C16.28 17.73 17.6 12.26 17.6 12.26C18.17 9.97 17.63 7.38 16.08 5.8C14.55 4.26 11.61 5.07 9.13 5.42Z" />
                    </svg>
                  </div>
                  
                  {/* Quote text with dynamic underline */}
                  <div className="mb-8">
                    <p className="text-xl md:text-2xl leading-relaxed mb-6 text-gray-700 dark:text-gray-300 relative">
                      <span className="relative">
                        Drip Deals has completely transformed my online shopping
                        <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6">
                          <path 
                            d="M0,3 Q40,0 80,3 T160,3 T240,3 T300,3 T360,3" 
                            stroke={`rgb(${theme.primary})`}
                            strokeWidth="2"
                            fill="none"
                          />
                        </svg>
                      </span> experience. The products are high-quality, delivery is always prompt, and their customer service is exceptional. I won't shop anywhere else!
                    </p>
                  </div>
                  
                  {/* Customer info with animated border */}
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Customer" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute inset-0 border-2 border-primary rounded-full animate-pulse-border"></div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">Sarah Johnson</h4>
                      <div className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
                        <span className="mr-1">Verified Customer</span>
                        <span className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Newsletter/CTA Section */}
              <div data-aos="fade-left">
                <span className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium mb-3">
                  Limited Time Offer
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Get 15% Off Your First Order</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                  Join our newsletter and receive exclusive offers, early access to new products, and personalized recommendations tailored to your preferences.
                </p>
                
                <form className="relative z-10 group">
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="relative flex-grow">
                      <input 
                        type="email" 
                        placeholder="Your email address" 
                        className="w-full px-5 py-4 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:focus:bg-gray-700 transition-all pr-10"
                        required
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <FiMail className="text-gray-400" />
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-4 rounded-lg font-medium transition-all relative overflow-hidden shadow-lg hover:shadow-primary/50"
                    >
                      <div className="relative z-10">Subscribe</div>
                      <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-secondary to-primary"></div>
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    By subscribing, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
                
                {/* Trust badges */}
                <div className="mt-12">
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">TRUSTED BY LEADING BRANDS</p>
                  <div className="flex flex-wrap items-center gap-6">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
                        <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor" className="text-gray-500 dark:text-gray-400">
                          <path d={[
                            "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
                            "M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z",
                            "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
                            "M5 16c0 3.87 3.13 7 7 7s7-3.13 7-7v-4H5v4zM16.12 4.37l2.1-2.1-.82-.83-2.3 2.31C14.16 3.28 13.12 3 12 3s-2.16.28-3.09.75L6.6 1.44l-.82.83 2.1 2.1C6.14 5.64 5 7.68 5 10v1h14v-1c0-2.32-1.14-4.36-2.88-5.63zM9 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z",
                            "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"
                          ][i]} />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Innovative Footer CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
        {/* Animated wave background */}
        <div className="absolute inset-0 z-0">
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path 
              fill="rgba(255, 255, 255, 0.1)" 
              fillOpacity="1" 
              d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,165.3C672,192,768,224,864,224C960,224,1056,192,1152,176C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="animate-wave-slow"
            ></path>
          </svg>
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path 
              fill="rgba(255, 255, 255, 0.05)" 
              fillOpacity="1" 
              d="M0,256L48,261.3C96,267,192,277,288,245.3C384,213,480,139,576,128C672,117,768,171,864,197.3C960,224,1056,224,1152,208C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="animate-wave"
            ></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Shopping Experience?</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover why Drip Deals is the premier destination for quality products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products" 
                className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-full font-semibold text-lg transition-colors"
              >
                Start Shopping
              </Link>
              <Link 
                to="/contact" 
                className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

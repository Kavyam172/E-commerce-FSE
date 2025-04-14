import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiShoppingCart, FiArrowLeft, FiMinus, FiPlus } from 'react-icons/fi';
import { getProductById, products } from '../data/products';
import { useApp } from '../config/AppContext';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, theme } = useApp();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    // Scroll to top when product changes
    window.scrollTo(0, 0);
    
    // Reset quantity
    setQuantity(1);
    
    // Simulate loading state
    setIsLoading(true);
    
    // Fetch product details
    // This would be replaced with an API call to your backend
    // Example: const fetchProduct = async () => {
    //   const response = await axios.get(`/api/products/${id}`);
    //   setProduct(response.data);
    //   setIsLoading(false);
    // };
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const foundProduct = getProductById(parseInt(id));
      setProduct(foundProduct);
      
      // Get related products (same category)
      if (foundProduct) {
        const related = products
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Sorry, the product you're looking for doesn't exist or has been removed.
        </p>
        <Link 
          to="/products" 
          className="inline-flex items-center text-primary hover:text-primary/90"
        >
          <FiArrowLeft className="mr-2" /> Back to Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6" data-aos="fade-right">
          <nav className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
              Products
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700 dark:text-gray-300">{product.name}</span>
          </nav>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Product Image */}
          <div className="lg:w-1/2" data-aos="fade-right">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain p-8"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="lg:w-1/2" data-aos="fade-left">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`${
                      i < Math.floor(product.rating.rate) 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-500 dark:text-gray-400">
                ({product.rating.count} reviews)
              </span>
            </div>
            
            <div className="text-2xl font-bold mb-6" style={{ color: theme.primary }}>
              ${product.price.toFixed(2)}
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {product.description}
            </p>
            
            <div className="mb-6">
              <div className="text-sm font-medium mb-2">Quantity</div>
              <div className="flex items-center">
                <button 
                  onClick={() => handleQuantityChange(-1)} 
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-l-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  disabled={quantity === 1}
                >
                  <FiMinus />
                </button>
                <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-300 dark:border-gray-700">
                  {quantity}
                </div>
                <button 
                  onClick={() => handleQuantityChange(1)} 
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-r-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FiPlus />
                </button>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
              >
                <FiShoppingCart /> Add to Cart
              </button>
              <Link 
                to="/checkout" 
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
              >
                Buy Now
              </Link>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <span className="font-medium">Category:</span>
                  <span className="text-gray-700 dark:text-gray-300">{product.category}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium">Availability:</span>
                  <span className={product.inStock ? 'text-green-500' : 'text-red-500'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6" data-aos="fade-up">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;

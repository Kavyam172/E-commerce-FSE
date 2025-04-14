import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useApp } from '../config/AppContext';

const ProductCard = ({ product }) => {
  const { addToCart, theme } = useApp();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      data-aos="fade-up"
    >
      <Link to={`/products/${product.id}`}>
        <div className="relative h-64 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {product.featured && (
            <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded">
              Featured
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1 line-clamp-1">{product.name}</h3>
          
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={`text-xs ${
                  i < Math.floor(product.rating.rate) 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({product.rating.count})
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="font-bold" style={{ color: theme.primary }}>
              ${product.price.toFixed(2)}
            </p>
            
            <button
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              aria-label="Add to cart"
            >
              <FiShoppingCart />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

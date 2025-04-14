import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import { useApp } from '../config/AppContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useApp();
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Simulate cart update
  const updateCart = (productId, quantity) => {
    setIsUpdating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      updateQuantity(productId, quantity);
      setIsUpdating(false);
    }, 300);
  };
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div data-aos="fade-up">
          <div className="flex justify-center mb-6">
            <FiShoppingBag className="text-6xl text-gray-300 dark:text-gray-700" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link 
            to="/products" 
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8" data-aos="fade-up">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3" data-aos="fade-up">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 font-medium">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {cart.map((item) => (
                  <div 
                    key={item.id} 
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center"
                    data-aos="fade-up"
                  >
                    {/* Product */}
                    <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <Link 
                          to={`/products/${item.id}`} 
                          className="font-medium hover:text-primary dark:hover:text-primary transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1 mt-1"
                        >
                          <FiTrash2 /> Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="md:col-span-2 text-center">
                      <div className="md:hidden text-sm text-gray-500 dark:text-gray-400">Price:</div>
                      ${item.price.toFixed(2)}
                    </div>
                    
                    {/* Quantity */}
                    <div className="md:col-span-2 flex flex-col md:items-center">
                      <div className="md:hidden text-sm text-gray-500 dark:text-gray-400 mb-1">Quantity:</div>
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateCart(item.id, item.quantity - 1)} 
                          disabled={isUpdating || item.quantity === 1}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-l-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
                        >
                          <FiMinus className="text-sm" />
                        </button>
                        <div className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300 dark:border-gray-700">
                          {item.quantity}
                        </div>
                        <button 
                          onClick={() => updateCart(item.id, item.quantity + 1)} 
                          disabled={isUpdating}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-r-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
                        >
                          <FiPlus className="text-sm" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="md:col-span-2 text-center font-medium">
                      <div className="md:hidden text-sm text-gray-500 dark:text-gray-400">Total:</div>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <Link 
                to="/products" 
                className="inline-flex items-center text-primary hover:text-primary/90"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3" data-aos="fade-left">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
                {cartTotal < 50 && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 pt-2">
                    Add ${(50 - cartTotal).toFixed(2)} more to qualify for free shipping
                  </div>
                )}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Link
                to="/checkout"
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Checkout <FiArrowRight />
              </Link>
              
              <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                <p>We accept:</p>
                <div className="flex gap-2 mt-2">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1">Visa</div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1">Mastercard</div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1">PayPal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

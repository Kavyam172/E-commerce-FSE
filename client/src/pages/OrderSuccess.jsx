import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiShoppingBag } from 'react-icons/fi';
import { useApp } from '../config/AppContext';

const OrderSuccess = () => {
  const { cart, cartTotal } = useApp();
  
  // Clear cart after order success
  // In a real application, this would be done after order confirmation from the backend
  useEffect(() => {
    // Example of backend integration
    // const confirmOrder = async (orderId) => {
    //   try {
    //     await axios.post('/api/orders/confirm', { orderId });
    //     // Clear cart after order is confirmed
    //     clearCart();
    //   } catch (error) {
    //     console.error('Error confirming order:', error);
    //   }
    // };
    
    // For demo purposes, we'll assume the order is confirmed
    // clearCart();
  }, []);
  
  // Generate a random order number for demo purposes
  const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center" data-aos="fade-up">
          <div className="mb-6 flex justify-center">
            <FiCheckCircle className="text-6xl text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Order Number</div>
            <div className="text-xl font-mono font-bold">#ORD-{orderNumber}</div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Items Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax</span>
                <span>${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold">
                <span>Total</span>
                <span>${(cartTotal + (cartTotal * 0.08)).toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            We've sent a confirmation email to your email address with all the details.
            You can also check your order status in your account dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-md font-medium transition-colors"
            >
              Continue Shopping
            </Link>
            <Link 
              to="/orders" 
              className="border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
            >
              <FiShoppingBag /> My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiLock } from 'react-icons/fi';
import { useApp } from '../config/AppContext';

const Checkout = () => {
  const { cart, cartTotal, user } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const validate = () => {
    const errors = {};
    
    // Personal info validation
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    // Shipping validation
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.state) errors.state = 'State is required';
    if (!formData.zip) errors.zip = 'ZIP code is required';
    
    // Payment validation
    if (!formData.cardName) errors.cardName = 'Name on card is required';
    if (!formData.cardNumber) {
      errors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      errors.cardNumber = 'Card number is invalid';
    }
    if (!formData.expMonth) errors.expMonth = 'Expiration month is required';
    if (!formData.expYear) errors.expYear = 'Expiration year is required';
    if (!formData.cvv) {
      errors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      errors.cvv = 'CVV is invalid';
    }
    
    return errors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validate();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call to backend for order processing
      setTimeout(() => {
        // This would be replaced with an actual API call
        // Example: 
        // const submitOrder = async () => {
        //   try {
        //     const response = await axios.post('/api/orders', {
        //       items: cart,
        //       total: cartTotal,
        //       shipping: formData,
        //       payment: {
        //         cardName: formData.cardName,
        //         cardNumber: formData.cardNumber.replace(/\s/g, ''),
        //         expiry: `${formData.expMonth}/${formData.expYear}`,
        //         cvv: formData.cvv
        //       }
        //     });
        //     
        //     return response.data;
        //   } catch (error) {
        //     console.error('Order submission failed', error);
        //     throw error;
        //   }
        // };
        
        setIsSubmitting(false);
        navigate('/order-success');
      }, 1500);
    }
  };
  
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8" data-aos="fade-up">Checkout</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left side - Form */}
            <div className="lg:w-2/3" data-aos="fade-up">
              {/* Contact Information */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-md border ${
                        formErrors.firstName 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-gray-300 dark:border-gray-700'
                      } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {formErrors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-md border ${
                        formErrors.lastName 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-gray-300 dark:border-gray-700'
                      } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {formErrors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md border ${
                      formErrors.email 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-700'
                    } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                  )}
                </div>
              </div>
              
              {/* Shipping Information */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium mb-1">
                    Street Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md border ${
                      formErrors.address 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-700'
                    } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {formErrors.address && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">
                      City*
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-md border ${
                        formErrors.city 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-gray-300 dark:border-gray-700'
                      } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {formErrors.city && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-1">
                      State/Province*
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-md border ${
                        formErrors.state 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-gray-300 dark:border-gray-700'
                      } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {formErrors.state && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium mb-1">
                      ZIP/Postal Code*
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-md border ${
                        formErrors.zip 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-gray-300 dark:border-gray-700'
                      } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {formErrors.zip && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.zip}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium mb-1">
                      Country*
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Payment Information</h2>
                  <div className="flex items-center text-green-600">
                    <FiLock className="mr-1" />
                    <span className="text-xs">Secure Connection</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                    Name on Card*
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md border ${
                      formErrors.cardName 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-700'
                    } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {formErrors.cardName && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.cardName}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                    Card Number*
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="XXXX XXXX XXXX XXXX"
                    className={`w-full px-4 py-2 rounded-md border ${
                      formErrors.cardNumber 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-700'
                    } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {formErrors.cardNumber && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.cardNumber}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="expMonth" className="block text-sm font-medium mb-1">
                      Expiry Month*
                    </label>
                    <select
                      id="expMonth"
                      name="expMonth"
                      value={formData.expMonth}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-md border ${
                        formErrors.expMonth 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-gray-300 dark:border-gray-700'
                      } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                    >
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = i + 1;
                        return (
                          <option key={month} value={month < 10 ? `0${month}` : month}>
                            {month < 10 ? `0${month}` : month}
                          </option>
                        );
                      })}
                    </select>
                    {formErrors.expMonth && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.expMonth}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="expYear" className="block text-sm font-medium mb-1">
                      Expiry Year*
                    </label>
                    <select
                      id="expYear"
                      name="expYear"
                      value={formData.expYear}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-md border ${
                        formErrors.expYear 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-gray-300 dark:border-gray-700'
                      } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                    >
                      <option value="">Year</option>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = new Date().getFullYear() + i;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                    {formErrors.expYear && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.expYear}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                      CVV*
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="XXX"
                      maxLength="4"
                      className={`w-full px-4 py-2 rounded-md border ${
                        formErrors.cvv 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-gray-300 dark:border-gray-700'
                      } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {formErrors.cvv && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.cvv}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Link 
                  to="/cart" 
                  className="inline-flex items-center text-primary hover:text-primary/90"
                >
                  <FiArrowLeft className="mr-2" /> Back to Cart
                </Link>
              </div>
            </div>
            
            {/* Right side - Order Summary */}
            <div className="lg:w-1/3" data-aos="fade-left">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="max-h-64 overflow-y-auto mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium line-clamp-1">{item.name}</h3>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Qty: {item.quantity}
                          </span>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="text-green-500">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax</span>
                    <span>${(cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${(cartTotal + (cartTotal * 0.08)).toFixed(2)}</span>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>
                
                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                  By placing your order, you agree to our <Link to="/terms" className="text-primary">Terms of Service</Link> and <Link to="/privacy" className="text-primary">Privacy Policy</Link>.
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

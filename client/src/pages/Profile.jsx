import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiEdit2, FiSave, FiX, FiUser, FiMail, FiPhone, FiMapPin, FiShoppingBag } from 'react-icons/fi';
import { useApp } from '../config/AppContext';

const Profile = () => {
  const { user, login, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });
  const [orderHistory, setOrderHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Parse query parameters to set the active tab
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'orders') {
      setActiveTab('orders');
    }
  }, [location.search]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/profile' } });
    } else {
      // Initialize form data with user data
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || ''
        }
      });

      // Here you would normally fetch order history from an API
      // For now, we'll use mock data
      setOrderHistory([
        {
          id: 'ORD-10012-AB',
          date: '2025-05-15',
          total: 129.99,
          status: 'Delivered',
          items: [
            { id: 1, name: 'Wireless Headphones', price: 89.99, quantity: 1 },
            { id: 2, name: 'Phone Case', price: 19.99, quantity: 2 }
          ]
        },
        {
          id: 'ORD-9985-CD',
          date: '2025-04-28',
          total: 349.95,
          status: 'Processing',
          items: [
            { id: 3, name: 'Smart Watch', price: 249.99, quantity: 1 },
            { id: 4, name: 'Charging Cable', price: 24.99, quantity: 4 }
          ]
        }
      ]);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send an API request to update the user profile
    // For this demo, we'll just update it in localStorage
    
    const updatedUser = {
      ...user,
      ...formData
    };
    
    login(updatedUser); // This updates the user in context and localStorage
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original user data
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: {
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        zipCode: user.address?.zipCode || '',
        country: user.address?.country || ''
      }
    });
  };

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden" data-aos="fade-up">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 dark:bg-gray-900 p-4">
            <div className="flex flex-col items-center space-y-4 py-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <FiUser size={32} />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
            
            <nav className="mt-8 space-y-1">
              <button 
                className={`w-full text-left py-2 px-4 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'profile'
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => {
                  setActiveTab('profile');
                  navigate('/profile', { replace: true });
                }}
              >
                <FiUser />
                <span>Profile</span>
              </button>
              <button 
                className={`w-full text-left py-2 px-4 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'orders'
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => {
                  setActiveTab('orders');
                  navigate('/profile?tab=orders', { replace: true });
                }}
              >
                <FiShoppingBag />
                <span>Order History</span>
              </button>
            </nav>
          </div>
          
          {/* Main content */}
          <div className="flex-1 p-6">
            {activeTab === 'profile' ? (
              <>
                <div className="flex justify-between items-center pb-4 border-b dark:border-gray-700">
                  <h2 className="text-2xl font-bold">Profile Information</h2>
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-md transition-colors"
                    >
                      <FiEdit2 size={16} />
                      <span>Edit</span>
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button 
                        onClick={handleCancel}
                        className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-md transition-colors"
                      >
                        <FiX size={16} />
                        <span>Cancel</span>
                      </button>
                      <button 
                        onClick={handleSubmit}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
                      >
                        <FiSave size={16} />
                        <span>Save</span>
                      </button>
                    </div>
                  )}
                </div>
                
                <form className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information Section */}
                    <div className="col-span-2">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FiUser className="text-primary" />
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Full Name
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-900"
                            />
                          ) : (
                            <p className="text-gray-800 dark:text-gray-200">{formData.name || 'Not provided'}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                          </label>
                          {isEditing ? (
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-900"
                            />
                          ) : (
                            <p className="text-gray-800 dark:text-gray-200">{formData.email || 'Not provided'}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone Number
                          </label>
                          {isEditing ? (
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-900"
                            />
                          ) : (
                            <p className="text-gray-800 dark:text-gray-200">{formData.phone || 'Not provided'}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Address Section */}
                    <div className="col-span-2">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FiMapPin className="text-primary" />
                        Address
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Street Address
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="address.street"
                              value={formData.address.street}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-900"
                            />
                          ) : (
                            <p className="text-gray-800 dark:text-gray-200">{formData.address.street || 'Not provided'}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            City
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="address.city"
                              value={formData.address.city}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-900"
                            />
                          ) : (
                            <p className="text-gray-800 dark:text-gray-200">{formData.address.city || 'Not provided'}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            State / Province
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="address.state"
                              value={formData.address.state}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-900"
                            />
                          ) : (
                            <p className="text-gray-800 dark:text-gray-200">{formData.address.state || 'Not provided'}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ZIP / Postal Code
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="address.zipCode"
                              value={formData.address.zipCode}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-900"
                            />
                          ) : (
                            <p className="text-gray-800 dark:text-gray-200">{formData.address.zipCode || 'Not provided'}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Country
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="address.country"
                              value={formData.address.country}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-900"
                            />
                          ) : (
                            <p className="text-gray-800 dark:text-gray-200">{formData.address.country || 'Not provided'}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              // Order History Tab
              <>
                <div className="pb-4 border-b dark:border-gray-700">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <FiShoppingBag className="text-primary" />
                    Order History
                  </h2>
                </div>
                
                {orderHistory.length > 0 ? (
                  <div className="mt-6 space-y-6">
                    {orderHistory.map((order) => (
                      <div key={order.id} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                          <div>
                            <p className="text-lg font-semibold">{order.id}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Placed on {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                : order.status === 'Processing'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            }`}>
                              {order.status}
                            </span>
                            <p className="text-lg font-semibold mt-1">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Items</h4>
                          <ul className="space-y-3">
                            {order.items.map((item) => (
                              <li key={item.id} className="flex justify-between">
                                <div>
                                  <p className="text-sm font-medium">{item.name}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                                </div>
                                <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mt-4">
                          <button className="text-primary hover:text-primary-dark text-sm font-medium">
                            View Order Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 text-center py-8">
                    <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">No orders yet</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Your order history will appear here once you make a purchase.
                    </p>
                    <div className="mt-6">
                      <button 
                        onClick={() => navigate('/products')}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        Start Shopping
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

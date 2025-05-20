import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiAlertCircle, FiEye, FiEyeOff, FiMail } from 'react-icons/fi';
import { useApp } from '../config/AppContext';

const Login = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formTouched, setFormTouched] = useState({
    email: false,
    password: false
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    setFormTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Clear error on input change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };
  
  // Validate form on blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    validateField(name, value);
  };
  
  // Validate a specific field
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    if (name === 'email') {
      if (!value.trim()) {
        newErrors.email = 'Email is required';
      } else if (!isValidEmail(value)) {
        newErrors.email = 'Please enter a valid email address';
      } else {
        delete newErrors.email;
      }
    }
    
    if (name === 'password') {
      if (!value) {
        newErrors.password = 'Password is required';
      } else if (value.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      } else {
        delete newErrors.password;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const emailValid = validateField('email', formData.email);
    const passwordValid = validateField('password', formData.password);
    
    // Set all fields as touched
    setFormTouched({
      email: true,
      password: true
    });
    
    // If any validation failed, stop submission
    if (!emailValid || !passwordValid) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call to backend
      // In a real app, you'd integrate with your backend here
      // const response = await axios.post('/api/auth/login', {
      //   email: formData.email,
      //   password: formData.password
      // });
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll use dummy data
      // In production, you'd use the response from your API
      if (formData.email === 'user@example.com' && formData.password === 'password') {
        const userData = {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'user@example.com',
        };
        
        login(userData);
        navigate('/');
      } else {
        setErrors({ form: 'Invalid email or password' });
      }
    } catch (err) {
      setErrors({ form: 'Login failed. Please try again.' });
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto" data-aos="fade-up">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Login to access your account
              </p>
            </div>
            
            {errors.form && (
              <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md flex items-start gap-2">
                <FiAlertCircle className="mt-0.5 flex-shrink-0" />
                <span>{errors.form}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FiMail />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-4 py-3 border transition-all duration-300 ${errors.email && formTouched.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                    autoComplete="email"
                  />
                  {errors.email && formTouched.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/90">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FiLock />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-3 border transition-all duration-300 ${errors.password && formTouched.password ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                    autoComplete="current-password"
                  />
                  <button 
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                  {errors.password && formTouched.password && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} />
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="mr-2 w-4 h-4 accent-primary cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-sm">
                  Remember me
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-70 hover:shadow-lg hover:shadow-primary/20"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
              
              <div className="text-center mt-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-primary hover:text-primary/90">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
            
            {/* <div className="relative flex items-center justify-center mt-8">
              <div className="absolute border-t border-gray-300 dark:border-gray-700 w-full"></div>
              <div className="relative bg-white dark:bg-gray-800 px-4 text-sm text-gray-500 dark:text-gray-400">
                Or continue with
              </div>
            </div> */}
            
            {/* <div className="grid grid-cols-2 gap-4 mt-6">
              <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-[#4285F4]" viewBox="0 0 16 16">
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-[#1877F2]" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
                Facebook
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

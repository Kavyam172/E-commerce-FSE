import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiAlertCircle, FiEye, FiEyeOff, FiCheckCircle } from 'react-icons/fi';
import { useApp } from '../config/AppContext';

const Signup = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formTouched, setFormTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    agreeToTerms: false
  });
  
  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    setFormTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Clear error for the field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    
    // Update password strength when password changes
    if (name === 'password') {
      checkPasswordStrength(value);
    }
    
    // Check if confirm password matches when either password or confirm password changes
    if (name === 'confirmPassword' || (name === 'password' && formData.confirmPassword)) {
      const confirmValue = name === 'confirmPassword' ? value : formData.confirmPassword;
      const passwordValue = name === 'password' ? value : formData.password;
      
      if (confirmValue && confirmValue !== passwordValue) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else if (confirmValue) {
        setErrors(prev => ({ ...prev, confirmPassword: null }));
      }
    }
  };
  
  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };
  
  // Check password strength
  const checkPasswordStrength = (password) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    // Calculate score (0-4)
    let score = 0;
    if (hasMinLength) score++;
    if (hasUpperCase) score++;
    if (hasLowerCase) score++;
    if (hasNumber) score++;
    if (hasSpecialChar) score++;
    
    setPasswordStrength({
      score: Math.min(score, 4),  // Cap at 4
      hasMinLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar
    });
  };
  
  // Validate form on blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
  
  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };
  
  // Validate a specific field
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          newErrors.firstName = 'First name is required';
        } else if (value.trim().length < 2) {
          newErrors.firstName = 'First name must be at least 2 characters';
        } else {
          delete newErrors.firstName;
        }
        break;
        
      case 'lastName':
        if (!value.trim()) {
          newErrors.lastName = 'Last name is required';
        } else if (value.trim().length < 2) {
          newErrors.lastName = 'Last name must be at least 2 characters';
        } else {
          delete newErrors.lastName;
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!isValidEmail(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        } else if (passwordStrength.score < 3) {
          newErrors.password = 'Password is too weak';
        } else {
          delete newErrors.password;
        }
        
        // Also check confirm password
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else if (formData.confirmPassword) {
          delete newErrors.confirmPassword;
        }
        break;
        
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
        
      case 'agreeToTerms':
        if (!value) {
          newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        } else {
          delete newErrors.agreeToTerms;
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return !newErrors[name];
  };
  
  // Validate all fields
  const validateForm = () => {
    // Check each field
    const firstNameValid = validateField('firstName', formData.firstName);
    const lastNameValid = validateField('lastName', formData.lastName);
    const emailValid = validateField('email', formData.email);
    const passwordValid = validateField('password', formData.password);
    const confirmPasswordValid = validateField('confirmPassword', formData.confirmPassword);
    const agreeToTermsValid = validateField('agreeToTerms', formData.agreeToTerms);
    
    // Set all fields as touched
    setFormTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
      agreeToTerms: true
    });
    
    return firstNameValid && lastNameValid && emailValid && 
           passwordValid && confirmPasswordValid && agreeToTermsValid;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // This would be replaced with an actual API call to your backend
      // Example: 
      // const response = await axios.post('/api/auth/register', {
      //   firstName: formData.firstName,
      //   lastName: formData.lastName,
      //   email: formData.email,
      //   password: formData.password
      // });
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll create a dummy user account
      const userData = {
        id: 1,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };
      
      // Log the user in after successful signup
      login(userData);
      
      // Redirect to homepage
      navigate('/');
    } catch (err) {
      // Handle different error types
      if (err.response && err.response.status === 409) {
        setErrors({ email: 'This email is already registered' });
      } else {
        setErrors({ form: 'Registration failed. Please try again.' });
      }
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto" data-aos="fade-up">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sign up to start shopping with us
              </p>
            </div>
            
            {errors.form && (
              <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md flex items-start gap-2">
                <FiAlertCircle className="mt-0.5 flex-shrink-0" />
                <span>{errors.form}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FiUser />
                      </span>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="John"
                        className={`w-full pl-10 pr-4 py-3 border transition-all duration-300 ${
                          errors.firstName && formTouched.firstName
                            ? 'border-red-500 dark:border-red-500' 
                            : 'border-gray-300 dark:border-gray-700'
                        } rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                      />
                      {errors.firstName && formTouched.firstName && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <FiAlertCircle size={12} />
                          {errors.firstName}
                        </p>
                      )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FiUser />
                      </span>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Doe"
                        className={`w-full pl-10 pr-4 py-3 border transition-all duration-300 ${
                          errors.lastName && formTouched.lastName
                            ? 'border-red-500 dark:border-red-500' 
                            : 'border-gray-300 dark:border-gray-700'
                        } rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                      />
                      {errors.lastName && formTouched.lastName && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <FiAlertCircle size={12} />
                          {errors.lastName}
                        </p>
                      )}
                  </div>
                </div>
              </div>
              
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
                    className={`w-full pl-10 pr-4 py-3 border transition-all duration-300 ${
                      errors.email && formTouched.email
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-700'
                    } rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary`}
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
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
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
                    className={`w-full pl-10 pr-12 py-3 border transition-all duration-300 ${
                      errors.password && formTouched.password
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-700'
                    } rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                    autoComplete="new-password"
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
                  
                  {/* Password strength meter */}
                  {formData.password && formTouched.password && (
                    <div className="mt-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">Password strength:</span>
                        <span className="text-xs">
                          {passwordStrength.score === 0 && 'Very weak'}
                          {passwordStrength.score === 1 && 'Weak'}
                          {passwordStrength.score === 2 && 'Medium'}
                          {passwordStrength.score === 3 && 'Strong'}
                          {passwordStrength.score === 4 && 'Very strong'}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${passwordStrength.score === 0 ? 'bg-red-500 w-0' : 
                            passwordStrength.score === 1 ? 'bg-red-500 w-1/4' : 
                            passwordStrength.score === 2 ? 'bg-yellow-500 w-2/4' : 
                            passwordStrength.score === 3 ? 'bg-green-500 w-3/4' : 'bg-green-500 w-full'}`}
                        ></div>
                      </div>
                      
                      <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
                        <div className={`flex items-center gap-1 ${passwordStrength.hasMinLength ? 'text-green-500' : 'text-gray-500'}`}>
                          {passwordStrength.hasMinLength ? <FiCheckCircle size={12} /> : <FiAlertCircle size={12} />}
                          <span>8+ characters</span>
                        </div>
                        <div className={`flex items-center gap-1 ${passwordStrength.hasUpperCase ? 'text-green-500' : 'text-gray-500'}`}>
                          {passwordStrength.hasUpperCase ? <FiCheckCircle size={12} /> : <FiAlertCircle size={12} />}
                          <span>Uppercase letter</span>
                        </div>
                        <div className={`flex items-center gap-1 ${passwordStrength.hasLowerCase ? 'text-green-500' : 'text-gray-500'}`}>
                          {passwordStrength.hasLowerCase ? <FiCheckCircle size={12} /> : <FiAlertCircle size={12} />}
                          <span>Lowercase letter</span>
                        </div>
                        <div className={`flex items-center gap-1 ${passwordStrength.hasNumber ? 'text-green-500' : 'text-gray-500'}`}>
                          {passwordStrength.hasNumber ? <FiCheckCircle size={12} /> : <FiAlertCircle size={12} />}
                          <span>Number</span>
                        </div>
                        <div className={`flex items-center gap-1 ${passwordStrength.hasSpecialChar ? 'text-green-500' : 'text-gray-500'}`}>
                          {passwordStrength.hasSpecialChar ? <FiCheckCircle size={12} /> : <FiAlertCircle size={12} />}
                          <span>Special character</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FiLock />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-3 border transition-all duration-300 ${
                      errors.confirmPassword && formTouched.confirmPassword
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-700'
                    } rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                    autoComplete="new-password"
                  />
                  <button 
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                  {errors.confirmPassword && formTouched.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`mt-1 mr-2 w-4 h-4 accent-primary cursor-pointer ${errors.agreeToTerms && formTouched.agreeToTerms ? 'border-red-500' : ''}`}
                  />
                  <label htmlFor="agreeToTerms" className="text-sm">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:text-primary/90">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary hover:text-primary/90">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {errors.agreeToTerms && formTouched.agreeToTerms && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} />
                    {errors.agreeToTerms}
                  </p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-70 hover:shadow-lg hover:shadow-primary/20"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
              
              <div className="text-center mt-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:text-primary/90">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
            
            {/* Removed Google & Facebook options as requested */}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

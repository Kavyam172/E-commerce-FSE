import React, { useState, useEffect, useRef } from "react";
import { FiX, FiCheck, FiImage, FiTag, FiInfo, FiEdit3, FiUpload } from "react-icons/fi";

const EditCategoryModal = ({ isOpen, onClose, onSave, category }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    slug: "",
    image: "",
    products: 0,
    featured: false,
    icon: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (category) {
      setFormData({
        ...category,
        slug: category.slug || generateSlug(category.name),
        products: category.products || 0,
        featured: category.featured || false,
        icon: category.icon || ""
      });
      
      if (category.image) {
        setPreview(category.image);
      }
    }
  }, [category]);
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    
    // If name is changed, update slug automatically
    if (name === 'name') {
      setFormData((prev) => ({ ...prev, slug: generateSlug(value) }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const generateSlug = (name) => {
    return name.toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) { // 2MB
      setErrors(prev => ({ ...prev, image: "Image must be less than 2MB" }));
      return;
    }
    
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setErrors(prev => ({ ...prev, image: "Only JPEG, PNG, and WebP formats are allowed" }));
      return;
    }
    
    // For demo purposes, create a preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
    
    // Clear error
    if (errors.image) {
      setErrors(prev => ({ ...prev, image: null }));
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you'd upload the image to a server here
      // For this demo, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving category:", error);
      setErrors(prev => ({ ...prev, form: "Error saving category. Please try again." }));
    } finally {
      setIsLoading(false);
    }
  };
  
  // For demo purposes, these are some popular categories with related data
  const suggestedIcons = [
    "👕", "👖", "👔", "👗", "👟", "🧢", "👜", "⌚", "💄", "🏠", "🛋️", "🖥️", "📱", "🎮", "📚", "🏋️", "🎵", "🍔", "🥦"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-xl p-0 w-full max-w-md shadow-xl transform transition-all animate-fade-in-up"
      >
        {/* Modal header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <FiTag className="text-primary" />
            {category?.id ? 'Edit Category' : 'Add New Category'}
          </h2>
          <button 
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>
        
        {/* Modal body */}
        <div className="px-6 py-4">
          {errors.form && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center gap-2">
              <FiInfo className="text-red-500" />
              <span>{errors.form}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Image upload section */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category Image</label>
              <div className="flex items-center gap-4">
                <div 
                  className="relative h-24 w-24 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-primary dark:hover:border-primary transition-colors"
                  onClick={triggerFileInput}
                >
                  {preview ? (
                    <img src={preview} alt="Category" className="h-full w-full object-cover" />
                  ) : (
                    <FiImage className="h-8 w-8 text-gray-400" />
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="flex-1">
                  <button 
                    type="button" 
                    className="text-sm flex items-center gap-1 text-primary hover:text-primary-dark mb-1"
                    onClick={triggerFileInput}
                  >
                    <FiUpload size={14} />
                    <span>Upload image</span>
                  </button>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Recommended: 400×400px, PNG or JPEG<br/>Max size: 2MB
                  </p>
                  {errors.image && (
                    <p className="text-xs text-red-500 mt-1">{errors.image}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Basic info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category Name*</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiEdit3 size={16} />
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Men's Clothing"
                  className={`w-full pl-10 pr-3 py-2.5 border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 dark:text-white dark:bg-gray-700`}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </form>
          </div>
          
          <div className="my-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL Slug*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiTag size={16} />
              </span>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="e.g. mens-clothing"
                className={`w-full pl-10 pr-3 py-2.5 border ${errors.slug ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 dark:text-white dark:bg-gray-700`}
              />
            </div>
            {errors.slug ? (
              <p className="text-xs text-red-500 mt-1">{errors.slug}</p>
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Used in URLs: yourstore.com/categories/{formData.slug || 'example-category'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of this category..."
              className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              rows={3}
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Icon (Optional)</label>
            <div className="grid grid-cols-7 gap-2 mb-2">
              {suggestedIcons.map((icon, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, icon }))}
                  className={`h-10 w-10 flex items-center justify-center text-xl rounded-md ${formData.icon === icon ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'} transition-colors`}
                >
                  {icon}
                </button>
              ))}
            </div>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="Emoji or icon code"
              className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 accent-primary cursor-pointer"
            />
            <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
              Featured category (show on homepage)
            </label>
          </div>
       
      </div>
      
      {/* Modal footer */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 rounded-b-xl border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors disabled:opacity-70 flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <FiCheck size={16} />
              <span>Save Category</span>
            </>
          )}
        </button>
      </div>
    </div>
    
   
);
};

export default EditCategoryModal;

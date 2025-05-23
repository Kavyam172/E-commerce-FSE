import React, { useState, useEffect } from "react";

const EditProductModal = ({ isOpen, onClose, onSave, product }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    if (product) setFormData(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, price: parseFloat(formData.price) });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-gray-700 rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Price</label>
            <input
              type="number"
              name="price"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;

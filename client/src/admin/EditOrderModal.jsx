import React, { useState, useEffect } from "react";

const EditOrderModal = ({ isOpen, onClose, onSave, order }) => {
  const [formData, setFormData] = useState(order);

  useEffect(() => {
    setFormData(order);
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-gray-700 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Edit Order</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            placeholder="Customer Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="product"
            value={formData.product}
            onChange={handleChange}
            placeholder="Product"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="total"
            value={formData.total}
            onChange={handleChange}
            placeholder="Total Price"
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrderModal;

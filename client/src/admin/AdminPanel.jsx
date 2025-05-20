import React, { useState } from 'react';
import { OrdersTab } from './OrdersTab';
import UsersTable from './UsersTable';
import CategoriesTab from './CategoriesTab';
import { ProductsTab } from './ProductsTab';

import EditUserModal from './EditUserModel';
import EditCategoryModal from './EditCategoryModal';
import EditProductModal from './EditProductModal';
import EditOrderModal from './EditOrderModal';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('Users');

  const [editingUser, setEditingUser] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const handleEdit = (type, item) => {
    if (type === 'user') {
      setEditingUser(item);
    } else if (type === 'category') {
      setEditingCategory(item);
      setCategoryModalOpen(true);
    } else if (type === 'product') {
      setEditingProduct(item);
      setProductModalOpen(true);
    } else if (type === 'order') {
      setEditingOrder(item);
      setOrderModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setEditingUser(null);
    setEditingCategory(null);
    setEditingProduct(null);
    setEditingOrder(null);
    setCategoryModalOpen(false);
    setProductModalOpen(false);
    setOrderModalOpen(false);
  };

  const handleSaveCategory = (updatedCategory) => {
    console.log("Category saved:", updatedCategory);
    handleCloseModal();
  };

  const handleSaveProduct = (updatedProduct) => {
    console.log("Product saved:", updatedProduct);
    handleCloseModal();
  };

  const handleSaveOrder = (updatedOrder) => {
    console.log("Order saved:", updatedOrder);
    handleCloseModal();
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'Users':
        return <UsersTable onEdit={(type, user) => handleEdit(type, user)} />;
      case 'Categories':
        return <CategoriesTab onEdit={(type, category) => handleEdit(type, category)} />;
      case 'Products':
        return <ProductsTab onEdit={(type, product) => handleEdit(type, product)} />;
      case 'Orders':
        return <OrdersTab onEdit={(type, order) => handleEdit(type, order)} />;
      default:
        return <UsersTable onEdit={(type, user) => handleEdit(type, user)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-700 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="flex space-x-4 mb-6">
        {['Users', 'Categories', 'Products', 'Orders'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 border border-gray-300 hover:bg-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="bg-gray-800 rounded-lg shadow-md p-4">{renderTab()}</div>

      {editingUser && (
        <EditUserModal user={editingUser} onClose={handleCloseModal} />
      )}
      {categoryModalOpen && (
        <EditCategoryModal
          isOpen={categoryModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveCategory}
          category={editingCategory}
        />
      )}
      {productModalOpen && (
        <EditProductModal
          isOpen={productModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveProduct}
          product={editingProduct}
        />
      )}
      {orderModalOpen && (
        <EditOrderModal
          isOpen={orderModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveOrder}
          order={editingOrder}
        />
      )}
    </div>
  );
}

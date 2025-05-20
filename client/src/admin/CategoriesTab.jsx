import React, { useState } from "react";

const initialCategories = [
  { id: 1, name: "Electronics", description: "Devices and gadgets" },
  { id: 2, name: "Clothing", description: "Apparel and accessories" },
  { id: 3, name: "Books", description: "Printed and digital books" },
];

const CategoriesTab = ({ onEdit, onDelete }) => {
  const [categories, setCategories] = useState(initialCategories);

  const handleEdit = (category) => onEdit("category", category);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      onDelete?.(id);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-sky-100 text-sky-900">
            <tr>
              <th className="px-4 py-2 text-left border-b">ID</th>
              <th className="px-4 py-2 text-left border-b">Name</th>
              <th className="px-4 py-2 text-left border-b">Description</th>
              <th className="px-4 py-2 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 p-4">
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="transition hover:bg-blue-50">
                  <td className="px-4 py-2 border-b">{category.id}</td>
                  <td className="px-4 py-2 border-b">{category.name}</td>
                  <td className="px-4 py-2 border-b">{category.description}</td>
                  <td className="px-4 py-2 border-b space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesTab;

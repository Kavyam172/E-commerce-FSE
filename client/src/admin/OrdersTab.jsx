import React, { useState } from "react";

const initialOrders = [
  {
    id: 1,
    customer: "Alice Johnson",
    product: "Wireless Mouse",
    quantity: 2,
    total: "$40",
    status: "Shipped",
  },
  {
    id: 2,
    customer: "Bob Smith",
    product: "Keyboard",
    quantity: 1,
    total: "$25",
    status: "Pending",
  },
];

export const OrdersTab = ({ onEdit }) => {
  const [orders, setOrders] = useState(initialOrders);

  const handleEdit = (order) => onEdit("order", order);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-yellow-100 text-yellow-900">
            <tr>
              <th className="px-4 py-2 border-b text-left">ID</th>
              <th className="px-4 py-2 border-b text-left">Customer</th>
              <th className="px-4 py-2 border-b text-left">Product</th>
              <th className="px-4 py-2 border-b text-left">Quantity</th>
              <th className="px-4 py-2 border-b text-left">Total</th>
              <th className="px-4 py-2 border-b text-left">Status</th>
              <th className="px-4 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 p-4">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-yellow-50 transition">
                  <td className="px-4 py-2 border-b">{order.id}</td>
                  <td className="px-4 py-2 border-b">{order.customer}</td>
                  <td className="px-4 py-2 border-b">{order.product}</td>
                  <td className="px-4 py-2 border-b">{order.quantity}</td>
                  <td className="px-4 py-2 border-b">{order.total}</td>
                  <td className="px-4 py-2 border-b">{order.status}</td>
                  <td className="px-4 py-2 border-b space-x-2">
                    <button
                      onClick={() => handleEdit(order)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
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

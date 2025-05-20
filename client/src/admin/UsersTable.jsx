import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiUser, FiMail, FiPhone, FiCalendar, FiShield } from "react-icons/fi";

const initialUsers = [
  {
    id: 1,
    name: "Arjun Sharma",
    email: "arjun.sharma@gmail.com",
    dob: "1990-04-15",
    phone: "9876543210",
    role: "Admin",
    address: "B-12, Vasant Kunj, New Delhi",
    lastLogin: "2025-05-19T14:30:22",
    joined: "2024-09-10"
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya.patel@gmail.com",
    dob: "1992-06-23",
    phone: "8765432109",
    role: "User",
    address: "C-404, Harmony Heights, Mumbai",
    lastLogin: "2025-05-18T09:45:12",
    joined: "2024-10-05"
  },
  {
    id: 3,
    name: "Vikram Singh",
    email: "vikram.s@yahoo.com",
    dob: "1988-11-12",
    phone: "7654321098",
    role: "User",
    address: "42, MG Road, Bangalore",
    lastLogin: "2025-05-20T08:12:45",
    joined: "2024-08-22"
  },
  {
    id: 4,
    name: "Ananya Reddy",
    email: "ananya.r@hotmail.com",
    dob: "1995-02-28",
    phone: "9876123450",
    role: "User",
    address: "78, Jubilee Hills, Hyderabad",
    lastLogin: "2025-05-17T17:30:02",
    joined: "2024-11-14"
  },
  {
    id: 5,
    name: "Rahul Mehta",
    email: "rahul.m@gmail.com",
    dob: "1991-09-04",
    phone: "9988776655",
    role: "Vendor",
    address: "E-15, Gomti Nagar, Lucknow",
    lastLogin: "2025-05-19T11:20:36",
    joined: "2024-07-30"
  },
  {
    id: 6,
    name: "Neha Gupta",
    email: "neha.g@outlook.com",
    dob: "1993-12-17",
    phone: "8899776655",
    role: "User",
    address: "221, Park Street, Kolkata",
    lastLogin: "2025-05-16T14:05:18",
    joined: "2024-12-02"
  },
  {
    id: 7,
    name: "Karthik Iyer",
    email: "karthik.i@gmail.com",
    dob: "1989-07-29",
    phone: "7788996655",
    role: "Vendor",
    address: "33, Anna Nagar, Chennai",
    lastLogin: "2025-05-18T19:45:22",
    joined: "2024-10-18"
  },
  {
    id: 8,
    name: "Sanjana Joshi",
    email: "sanjana.j@yahoo.com",
    dob: "1994-04-02",
    phone: "9876543211",
    role: "User",
    address: "B-7, Aundh, Pune",
    lastLogin: "2025-05-19T08:30:14",
    joined: "2024-11-30"
  }
];

const UsersTable = ({ onEdit, onDelete }) => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");

  const handleEdit = (user) => onEdit("user", user);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      onDelete?.(id);
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };
  
  // Format timestamp for last login
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', {
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  // Get all available roles
  const roles = ["All", ...new Set(users.map(user => user.role))];
  
  // Filter users based on search and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.phone.includes(searchTerm);
    const matchesRole = selectedRole === "All" || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <FiUser className="text-primary" /> 
          <span>Users Management</span>
        </h2>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
          <select 
            value={selectedRole} 
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
          >
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg mb-4">
        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <span>Showing {filteredUsers.length} of {users.length} users</span>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add User</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
              <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
              <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact Info</th>
              <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Account</th>
              <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500 dark:text-gray-400">
                  <div className="flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <p className="mt-2">No users found matching your search criteria.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                      #{user.id}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}{user.name.split(' ')[1]?.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{user.address}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                        <FiMail className="mr-2" /> {user.email}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FiPhone className="mr-2" /> {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm">
                      <div className="mb-1">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' : 
                          user.role === 'Vendor' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>
                          {user.role}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs">
                        <FiCalendar className="mr-1" /> Joined: {formatDate(user.joined)}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Last login: {formatDateTime(user.lastLogin)}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                        title="Edit User"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                        title="Delete User"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing page 1 of 1
        </div>
        <div className="flex space-x-1">
          <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300" disabled>
            Previous
          </button>
          <button className="px-3 py-1 rounded-md bg-primary text-white">
            1
          </button>
          <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;

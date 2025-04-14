// Dummy product data for development
// This will be replaced with actual API calls to your backend

export const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 249.99,
    description: "Experience crystal-clear sound with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    rating: { rate: 4.8, count: 127 },
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    price: 199.95,
    description: "Work in comfort with this ergonomic office chair. Adjustable height, lumbar support, and breathable mesh back provide all-day comfort.",
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhaXJ8ZW58MHx8MHx8fDA%3D",
    rating: { rate: 4.5, count: 89 },
    inStock: true,
    featured: false
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    description: "Sustainable and stylish organic cotton t-shirt. Soft, breathable fabric with a modern fit.",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHNoaXJ0fGVufDB8fDB8fHww",
    rating: { rate: 4.3, count: 213 },
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: "Smart Fitness Watch",
    price: 179.99,
    description: "Track your fitness goals with our smart fitness watch. Features heart rate monitoring, GPS, sleep tracking, and 7-day battery life.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D",
    rating: { rate: 4.6, count: 157 },
    inStock: true,
    featured: true
  },
  {
    id: 5,
    name: "Professional Knife Set",
    price: 129.95,
    description: "Elevate your cooking with this professional 8-piece knife set. High-carbon stainless steel blades with ergonomic handles.",
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1593618998160-90d228b25fe0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGtuaWZlfGVufDB8fDB8fHww",
    rating: { rate: 4.7, count: 76 },
    inStock: true,
    featured: false
  },
  {
    id: 6,
    name: "Leather Crossbody Bag",
    price: 89.99,
    description: "Stylish genuine leather crossbody bag with adjustable strap and multiple compartments. Perfect for everyday use.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFnfGVufDB8fDB8fHww",
    rating: { rate: 4.4, count: 108 },
    inStock: true,
    featured: false
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    description: "Take your music anywhere with this waterproof portable Bluetooth speaker. 20-hour battery life and rich, immersive sound.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
    rating: { rate: 4.2, count: 135 },
    inStock: true,
    featured: true
  },
  {
    id: 8,
    name: "Ceramic Plant Pot Set",
    price: 49.95,
    description: "Set of 3 minimalist ceramic plant pots in varying sizes. Perfect for indoor plants and home decor.",
    category: "Home Decor",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBsYW50JTIwcG90fGVufDB8fDB8fHww",
    rating: { rate: 4.5, count: 62 },
    inStock: true,
    featured: false
  }
];

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  if (!category || category === 'All') return products;
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getCategories = () => {
  return ['All', ...new Set(products.map(product => product.category))];
};

// Comment: Replace this file with actual API calls to your backend
// Example API call to get products:
// export const getProducts = async () => {
//   const response = await axios.get('/api/products');
//   return response.data;
// };

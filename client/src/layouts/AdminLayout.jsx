import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useApp } from '../config/AppContext';
import { Outlet } from 'react-router-dom';

const AdminLayout = ({  }) => {
  const { theme } = useApp();
  
  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      
      {/* Add padding for navbar */}
      <main className="flex-grow pt-16">
        <Outlet/>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminLayout;

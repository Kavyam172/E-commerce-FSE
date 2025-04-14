import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { useApp } from '../config/AppContext';

const Footer = () => {
  const { theme } = useApp();
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Store info */}
          <div data-aos="fade-up">
            <h3 className="text-xl font-bold mb-4">Drip Deals</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your one-stop shop for all your needs. Quality products, competitive prices, fast delivery.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" aria-label="Facebook" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                <FiFacebook className="text-xl" />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                <FiTwitter className="text-xl" />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                <FiInstagram className="text-xl" />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer service */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-xl text-primary flex-shrink-0 mt-1" />
                <span className="text-gray-600 dark:text-gray-400">
                  123 Main Street, Anytown, ST 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-xl text-primary flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">
                  (123) 456-7890
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-xl text-primary flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">
                  support@Drip Deals.com
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Drip Deals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

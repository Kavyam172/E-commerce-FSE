import React from 'react';
import { FiUsers, FiAward, FiHome, FiTruck, FiCreditCard, FiHeart, FiPackage } from 'react-icons/fi';

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">About Drip Deals</h1>
            <div className="h-1 w-24 bg-primary mx-auto mb-8 rounded-full"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              We're on a mission to revolutionize online shopping with extraordinary products
              and unparalleled customer experiences.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                From a Simple Idea to a Shopping Revolution
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Founded in 2020, Drip Deals started with a simple vision: create an online shopping 
                experience that combines quality products, competitive prices, and exceptional service.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                What began as a small startup has grown into a thriving e-commerce platform trusted by 
                thousands of customers worldwide. Our journey has been defined by our commitment to 
                innovation and our passion for exceeding customer expectations.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Today, we continue to push the boundaries of what's possible in e-commerce, always 
                staying true to our founding principles and the customers who have made our success possible.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Drip Deals Team" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              What Drives Us Forward
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              At Drip Deals, our values define who we are and guide every decision we make.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <FiHeart className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Customer Obsession</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We put our customers at the heart of everything we do, consistently striving to exceed 
                their expectations and build lasting relationships based on trust and satisfaction.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <FiAward className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Quality Excellence</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We are relentless in our pursuit of quality, carefully curating products that meet our 
                high standards and continuously improving our services to deliver excellence.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <FiPackage className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We embrace change and constantly seek new ways to improve the shopping experience, 
                leveraging technology and creative thinking to stay ahead of the curve.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Meet the People Behind Drip Deals
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our diverse team of passionate professionals works together to bring you the best shopping experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80"
              },
              {
                name: "David Kim",
                role: "CTO",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              },
              {
                name: "Michael Chen",
                role: "Head of Product",
                image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              },
              {
                name: "Emily Rodriguez",
                role: "Customer Experience",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              }
            ].map((member, index) => (
              <div key={index} className="group">
                <div className="rounded-xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700 aspect-square relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              The Drip Deals Difference
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We go beyond just selling products – we create exceptional shopping experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FiHome />,
                title: "Curated Selection",
                description: "Every product in our collection is hand-picked for quality, design, and value."
              },
              {
                icon: <FiTruck />,
                title: "Fast & Free Delivery",
                description: "Enjoy free shipping on all orders over $50 and lightning-fast delivery times."
              },
              {
                icon: <FiCreditCard />,
                title: "Secure Payments",
                description: "Shop with confidence knowing your payment information is always protected."
              },
              {
                icon: <FiUsers />,
                title: "24/7 Support",
                description: "Our friendly customer service team is always available to assist you."
              },
              {
                icon: <FiAward />,
                title: "Quality Guarantee",
                description: "If you're not completely satisfied, we offer hassle-free returns and exchanges."
              },
              {
                icon: <FiHeart />,
                title: "Loyalty Rewards",
                description: "Earn points with every purchase and unlock exclusive discounts and perks."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-4 text-primary text-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Experience the Difference?</h2>
            <p className="text-white/80 mb-8 text-lg">
              Join thousands of satisfied customers who have made Drip Deals their preferred shopping destination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/products" 
                className="px-8 py-3 bg-white text-primary font-medium rounded-full hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </a>
              <a 
                href="/contact" 
                className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

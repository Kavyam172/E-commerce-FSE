import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheckCircle } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send the form data to a server here
    console.log(formData);
    // Show success message
    setFormSubmitted(true);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Hide success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Contact Us</h1>
            <div className="h-1 w-24 bg-primary mx-auto mb-8 rounded-full"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Have questions or need assistance? We're here to help.
              Our team is just a message away.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <FiMapPin className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Our Location</h3>
              <p className="text-gray-600 dark:text-gray-300">
                123 Commerce Street<br />
                San Francisco, CA 94103<br />
                United States
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <FiPhone className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Phone Number</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Customer Service:<br />
                <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a><br />
                <span className="text-sm">(Mon-Fri, 9am-6pm PST)</span>
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <FiMail className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Email Address</h3>
              <p className="text-gray-600 dark:text-gray-300">
                General Inquiries:<br />
                <a href="mailto:info@dripdeals.com" className="text-primary hover:underline">info@dripdeals.com</a><br />
                <span className="text-sm">(Response within 24 hours)</span>
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <FiClock className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Business Hours</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monday - Friday:<br />
                9:00 AM - 6:00 PM PST<br />
                <span className="text-sm">Closed on weekends & holidays</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send Us a Message</h2>
              
              {formSubmitted ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg p-4 flex items-start mb-6">
                  <FiCheckCircle className="text-green-500 dark:text-green-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-green-800 dark:text-green-300">Message Sent Successfully!</h3>
                    <p className="text-green-700 dark:text-green-400 text-sm mt-1">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                      placeholder="johndoe@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                    placeholder="Please describe your inquiry in detail..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <FiSend className="text-lg" />
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Map */}
            <div className="rounded-xl overflow-hidden shadow-lg h-[400px] lg:h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1324383930953!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2fbd55%3A0xa71491d736f62d5!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2suk!4v1650000000000!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Drip Deals Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              FAQs
            </span>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Find quick answers to common questions about our services, shipping, and policies.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "What are your shipping times?",
                answer: "We offer standard shipping (3-5 business days), expedited shipping (2-3 business days), and express shipping (1-2 business days). Shipping times may vary based on your location."
              },
              {
                question: "How can I track my order?",
                answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can use this number on our website or the carrier's website to track your package."
              },
              {
                question: "What is your return policy?",
                answer: "We accept returns within 30 days of delivery. Items must be in original condition with tags attached. Please visit our Returns page for more information and to initiate a return."
              },
              {
                question: "Do you ship internationally?",
                answer: "Yes, we ship to most countries worldwide. International shipping times and fees vary based on the destination. You can see specific shipping options during checkout."
              }
            ].map((faq, index) => (
              <div key={index} className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6">
                    <span className="text-gray-900 dark:text-white font-semibold">{faq.question}</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-6 pt-0 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Join Our Community</h2>
            <p className="text-white/80 mb-8 text-lg">
              Stay updated with our latest products, exclusive offers, and exciting promotions.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <button 
                type="submit" 
                className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-white/60 mt-4 text-sm">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from us.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

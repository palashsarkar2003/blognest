import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaYoutube, FaArrowUp, FaFeatherAlt } from "react-icons/fa";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Show scroll button after user scrolls down 300px
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-300 text-gray-800 py-12 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">About BlogNest</h2>
            <p className="text-sm leading-relaxed text-gray-700">
              BlogNest is your platform for sharing ideas, exploring insights, and connecting with readers worldwide. Crafted with <span className="text-blue-500 font-semibold">passion</span> for creators.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-blue-500 transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/blogs" className="hover:text-blue-500 transition-colors duration-300">
                  Blogs
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-blue-500 transition-colors duration-300">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-500 transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Follow Me</h2>
            <div className="flex justify-center md:justify-start space-x-5">
              <a href="https://github.com/palashsarkar2003" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-110">
                <FaGithub size={26} />
              </a>
              <a href="https://www.linkedin.com/in/palash-sarkar-244454204" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-blue-600 transition-transform transform hover:scale-110">
                <FaLinkedin size={26} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-red-500 transition-transform transform hover:scale-110">
                <FaYoutube size={26} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-700">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} BlogNest. Crafted with care.</p>
          <div className="flex items-center text-lg font-bold text-gray-800">
            <FaFeatherAlt className="text-blue-500 mr-2" />
            <span>Blog</span>
            <span className="text-blue-500">Nest</span>
          </div>
        </div>
      </div>

      {/* Scroll-to-top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 hover:scale-110 transition-transform duration-300 z-50"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;



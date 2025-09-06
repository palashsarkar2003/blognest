import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { FaFeatherAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const [show, setShow] = useState(false);
  const { profile, isAuthenticated, setIsAuthenticated, loading } = useAuth();
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:2000/api/users/logout",
        { withCredentials: true }
      );
      localStorage.removeItem("jwt");
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "relative font-medium text-orange-500 pb-1 after:content-[''] after:absolute after:left-1/4 after:bottom-0 after:h-[2px] after:w-1/2 after:bg-orange-500 after:transition-all after:duration-300"
      : "relative font-medium text-gray-700 hover:text-blue-600 pb-1 after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-1/2 hover:after:left-1/4 transition-all duration-300";

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-4 py-3">
      <div className="flex items-center justify-between container mx-auto">
        {/* Logo */}
        <div className="flex items-center cursor-pointer transform transition-all duration-300 hover:scale-105">
          <FaFeatherAlt className="text-blue-500 mr-2 h-6 w-6" />
          <div className="font-bold text-xl select-none">
            Blog<span className="text-blue-500">Nest</span>
          </div>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8">
          <NavLink to="/" className={linkClass}>
            HOME
          </NavLink>
          <NavLink to="/blogs" className={linkClass}>
            BLOGS
          </NavLink>
          <NavLink to="/creators" className={linkClass}>
            CREATORS
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            ABOUT
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            CONTACT
          </NavLink>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-3">
          {!loading && isAuthenticated && profile?.role === "admin" ? (
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white hover:bg-blue-800 duration-300 px-3 py-1.5 font-semibold rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              DASHBOARD
            </Link>
          ) : (
            ""
          )}

          {!loading && !isAuthenticated ? (
            <Link
              to="/login"
              className="bg-red-500 font-semibold hover:bg-red-700 hover:cursor-pointer duration-300 px-3 py-1.5 rounded-full text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              LOGIN
            </Link>
          ) : (
            !loading && (
              <button
                onClick={handleLogout}
                className="bg-red-500 font-semibold hover:bg-red-700 hover:cursor-pointer duration-300 px-3 py-1.5 rounded-full text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                LOGOUT
              </button>
            )
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden p-2 hover:bg-gray-200 rounded-full transition-all duration-300"
          onClick={() => setShow(!show)}
        >
          {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {show && (
        <div className="md:hidden fixed top-16 left-4 right-4 bg-white shadow-lg rounded-xl z-50 overflow-hidden transition-all duration-300">
          <ul className="flex flex-col items-center space-y-3 py-4">
            <NavLink
              to="/"
              onClick={() => setShow(false)}
              className="hover:text-blue-500 font-medium transition-all"
            >
              HOME
            </NavLink>
            <NavLink
              to="/blogs"
              onClick={() => setShow(false)}
              className="hover:text-blue-500 font-medium transition-all"
            >
              BLOGS
            </NavLink>
            <NavLink
              to="/creators"
              onClick={() => setShow(false)}
              className="hover:text-blue-500 font-medium transition-all"
            >
              CREATORS
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setShow(false)}
              className="hover:text-blue-500 font-medium transition-all"
            >
              ABOUT
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setShow(false)}
              className="hover:text-blue-500 font-medium transition-all"
            >
              CONTACT
            </NavLink>
          </ul>

          {/* Mobile Buttons */}
          <div className="flex flex-col items-center space-y-2 pb-4">
            {!loading && isAuthenticated && profile?.role === "admin" && (
              <Link
                to="/dashboard"
                onClick={() => setShow(false)}
                className="bg-blue-600 text-white hover:bg-blue-800 hover:cursor-pointer duration-300 px-2 py-2 rounded-lg shadow-md w-1/3 text-center text-sm"
              >
                DASHBOARD
              </Link>
            )}

            {!loading && !isAuthenticated ? (
              <Link
                to="/login"
                onClick={() => setShow(false)}
                className="bg-red-500 hover:bg-red-700 hover:cursor-pointer text-white px-2 py-2 rounded-lg shadow-md w-1/3 text-center text-sm"
              >
                LOGIN
              </Link>
            ) : (
              !loading && (
                <button
                  onClick={(e) => {
                    handleLogout(e);
                    setShow(false);
                  }}
                  className="bg-red-500 hover:bg-red-700 hover:cursor-pointer text-white px-2 py-2 rounded-lg shadow-md w-1/3 text-center text-sm"
                >
                  LOGOUT
                </button>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

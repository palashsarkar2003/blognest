import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { CiMenuBurger } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";

function Sidebar({ setComponent }) {
  const { profile, setIsAuthenticated, loading } = useAuth();
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);

  const handleComponents = (value) => {
    setComponent(value);
    if (window.innerWidth < 640) setShow(false);
  };

  const gotoHome = () => {
    navigateTo("/");
    if (window.innerWidth < 640) setShow(false);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.get("http://localhost:2000/api/users/logout", {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      toast.success("Logout Successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Can't Logout");
    }
  };
  
  return (
    <>
      <div
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md cursor-pointer hover:bg-gray-100 transition"
        onClick={() => setShow(!show)}
        aria-label="Toggle sidebar"
      >
        <CiMenuBurger className="text-2xl" />
      </div>

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-gray-50 shadow-lg
  transform transition-transform duration-300 ease-in-out
  ${show ? "translate-x-0" : "-translate-x-full"}
  sm:translate-x-0 sm:static sm:shadow-none`}
        aria-label="Sidebar navigation"
      >
        <div
          className="sm:hidden absolute top-4 right-4 p-2 rounded-full cursor-pointer hover:bg-gray-200 transition"
          onClick={() => setShow(false)}
          aria-label="Close sidebar"
        >
          <FaArrowLeftLong className="text-2xl" />
        </div>

        <div className="text-center mt-10 mb-8 px-4">
          <img
            className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-blue-500 shadow-md"
            src={profile?.photo?.url || "userphoto.png"}
            alt={profile?.name || "User Profile"}
          />
          <p className="mt-4 text-lg font-semibold text-blue-700">
            {profile?.name || "User Name"}
          </p>
        </div>

        <nav className="flex flex-col px-4 space-y-4">
          <button
            onClick={() => handleComponents("My Blogs")}
            className="w-full py-3 px-4 bg-green-500 rounded-lg text-white hover:bg-green-600 transition"
          >
            MY BLOGS
          </button>
          <button
            onClick={() => handleComponents("Create Blog")}
            className="w-full py-3 px-4 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition"
          >
            CREATE BLOGS
          </button>
          <button
            onClick={() => handleComponents("My Profile")}
            className="w-full py-3 px-4 bg-orange-500 rounded-lg text-white hover:bg-orange-600 transition"
          >
            MY PROFILE
          </button>
          <button
            onClick={gotoHome}
            className="w-full py-3 px-4 bg-yellow-500 rounded-lg text-white hover:bg-yellow-600 transition"
          >
            HOME
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-3 px-4 bg-red-500 rounded-lg text-white hover:bg-red-600 transition"
          >
            LOGOUT
          </button>
        </nav>
      </aside>

      {show && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-30 sm:hidden"
          onClick={() => setShow(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default Sidebar;

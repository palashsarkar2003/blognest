import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../utils";
function Devotional() {
  const { blogs } = useAuth();
  const devotionalBlogs = blogs?.filter((blog) => blog.category === "Devotional");
  console.log(devotionalBlogs);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-900">
        Devotional
      </h1>
      <p className="text-center mb-12 text-xl text-gray-700">
        The concept of gods varies widely across different cultures, religions, and belief systems
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {devotionalBlogs && devotionalBlogs.length > 0 ? (
          devotionalBlogs.map((blog, index) => (
            <Link
              to={`/blog/details/${blog._id}`}
              key={index}
              className="relative rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={blog?.blogImage?.url}
                alt={blog?.title}
                className="w-full h-52 md:h-48 object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-lg font-semibold">{blog?.title}</h2>
                <p className="text-sm text-gray-200">{blog?.category}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex justify-center space-x-3 mt-8">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-150"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Devotional;

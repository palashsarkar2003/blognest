import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Hero() {
  const { blogs } = useAuth();
  console.log(blogs);

  return (
    <div className="container mx-auto my-12 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {blogs && blogs.length > 0 ? (
        blogs.slice(0, 4).map((element) => (
          <Link
            to={`/blog/details/${element._id}`}
            key={element._id}
            className="bg-white rounded-xl overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-2xl transition-transform duration-300 group relative"
          >
            {/* Image Section */}
            <div className="relative overflow-hidden rounded-t-xl">
              <img
                src={element.blogImage.url}
                alt={element.title}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl"></div>
              {/* Subtle Sparkle/Glow */}
              <div className="absolute inset-0 pointer-events-none rounded-t-xl bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.2),transparent)] opacity-0 group-hover:opacity-50 animate-pulse transition-opacity duration-500"></div>
              <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-400 transition-colors duration-300">
                {element.title}
              </h1>
            </div>

            {/* Author Section */}
            <div className="p-4 flex items-center bg-gray-50 rounded-b-xl">
              <img
                src={element.adminPhoto}
                alt={element.adminName}
                className="h-12 w-12 rounded-full border-2 border-yellow-400 shadow-md"
              />
              <div className="ml-3 flex flex-col">
                <p className="text-lg font-semibold text-gray-800">
                  {element.adminName}
                </p>

              </div>
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
  );
}

export default Hero;

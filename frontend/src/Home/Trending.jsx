import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Trending() {
  const { blogs } = useAuth();

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">
        Trending
      </h1>

      <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3000} keyBoardControl>
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 7).map((element) => (
            <div
              key={element._id}
              className="p-3 bg-white rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl mx-2 group"
            >
              <Link to={`/blog/details/${element._id}`}>
                <div className="relative rounded-t-xl overflow-hidden">
                  <img
                    src={element.blogImage.url}
                    alt={element.title}
                    className="w-full h-56 object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-black/20 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-t-xl"></div>

                  {/* Category Badge with Pop Effect */}
                  <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md transition-transform duration-300 group-hover:scale-110">
                    {element.category}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-b-xl h-36 flex flex-col justify-between">
                  <h2
                    className="text-lg font-semibold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {element.title}
                  </h2>
                  <div className="flex items-center mt-2">
                    <img
                      src={element.adminPhoto}
                      alt="author_avatar"
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <p className="ml-3 text-gray-500 text-sm font-medium">
                      {element.adminName}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="flex justify-center space-x-3 mt-8">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-150"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300"></div>
          </div>
        )}
      </Carousel>
    </div>
  );
}

export default Trending;

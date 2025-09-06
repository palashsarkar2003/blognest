import axios from "axios";
import React, { useEffect, useState } from "react";

function Creators() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:2000/api/users/admins",
          { withCredentials: true }
        );
        setCreators(data.admins);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCreators();
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-28 min-h-screen">
      {/* Section Heading */}
      <h1 className="text-5xl font-extrabold text-center mb-20 tracking-tight">
        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text drop-shadow-sm">
          Meet Our Creators
        </span>
      </h1>

      {/* Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 px-8 md:px-20 max-w-7xl mx-auto">
        {creators && creators.length > 0 ? (
          creators.map((creator) => (
            <div
              key={creator._id}
              className="relative group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 p-8 flex flex-col items-center transform hover:-translate-y-2 hover:scale-[1.03]"
            >
              {/* Gradient Header */}
              <div className="absolute top-0 left-0 right-0 h-24 rounded-t-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

              {/* Profile Avatar */}
              <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <img
                    src={creator.photo.url}
                    alt={creator.name}
                    className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 rounded-full border-2 border-indigo-300 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity" />
                </div>
              </div>

              {/* Card Content */}
              <div className="mt-20 text-center w-full">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                  {creator.name}
                </h2>
                <p className="text-gray-500 mt-2 text-sm lowercase truncate">{creator.email}</p>
                <p className="text-gray-600 mt-1 text-sm select-text">{creator.phone}</p>
                <p className="text-indigo-600 font-semibold mt-6 capitalize tracking-wide">
                  {creator.role}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-64">
            <span className="sr-only">Loading...</span>
            <div className="flex space-x-3">
              <div className="w-5 h-5 bg-indigo-600 rounded-full animate-bounce"></div>
              <div className="w-5 h-5 bg-indigo-600 rounded-full animate-bounce delay-150"></div>
              <div className="w-5 h-5 bg-indigo-600 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Creators;
 
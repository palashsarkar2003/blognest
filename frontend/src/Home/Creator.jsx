import axios from "axios";
import React, { useEffect, useState } from "react";

function Creator() {
  const [admin, setAdmin] = useState([]);
  console.log(admin);

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data } = await axios.get(
        "http://localhost:2000/api/users/admins",
        { withCredentials: true }
      );
      console.log(data.admins);
      setAdmin(data.admins);
    };
    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-gray-900">
        Popular Creators
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {admin && admin.length > 0 ? (
          admin.slice(0, 4).map((element) => (
            <div key={element._id} className="flex flex-col items-center group relative">
              <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden transition-shadow duration-500 ease-in-out">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-full transition-all duration-300 group-hover:from-black/20 group-hover:via-black/10 z-10"></div>

                {/* Avatar with Smooth Glow */}
                <img
                  src={element.photo.url}
                  alt={element.name}
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-2xl transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.7)]"
                />
              </div>

              <div className="text-center mt-4">
                <p className="text-lg font-semibold text-gray-900 truncate">
                  {element.name}
                </p>
                <p className="text-gray-500 text-sm capitalize">{element.role}</p>
              </div>
            </div>
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

export default Creator;

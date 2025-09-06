import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Details() {

    const {id} = useParams();
    const [blogs,setBlogs] = useState({})
    useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:2000/api/blogs/single-blog/${id}`,
          { withCredentials: true }
        );
        setBlogs(data)
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong while fetching blog!");
      }
    };
    fetchBlog();
  }, [id]);

  return (
    <div>
      <div>
        {blogs && (
          <section className="container mx-auto p-4">
            <div className="text-blue-500 uppercase text-xs font-bold mb-4">
              {blogs?.category}
            </div>
            <h1 className="text-4xl font-bold mb-6">{blogs?.title}</h1>
            <div className="flex items-center mb-6">
              <img
                src={blogs?.adminPhoto}
                alt="author_avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <p className="text-xl font-semibold">{blogs?.adminName}</p>
            </div>

            {/* Blog image section */}

            <div className="flex flex-col md:flex-row">
              {blogs?.blogImage && (
                <img
                  src={blogs?.blogImage?.url}
                  alt="mainblogsImg"
                  className="md:w-1/3 w-1/2  mb-6 rounded-lg shadow-lg cursor-pointer border"
                />
              )}
              <div className="md:w-1/2 w-full md:pl-6">
                <p className="text-lg mb-6">{blogs?.about}</p>
                
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default Details

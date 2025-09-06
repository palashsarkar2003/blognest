import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../utils";

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");

  
  const [blogImage, setBlogImage] = useState(null); 
  const [blogImagePreview, setBlogImagePreview] = useState(""); 

  // Handle new image selection
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBlogImagePreview(reader.result); 
      };
    }
  };

  // Fetch existing blog details
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/blogs/single-blog/${id}`,
          { withCredentials: true }
        );

        setTitle(data?.title || "");
        setCategory(data?.category || "");
        setAbout(data?.about || "");
        setBlogImagePreview(data?.blogImage?.url || "");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong while fetching blog!");
      }
    };
    fetchBlog();
  }, [id]);

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);

    if (blogImage) {
      formData.append("blogImage", blogImage);
    }

    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data.message || "Blog updated successfully");

      // Update preview after successful update
      if (data?.blog?.blogImage?.url) {
        setBlogImagePreview(data.blog.blogImage.url);
      }

      navigateTo("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Please fill the required fields"
      );
    }
  };
  const categories = [
    "Personal",
    "Business",
    "Devotional",
    "Nature",
    "Lifestyle",
    "Fashion",
    "Beauty",
    "Travel",
    "Food",
    "Health & Fitness",
    "Finance",
    "Parenting",
    "DIY & Crafts",
    "Technology",
    "Education",
    "Photography",
    "Music",
    "Sports",
    "Automotive",
    "Gaming",
    "Science",
    "Marketing",
    "News & Politics",
    "Affiliate & Review",
    "Art & Design",
    "Book & Writing",
    "SaaS (Software as a Service)",
    "Internet Services",
    "Religion & Spirituality",
    "Multi-author",
    "Niche/Hobby",
    "Pets",
    "Movie & Entertainment",
    "Environmental",
    "Gardening",
    "Mental Health",
    "Productivity",
    "Self-Improvement",
    "Parenting & Family",
    "Language Learning",
    "Cryptocurrency & Blockchain",
    "Real Estate",
    "Foodie & Gourmet",
    "Outdoor & Adventure",
    "Home Improvement",
    "Photography Tutorials",
    "Event Planning",
    "Career Advice",
    "Legal Advice",
    "College & University Life",
    "Celebrity & Pop Culture",
    "Education Technology",
    "Tech Reviews & Tutorials",
    "Mobile Apps",
    "Vegan & Vegetarian Lifestyle",
    "Wedding Planning",
    "Craft Beer & Alcohol",
    "Book Reviews",
    "Luxury Lifestyle",
    "Relationship Advice",
    "Fitness Challenges",
    "Science Fiction & Fantasy",
    "Anime & Comics",
    "Travel Photography",
    "Food Photography",
    "Sustainability",
    "Startup & Entrepreneurship",
  ];


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
          ✍️ Update Blog
        </h3>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="Blog Main Title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Blog Image
            </label>
            <img
              src={blogImagePreview || "/imgPL.webp"}
              alt="Blog Preview"
              className="mx-auto w-1/3   object-cover rounded-lg shadow mb-4 border"
            />
            <input
              type="file"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={changePhotoHandler}
            />
          </div>

          {/* About */}
          <div>
            <textarea
              rows="6"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="Write something about your blog (at least 200 characters)..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:cursor-pointer hover:bg-blue-700 transition duration-200"
          >
            🚀 Update Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBlog;


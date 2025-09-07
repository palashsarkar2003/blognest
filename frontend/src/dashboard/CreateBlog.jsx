import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Upload, FileText, ListChecks, Image as ImageIcon } from "lucide-react";
import { BACKEND_URL } from "../utils";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState("");

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBlogImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setBlogImagePreview(reader.result);
    };
    reader.onerror = () => {
      toast.error("Error reading file!");
      setBlogImagePreview("");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !about || !blogImage) {
      return toast.error("Please fill all required fields!");
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("about", about);
      // formData.append("blogImage", blogImage);

      await axios.post(`${BACKEND_URL}/api/blogs/create`, formData, {
        withCredentials: true,
        // headers: {
        //   "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        // },
      });

      toast.success("Blog created successfully!");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage(null);
      setBlogImagePreview("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      toast.error("Error creating blog!");
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100 p-4 pt-10">
      <form
        className="w-full max-w-2xl p-8 md:p-10 rounded-3xl backdrop-blur-md bg-white/50 shadow-2xl flex flex-col gap-10"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-blue-700 text-center drop-shadow-sm">
          ✨ Create New Blog
        </h2>

        {/* Title */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <FileText size={18} /> Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-xl bg-white/80 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition"
          />
        </div>

        {/* Category */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <ListChecks size={18} /> Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-xl bg-white/80 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition"
          >
            <option value="">Select category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* About */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <FileText size={18} /> About
          </label>
          <textarea
            rows="4"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Write about your blog..."
            className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-xl bg-white/80 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm resize-none transition"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <ImageIcon size={18} /> Upload Blog Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded-xl cursor-pointer bg-white/80"
          />
          {blogImagePreview && (
            <div className="mt-4 flex justify-center">
              <img
                src={blogImagePreview}
                alt="Preview"
                className="max-w-full max-h-48 object-contain rounded-xl shadow-md border border-blue-200"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold py-3 rounded-xl shadow-lg transition w-full"
        >
          <Upload size={18} /> Publish Blog
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;

import mongoose, { mongo } from "mongoose";
import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";

// export const createBlog = async (req, res) => {
//   try {
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).json({ message: "Blog Image is required" });
//     }
//     const { blogImage } = req.files;
//     const allowedFormats = ["image/jpeg", "image/png", "image/webp","image/jpg"];
//     if (!allowedFormats.includes(blogImage.mimetype)) {
//       return res.status(400).json({
//         message: "Invalid photo format. Only jpg and png are allowed",
//       });
//     }
//     const { title, category, about } = req.body;
//     if (!title || !category || !about) {
//       return res
//         .status(400)
//         .json({ message: "title, category & about are required fields" });
//     }
//     const adminName = req?.user?.name;
//     const adminPhoto = req?.user?.photo?.url;
//     const createdBy = req?.user?._id;

//     const cloudinaryResponse = await cloudinary.uploader.upload(
//       blogImage.tempFilePath
//     );
//     if (!cloudinaryResponse || cloudinaryResponse.error) {
//       console.log(cloudinaryResponse.error);
//     }
//     const blogData = {
//       title,
//       about,
//       category,
//       adminName,
//       adminPhoto,
//       createdBy,
//       blogImage: {
//         public_id: cloudinaryResponse.public_id,
//         url: cloudinaryResponse.url,
//       },
//     };
//     const blog = await Blog.create(blogData);

//     res.status(201).json({
//       message: "Blog created successfully",
//       blog,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Internal Server error" });
//   }
// };

export const createBlog = async (req, res) => {
  try {
    const { title, category, about, blogImageBase64 } = req.body;

    if (!title || !category || !about || !blogImageBase64) {
      return res.status(400).json({ message: "All fields including blog image are required" });
    }

    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo?.url;
    const createdBy = req?.user?._id;

    // Upload Base64 image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(blogImageBase64);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
    }

    const blogData = {
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    };

    const blog = await Blog.create(blogData);

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  await blog.deleteOne();
  res.status(200).json({ message: "Blog deleted successfully" });
};

export const getAllBlogs = async (req, res) => {
  const allBlogs = await Blog.find();
  res.status(200).json(allBlogs);
};

export const getSingleBlogs = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(blog);
};

export const getMyBlogs = async (req, res) => {
  const createdBy = req.user._id;
  const myBlogs = await Blog.find({ createdBy });
  res.status(200).json(myBlogs);
};



// export const updateBlog = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: "Invalid Blog id" });
//   }

//   let updateData = {
//     ...req.body,
//   };

//   // If new image is uploaded
//   if (req.files) {
//     const { blogImage } = req.files;
//     const allowedFormats = ["image/jpeg", "image/png", "image/webp","image/jpg"];
//     if (!allowedFormats.includes(blogImage.mimetype)) {
//       return res.status(400).json({
//         message: "Invalid photo format. Only jpg and png are allowed",
//       });
//     }
//     try {
//       // Upload to Cloudinary
//       const uploadResult = await cloudinary.uploader.upload(blogImage.tempFilePath
//       );

//       // Set new blogImage object
//       updateData.blogImage = {
//         public_id: uploadResult.public_id,
//         url: uploadResult.url,
//       };
//     } catch (err) {
//       return res.status(500).json({ message: "Image upload failed", error: err.message });
//     }
//   }

//   const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
//   if (!updatedBlog) {
//     return res.status(404).json({ message: "Blog not found" });
//   }
//   res.status(200).json({ blog: updatedBlog, message: "Blog updated successfully" });
// };
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }

  let updateData = { ...req.body };

  // If new Base64 image is provided
  if (req.body.blogImage) {
    try {
      const uploadResult = await cloudinary.uploader.upload(req.body.blogImage);
      updateData.blogImage = {
        public_id: uploadResult.public_id,
        url: uploadResult.url,
      };
    } catch (err) {
      return res.status(500).json({ message: "Image upload failed", error: err.message });
    }
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedBlog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.status(200).json({ blog: updatedBlog, message: "Blog updated successfully" });
};
import React, { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaCheckCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BACKEND_URL } from "../utils";

function Contact() {
  const [success, setSuccess] = useState(false); // modal state
  const [fade, setFade] = useState(false); // fade animation state

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "cf90e54a-5af1-4826-8f5e-002aa42c358a",
      name: data.username,
      email: data.email,
      message: data.message,
      subject: "New message from Contact Form",
    };

    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      reset();
      setSuccess(true);
      setFade(true); // trigger fade-in
      setTimeout(() => setFade(false), 2000); // fade out after 2s
      setTimeout(() => setSuccess(false), 2000); // remove modal after fade
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative">
      
      {/* Animated Success Modal */}
      {success && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`bg-white rounded-xl shadow-xl p-8 flex flex-col items-center space-y-4 transform transition-transform duration-500 ${
              fade ? "translate-y-0" : "-translate-y-8"
            }`}
          >
            <FaCheckCircle className="text-green-500 text-5xl" />
            <h3 className="text-2xl font-bold text-gray-800">Message Sent!</h3>
            <p className="text-gray-600 text-center">
              Thank you for contacting me. I will get back to you shortly.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 bg-gray-50">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Contact Us</h2>
            <p className="text-gray-600 mb-6">
              Have a question or want to work together? Send me a message and I'll get back to you.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-sm text-red-500 font-medium">Name is required</span>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500 font-medium">Email is required</span>
                )}
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none h-32"
                  {...register("message", { required: true })}
                />
                {errors.message && (
                  <span className="text-sm text-red-500 font-medium">Message is required</span>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 bg-gradient-to-tr from-blue-50 to-blue-100 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
            <ul className="space-y-5 text-gray-700">
              <li className="flex items-center space-x-3">
                <FaPhone className="text-blue-600 text-lg" />
                <span className="font-medium">+91 6294715255</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-pink-500 text-lg" />
                <span className="font-medium">palash.sarkar.work@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-green-500 text-lg" />
                <span className="font-medium">Garhbeta, Medinipur(W), India</span>
              </li>
            </ul>
            <p className="mt-8 text-gray-600">
              Feel free to reach out for collaboration, project inquiries, or just to say hello! I am always open to exciting opportunities and new connections.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;

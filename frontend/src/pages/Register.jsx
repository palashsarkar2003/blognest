import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFeatherAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { FaSun, FaMoon } from "react-icons/fa";
import { BACKEND_URL } from "../utils";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    // formData.append("photo", photo);
    console.log("BACKEND_URL:", BACKEND_URL);
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/users/register`,
        formData,
        {
          withCredentials: true,
          // headers: {
          //   "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          // },
        }
      );
      toast.success(
        `Dear ${data.user.name}!! You have registered successfully`
      );
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setEducation("");
      setRole("");
      setPhoto("");
      setPhotoPreview("");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Please fill all required details"
      );
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      } min-h-screen flex items-center justify-center px-4 py-8 transition-colors duration-500`}
    >
      <div
        className={`${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        } w-full max-w-md rounded-3xl p-8 shadow-xl`}
      >
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-300"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-800" />
            )}
          </button>
        </div>

        <div className="text-center mb-4">
          <div className="font-bold text-3xl flex items-center justify-center mb-1">
            <span className="text-blue-500 mr-2 animate-bounce">
              <FaFeatherAlt />
            </span>
            Blog<span className="text-blue-500 ml-1">Nest</span>
          </div>
          <h1 className="text-xl font-semibold">Register</h1>
        </div>

        <form onSubmit={handleRegister} className="space-y-3">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`${
              darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
            } w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${
              darkMode
                ? "bg-gray-700 text-gray-100 placeholder-gray-300"
                : "bg-white text-gray-900 placeholder-gray-400"
            } w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
          />

          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${
              darkMode
                ? "bg-gray-700 text-gray-100 placeholder-gray-300"
                : "bg-white text-gray-900 placeholder-gray-400"
            } w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
          />

          <input
            type="number"
            placeholder="Enter Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`${
              darkMode
                ? "bg-gray-700 text-gray-100 placeholder-gray-300"
                : "bg-white text-gray-900 placeholder-gray-400"
            } w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
          />

          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${
              darkMode
                ? "bg-gray-700 text-gray-100 placeholder-gray-300"
                : "bg-white text-gray-900 placeholder-gray-400"
            } w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
          />

          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className={`${
              darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
            } w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
          >
            <option value="">Select Your Education</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="B.TECH">B.TECH</option>
            <option value="M.TECH">M.TECH</option>
            <option value="BBA">BBA</option>
            <option value="MBA">MBA</option>
          </select>

          {/* Photo Upload */}
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-400">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Photo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 font-semibold text-sm">
                  Photo
                </div>
              )}
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className={`${
                darkMode
                  ? "bg-gray-700 text-gray-100"
                  : "bg-white text-gray-900"
              } flex-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm`}
            />
          </div>

          <p className="text-center text-sm">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-blue-500 font-semibold hover:underline hover:cursor-pointer"
            >
              Login Now
            </Link>
          </p>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold rounded-xl transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

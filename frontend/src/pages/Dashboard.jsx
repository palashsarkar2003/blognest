import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import Sidebar from '../dashboard/Sidebar';
import MyProfile from '../dashboard/MyProfile';
import MyBlogs from '../dashboard/MyBlogs';
import CreateBlog from '../dashboard/CreateBlog';
import UpdateBlog from '../dashboard/UpdateBlog';
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs");

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100">
      {/* Sidebar with fixed width */}
      <Sidebar component={component} setComponent={setComponent} />

      {/* Main content area */}
      <main className="flex-1 p-6 overflow-y-auto">
        {component === "My Profile" ? (
          <MyProfile />
        ) : component === "Create Blog" ? (
          <CreateBlog />
        ) : component === "Update Blog" ? (
          <UpdateBlog />
        ) : (
          <MyBlogs />
        )}
      </main>
    </div>
  );
}

export default Dashboard;

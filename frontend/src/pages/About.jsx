import React from "react";
import { useAuth } from "../context/AuthProvider";
import { FaGithub, FaLinkedin, FaTwitter, FaCode, FaServer, FaDatabase, FaTools, FaLaptopCode } from "react-icons/fa";
import profilePic from "../assets/Palash_profile.jpg"; // Import your photo

function About() {
  const { profile } = useAuth();

  return (
    <div className="container mx-auto my-12 p-6 space-y-12 md:space-y-16">

      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3">
        About Me
      </h1>

      {/* Intro Section */}
      <div className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-500 space-y-4 md:space-y-0 md:space-x-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src={profilePic}
            alt={profile?.user?.name || "Palash Sarkar"}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-md hover:scale-105 transition-transform duration-500"
          />

          {/* Social Media */}
          <div className="flex space-x-4 mt-4">
            <a href="https://github.com/palashsarkar2003" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-gray-700 hover:text-gray-900 text-xl md:text-2xl transition-colors duration-300" />
            </a>
            <a href="https://www.linkedin.com/in/palash-sarkar-244454204" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-blue-600 hover:text-blue-800 text-xl md:text-2xl transition-colors duration-300" />
            </a>
            <a href="https://twitter.com/PalashS55922259" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-blue-400 hover:text-blue-600 text-xl md:text-2xl transition-colors duration-300" />
            </a>
          </div>
        </div>

        {/* Intro Text */}
        <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-3">
          <p>
            Hi, I am{" "}
            <strong className="text-blue-600 font-semibold hover:scale-105 transition-transform duration-300">
              Palash Sarkar
            </strong>, a passionate Full-Stack Developer with skills in both front-end and back-end technologies. I enjoy building responsive, dynamic, and user-friendly web applications that deliver seamless digital experiences.
          </p>
        </div>
      </div>

      {/* Education */}
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-500">
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">Education</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base md:text-lg leading-relaxed">
          <li>B.Tech in Computer Science and Engineering -(Data Science) – Brainware University(2022-26)</li>
          <li>Higher Secondary – Vidyasagar Vidyapith Boys' High School, 2021</li>
        </ul>
      </div>

      {/* Technical Expertise */}
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-500">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">Technical Expertise</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Programming Languages */}
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
            <FaCode className="text-blue-500 text-3xl mb-2" />
            <h3 className="font-semibold text-blue-500 mb-2">Programming</h3>
            <ul className="text-gray-700 space-y-1 text-center">
              <li>Java</li>
              <li>C</li>
              <li>Python</li>
              <li>JavaScript</li>
            </ul>
          </div>

          {/* Front-End */}
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
            <FaLaptopCode className="text-green-500 text-3xl mb-2" />
            <h3 className="font-semibold text-green-500 mb-2">Front-End</h3>
            <ul className="text-gray-700 space-y-1 text-center">
              <li>React.js</li>
              <li>HTML5 & CSS3</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>

          {/* Back-End */}
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
            <FaServer className="text-purple-500 text-3xl mb-2" />
            <h3 className="font-semibold text-purple-500 mb-2">Back-End</h3>
            <ul className="text-gray-700 space-y-1 text-center">
              <li>Node.js</li>
              <li>Express.js</li>
            </ul>
          </div>

          {/* Databases */}
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
            <FaDatabase className="text-red-500 text-3xl mb-2" />
            <h3 className="font-semibold text-red-500 mb-2">Databases</h3>
            <ul className="text-gray-700 space-y-1 text-center">
              <li>MongoDB</li>
              <li>MySQL</li>
            </ul>
          </div>

          {/* Tools & Platforms */}
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
            <FaTools className="text-yellow-500 text-3xl mb-2" />
            <h3 className="font-semibold text-yellow-500 mb-2">Tools</h3>
            <ul className="text-gray-700 space-y-1 text-center">
              <li>Git & GitHub</li>
              <li>Postman</li>
              <li>VS Code</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Professional Highlights */}
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-500">
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">Professional Highlights</h2>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          Developed and deployed multiple full-stack web applications, collaborating with teams to deliver high-quality software solutions. Strong problem-solving skills with a passion for learning new technologies and improving digital experiences.
        </p>
      </div>

      {/* Personal Statement */}
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-500">
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          I am committed to leveraging my skills to contribute to innovative projects and create technology solutions that positively impact users and businesses.
        </p>
      </div>

      {/* Personal Interests */}
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-500">
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">Personal Interests & Inspiration</h2>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          Outside of coding, I enjoy Photography, playing cricket, and chess, which help me stay creative, focused, and strategic. I am a big fan of cricket, and my favorite player is <strong>Rohit Sharma</strong>, whose dedication and consistency inspire me both on and off the field. I also enjoy exploring new technologies, attending tech meetups, and sharing knowledge with the developer community. These interests keep me motivated, balanced, and constantly learning in both my personal and professional life.
        </p>
      </div>

    </div>
  );
}

export default About;

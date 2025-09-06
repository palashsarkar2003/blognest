import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Mail, Phone, Calendar } from "lucide-react";
import { motion } from "framer-motion";

function MyProfile() {
  const { profile } = useAuth();
  const [flipped, setFlipped] = useState(false);

  const formattedDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString()
    : "—";

  const cardWrapperStyle = { perspective: 1200 };
  const flipperStyle = {
    width: "100%",
    height: "440px",
    position: "relative",
    transformStyle: "preserve-3d",
    WebkitTransformStyle: "preserve-3d",
    willChange: "transform",
  };
  const faceCommon = {
    position: "absolute",
    inset: 0,
    borderRadius: "1.5rem",
    overflow: "hidden",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    boxShadow: "0 15px 35px rgba(16,24,40,0.18)",
  };

  return (
    <div className="bg-gradient-to-tr from-cyan-50 via-sky-100 to-blue-50 py-28 min-h-screen flex flex-col items-center">
      {/* Section Heading */}
      <h1 className="text-center text-5xl font-extrabold mb-20 tracking-wide">
        <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-transparent bg-clip-text drop-shadow-md">
          Your Profile
        </span>
      </h1>

      {/* Flip Card Container */}
      <div
        className="w-80 cursor-pointer hover:-translate-y-2 hover:shadow-2xl transition-transform duration-500"
        style={cardWrapperStyle}
        role="button"
        tabIndex={0}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setFlipped((f) => !f);
        }}
      >
        <motion.div
          style={flipperStyle}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Front Side */}
          <div
            style={{
              ...faceCommon,
              backgroundImage: `url(${profile?.photo?.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              color: "white",
            }}
          >
            <div
              className="w-full p-5"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0))",
              }}
            >
              <h2 className="text-2xl font-bold">{profile?.name}</h2>
              <p className="text-sm opacity-90 capitalize">{profile?.role}</p>
            </div>
          </div>

          {/* Back Side */}
          <div
            style={{
              ...faceCommon,
              background: "white",
              transform: "rotateY(180deg)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              padding: "1.5rem",
              color: "#374151",
            }}
          >
            <div className="flex items-center gap-3 animate-pulse">
              <Phone size={22} className="text-blue-600" />
              <p className="text-sm">{profile?.phone ?? "—"}</p>
            </div>

            <div className="flex items-center gap-3 animate-pulse">
              <Mail size={22} className="text-rose-500" />
              <p className="text-sm break-words">{profile?.email ?? "—"}</p>
            </div>

            <div className="flex items-center gap-3 animate-pulse">
              <Calendar size={22} className="text-green-600" />
              <p className="text-sm">{formattedDate}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default MyProfile;

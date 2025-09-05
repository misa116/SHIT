   /* React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
  const bgImage =
    "https://images.pexels.com/photos/4481258/pexels-photo-4481258.jpeg?auto=compress&cs=tinysrgb&w=600";

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white  shadow-md">
        <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Inventory Management System
          </h1>

          <button className="px-5 p-2 bg-orange-300 text-slate-700 hover:bg-orange-600 hover:text-slate-200 rounded-lg">
            <Link to="/login">Login</Link>
          </button>
        </div>
      </header>
      <main
        className="flex-grow"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
              <h2 className="text-2xl font-semibold text-gray-200">
                Inventory Warehouse
              </h2>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white shadow mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            &copy; 2024 Inventory Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

/*/




/*
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
  const bgImage =
    "https://images.pexels.com/photos/4481258/pexels-photo-4481258.jpeg?auto=compress&cs=tinysrgb&w=1600";

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Inventory Management System
          </h1>
          <Link
            to="/login"
            className="px-6 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
          >
            Login
          </Link>
        </div>
      </header>

      <main
        className="flex-grow relative bg-gray-900"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div> 
        <div className="relative max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            PREMIRE DOOR & TRIM INC. 
          </h2>
          <p className="text-lg md:text-xl mb-6 drop-shadow-md">
            Manage your inventory efficiently with real-time tracking and control.
          </p>
          <Link
            to="/login"
            className="px-8 py-3 bg-orange-500 rounded-lg shadow hover:bg-orange-600 transition text-lg font-semibold"
          >
            Get Started
          </Link>
        </div>
      </main>

      
      <footer className="bg-gray-100 mt-8">
        <div className="max-w-7xl mx-auto py-4 px-6 text-center text-gray-500">
          &copy; 2025 VFR Systems. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
*/


/*
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ for animations

const Landing = () => {
  const bgImage =
    "https://images.pexels.com/photos/4481258/pexels-photo-4481258.jpeg?auto=compress&cs=tinysrgb&w=1600";

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight font-serif italic">
            Inventory Management System
          </h1>
        </div>
      </motion.header>

      <main
        className="flex-grow relative"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative max-w-4xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center text-white"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg leading-tight"
          >
            PREMIERE DOOR & TRIM INC.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl mb-8 drop-shadow-md text-gray-200"
          >
            Manage your inventory efficiently with real-time tracking and control.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/register"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-transform transform hover:scale-105 active:scale-95 text-lg font-semibold"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-700 transition-transform transform hover:scale-105 active:scale-95 text-lg font-semibold"
            >
              Login
            </Link>
          </motion.div>
        </motion.div>
      </main>

      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        className="bg-gray-900"
      >
        <div className="max-w-7xl mx-auto py-6 px-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} VFR Systems. All rights reserved.
        </div>
      </motion.footer>
    </div>
  );
};

export default Landing;
*/







import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 

const Landing = () => {
  const bgImage =
    "https://images.pexels.com/photos/4481258/pexels-photo-4481258.jpeg?auto=compress&cs=tinysrgb&w=1600";

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo, navigate]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-black/60 backdrop-blur-md shadow-md sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-blue-400 font-[Pacifico] drop-shadow-lg">
            Inventory Management System
          </h1>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main
        className="flex-grow relative"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Animated overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 animate-pulse-slow"></div>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative max-w-4xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center text-white"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] leading-tight"
          >
            PREMIER DOOR & TRIM INC.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl mb-8 drop-shadow-md text-gray-200"
          >
            Manage your inventory efficiently with{" "}
            <span className="text-blue-400 font-semibold">real-time tracking </span>  
            and control.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/register"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105 active:scale-95 text-lg font-semibold text-white"
            >
              🚀 Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-700 transition-transform transform hover:scale-105 active:scale-95 text-lg font-semibold text-white"
            >
              🔑 Login
            </Link>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        className="bg-black/80 border-t border-gray-700"
      >
        <div className="max-w-7xl mx-auto py-6 px-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} VFR Systems. All rights reserved.
        </div>
      </motion.footer>
    </div>
  );
};

export default Landing;

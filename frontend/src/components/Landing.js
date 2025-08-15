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
      {/* Header */}
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

      {/* Hero Section */}
      <main
        className="flex-grow relative bg-gray-900"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Dark overlay */}
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

      {/* Footer */}
      <footer className="bg-gray-100 mt-8">
        <div className="max-w-7xl mx-auto py-4 px-6 text-center text-gray-500">
          &copy; 2025 VFR Systems. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;

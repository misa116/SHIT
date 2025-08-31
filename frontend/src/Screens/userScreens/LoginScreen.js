/*import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsEmojiLaughing } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/userApiSlice";
import { userCredentials } from "../../redux/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);

  const redirect = sp.get("/redirect") || "/dashboard";

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, []);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await login({ email, password }).unwrap();

      dispatch(userCredentials({ ...res }));
      toast.success("login Succesfully");
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto sm:px-3 md:px-0 p-2 mt-6 md:mt-12"
    >
       //Sign in Form Goes Here 

      <form
        className="max-w-md mx-auto bg-white p-8  rounded shadow-lg"
        onSubmit={submitHandler}
      >
        <h1 className="text-center text-2xl font-bold">Sign In </h1>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-500 text-sm font-bold"
          >
            Email
          </label>
          <input
            placeholder="Enter your Email "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-300 p-2 w-full rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-500 text-sm font-bold"
          >
            password
          </label>
          <input
            type="password"
            placeholder="Enter your password "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-300 p-2 w-full rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-800 p-2 px-4 text-slate-50 rounded-xl cursor-pointer
           hover:bg-slate-400 hover:text-slate-950  "
        >
          Sign in
        </button>

        <div className="py-2 text-lg font-bold text-gray-4 00 cursor-pointer">
          <p>
            Don't have An Account
            <Link
              to="/register"
              className="text-blue-700 ml-2 hover:underline "
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginScreen;

/*/


/*
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/userApiSlice";
import { userCredentials } from "../../redux/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("/redirect") || "/dashboard";

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(userCredentials({ ...res }));
      toast.success("Login Successful");
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-900 p-4"
    >
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-gray-800 text-gray-100 rounded-xl shadow-xl p-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-white">
          Sign In
        </h1>

        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default LoginScreen;

*/







/*
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/userApiSlice";
import { userCredentials } from "../../redux/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/dashboard"; // ✅ fixed (removed "/redirect")

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(userCredentials({ ...res })); // ✅ saves user + token + role
      toast.success("Login Successful");
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-900 p-4"
    >
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-gray-800 text-gray-100 rounded-xl shadow-xl p-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-white">
          Sign In
        </h1>

        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default LoginScreen;
*/






/*
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/userApiSlice";
import { userCredentials } from "../../redux/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/dashboard";

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(userCredentials({ ...res }));
      toast.success("Login Successful");
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 animate-gradient-x"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-gray-800/90 backdrop-blur-md text-gray-100 rounded-xl shadow-2xl p-8 space-y-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-center text-white"
        >
          Welcome Back
        </motion.h1>

        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-blue-400"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          onClick={submitHandler}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader /> : "Sign In"}
        </button>

        <p className="text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:underline font-semibold"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
*/





/*
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/userApiSlice";
import { userCredentials } from "../../redux/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [timeoutError, setTimeoutError] = useState(false);

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/dashboard";

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setTimeoutError(false);

    // Timeout in case API hangs
    const timeout = setTimeout(() => {
      setTimeoutError(true);
      toast.error("Login timed out. Please check your connection or try again.");
    }, 10000); // 10 seconds

    try {
      const res = await login({ email, password }).unwrap();
      console.log("Login response:", res);

      dispatch(userCredentials({ ...res }));
      toast.success("Login Successful");
      navigate(redirect);
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err?.data?.message || err.error || "Login failed");
    } finally {
      clearTimeout(timeout);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 animate-gradient-x"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-gray-800/90 backdrop-blur-md text-gray-100 rounded-xl shadow-2xl p-8 space-y-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-center text-white"
        >
          Welcome Back
        </motion.h1>

        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="font-semibold">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-blue-400"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          onClick={submitHandler}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader /> : "Sign In"}
        </button>

        {timeoutError && <p className="text-red-500 text-center mt-2">Login timed out. Please try again.</p>}

        <p className="text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline font-semibold">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
*/









import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/userApiSlice";
import { userCredentials } from "../../redux/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/dashboard";

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      console.log("Login response:", res);

      dispatch(userCredentials({ ...res }));
      toast.success("Login Successful");
      navigate(redirect);
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err?.data?.message || err.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 animate-gradient-x"></div>

      {/* Floating login card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-gray-800/90 backdrop-blur-md text-gray-100 rounded-xl shadow-2xl p-8 space-y-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-center text-white"
        >
          Welcome Back
        </motion.h1>

        {/* Email Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="font-semibold">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-blue-400"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          onClick={submitHandler}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader /> : "Sign In"}
        </button>

        {/* Loader feedback */}
        {isLoading && (
          <p className="text-blue-400 text-center mt-2 animate-pulse">
            Logging you in, please wait...
          </p>
        )}

        <p className="text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline font-semibold">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginScreen;

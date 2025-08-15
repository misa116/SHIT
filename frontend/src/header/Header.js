   /*import React, { useEffect } from "react";
import { BsJustify } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutHandler } from "../redux/authSlice";
const Header = ({ openSidebar }) => {

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutHandler());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="meu-icon" onClick={openSidebar}>
        <BsJustify size={24} />
      </div>

      <div className="header-left">
        <h3 className="text-lg sm:ml-3 md:text-3xl text-slate-200">
          Inventory SYS
        </h3>
      </div>
      <div className="header-right flex items-center text-1xl space-x-2 px-3">
        <p>{userInfo && userInfo?.name}</p>
        <button className="flex items-center space-x-1 text-white bg-gray-500 hover:bg-red-600 px-3 pl-3 py-2 rounded-md transition      flex items-center  space-x-1" onClick={logout}>
          <BiLogOut size={28} /> Logout
        </button>
      </div>
    </header>
  );
};

export default Header;

/*/



import React from "react";
import { BsJustify } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutHandler } from "../redux/authSlice";

const Header = ({ openSidebar }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutHandler());
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between bg-gray-800 text-white px-6 py-4 shadow-md">
      <div
        className="cursor-pointer hover:text-orange-400 transition"
        onClick={openSidebar}
      >
        <BsJustify size={28} />
      </div>

      <div className="text-center flex-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Inventory SYS
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        {userInfo && (
          <p className="hidden sm:block font-medium">{userInfo.name}</p>
        )}
        <button
          onClick={logout}
          className="flex items-center space-x-2   text-white px-4 py-2 rounded-lg shadow transition  mt-4 sm:mt-0 bg-gradient-to-r from-red-600 to-indigo-500 text-white font-semibold py-2 px-6 rounded-lg shadow hover:from-red-500 hover:to-indigo-400 transition transform hover:scale-105  "
        >
          <BiLogOut size={22} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

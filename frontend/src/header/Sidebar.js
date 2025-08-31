  /* import React, { useState, useEffect, useRef } from "react";
import { BiSolidUserPin, BiTime } from "react-icons/bi";
import {
  BsCart4,
  BsCheck2Square,
  BsFillGrid3X3GapFill,
  BsGrid1X2Fill,
} from "react-icons/bs";
import { IoIosArrowUp, IoIosClose } from "react-icons/io";
import { FaJediOrder, FaToolbox, FaTools, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ openSidebarToggle, openSidebar }) => {
  const sidebarRef = useRef(null);
  const [isInventoryOpen, setIsInventoryOpen] = useState(true);
  const [isProcurementOpen, setIsProcurementOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const totalQty = cartItems?.reduce((acc, item) => acc + Number(item.qty), 0);

  const toggleInventory = () => setIsInventoryOpen(!isInventoryOpen);
  const toggleProcurement = () => setIsProcurementOpen(!isProcurementOpen);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openSidebarToggle &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        openSidebar(); // Close sidebar
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSidebarToggle, openSidebar]);

  return (
 <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive p-4" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand  flex items-center space-x-2 text-slate-300 ">
          <BiTime size={26} className="icon_head mr-2" /> {currentTime}
        </div>
        <span className="icon close_icon " onClick={openSidebar}>
          <IoIosClose size={32} className="text-slate-100 ml-4" />
        </span>
      </div>

      {// Sidebar Menu }
      <ul className="space-y-4 text-sm">
        {// Dashboard }
        <li>
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <BsGrid1X2Fill size={30} />
            <span className="text-xl">Dashboard</span>
          </Link>
        </li>

        {// Inventory Section }
        <li>
          <div
            onClick={toggleInventory}
            className="flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-indigo-600 rounded-lg transition-colors"
          >

            <div className="flex items-center text-xl space-x-3">
              <BsFillGrid3X3GapFill size={30} />
              <span>Inventory</span>
            </div>

            <IoIosArrowUp
              size={18}
              className={`transition-transform ${isInventoryOpen ? "rotate-180" : ""}`}
            />
          </div>




          {isInventoryOpen && (
            <ul className="ml-6 mt-2 space-y-3 text-gray-300">
              <li>
                <Link to="/warehouse" className="hover:text-white flex items-center space-x-2">
                  <FaToolbox />
                  <span>Warehouse</span>
                </Link>
              </li>
              <li>
                <Link to="/store-requisition" className="hover:text-white flex items-center space-x-2 relative">
                  <BsCart4 />
                  <span>Cart</span>
                  {totalQty > 0 && (
                    <span className="absolute top-0 right-0 -mt-2 -mr-3 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {totalQty}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link to="/my-orders-list" className="hover:text-white flex items-center space-x-2">
                  <BiSolidUserPin />
                  <span>My Requisitions</span>
                </Link>
              </li>
              <li>
                <Link to="/LPO-factory" className="hover:text-white flex items-center space-x-2">
                  <FaJediOrder />
                  <span>LP Orders</span>
                </Link>
              </li>
              <li>
                <Link to="/goods-receive-note" className="hover:text-white flex items-center space-x-2">
                  <FaTools />
                  <span>GRN</span>
                </Link>
              </li>
              {userInfo?.isAdmin && (
                <li>
                  <Link to="/listUsers" className="hover:text-white flex items-center space-x-2">
                    <FaUsers />
                    <span>HR</span>
                  </Link>
                </li>
              )}
            </ul>
          )}
        </li>

        {// Procurement Section }
        <li>
          <div
            onClick={toggleProcurement}
            className="flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-indigo-600 rounded-lg transition-colors"
          >
            <div className="flex items-center text-xl space-x-3">
              <BsCheck2Square size={30} />
              <span>Procurement</span>
            </div>
            <IoIosArrowUp
              size={18}
              className={`transition-transform ${isProcurementOpen ? "rotate-180" : ""}`}
            />
          </div>
          {isProcurementOpen && (
            <ul className="ml-6 mt-2 space-y-3 text-gray-300">
              <li>
                <Link to="/LPO-procurement" className="hover:text-white">
                  Local Purchase Orders
                </Link>
              </li>
              <li>
                <Link to="/pending-requisitions" className="hover:text-white">
                  Pending Requisitions
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
*/




/*

import React, { useState, useEffect, useRef } from "react";
import { BiSolidUserPin, BiTime } from "react-icons/bi";
import {
  BsCart4,
  BsCheck2Square,
  BsFillGrid3X3GapFill,
  BsGrid1X2Fill,
} from "react-icons/bs";
import { IoIosArrowUp, IoIosClose } from "react-icons/io";
import { FaJediOrder, FaToolbox, FaTools, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ openSidebarToggle, openSidebar }) => {
  const sidebarRef = useRef(null);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isProcurementOpen, setIsProcurementOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const location = useLocation();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const totalQty = cartItems?.reduce((acc, item) => acc + Number(item.qty), 0);

  const toggleInventory = () => setIsInventoryOpen(!isInventoryOpen);
  const toggleProcurement = () => setIsProcurementOpen(!isProcurementOpen);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openSidebarToggle &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        openSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSidebarToggle, openSidebar]);

  const navItemClasses = (path) =>
    `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
      location.pathname === path
        ? "bg-indigo-700 text-white"
        : "hover:bg-indigo-600 text-gray-300"
    }`;

  const collapsibleClasses = (isOpen) =>
    `overflow-hidden transition-[max-height] duration-300 ease-in-out ${
      isOpen ? "max-h-96" : "max-h-0"
    }`;

  const hrSlideClasses = (isOpen, delay = 0) => ({
    height: "1px",
    backgroundColor: "#4B5563", // Tailwind gray-700
    width: isOpen ? "100%" : "0%",
    transition: `width 500ms ease ${delay}ms`,
  });

  return (
    <aside
      ref={sidebarRef}
      className={`bg-gray-900 text-gray-300 w-64 min-h-screen p-4 shadow-xl transition-transform ${
        openSidebarToggle ? "translate-x-0" : "-translate-x-full"
      } fixed z-50`}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3 text-indigo-400 font-bold text-3xl">
          <BiTime size={36} />
          <span>{currentTime}</span>
        </div>
        <span
          className="cursor-pointer text-gray-300 hover:text-red-500"
          onClick={openSidebar}
        >
          <IoIosClose size={28} />
        </span>
      </div>

      <ul className="space-y-4 text-sm">
        <li>
          <Link to="/" className={navItemClasses("/")}>
            <BsGrid1X2Fill size={26} />
            <span>Dashboard</span>
          </Link>
        </li>

        <li>
          <div
            onClick={toggleInventory}
            className="flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-indigo-600 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3 text-lg">
              <BsFillGrid3X3GapFill size={26} />
              <span>Inventory</span>
            </div>
            <IoIosArrowUp
              size={18}
              className={`transition-transform duration-300 ${
                isInventoryOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          <div className={collapsibleClasses(isInventoryOpen)}>
            <div className="overflow-hidden my-2">
              <div style={hrSlideClasses(isInventoryOpen, 50)} />
            </div>
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <Link to="/warehouse" className={navItemClasses("/warehouse")}>
                  <FaToolbox />
                  <span>Warehouse</span>
                </Link>
              </li>
              <li className="relative">
                <Link
                  to="/store-requisition"
                  className={navItemClasses("/store-requisition")}
                >
                  <BsCart4 />
                  <span>Cart</span>
                  {totalQty > 0 && (
                    <span className="absolute top-0 right-0 -mt-2 -mr-3 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                      {totalQty}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/my-orders-list"
                  className={navItemClasses("/my-orders-list")}
                >
                  <BiSolidUserPin />
                  <span>My Requisitions</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/LPO-factory"
                  className={navItemClasses("/LPO-factory")}
                >
                  <FaJediOrder />
                  <span>LP Orders</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/goods-receive-note"
                  className={navItemClasses("/goods-receive-note")}
                >
                  <FaTools />
                  <span>GRN</span>
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li>
          <div
            onClick={toggleProcurement}
            className="flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-indigo-600 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3 text-lg">
              <BsCheck2Square size={26} />
              <span>Procurement</span>
            </div>
            <IoIosArrowUp
              size={18}
              className={`transition-transform duration-300 ${
                isProcurementOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          <div className={collapsibleClasses(isProcurementOpen)}>
            <div className="overflow-hidden my-2">
              <div style={hrSlideClasses(isProcurementOpen, 100)} />
            </div>
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <Link
                  to="/LPO-procurement"
                  className={navItemClasses("/LPO-procurement")}
                >
                  Local Purchase Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/pending-requisitions"
                  className={navItemClasses("/pending-requisitions")}
                >
                  Pending Requisitions
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {userInfo?.isAdmin && (
          <li>
            <div className="overflow-hidden my-2">
              <div style={hrSlideClasses(true, 150)} />
            </div>
            <Link to="/listUsers" className={navItemClasses("/listUsers")}>
              <FaUsers />
              <span>Employees</span>
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;

*/








/*
import React, { useState, useEffect, useRef } from "react";
import { BiSolidUserPin, BiTime } from "react-icons/bi";
import { BsCart4, BsCheck2Square, BsFillGrid3X3GapFill, BsGrid1X2Fill } from "react-icons/bs";
import { IoIosArrowUp, IoIosClose } from "react-icons/io";
import { FaJediOrder, FaToolbox, FaTools, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ openSidebarToggle, openSidebar }) => {
  const sidebarRef = useRef(null);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isProcurementOpen, setIsProcurementOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const location = useLocation();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const totalQty = cartItems?.reduce((acc, item) => acc + Number(item.qty), 0);

  const toggleInventory = () => setIsInventoryOpen(!isInventoryOpen);
  const toggleProcurement = () => setIsProcurementOpen(!isProcurementOpen);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openSidebarToggle && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        openSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSidebarToggle, openSidebar]);

  const navItemClasses = (path) =>
    `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
      location.pathname === path ? "bg-indigo-700 text-white" : "hover:bg-indigo-600 text-gray-300"
    }`;

  const collapsibleClasses = (isOpen) =>
    `overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"}`;

  const hrSlideClasses = (isOpen, delay = 0) => ({
    height: "1px",
    backgroundColor: "#4B5563",
    width: isOpen ? "100%" : "0%",
    transition: `width 500ms ease ${delay}ms`,
  });

  if (!userInfo) return null; // Wait for Redux state to load

  return (
    <aside
      ref={sidebarRef}
      className={`bg-gray-900 text-gray-300 w-64 min-h-screen p-4 shadow-xl transition-transform ${
        openSidebarToggle ? "translate-x-0" : "-translate-x-full"
      } fixed z-50`}
    >
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3 text-indigo-400 font-bold text-3xl">
          <BiTime size={36} />
          <span>{currentTime}</span>
        </div>
        <span className="cursor-pointer text-gray-300 hover:text-red-500" onClick={openSidebar}>
          <IoIosClose size={28} />
        </span>
      </div>

      
      <ul className="space-y-4 text-sm">
        
        <li>
          <Link to="/" className={navItemClasses("/")}>
            <BsGrid1X2Fill size={26} />
            <span>Dashboard</span>
          </Link>
        </li>

        
        <li>
          <div
            onClick={toggleInventory}
            className="flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-indigo-600 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3 text-lg">
              <BsFillGrid3X3GapFill size={26} />
              <span>Inventory</span>
            </div>
            <IoIosArrowUp
              size={18}
              className={`transition-transform duration-300 ${isInventoryOpen ? "rotate-180" : ""}`}
            />
          </div>

          <div className={collapsibleClasses(isInventoryOpen)}>
            <div className="overflow-hidden my-2">
              <div style={hrSlideClasses(isInventoryOpen, 50)} />
            </div>
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <Link to="/warehouse" className={navItemClasses("/warehouse")}>
                  <FaToolbox />
                  <span>Warehouse</span>
                </Link>
              </li>
              <li className="relative">
                <Link to="/store-requisition" className={navItemClasses("/store-requisition")}>
                  <BsCart4 />
                  <span>Cart</span>
                  {totalQty > 0 && (
                    <span className="absolute top-0 right-0 -mt-2 -mr-3 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                      {totalQty}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link to="/my-orders-list" className={navItemClasses("/my-orders-list")}>
                  <BiSolidUserPin />
                  <span>My Requisitions</span>
                </Link>
              </li>
              <li>
                <Link to="/LPO-factory" className={navItemClasses("/LPO-factory")}>
                  <FaJediOrder />
                  <span>LP Orders</span>
                </Link>
              </li>
              <li>
                <Link to="/goods-receive-note" className={navItemClasses("/goods-receive-note")}>
                  <FaTools />
                  <span>GRN</span>
                </Link>
              </li>
            </ul>
          </div>
        </li>

        
        <li>
          <div
            onClick={toggleProcurement}
            className="flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-indigo-600 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3 text-lg">
              <BsCheck2Square size={26} />
              <span>Procurement</span>
            </div>
            <IoIosArrowUp
              size={18}
              className={`transition-transform duration-300 ${isProcurementOpen ? "rotate-180" : ""}`}
            />
          </div>

          <div className={collapsibleClasses(isProcurementOpen)}>
            <div className="overflow-hidden my-2">
              <div style={hrSlideClasses(isProcurementOpen, 100)} />
            </div>
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <Link to="/LPO-procurement" className={navItemClasses("/LPO-procurement")}>
                  Local Purchase Orders
                </Link>
              </li>
              <li>
                <Link to="/pending-requisitions" className={navItemClasses("/pending-requisitions")}>
                  Pending Requisitions
                </Link>
              </li>
            </ul>
          </div>
        </li>

        
        {userInfo.isAdmin && (
          <li>
            <div className="overflow-hidden my-2">
              <div style={hrSlideClasses(true, 150)} />
            </div>
            <Link to="/listUsers" className={navItemClasses("/listUsers")}>
              <FaUsers />
              <span>Employees</span>
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
*/











/*
import React, { useState, useEffect, useRef } from "react";
import { BiSolidUserPin, BiTime } from "react-icons/bi";
import { BsCart4, BsCheck2Square, BsFillGrid3X3GapFill, BsGrid1X2Fill } from "react-icons/bs";
import { IoIosArrowUp, IoIosClose } from "react-icons/io";
import { FaJediOrder, FaToolbox, FaTools, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ openSidebarToggle, openSidebar }) => {
  const sidebarRef = useRef(null);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isProcurementOpen, setIsProcurementOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const location = useLocation();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const totalQty = cartItems?.reduce((acc, item) => acc + Number(item.qty), 0);

  const toggleInventory = () => setIsInventoryOpen(!isInventoryOpen);
  const toggleProcurement = () => setIsProcurementOpen(!isProcurementOpen);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openSidebarToggle && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        openSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSidebarToggle, openSidebar]);

  const navItemClasses = (path) =>
    `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
      location.pathname === path ? "bg-indigo-700 text-white" : "hover:bg-indigo-600 text-gray-300"
    }`;

  const collapsibleClasses = (isOpen) =>
    `overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"}`;

  const hrSlideClasses = (isOpen, delay = 0) => ({
    height: "1px",
    backgroundColor: "#4B5563",
    width: isOpen ? "100%" : "0%",
    transition: `width 500ms ease ${delay}ms`,
  });

  if (!userInfo) return null; // Wait for Redux state to load

  return (
    <aside
      ref={sidebarRef}
      className={`bg-gray-900 text-gray-300 w-64 min-h-screen p-4 shadow-xl transition-transform ${
        openSidebarToggle ? "translate-x-0" : "-translate-x-full"
      } fixed z-50`}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3 text-indigo-400 font-bold text-3xl">
          <BiTime size={36} />
          <span>{currentTime}</span>
        </div>
        <span className="cursor-pointer text-gray-300 hover:text-red-500" onClick={openSidebar}>
          <IoIosClose size={28} />
        </span>
      </div>

      <ul className="space-y-4 text-sm">
        {!(location.pathname === "/" || location.pathname === "/dashboard") && (
          <li>
            <Link to="/" className={navItemClasses("/")}>
              <BsGrid1X2Fill size={26} />
              <span>Dashboard</span>
            </Link>
          </li>
        )}

        <li>
          <div
            onClick={toggleInventory}
            className="flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-indigo-600 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3 text-lg">
              <BsFillGrid3X3GapFill size={26} />
              <span>Inventory</span>
            </div>
            <IoIosArrowUp
              size={18}
              className={`transition-transform duration-300 ${isInventoryOpen ? "rotate-180" : ""}`}
            />
          </div>

          <div className={collapsibleClasses(isInventoryOpen)}>
            <div className="overflow-hidden my-2">
              <div style={hrSlideClasses(isInventoryOpen, 50)} />
            </div>
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <Link to="/warehouse" className={navItemClasses("/warehouse")}>
                  <FaToolbox />
                  <span>Warehouse</span>
                </Link>
              </li>
              <li className="relative">
                <Link to="/store-requisition" className={navItemClasses("/store-requisition")}>
                  <BsCart4 />
                  <span>Cart</span>
                  {totalQty > 0 && (
                    <span className="absolute top-0 right-0 -mt-2 -mr-3 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                      {totalQty}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link to="/my-orders-list" className={navItemClasses("/my-orders-list")}>
                  <BiSolidUserPin />
                  <span>My Requisitions</span>
                </Link>
              </li>
              <li>
                <Link to="/LPO-factory" className={navItemClasses("/LPO-factory")}>
                  <FaJediOrder />
                  <span>LP Orders</span>
                </Link>
              </li>
              <li>
                <Link to="/goods-receive-note" className={navItemClasses("/goods-receive-note")}>
                  <FaTools />
                  <span>GRN</span>
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li>
          <div
            onClick={toggleProcurement}
            className="flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-indigo-600 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3 text-lg">
              <BsCheck2Square size={26} />
              <span>Procurement</span>
            </div>
            <IoIosArrowUp
              size={18}
              className={`transition-transform duration-300 ${isProcurementOpen ? "rotate-180" : ""}`}
            />
          </div>

          <div className={collapsibleClasses(isProcurementOpen)}>
            <div className="overflow-hidden my-2">
              <div style={hrSlideClasses(isProcurementOpen, 100)} />
            </div>
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <Link to="/LPO-procurement" className={navItemClasses("/LPO-procurement")}>
                  Local Purchase Orders
                </Link>
              </li>
              <li>
                <Link to="/pending-requisitions" className={navItemClasses("/pending-requisitions")}>
                  Pending Requisitions
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {userInfo.isAdmin && (
          <li>
            <div className="overflow-hidden my-2">
              <div style={hrSlideClasses(true, 150)} />
            </div>
            <Link to="/listUsers" className={navItemClasses("/listUsers")}>
              <FaUsers />
              <span>Employees</span>
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
*/







/*
import React, { useState, useEffect, useRef } from "react";
import { BiSolidUserPin, BiTime } from "react-icons/bi";
import { BsCart4, BsCheck2Square, BsFillGrid3X3GapFill, BsGrid1X2Fill } from "react-icons/bs";
import { IoIosArrowUp, IoIosClose } from "react-icons/io";
import { FaJediOrder, FaToolbox, FaTools, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ openSidebarToggle, openSidebar }) => {
  const sidebarRef = useRef(null);
  const location = useLocation();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const totalQty = cartItems?.reduce((acc, item) => acc + Number(item.qty), 0);

  // Open collapsibles by default if current page belongs to section
  const [isInventoryOpen, setIsInventoryOpen] = useState(
    ["/warehouse", "/store-requisition", "/my-orders-list", "/LPO-factory", "/goods-receive-note"].includes(location.pathname)
  );
  const [isProcurementOpen, setIsProcurementOpen] = useState(
    ["/LPO-procurement", "/pending-requisitions"].includes(location.pathname)
  );

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  const toggleInventory = () => setIsInventoryOpen(!isInventoryOpen);
  const toggleProcurement = () => setIsProcurementOpen(!isProcurementOpen);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openSidebarToggle && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        openSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSidebarToggle, openSidebar]);

  const navItemClasses = (path) =>
    `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
      location.pathname === path ? "bg-indigo-700 text-white" : "hover:bg-indigo-600 text-gray-300"
    }`;

  const collapsibleClasses = (isOpen) =>
    `overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"}`;

  const hrSlideClasses = (isOpen, delay = 0) => ({
    height: "1px",
    backgroundColor: "#4B5563",
    width: isOpen ? "100%" : "0%",
    transition: `width 500ms ease ${delay}ms`,
  });

  if (!userInfo) return null;

  return (
    <aside
      ref={sidebarRef}
      className={`bg-gray-900 text-gray-300 w-64 min-h-screen p-4 shadow-xl transition-transform ${
        openSidebarToggle ? "translate-x-0" : "-translate-x-full"
      } fixed z-50`}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3 text-indigo-400 font-bold text-3xl">
          <BiTime size={36} />
          <span>{currentTime}</span>
        </div>
        <span className="cursor-pointer text-gray-300 hover:text-red-500" onClick={openSidebar}>
          <IoIosClose size={28} />
        </span>
      </div>

      <ul className="space-y-4 text-sm">
        {!(location.pathname === "/" || location.pathname === "/dashboard") && (
          <li>
            <Link to="/" className={navItemClasses("/")}>
              <BsGrid1X2Fill size={26} />
              <span>Dashboard</span>
            </Link>
          </li>
        )}

        <li>
          <div
            onClick={toggleInventory}
            className="flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-indigo-600 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3 text-lg">
              <BsFillGrid3X3GapFill size={26} />
              <span>Inventory</span>
            </div>
            <IoIosArrowUp
              size={18}
              className={`transition-transform duration-300 ${isInventoryOpen ? "rotate-180" : ""}`}
            />
          </div>

          <div className={collapsibleClasses(isInventoryOpen)}>
            <div className="overflow-hidden my-2">
              <div style={hrSlideClasses(isInventoryOpen, 50)} />
            </div>
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <Link to="/warehouse" className={navItemClasses("/warehouse")}>
                  <FaToolbox />
                  <span>Warehouse</span>
                </Link>
              </li>
              <li className="relative">
                <Link to="/store-requisition" className={navItemClasses("/store-requisition")}>
                  <BsCart4 />
                  <span>Requisition Draft</span>
                  {totalQty > 0 && (
                    <span className="absolute top-0 right-0 -mt-2 -mr-3 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                      {totalQty}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link to="/my-orders-list" className={navItemClasses("/my-orders-list")}>
                  <BiSolidUserPin />
                  <span>My Requisitions</span>
                </Link>
              </li>
              <li>
                <Link to="/LPO-factory" className={navItemClasses("/LPO-factory")}>
                  <FaJediOrder />
                  <span>LP Orders</span>
                </Link>
              </li>
              <li>
                <Link to="/goods-receive-note" className={navItemClasses("/goods-receive-note")}>
                  <FaTools />
                  <span>GRN</span>
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li>
          <div
            onClick={toggleProcurement}
            className="flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-indigo-600 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3 text-lg">
              <BsCheck2Square size={26} />
              <span>Procurement</span>
            </div>
            <IoIosArrowUp
              size={18}
              className={`transition-transform duration-300 ${isProcurementOpen ? "rotate-180" : ""}`}
            />
          </div>

          <div className={collapsibleClasses(isProcurementOpen)}>
            <div className="overflow-hidden my-2">
              <div style={hrSlideClasses(isProcurementOpen, 100)} />
            </div>
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <Link to="/LPO-procurement" className={navItemClasses("/LPO-procurement")}>
                  Local Purchase Orders
                </Link>
              </li>
              <li>
                <Link to="/pending-requisitions" className={navItemClasses("/pending-requisitions")}>
                  Pending Requisitions
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {userInfo.isAdmin && (
          <li>
            <div className="overflow-hidden my-2">
              <div style={hrSlideClasses(true, 150)} />
            </div>
            <Link to="/listUsers" className={navItemClasses("/listUsers")}>
              <FaUsers />
              <span>Employees</span>
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
*/







import React, { useState, useEffect, useRef } from "react";
import { BiSolidUserPin, BiTime } from "react-icons/bi";
import { BsCart4, BsCheck2Square, BsFillGrid3X3GapFill, BsGrid1X2Fill } from "react-icons/bs";
import { IoIosArrowUp, IoIosClose } from "react-icons/io";
import { FaJediOrder, FaToolbox, FaTools, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ openSidebarToggle, openSidebar }) => {
  const sidebarRef = useRef(null);
  const location = useLocation();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const totalQty = cartItems?.reduce((acc, item) => acc + Number(item.qty), 0);

  const [isInventoryOpen, setIsInventoryOpen] = useState(
    ["/warehouse", "/store-requisition", "/my-orders-list", "/LPO-factory", "/goods-receive-note"].includes(location.pathname)
  );
  const [isProcurementOpen, setIsProcurementOpen] = useState(
    ["/LPO-procurement", "/pending-requisitions"].includes(location.pathname)
  );

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  const toggleInventory = () => setIsInventoryOpen(!isInventoryOpen);
  const toggleProcurement = () => setIsProcurementOpen(!isProcurementOpen);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openSidebarToggle && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        openSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSidebarToggle, openSidebar]);

  // Close sidebar when a link is clicked
  const handleLinkClick = () => {
    if (openSidebarToggle) {
      openSidebar();
    }
  };

  const navItemClasses = (path) =>
    `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
      location.pathname === path ? "bg-indigo-700 text-white" : "hover:bg-indigo-600 text-gray-300"
    }`;

  const collapsibleClasses = (isOpen) =>
    `overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"}`;

  const hrSlideClasses = (isOpen, delay = 0) => ({
    height: "1px",
    backgroundColor: "#4B5563",
    width: isOpen ? "100%" : "0%",
    transition: `width 500ms ease ${delay}ms`,
  });

  if (!userInfo) return null;

  return (
    <aside
      ref={sidebarRef}
      className={`bg-gray-900 text-gray-300 w-64 min-h-screen p-4 shadow-xl transition-transform ${
        openSidebarToggle ? "translate-x-0" : "-translate-x-full"
      } fixed z-50`}
    >
      {/* Clock */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3 text-indigo-400 font-bold text-3xl">
          <BiTime size={36} />
          <span>{currentTime}</span>
        </div>
        <span className="cursor-pointer text-gray-300 hover:text-red-500" onClick={openSidebar}>
          <IoIosClose size={28} />
        </span>
      </div>

      {/* Navigation */}
      <ul className="space-y-4 text-sm">
        {!(location.pathname === "/" || location.pathname === "/dashboard") && (
          <li>
            <Link to="/" className={navItemClasses("/")} onClick={handleLinkClick}>
              <BsGrid1X2Fill size={26} />
              <span>Dashboard</span>
            </Link>
          </li>
        )}

        {/* Inventory */}
        <li>
          <div
            onClick={toggleInventory}
            className="flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-indigo-600 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3 text-lg">
              <BsFillGrid3X3GapFill size={26} />
              <span>Inventory</span>
            </div>
            <IoIosArrowUp
              size={18}
              className={`transition-transform duration-300 ${isInventoryOpen ? "rotate-180" : ""}`}
            />
          </div>

          <div className={collapsibleClasses(isInventoryOpen)}>
            <div className="overflow-hidden my-2">
              <div style={hrSlideClasses(isInventoryOpen, 50)} />
            </div>
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <Link to="/warehouse" className={navItemClasses("/warehouse")} onClick={handleLinkClick}>
                  <FaToolbox />
                  <span>Warehouse</span>
                </Link>
              </li>
              <li className="relative">
                <Link to="/store-requisition" className={navItemClasses("/store-requisition")} onClick={handleLinkClick}>
                  <BsCart4 />
                  <span>Requisition Draft</span>
                  {totalQty > 0 && (
                    <span className="absolute top-0 right-0 -mt-2 -mr-3 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                      {totalQty}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link to="/my-orders-list" className={navItemClasses("/my-orders-list")} onClick={handleLinkClick}>
                  <BiSolidUserPin />
                  <span>My Requisitions</span>
                </Link>
              </li>
              <li>
                <Link to="/LPO-factory" className={navItemClasses("/LPO-factory")} onClick={handleLinkClick}>
                  <FaJediOrder />
                  <span>LP Orders</span>
                </Link>
              </li>
              <li>
                <Link to="/goods-receive-note" className={navItemClasses("/goods-receive-note")} onClick={handleLinkClick}>
                  <FaTools />
                  <span>GRN</span>
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {/* Procurement */}
        <li>
          <div
            onClick={toggleProcurement}
            className="flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-indigo-600 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3 text-lg">
              <BsCheck2Square size={26} />
              <span>Procurement</span>
            </div>
            <IoIosArrowUp
              size={18}
              className={`transition-transform duration-300 ${isProcurementOpen ? "rotate-180" : ""}`}
            />
          </div>

          <div className={collapsibleClasses(isProcurementOpen)}>
            <div className="overflow-hidden my-2">
              <div style={hrSlideClasses(isProcurementOpen, 100)} />
            </div>
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <Link to="/LPO-procurement" className={navItemClasses("/LPO-procurement")} onClick={handleLinkClick}>
                  Local Purchase Orders
                </Link>
              </li>
              <li>
                <Link to="/pending-requisitions" className={navItemClasses("/pending-requisitions")} onClick={handleLinkClick}>
                  Pending Requisitions
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {userInfo.isAdmin && (
          <li>
            <div className="overflow-hidden my-2">
              <div style={hrSlideClasses(true, 150)} />
            </div>
            <Link to="/listUsers" className={navItemClasses("/listUsers")} onClick={handleLinkClick}>
              <FaUsers />
              <span>Employees</span>
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;

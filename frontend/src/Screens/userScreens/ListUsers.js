   /* import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaCheck, FaTimes, FaUsers, FaSearch } from "react-icons/fa";
import { useListUsersQuery } from "../../redux/userApiSlice";
import EditUserClearance from "./EditUsersClearance";

const ListUser = () => {
  const [editModal, setEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { data, isLoading, error } = useListUsersQuery();


  const { userInfo } = useSelector((state) => state.auth);
  
useEffect(() => {
  if (userInfo && !userInfo?.isAdmin) {
    navigate("/dashboard");
  }
}, [userInfo, navigate]);


  const openModalHandler = (user) => {
    setSelectedUser(user);
    setEditModal(true);
  };

  const closeModalHandler = () => {
    setEditModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  const filteredUsers = data?.users?.filter((user) =>
    [user.name, user.email, user.dept]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {editModal && (
        <EditUserClearance user={selectedUser} onClose={closeModalHandler} />
      )}

      <div className="max-w-7xl mx-auto py-6">
        <div className="text-center mb-8">
          <h3 className="text-3xl text-blue-700 font-bold flex items-center justify-center gap-3">
            <FaUsers size={36} /> User Management Dashboard
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <div className="relative w-full sm:w-1/3">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or department"
              className="w-full pl-10 pr-4 py-2 border border-slate-400 rounded-lg shadow-md  text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : error ? (
          <h3 className="text-center text-red-500">
            {error?.data?.message || "Something went wrong!"}
          </h3>
        ) : filteredUsers?.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="min-w-full text-sm sm:text-md text-left text-gray-700">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Admin</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-all">
                    <td className="py-3 px-4">{user._id}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.dept}</td>
                    <td className="py-3 px-4">
                      {user.isAdmin ? (
                        <FaCheck size={20} className="text-green-600" />
                      ) : (
                        <FaTimes size={20} className="text-red-600" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => openModalHandler(user)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-orange-500 transition"
                      >
                        <FaUserEdit />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="text-center text-gray-500 mt-10">No users found.</h3>
        )}
      </div>
    </div>
  );
};

export default ListUser;
*/
/*

/*
   import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaCheck, FaTimes, FaUsers } from "react-icons/fa";
import { useListUsersQuery } from "../../redux/userApiSlice";
import EditUserClearance from "./EditUsersClearance";

const ListUser = () => {
  const [editModal, setEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [animatedTotals, setAnimatedTotals] = useState({ total: 0, admins: 0, regular: 0 });
  const navigate = useNavigate();
  const { data, isLoading, error } = useListUsersQuery();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) navigate("/login");
    if (userInfo && !userInfo?.isAdmin) navigate("/dashboard");
  }, [userInfo, navigate]);

  const openModalHandler = (user) => {
    setSelectedUser(user);
    setEditModal(true);
  };

  const closeModalHandler = () => {
    setEditModal(false);
    setSelectedUser(null);
  };

  const filteredUsers = data?.users?.filter((user) =>
    [user.name, user.email, user.dept].join(" ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dashboard stats
  const totalUsers = data?.users?.length || 0;
  const totalAdmins = data?.users?.filter((u) => u.isAdmin).length || 0;
  const totalRegular = totalUsers - totalAdmins;

  // Animate counters
  useEffect(() => {
    let total = 0, admins = 0, regular = 0;
    const steps = 50; // number of increments
    const interval = 20; // ms per increment
    const totalStep = totalUsers / steps;
    const adminsStep = totalAdmins / steps;
    const regularStep = totalRegular / steps;

    const counter = setInterval(() => {
      total += totalStep;
      admins += adminsStep;
      regular += regularStep;
      setAnimatedTotals({
        total: Math.min(Math.round(total), totalUsers),
        admins: Math.min(Math.round(admins), totalAdmins),
        regular: Math.min(Math.round(regular), totalRegular),
      });
      if (total >= totalUsers && admins >= totalAdmins && regular >= totalRegular) {
        clearInterval(counter);
      }
    }, interval);

    return () => clearInterval(counter);
  }, [totalUsers, totalAdmins, totalRegular]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {editModal && <EditUserClearance user={selectedUser} onClose={closeModalHandler} />}

      <div className="max-w-7xl mx-auto mb-6">
        <h1 className="text-4xl font-bold text-blue-700 flex items-center gap-3">
          <FaUsers size={36} />
          User Management
        </h1>
        <p className="text-gray-600 mt-1">
          Manage user access, departments, and roles efficiently.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">Total Users</p>
            <p className="text-3xl font-bold">{animatedTotals.total}</p>
          </div>
          <FaUsers size={36} className="opacity-70" />
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">Admins</p>
            <p className="text-3xl font-bold">{animatedTotals.admins}</p>
          </div>
          <FaCheck size={36} className="opacity-70" />
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">Regular Users</p>
            <p className="text-3xl font-bold">{animatedTotals.regular}</p>
          </div>
          <FaTimes size={36} className="opacity-70" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto mb-4 sticky top-0 bg-gray-100 z-20 p-2 rounded-b-lg shadow-md">
        <div className="relative w-full sm:w-1/3 mx-auto">
          <FaUsers className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : error ? (
          <h3 className="text-center text-red-500 text-lg font-medium">{error?.data?.message || "Something went wrong!"}</h3>
        ) : filteredUsers?.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
            <table className="min-w-full text-left text-gray-700 border-collapse">
              <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white sticky top-0 z-10">
                <tr>
                  {["ID", "Email", "Name", "Department", "Admin", "Actions"].map((title) => (
                    <th key={title} className="py-3 px-6 font-semibold uppercase text-sm tracking-wider">
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`transition-all hover:scale-[1.01] hover:shadow-lg cursor-pointer ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="py-3 px-6">{user._id}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6 font-medium">{user.name}</td>
                    <td className="py-3 px-6">{user.dept}</td>
                    <td className="py-3 px-6">
                      {user.isAdmin ? (
                        <span className="inline-block px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs font-semibold flex items-center gap-1">
                          <FaCheck /> Admin
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs font-semibold flex items-center gap-1">
                          <FaTimes /> User
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => openModalHandler(user)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-orange-400 hover:to-orange-500 transition transform hover:scale-105"
                      >
                        <FaUserEdit />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="text-center text-gray-500 mt-10 italic">No users found.</h3>
        )}
      </div>
    </div>
  );
};

export default ListUser;


/*/

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaCheck, FaTimes, FaUsers } from "react-icons/fa";
import { useListUsersQuery } from "../../redux/userApiSlice";
import EditUserClearance from "./EditUsersClearance";

const ListUser = () => {
  const [editModal, setEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [animatedTotals, setAnimatedTotals] = useState({ total: 0, admins: 0, regular: 0 });
  const navigate = useNavigate();
  const { data, isLoading, error } = useListUsersQuery();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) navigate("/login");
    if (userInfo && !userInfo?.isAdmin) navigate("/dashboard");
  }, [userInfo, navigate]);

  const openModalHandler = (user) => {
    setSelectedUser(user);
    setEditModal(true);
  };

  const closeModalHandler = () => {
    setEditModal(false);
    setSelectedUser(null);
  };

  const filteredUsers = data?.users?.filter((user) =>
    [user.name, user.email, user.dept].join(" ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dashboard stats
  const totalUsers = data?.users?.length || 0;
  const totalAdmins = data?.users?.filter((u) => u.isAdmin).length || 0;
  const totalRegular = totalUsers - totalAdmins;

  // Animate counters
  useEffect(() => {
    let total = 0, admins = 0, regular = 0;
    const steps = 50;
    const interval = 20;
    const totalStep = totalUsers / steps;
    const adminsStep = totalAdmins / steps;
    const regularStep = totalRegular / steps;

    const counter = setInterval(() => {
      total += totalStep;
      admins += adminsStep;
      regular += regularStep;
      setAnimatedTotals({
        total: Math.min(Math.round(total), totalUsers),
        admins: Math.min(Math.round(admins), totalAdmins),
        regular: Math.min(Math.round(regular), totalRegular),
      });
      if (total >= totalUsers && admins >= totalAdmins && regular >= totalRegular) {
        clearInterval(counter);
      }
    }, interval);

    return () => clearInterval(counter);
  }, [totalUsers, totalAdmins, totalRegular]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {editModal && <EditUserClearance user={selectedUser} onClose={closeModalHandler} />}

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <h1 className="text-4xl font-bold text-blue-700 flex items-center gap-3">
          <FaUsers size={36} />
          Employees
        </h1>
        <p className="text-gray-600 mt-1 font-bold">
          Manage users access, departments, and roles efficiently.
        </p>
      </div>

      {/* Dashboard Stats */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">Total Users</p>
            <p className="text-3xl font-bold">{animatedTotals.total}</p>
          </div>
          <FaUsers size={36} className="opacity-70" />
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">Admins</p>
            <p className="text-3xl font-bold">{animatedTotals.admins}</p>
          </div>
          <FaCheck size={36} className="opacity-70" />
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-6 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">Regular Users</p>
            <p className="text-3xl font-bold">{animatedTotals.regular}</p>
          </div>
          <FaTimes size={36} className="opacity-70" />
        </div>
      </div>

      {/* Search Input */}
      <div className="max-w-7xl mx-auto mb-4 sticky top-0 bg-gray-100 z-20 p-2 rounded-2xl shadow-md">
        <div className="relative w-full sm:w-1/3 mx-auto">
          <FaUsers className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-2xl shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      {/* User Table */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : error ? (
          <h3 className="text-center text-red-500 text-lg font-medium">{error?.data?.message || "Something went wrong!"}</h3>
        ) : filteredUsers?.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
            <table className="min-w-full text-left text-gray-700 border-collapse rounded-2xl overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white sticky top-0 z-10">
                <tr>
                  {["ID", "Email", "Name", "Department", "Admin", "Actions"].map((title) => (
                    <th key={title} className="py-3 px-6 font-semibold uppercase text-sm tracking-wider">
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`transition-all hover:scale-[1.01] hover:shadow-lg cursor-pointer ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="py-3 px-6">{user._id}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6 font-medium">{user.name}</td>
                    <td className="py-3 px-6">{user.dept}</td>
                    <td className="py-3 px-6">
                      {user.isAdmin ? (
                        <span className="inline-block px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs font-semibold flex items-center gap-1">
                          <FaCheck /> Admin
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs font-semibold flex items-center gap-1">
                          <FaTimes /> User
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => openModalHandler(user)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-orange-400 hover:to-orange-500 transition transform hover:scale-105"
                      >
                        <FaUserEdit />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="text-center text-gray-500 mt-10 italic">No users found.</h3>
        )}
      </div>
    </div>
  );
};

export default ListUser;

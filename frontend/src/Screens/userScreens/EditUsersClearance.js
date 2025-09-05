/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useListUsersQuery,
  useUpdateUserClrMutation,
} from "../../redux/userApiSlice";

const DEPARTMENTS = [
  "Company",
  "Silo",
  "Maintenance",
  "Production",
  "Procurement",
];

const EditUserClearance = ({ user, onClose }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [dept, setDept] = useState(user?.dept || "");
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);

  const [updateUserClr, { isLoading, isSuccess }] =
    useUpdateUserClrMutation();
  const { refetch } = useListUsersQuery();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !dept) {
      toast.error("All fields are required");
      return;
    }
    try {
      await updateUserClr({ id: user._id, name, email, dept, isAdmin }).unwrap();
      toast.success("Successfully updated user clearance");
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  useEffect(() => {
    if (isSuccess) refetch();
  }, [isSuccess, refetch]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative w-11/12 md:w-1/2 lg:w-2/5 p-6 rounded-2xl bg-gray-900 border-4 border-blue-700 shadow-[0_0_20px_#1e40af]">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">
          Edit User Clearance
        </h2>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block mb-2 text-gray-300">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl border border-blue-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-blue-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Department</label>
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full p-3 rounded-xl border border-blue-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            >
              <option value="" disabled>
                Select Department
              </option>
              {DEPARTMENTS.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2 text-gray-300">
            <input
              id="adminCheckbox"
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="w-6 h-6 mr-3 accent-blue-500"
            />
            <label htmlFor="adminCheckbox" className="text-lg font-semibold">
              {isAdmin ? "Admin Access" : "Limited Access"}
            </label>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-red-700 text-white font-semibold hover:bg-red-800 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserClearance;
*/






/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useListUsersQuery,
  useUpdateUserClrMutation,
} from "../../redux/userApiSlice";

const DEPARTMENTS = [
  "Company",
  "Silo",
  "Maintenance",
  "Production",
  "Procurement",
];

const EditUserClearance = ({ user, onClose }) => {
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || ""); // email is now fixed
  const [dept, setDept] = useState(user?.dept || "");
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);

  const [updateUserClr, { isLoading, isSuccess }] =
    useUpdateUserClrMutation();
  const { refetch } = useListUsersQuery();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !dept) {
      toast.error("Name and Department are required");
      return;
    }
    try {
      await updateUserClr({ id: user._id, name, email, dept, isAdmin }).unwrap();
      toast.success("Successfully updated user clearance");
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  useEffect(() => {
    if (isSuccess) refetch();
  }, [isSuccess, refetch]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative w-11/12 md:w-1/2 lg:w-2/5 p-6 rounded-2xl bg-gray-900 border-4 border-blue-700 shadow-[0_0_20px_#1e40af]">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">
          Edit User Clearance
        </h2>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block mb-2 text-gray-300">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl border border-blue-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full p-3 rounded-xl border border-blue-700 bg-gray-800 text-white cursor-not-allowed"
              title="Email cannot be changed"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Department</label>
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full p-3 rounded-xl border border-blue-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            >
              <option value="" disabled>
                Select Department
              </option>
              {DEPARTMENTS.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2 text-gray-300">
            <input
              id="adminCheckbox"
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="w-6 h-6 mr-3 accent-blue-500"
            />
            <label htmlFor="adminCheckbox" className="text-lg font-semibold">
              {isAdmin ? "Admin Access" : "Limited Access"}
            </label>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-red-700 text-white font-semibold hover:bg-red-800 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserClearance;
*/









import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useListUsersQuery,
  useUpdateUserClrMutation,
} from "../../redux/userApiSlice";

// Added "Warehouse" to the departments array
const DEPARTMENTS = [
  "Company",
  "Silo",
  "Maintenance",
  "Production",
  "Procurement",
  "Warehouse",
];

const EditUserClearance = ({ user, onClose }) => {
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || ""); // email is read-only
  const [dept, setDept] = useState(user?.dept || "");
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);

  const [updateUserClr, { isLoading, isSuccess }] =
    useUpdateUserClrMutation();
  const { refetch } = useListUsersQuery();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !dept) {
      toast.error("Name and Department are required");
      return;
    }
    try {
      await updateUserClr({ id: user._id, name, email, dept, isAdmin }).unwrap();
      toast.success("Successfully updated user clearance");
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  useEffect(() => {
    if (isSuccess) refetch();
  }, [isSuccess, refetch]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative w-11/12 md:w-1/2 lg:w-2/5 p-6 rounded-2xl bg-gray-900 border-4 border-blue-700 shadow-[0_0_20px_#1e40af]">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">
          Edit User Clearance
        </h2>

        <form onSubmit={submitHandler} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-2 text-gray-300">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl border border-blue-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block mb-2 text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full p-3 rounded-xl border border-blue-700 bg-gray-800 text-white cursor-not-allowed"
              title="Email cannot be changed"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block mb-2 text-gray-300">Department</label>
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full p-3 rounded-xl border border-blue-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            >
              <option value="" disabled>
                Select Department
              </option>
              {DEPARTMENTS.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>

          {/* Admin Checkbox */}
          <div className="flex items-center space-x-2 text-gray-300">
            <input
              id="adminCheckbox"
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="w-6 h-6 mr-3 accent-blue-500"
            />
            <label htmlFor="adminCheckbox" className="text-lg font-semibold">
              {isAdmin ? "Admin Access" : "Limited Access"}
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-red-700 text-white font-semibold hover:bg-red-800 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserClearance;

/* import React, { useState } from "react";
import { createCategory, getCategories } from "../redux/categorySlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CategoryModal = ({ onClose }) => {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = async () => {
    const newCategory = {
      title,
    };

    try {
      await dispatch(createCategory(newCategory)).unwrap();
      // toast.success("Product created successfully!");
      dispatch(getCategories()); // Fetch the updated list of products
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create category!");
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-dark_bg_5 p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Create Category</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;

*/



import React, { useState } from "react";
import { createCategory, getCategories } from "../redux/categorySlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const CategoryModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title cannot be empty!");
      return;
    }

    try {
      await dispatch(createCategory({ title })).unwrap();
      dispatch(getCategories());
      toast.success("Category created successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to create category!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 scale-95 animate-fadeIn">
        <h2 className="text-2xl font-semibold text-blue-400 mb-6 text-center">
          Create Category
        </h2>
        <form onSubmit={submitHandler}>
          <div className="mb-5">
            <label className="block text-gray-300 font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter category name"
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition shadow-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;

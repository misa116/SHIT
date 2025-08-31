/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Select } from "antd";
import { getCategories } from "../../redux/categorySlice";
import { createProduct } from "../../redux/productSlice";
const { Option } = Select;

const CreateProduct = ({ onClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const [manufacturer, setManufacturer] = useState("");
  const [category, setCategory] = useState("");
  const [manufacturerNo, setManufacturerNo] = useState("");
  const [modelNO, setModelNo] = useState("");

  const [stock, setCountInStock] = useState(0);
  const [location, setLocation] = useState("");

  const [description, setDescription] = useState("");

  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategory(categories[0].title);
    }
  }, [categories]);

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const submitHandler = async () => {
    const newProduct = {
      name,
      price,
      manufacturer,
      category,
      modelNO,
      stock,
    };

    try {
      await dispatch(createProduct(newProduct)).unwrap();
      // toast.success("Product created successfully!");
      //   dispatch(getCategories()); // Fetch the updated list of products
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create category!");
    }
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-dark_bg_5 p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Create Product</h2>
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-100"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2.5 w-full border text-gray-900 rounded-md
                focus:ring-blue-500 focus:border-blue-500"
                placeholder="Product Name"
              />
            </div>

            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-100"
              >
                Count in Stock
              </label>
              <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setCountInStock(e.target.value)}
                className="mt-1 p-2.5 w-full border text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Count in Stock"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <Select
                style={{ width: "100%" }}
                value={category}
                onChange={handleCategoryChange}
              >
                {categories?.map((cat) => (
                  <Option key={cat._id} value={cat.title}>
                    {cat.title}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="manufacturerNo"
                className="block text-sm font-medium text-gray-200"
              >
                Manufacturer
              </label>
              <input
                type="text"
                id="manufacturerNo"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                className="mt-1 p-2.5 w-full border text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Manufacturer"
              />
            </div>

            <div>
              <label
                htmlFor="manufacturerNo"
                className="block text-sm font-medium text-gray-200"
              >
                MODEL No
              </label>
              <input
                type="text"
                id="manufacturerNo"
                value={modelNO}
                onChange={(e) => setModelNo(e.target.value)}
                className="mt-1 p-2.5 w-full border text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Manufacturer No"
              />
            </div>

            <div>
              <label
                htmlFor="manufacturerNo"
                className="block text-sm font-medium text-gray-200"
              >
                Location
              </label>
              <input
                type="text"
                id="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 p-2.5 w-full border text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Location "
              />
            </div>
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

export default CreateProduct;

*/






import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Select } from "antd";
import { getCategories } from "../../redux/categorySlice";
import { createProduct } from "../../redux/productSlice";

const { Option } = Select;

const CreateProduct = ({ onClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [manufacturer, setManufacturer] = useState("");
  const [category, setCategory] = useState("");
  const [modelNO, setModelNo] = useState("");
  const [stock, setCountInStock] = useState(0);
  const [location, setLocation] = useState("");

  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (categories && categories.length > 0) setCategory(categories[0].title);
  }, [categories]);

  const handleCategoryChange = (value) => setCategory(value);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newProduct = { name, price, manufacturer, category, modelNO, stock, location };
    try {
      await dispatch(createProduct(newProduct)).unwrap();
      toast.success("Product created successfully!");
      onClose();
      navigate("/dashboard");
    } catch {
      toast.error("Failed to create product!");
    }
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 p-4">
      {/* Gradient border wrapper */}
      <motion.div
        initial={{ y: -10 }}
        animate={{ y: [ -10, 5, -10 ] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="p-[3px] rounded-xl bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 animate-gradient-x"
      >
        <div className="bg-gray-800 text-white rounded-lg shadow-2xl p-6 w-full max-w-lg relative">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Create Product</h2>
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Product Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Product Name"
                  className="w-full p-2.5 rounded-md border border-gray-600 bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Count in Stock</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  placeholder="Stock Count"
                  className="w-full p-2.5 rounded-md border border-gray-600 bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Category</label>
              <Select
                style={{ width: "100%" }}
                value={category}
                onChange={handleCategoryChange}
                className="bg-gray-700 text-white"
              >
                {categories?.map((cat) => (
                  <Option key={cat._id} value={cat.title}>{cat.title}</Option>
                ))}
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Manufacturer</label>
                <input
                  type="text"
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  placeholder="Manufacturer"
                  className="w-full p-2.5 rounded-md border border-gray-600 bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Model No</label>
                <input
                  type="text"
                  value={modelNO}
                  onChange={(e) => setModelNo(e.target.value)}
                  placeholder="Model Number"
                  className="w-full p-2.5 rounded-md border border-gray-600 bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  className="w-full p-2.5 rounded-md border border-gray-600 bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 transition font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 transition font-semibold"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateProduct;

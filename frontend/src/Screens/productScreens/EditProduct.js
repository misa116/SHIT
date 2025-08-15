    /*import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProduct, updateProduct, getProducts } from "../../redux/productSlice";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    location: "",
    manufacturer: "",
    supplier: "",
  });

  useEffect(() => {
    if (id) dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        stock: product.stock || "",
        location: product.location || "N/A",
        manufacturer: product.manufacturer || "N/A",
        supplier: product.supplier || "",
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData, stock: parseInt(formData.stock) };

    try {
      await dispatch(updateProduct({ id, formData: updatedData })).unwrap();
      toast.success("Product updated successfully!");
      // Refresh products so Dashboard shows updated data immediately
      dispatch(getProducts());
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to update product!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-800 shadow-2xl rounded-3xl p-8 text-gray-200">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Edit Product
        </h1>

        {isError && <p className="text-red-400 mb-4">{message}</p>}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border border-gray-600 p-3 w-full rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="border border-gray-600 p-3 w-full rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="border border-gray-600 p-3 w-full rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Supplier</label>
              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleInputChange}
                className="border border-gray-600 p-3 w-full rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="border border-gray-600 p-3 w-full rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Manufacturer</label>
              <input
                type="text"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleInputChange}
                className="border border-gray-600 p-3 w-full rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex space-x-4 mt-6">
            <button
              type="submit"
              className={`flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Product"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 py-3 bg-gray-600 text-gray-200 rounded-xl font-semibold hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
/*/

/*/
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProduct, updateProduct, getProducts } from "../../redux/productSlice";
import { getUOMs } from "../../redux/uomSlice"; // Make sure you have a UOM slice
import { Select } from "antd";
const { Option } = Select;

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, isLoading, isError, message } = useSelector((state) => state.products);
  const { uoms } = useSelector((state) => state.uom); // Fetch UOMs from Redux

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    location: "",
    manufacturer: "",
    supplier: "",
    uom: "",
  });

  // Fetch product and UOMs
  useEffect(() => {
    if (id) dispatch(getProduct(id));
    dispatch(getUOMs());
  }, [dispatch, id]);

  // Populate form data when product loads
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        stock: product.stock || "",
        location: product.location || "N/A",
        manufacturer: product.manufacturer || "N/A",
        supplier: product.supplier || "",
        uom: product.uom || (uoms?.[0]?.title || ""),
      });
    }
  }, [product, uoms]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUOMChange = (value) => {
    setFormData((prev) => ({ ...prev, uom: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData, stock: parseInt(formData.stock) };

    try {
      await dispatch(updateProduct({ id, formData: updatedData })).unwrap();
      toast.success("Product updated successfully!");
      dispatch(getProducts()); // Refresh products for dashboard
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to update product!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-800 shadow-2xl rounded-3xl p-8 text-gray-200">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Edit Product</h1>

        {isError && <p className="text-red-400 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border border-gray-600 p-3 w-full rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="border border-gray-600 p-3 w-full rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="border border-gray-600 p-3 w-full rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Supplier</label>
              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleInputChange}
                className="border border-gray-600 p-3 w-full rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="border border-gray-600 p-3 w-full rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Manufacturer</label>
              <input
                type="text"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleInputChange}
                className="border border-gray-600 p-3 w-full rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">UOM</label>
              <Select
                value={formData.uom || ""}
                onChange={handleUOMChange}
                className="w-full"
                dropdownClassName="bg-gray-700 text-white"
              >
                {uoms?.map((u) => (
                  <Option key={u._id} value={u.title}>
                    {u.title}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="md:col-span-2 flex space-x-4 mt-6">
            <button
              type="submit"
              className={`flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Product"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 py-3 bg-gray-600 text-gray-200 rounded-xl font-semibold hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
*/





import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProduct, updateProduct, getProducts } from "../../redux/productSlice";
import { getUoms } from "../../redux/categorySlice"; // UOMs are in categorySlice

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, isLoading, isError, message } = useSelector((state) => state.products);
  const { Uom } = useSelector((state) => state.category); // get UOMs from categorySlice

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    location: "",
    manufacturer: "",
    supplier: "",
    uom: "", // new field for unit of measure
  });

  useEffect(() => {
    if (id) dispatch(getProduct(id));
    dispatch(getUoms()); // fetch UOMs for dropdown
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        stock: product.stock || "",
        location: product.location || "N/A",
        manufacturer: product.manufacturer || "N/A",
        supplier: product.supplier || "",
        uom: product.uom || "", // initialize with existing UOM
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData, stock: parseInt(formData.stock) };

    try {
      await dispatch(updateProduct({ id, formData: updatedData })).unwrap();
      toast.success("Product updated successfully!");
      dispatch(getProducts()); // refresh dashboard
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to update product!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-800 shadow-2xl rounded-3xl p-8 text-gray-200">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Edit Product</h1>
        {isError && <p className="text-red-400 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border border-gray-600 p-3 w-full rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="border border-gray-600 p-3 w-full rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="border border-gray-600 p-3 w-full rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Supplier</label>
              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleInputChange}
                className="border border-gray-600 p-3 w-full rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="border border-gray-600 p-3 w-full rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Manufacturer</label>
              <input
                type="text"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleInputChange}
                className="border border-gray-600 p-3 w-full rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">UOM</label>
              <select
                name="uom"
                value={formData.uom}
                onChange={handleInputChange}
                className="border border-gray-600 p-3 w-full rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select UOM</option>
                {Uom && Uom.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="md:col-span-2 flex space-x-4 mt-6">
            <button
              type="submit"
              className={`flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Product"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 py-3 bg-gray-600 text-gray-200 rounded-xl font-semibold hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;



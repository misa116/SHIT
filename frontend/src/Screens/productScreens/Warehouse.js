  /* import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(getProducts());
    if (isSuccess) {
      toast.success("Inventory Rendered Successfully");
    }
  }, []);

  const filteredProducts = products?.filter((product) =>
    [product.name, product.category, product.price, product.stock, product.supplier, product.moduleNo, product.manufacturer, product.uom]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="w-full px-6 py-8 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Inventory List</h1>
        <button className="mt-4 sm:mt-0 bg-blue-600 text-white py-2 px-6 rounded shadow hover:bg-blue-700 transition duration-200">
          Create Asset
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, category, supplier, etc..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 border border-gray-300 text-slate-700 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isLoading ? (
        <p className="text-center text-lg font-medium">{message || "Loading..."}</p>
      ) : (
        <div className="overflow-x-auto max-h-[70vh] bg-white rounded shadow-md">
  <table className="min-w-full text-left">

            <thead className="bg-blue-200 text-gray-700  sticky top-0 z-10 uppercase text-sm">
              <tr>
                <th className="py-3 px-4 border">Name</th>
                <th className="py-3 px-4 border">Category</th>
                <th className="py-3 px-4 border">Supplier</th>
                <th className="py-3 px-4 border">Stock</th>
                <th className="py-3 px-4 border">Model No</th>
                <th className="py-3 px-4 border">Manufacturer</th>
                <th className="py-3 px-4 border">UOM</th>
                <th className="py-3 px-4 border">Price</th>
                <th className="py-3 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 text-slate-700 border">{product.name}</td>
                    <td className="py-2 px-4 text-slate-700 border border">{product.category}</td>
                    <td className="py-2 px-4 text-slate-700 border border">{product.supplier}</td>
                    <td className="py-2 px-4 text-slate-700 border border">{product.stock}</td>
                    <td className="py-2 px-4 text-slate-700 border border">{product.modelNo || "N/A"}</td>
                    <td className="py-2 px-4 text-slate-700 border border">{product.manufacturer}</td>
                    <td className="py-2 px-4 text-slate-700 border border">{product.uom || "PCS"}</td>
                    <td className="py-2 px-4 text-slate-700 border  border">
                      ${product?.price ? product?.price?.toFixed(2) : "0.00"}
                    </td>
                    <td className="py-2 px-4 border text-blue-600 hover:underline">
                      <Link to={`/product/${product._id}`}>View</Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Warehouse;

/*/

/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo]);

  useEffect(() => {
    dispatch(getProducts());
    if (isSuccess) {
      toast.success("Inventory Rendered Successfully");
    }
  }, []);

  const filteredProducts = products?.filter((product) =>
    [product.name, product.category, product.price, product.stock, product.supplier, product.modelNo, product.manufacturer, product.uom]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Inventory List</h1>
        
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, category, supplier, etc..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
        />
      </div>

      {isLoading ? (
        <p className="text-center text-lg font-medium">{message || "Loading..."}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-blue-100 text-gray-700 sticky top-0 z-10 text-sm uppercase">
              <tr>
                {["Name", "Category", "Supplier", "Stock", "Model No", "Manufacturer", "UOM", "Price", "Actions"].map((title) => (
                  <th key={title} className="py-3 px-4 border-b border-gray-200">{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-2 px-4 border-b text-gray-700">{product.name}</td>
                    <td className="py-2 px-4 border-b text-gray-700">{product.category}</td>
                    <td className="py-2 px-4 border-b text-gray-700">{product.supplier}</td>
                    <td className="py-2 px-4 border-b text-gray-700">{product.stock}</td>
                    <td className="py-2 px-4 border-b text-gray-700">{product.modelNo || "N/A"}</td>
                    <td className="py-2 px-4 border-b text-gray-700">{product.manufacturer}</td>
                    <td className="py-2 px-4 border-b text-gray-700">{product.uom || "PCS"}</td>
                    <td className="py-2 px-4 border-b text-gray-700">${product?.price?.toFixed(2) || "0.00"}</td>
                    <td className="py-2 px-4 border-b">
                      <Link
                        to={`/product/${product._id}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Warehouse;

*/
/*

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isSuccess, isLoading, message } = useSelector(
    (state) => state.products
  );
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    if (isSuccess) {
      toast.success("Inventory Rendered Successfully");
    }
  }, [dispatch, isSuccess]);

  const filteredProducts = products?.filter((product) =>
    [
      product.name,
      product.category,
      product.price,
      product.stock,
      product.supplier,
      product.modelNo,
      product.manufacturer,
      product.uom,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          📦 Inventory List
        </h1>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white transition"
        />
      </div>

      {isLoading ? (
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-blue-200 to-blue-300 text-gray-700 sticky top-0 z-10 text-sm uppercase tracking-wide">
              <tr>
                {[
                  "Name",
                  "Category",
                  "Supplier",
                  "Stock",
                  "Model No",
                  "Manufacturer",
                  "UOM",
                  "Price",
                  "Actions",
                ].map((title) => (
                  <th
                    key={title}
                    className="py-3 px-4 border-b border-gray-200 font-semibold"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(9)
                    .fill("")
                    .map((_, idx) => (
                      <td key={idx} className="py-2 px-4 border-b">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-blue-200 to-blue-300 text-gray-700 sticky top-0 z-10 text-sm uppercase tracking-wide">
              <tr>
                {[
                  "Name",
                  "Category",
                  "Supplier",
                  "Stock",
                  "Model No",
                  "Manufacturer",
                  "UOM",
                  "Price",
                  "Actions",
                ].map((title) => (
                  <th
                    key={title}
                    className="py-3 px-4 border-b border-gray-200 font-semibold"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr
                    key={product._id}
                    className={`hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="py-2 px-4 border-b text-gray-700 font-medium">
                      {product.name}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-600">
                      {product.category}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-600">
                      {product.supplier}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-600">
                      {product.stock}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-600">
                      {product.modelNo || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-600">
                      {product.manufacturer}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-600">
                      {product.uom || "PCS"}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-800 font-semibold">
                      ${product?.price?.toFixed(2) || "0.00"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Link
                        to={`/product/${product._id}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Warehouse;
/*/



/*

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isSuccess, isLoading, message } = useSelector(
    (state) => state.products
  );
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    if (isSuccess) {
      toast.success("Inventory Rendered Successfully");
    }
  }, [dispatch, isSuccess]);

  const filteredProducts = products?.filter((product) =>
    [
      product.name,
      product.category,
      product.price,
      product.stock,
      product.supplier,
      product.modelNo,
      product.manufacturer,
      product.uom,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mb-6">
        <nav className="text-sm mb-1" aria-label="Breadcrumb">
          <ol className="list-reset flex text-gray-500">
            <li>
              <Link to="/" className="hover:text-gray-700">
                Dashboard
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-700 font-semibold">Warehouse</li>
          </ol>
        </nav>
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight flex items-center">
          📦 Warehouse Inventory
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of all products stored in each warehouse
        </p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white transition"
        />
      </div>

      {isLoading ? (
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-blue-200 to-blue-300 text-gray-700 sticky top-0 z-10 text-sm uppercase tracking-wide">
              <tr>
                {[
                  "Name",
                  "Category",
                  "Supplier",
                  "Stock",
                  "Model No",
                  "Manufacturer",
                  "UOM",
                  "Price",
                  "Actions",
                ].map((title) => (
                  <th
                    key={title}
                    className="py-3 px-4 border-b border-gray-200 font-semibold"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(9)
                    .fill("")
                    .map((_, idx) => (
                      <td key={idx} className="py-2 px-4 border-b">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-blue-200 to-blue-300 text-gray-700 sticky top-0 z-10 text-sm uppercase tracking-wide">
              <tr>
                {[
                  "Name",
                  "Category",
                  "Supplier",
                  "Stock",
                  "Model No",
                  "Manufacturer",
                  "UOM",
                  "Price",
                  "Actions",
                ].map((title) => (
                  <th
                    key={title}
                    className="py-3 px-4 border-b border-gray-200 font-semibold"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr
                    key={product._id}
                    className={`hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="py-2 px-4 border-b text-gray-700 font-medium">
                      {product.name}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-600">
                      {product.category}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-600">
                      {product.supplier}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-600">
                      {product.stock}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-600">
                      {product.modelNo || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-600">
                      {product.manufacturer}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-600">
                      {product.uom || "PCS"}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-800 font-semibold">
                      ${product?.price?.toFixed(2) || "0.00"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Link
                        to={`/product/${product._id}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Warehouse;
*/









/*
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, isSuccess, isLoading } = useSelector(
    (state) => state.products
  );
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const prevSuccess = useRef(false); // prevents duplicate toasts (StrictMode)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  // Fetch products on mount
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Show success toast only when success flips false -> true
  useEffect(() => {
    if (isSuccess && !prevSuccess.current) {
      toast.success("📦 Inventory Rendered Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Slide, // smooth slide-in
        className:
          "bg-blue-600 text-white font-semibold shadow-lg px-4 py-3 rounded-2xl",
        bodyClassName: "text-base",
        progressClassName: "bg-blue-400",
        closeButton: ({ closeToast }) => (
          <button
            onClick={closeToast}
            className="text-white text-2xl font-bold hover:text-gray-200 ml-2 leading-none"
            aria-label="Close"
          >
            ×
          </button>
        ),
      });
    }
    prevSuccess.current = isSuccess;
  }, [isSuccess]);

  const filteredProducts = products?.filter((product) =>
    [
      product?.name,
      product?.category,
      product?.price,
      product?.stock,
      product?.supplier,
      product?.modelNo,
      product?.manufacturer,
      product?.uom,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mb-6">
        <nav className="text-sm mb-1" aria-label="Breadcrumb">
          <ol className="list-reset flex text-gray-500">
            <li>
              <Link to="/" className="hover:text-gray-700">
                Dashboard
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-700 font-semibold">Warehouse</li>
          </ol>
        </nav>
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight flex items-center">
          📦 Warehouse Inventory
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of all products stored in each warehouse
        </p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white transition"
        />
      </div>

      {isLoading ? (
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-blue-200 to-blue-300 text-gray-700 sticky top-0 z-10 text-sm uppercase tracking-wide">
              <tr>
                {[
                  "Name",
                  "Category",
                  "Supplier",
                  "Stock",
                  "Model No",
                  "Manufacturer",
                  "UOM",
                  "Price",
                  "Actions",
                ].map((title) => (
                  <th
                    key={title}
                    className="py-3 px-4 border-b border-gray-200 font-semibold"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(9)
                    .fill("")
                    .map((_, idx) => (
                      <td key={idx} className="py-2 px-4 border-b">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-blue-200 to-blue-300 text-gray-700 sticky top-0 z-10 text-sm uppercase tracking-wide">
              <tr>
                {[
                  "Name",
                  "Category",
                  "Supplier",
                  "Stock",
                  "Model No",
                  "Manufacturer",
                  "UOM",
                  "Price",
                  "Actions",
                ].map((title) => (
                  <th
                    key={title}
                    className="py-3 px-4 border-b border-gray-200 font-semibold"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr
                    key={product._id}
                    className={`hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="py-2 px-4 border-b text-gray-700 font-medium">
                      {product?.name}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-600">
                      {product?.category}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-600">
                      {product?.supplier}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-600">
                      {product?.stock}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-600">
                      {product?.modelNo || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-600">
                      {product?.manufacturer}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-600">
                      {product?.uom || "PCS"}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-800 font-semibold">
                      $
                      {Number.isFinite(product?.price)
                        ? Number(product.price).toFixed(2)
                        : "0.00"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Link
                        to={`/product/${product._id}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Warehouse;
*/



/*
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isSuccess, isLoading } = useSelector(
    (state) => state.products
  );
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const prevSuccess = useRef(false);

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && !prevSuccess.current) {
      toast.success("📦 Inventory Rendered Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        transition: Slide,
        className:
          "bg-blue-600 text-white font-semibold shadow-lg px-4 py-3 rounded-2xl",
      });
    }
    prevSuccess.current = isSuccess;
  }, [isSuccess]);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleCreateRequisition = () => {
    if (selected.length === 0) {
      toast.error("⚠️ Please select at least one product");
      return;
    }
    const selectedProducts = products.filter((p) => selected.includes(p._id));
    navigate("/requisition", { state: { products: selectedProducts } });
  };

  const filteredProducts = products?.filter((product) =>
    [
      product?.name,
      product?.category,
      product?.price,
      product?.stock,
      product?.supplier,
      product?.modelNo,
      product?.manufacturer,
      product?.uom,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-extrabold text-gray-800">
          📦 Warehouse Inventory
        </h1>
        <button
          onClick={handleCreateRequisition}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition transform hover:-translate-y-0.5 hover:shadow-lg flex items-center space-x-2"
        >
          <span className="text-lg">+</span>
          <span>Create Requisition</span>
        </button>
      </div>

      <div className="mb-6 w-full sm:w-1/2">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 bg-white transition placeholder-gray-400"
        />
      </div>

      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full table-auto text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-200 to-blue-300 text-gray-800 text-sm uppercase">
            <tr>
              <th className="py-3 px-4 border-b">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelected(
                      e.target.checked ? products.map((p) => p._id) : []
                    )
                  }
                  checked={selected.length === products.length && products.length > 0}
                  className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                />
              </th>
              {["Name", "Category", "Supplier", "Stock", "Model No", "Manufacturer", "UOM", "Price", "Actions"].map((title) => (
                <th key={title} className="py-3 px-4 border-b font-semibold text-gray-800">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.map((product) => (
              <tr
                key={product._id}
                className="bg-white hover:bg-blue-50 transition-colors"
              >
                <td className="py-2 px-4 border-b">
                  <input
                    type="checkbox"
                    checked={selected.includes(product._id)}
                    onChange={() => handleSelect(product._id)}
                    className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                  />
                </td>
                <td className="py-2 px-4 border-b font-medium text-gray-800">{product.name}</td>
                <td className="py-2 px-4 border-b text-gray-700">{product.category}</td>
                <td className="py-2 px-4 border-b text-gray-700">{product.supplier}</td>
                <td className="py-2 px-4 border-b text-gray-700">{product.stock}</td>
                <td className="py-2 px-4 border-b text-gray-700">{product.modelNo || "N/A"}</td>
                <td className="py-2 px-4 border-b text-gray-700">{product.manufacturer}</td>
                <td className="py-2 px-4 border-b text-gray-700">{product.uom || "PCS"}</td>
                <td className="py-2 px-4 border-b font-semibold text-gray-800">
                  ${Number(product.price).toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/product/${product._id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {filteredProducts?.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500 italic">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-4">
        {filteredProducts?.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <input
                type="checkbox"
                checked={selected.includes(product._id)}
                onChange={() => handleSelect(product._id)}
                className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              />
              <Link
                to={`/product/${product._id}`}
                className="text-blue-600 hover:underline font-medium"
              >
                View
              </Link>
            </div>
            <div className="text-gray-800 font-semibold">{product.name}</div>
            <div className="text-gray-700 text-sm mt-1">
              Category: {product.category} | Supplier: {product.supplier}
            </div>
            <div className="text-gray-700 text-sm mt-1">
              Stock: {product.stock} | Model: {product.modelNo || "N/A"}
            </div>
            <div className="text-gray-700 text-sm mt-1">
              Manufacturer: {product.manufacturer} | UOM: {product.uom || "PCS"}
            </div>
            <div className="text-gray-800 font-semibold mt-1">
              Price: ${Number(product.price).toFixed(2)}
            </div>
          </div>
        ))}
        {filteredProducts?.length === 0 && (
          <div className="text-center py-6 text-gray-500 italic">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default Warehouse;
*/












/*

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isSuccess, isLoading } = useSelector(
    (state) => state.products
  );
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    if (isSuccess) {
      toast.success("Inventory Rendered Successfully");
    }
  }, [dispatch, isSuccess]);

  const handleCheckbox = (product) => {
    if (selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const navigateToDetails = () => {
    if (selectedProducts.length === 0) return;
    navigate("/product-details", { state: { selectedProducts } });
  };

  const filteredProducts = products?.filter((product) =>
    [
      product.name,
      product.category,
      product.price,
      product.stock,
      product.supplier,
      product.modelNo,
      product.manufacturer,
      product.uom,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mb-6">
        <nav className="text-sm mb-1" aria-label="Breadcrumb">
          <ol className="list-reset flex text-gray-500">
            <li>
              <Link to="/" className="hover:text-gray-700">Dashboard</Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-700 font-semibold">Warehouse</li>
          </ol>
        </nav>
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight flex items-center">
          📦 Warehouse Inventory
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of all products stored in each warehouse
        </p>
      </div>

      <div className="mb-6 sticky top-4 z-20">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 border-2 border-blue-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white transition"
        />
      </div>

      {selectedProducts.length > 0 && (
        <div className="sticky top-20 z-20 mb-4">
          <button
            className="px-6 py-3 bg-blue-700 text-white font-bold rounded-lg shadow-md hover:bg-blue-800 transition-all"
            onClick={navigateToDetails}
          >
            Proceed with {selectedProducts.length} Requisition
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white sticky top-0 z-10 text-sm uppercase tracking-wide">
              <tr>
                {["Select", "Name", "Category", "Supplier", "Stock", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                  <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(9).fill("").map((_, idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white sticky top-0 z-10 text-sm uppercase tracking-wide">
              <tr>
                {["Select", "Name", "Category", "Supplier", "Stock", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                  <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.length > 0 ? filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-4 border-b">
                    <input
                      type="checkbox"
                      checked={selectedProducts.some((p) => p._id === product._id)}
                      onChange={() => handleCheckbox(product)}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">{product.category}</td>
                  <td className="py-2 px-4 border-b">{product.supplier}</td>
                  <td className="py-2 px-4 border-b">{product.stock}</td>
                  <td className="py-2 px-4 border-b">{product.modelNo || "N/A"}</td>
                  <td className="py-2 px-4 border-b">{product.manufacturer}</td>
                  <td className="py-2 px-4 border-b">{product.uom || "PCS"}</td>
                  <td className="py-2 px-4 border-b">${product?.price?.toFixed(2) || "0.00"}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500 italic">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Warehouse;
*/









//jijijiji
/*
// frontend/src/Screens/productScreens/Warehouse.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isSuccess, isLoading } = useSelector(
    (state) => state.products
  );
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Redirect if not logged in
  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  // Fetch products
  useEffect(() => {
    dispatch(getProducts());
    if (isSuccess) {
      toast.success("Inventory Rendered Successfully");
    }
  }, [dispatch, isSuccess]);

  const handleCheckbox = (product) => {
    if (selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const navigateToDetails = () => {
    if (selectedProducts.length === 0) return;
    navigate("/product-details", { state: { selectedProducts } });
  };

  const filteredProducts = products?.filter((product) =>
    [
      product.name,
      product.category,
      product.price,
      product.stock,
      product.supplier,
      product.modelNo,
      product.manufacturer,
      product.uom,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mb-6">
        <nav className="text-sm mb-1" aria-label="Breadcrumb">
          <ol className="list-reset flex text-gray-500">
            <li>
              <Link to="/" className="hover:text-gray-700">Dashboard</Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-700 font-semibold">Warehouse</li>
          </ol>
        </nav>
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight flex items-center">
          📦 Warehouse Inventory
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of all products stored in each warehouse
        </p>
      </div>

      <div className="mb-4 sticky top-4 z-20">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 border-2 border-blue-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white transition"
        />
      </div>

      {selectedProducts.length > 0 && (
        <div className="sticky top-20 z-20 mb-4">
          <button
            className="px-6 py-3 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-all"
            onClick={navigateToDetails}
          >
            Proceed with {selectedProducts.length} Requisition
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0 z-10 text-sm uppercase tracking-wide text-white">
              <tr>
                {["Select", "Name", "Category", "Supplier", "Stock", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                  <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(9).fill("").map((_, idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0 z-10 text-sm uppercase tracking-wide text-white">
              <tr>
                {["Select", "Name", "Category", "Supplier", "Stock", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                  <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.length > 0 ? filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-4 border-b text-black">
                    <input
                      type="checkbox"
                      checked={selectedProducts.some((p) => p._id === product._id)}
                      onChange={() => handleCheckbox(product)}
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-black">{product.name}</td>
                  <td className="py-2 px-4 border-b text-black">{product.category}</td>
                  <td className="py-2 px-4 border-b text-black">{product.supplier}</td>
                  <td className="py-2 px-4 border-b text-black">{product.stock}</td>
                  <td className="py-2 px-4 border-b text-black">{product.modelNo || "N/A"}</td>
                  <td className="py-2 px-4 border-b text-black">{product.manufacturer}</td>
                  <td className="py-2 px-4 border-b text-black">{product.uom || "PCS"}</td>
                  <td className="py-2 px-4 border-b text-black">${product?.price?.toFixed(2) || "0.00"}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500 italic">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Warehouse;
*/








/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isSuccess, isLoading } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  // Redirect if not logged in
  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  // Fetch products only once
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Check for low stock when products are fetched
  useEffect(() => {
    if (isSuccess && products?.length > 0) {
      toast.success("Inventory Rendered Successfully");
      const lowStock = products.filter((p) => p.stock <= 100);
      if (lowStock.length > 0) {
        setLowStockProducts(lowStock);
        setShowLowStockModal(true);
      }
    }
  }, [isSuccess, products]);

  const handleCheckbox = (product) => {
    if (selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const navigateToDetails = () => {
    if (selectedProducts.length === 0) return;
    navigate("/product-details", { state: { selectedProducts } });
  };

  const filteredProducts = products?.filter((product) =>
    [
      product.name,
      product.category,
      product.price,
      product.stock,
      product.supplier,
      product.modelNo,
      product.manufacturer,
      product.uom,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mb-6 p-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white">
        <nav className="text-sm mb-1" aria-label="Breadcrumb">
          <ol className="list-reset flex text-white/80">
            <li>
              <Link to="/" className="hover:text-white">Dashboard</Link>
            </li>
            <li><span className="mx-2">/</span></li>
            <li className="font-semibold">Warehouse</li>
          </ol>
        </nav>
        <h1 className="text-3xl font-extrabold flex items-center">
          📦 Warehouse Inventory
        </h1>
        <p className="mt-1 text-white/90">
          Overview of all products stored in each warehouse
        </p>
      </div>

      <div className="mb-4 sticky top-4 z-20">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-gradient-to-r from-white via-gray-100 to-white transition"
        />
      </div>

      {selectedProducts.length > 0 && (
        <div className="sticky top-20 z-20 mb-4">
          <button
            className="px-6 py-3 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-all"
            onClick={navigateToDetails}
          >
            Proceed with {selectedProducts.length} Requisition
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0 z-10 text-sm uppercase tracking-wide text-white">
              <tr>
                {["Select", "Name", "Category", "Supplier", "Stock", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                  <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(9).fill("").map((_, idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg shadow-blue-200 bg-white">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0 z-10 text-sm uppercase tracking-wide text-white">
              <tr>
                {["Select", "Name", "Category", "Supplier", "Stock", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                  <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.length > 0 ? filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-4 border-b text-black">
                    <input
                      type="checkbox"
                      checked={selectedProducts.some((p) => p._id === product._id)}
                      onChange={() => handleCheckbox(product)}
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-black">{product.name}</td>
                  <td className="py-2 px-4 border-b text-black">{product.category}</td>
                  <td className="py-2 px-4 border-b text-black">{product.supplier}</td>
                  <td className={`py-2 px-4 border-b font-bold ${product.stock <= 100 ? "text-red-600" : "text-black"}`}>
                    {product.stock}
                  </td>
                  <td className="py-2 px-4 border-b text-black">{product.modelNo || "N/A"}</td>
                  <td className="py-2 px-4 border-b text-black">{product.manufacturer}</td>
                  <td className="py-2 px-4 border-b text-black">{product.uom || "PCS"}</td>
                  <td className="py-2 px-4 border-b text-black">${product?.price?.toFixed(2) || "0.00"}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500 italic">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showLowStockModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-black">⚠ Low Stock Products</h2>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {lowStockProducts.map((p) => (
                <li key={p._id} className="flex justify-between px-4 py-2 rounded bg-white border">
                  <span className="font-bold text-black">{p.name}</span>
                  <span className="font-bold text-red-600">{p.stock}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setShowLowStockModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warehouse;
*/





//best code
/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isSuccess, isLoading } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && products?.length > 0) {
      toast.success("Inventory Rendered Successfully");
      const lowStock = products.filter((p) => p.stock <= 100);
      setLowStockProducts(lowStock);
    }
  }, [isSuccess, products]);

  const handleCheckbox = (product) => {
    if (selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const navigateToDetails = () => {
    if (selectedProducts.length === 0) return;
    navigate("/product-details", { state: { selectedProducts } });
  };

  const filteredProducts = products?.filter((product) =>
    [
      product.name,
      product.category,
      product.price,
      product.stock,
      product.supplier,
      product.modelNo,
      product.manufacturer,
      product.uom,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

      <div className="mb-6 p-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <nav className="text-sm mb-1" aria-label="Breadcrumb">
            <ol className="list-reset flex text-white/80">
              <li>
                <Link to="/" className="hover:text-white">Dashboard</Link>
              </li>
              <li><span className="mx-2">/</span></li>
              <li className="font-semibold">Warehouse</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-extrabold flex items-center">📦 Warehouse Inventory</h1>
          <p className="mt-1 text-white/90">Overview of all products stored in each warehouse</p>
        </div>

        <button
          className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition"
          onClick={() => setShowLowStockModal(true)}
        >
          View Low Stock ({lowStockProducts.length})
        </button>
      </div>

      <div className="mb-4 sticky top-4 z-20">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-gradient-to-r from-white via-gray-100 to-white transition"
        />
      </div>

      {selectedProducts.length > 0 && (
        <div className="sticky top-20 z-20 mb-4">
          <button
            className="px-6 py-3 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-all"
            onClick={navigateToDetails}
          >
            Proceed with {selectedProducts.length} Requisition
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl shadow-lg shadow-blue-200 bg-white">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0 z-10 text-sm uppercase tracking-wide text-white">
            <tr>
              {["Select", "Name", "Category", "Supplier", "Stock", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(9).fill("").map((_, idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredProducts?.length > 0 ? filteredProducts.map((product) => (
              <tr key={product._id} className={`transition-colors border rounded-lg mb-1 ${product.stock <= 100 ? "border-red-600" : "border-gray-200"}`}>
                <td className="py-2 px-4 border-b text-black">
                  <input
                    type="checkbox"
                    checked={selectedProducts.some((p) => p._id === product._id)}
                    onChange={() => handleCheckbox(product)}
                  />
                </td>
                <td className="py-2 px-4 border-b text-black font-bold">{product.name}</td>
                <td className="py-2 px-4 border-b text-black">{product.category}</td>
                <td className="py-2 px-4 border-b text-black">{product.supplier}</td>
                <td className={`py-2 px-4 border-b font-bold ${product.stock <= 100 ? "text-red-600" : "text-black"}`}>{product.stock}</td>
                <td className="py-2 px-4 border-b text-black">{product.modelNo || "N/A"}</td>
                <td className="py-2 px-4 border-b text-black">{product.manufacturer}</td>
                <td className="py-2 px-4 border-b text-black">{product.uom || "PCS"}</td>
                <td className="py-2 px-4 border-b text-black">${product?.price?.toFixed(2) || "0.00"}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500 italic">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showLowStockModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4 text-black border-b pb-2">⚠ Low Stock Products</h2>
            {lowStockProducts.length > 0 ? (
              <ul className="space-y-2 max-h-72 overflow-y-auto mt-4">
                {lowStockProducts.map((p) => (
                  <li key={p._id} className="flex justify-between px-4 py-2 rounded bg-gray-50 border hover:bg-gray-100 transition">
                    <span className="font-bold text-black">{p.name}</span>
                    <span className="font-bold text-red-600">{p.stock}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-4 italic">No low stock products.</p>
            )}
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                onClick={() => setShowLowStockModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Warehouse;
*/








/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isSuccess, isLoading } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && products?.length > 0) {
      toast.success("Inventory Rendered Successfully");
      const lowStock = products.filter((p) => p.stock <= 100);
      setLowStockProducts(lowStock);
    }
  }, [isSuccess, products]);

  const handleCheckbox = (product) => {
    if (selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const navigateToDetails = () => {
    if (selectedProducts.length === 0) return;
    navigate("/product-details", { state: { selectedProducts } });
  };

  const filteredProducts = products?.filter((product) =>
    [
      product.name,
      product.category,
      product.price,
      product.stock,
      product.supplier,
      product.modelNo,
      product.manufacturer,
      product.uom,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

      <div className="mb-6 p-6 rounded-lg shadow-lg shadow-blue-200 bg-gradient-to-r from-blue-400 to-blue-600 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <nav className="text-sm mb-1" aria-label="Breadcrumb">
            <ol className="list-reset flex text-white/80">
              <li>
                <Link to="/" className="hover:text-white">Dashboard</Link>
              </li>
              <li><span className="mx-2">/</span></li>
              <li className="font-semibold">Warehouse</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-extrabold flex items-center">📦 Warehouse Inventory</h1>
          <p className="mt-1 text-white/90">Overview of all products stored in each warehouse</p>
        </div>

        <button
          className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition"
          onClick={() => setShowLowStockModal(true)}
        >
          View Low Stock ({lowStockProducts.length})
        </button>
      </div>

      <div className="mb-4 sticky top-4 z-20">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-gradient-to-r from-white via-gray-100 to-white transition"
        />
      </div>

      {selectedProducts.length > 0 && (
        <div className="sticky top-20 z-20 mb-4">
          <button
            className="px-6 py-3 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-all"
            onClick={navigateToDetails}
          >
            Proceed with {selectedProducts.length} Requisition
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl shadow-lg shadow-blue-200 bg-white">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0 z-10 text-sm uppercase tracking-wide text-white">
            <tr>
              {["Select", "Name", "Category", "Supplier", "Stock", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(9).fill("").map((_, idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredProducts?.length > 0 ? filteredProducts.map((product) => (
              <tr key={product._id} className={`transition-colors ${product.stock <= 100 ? "border border-red-600" : "border border-gray-200"} rounded-lg mb-1 shadow-sm hover:shadow-md`}>
                <td className="py-2 px-4 border-b text-black">
                  <input
                    type="checkbox"
                    checked={selectedProducts.some((p) => p._id === product._id)}
                    onChange={() => handleCheckbox(product)}
                  />
                </td>
                <td className="py-2 px-4 border-b text-black font-bold">{product.name}</td>
                <td className="py-2 px-4 border-b text-black">{product.category}</td>
                <td className="py-2 px-4 border-b text-black">{product.supplier}</td>
                <td className={`py-2 px-4 border-b font-bold ${product.stock <= 100 ? "text-red-600" : "text-black"}`}>{product.stock}</td>
                <td className="py-2 px-4 border-b text-black">{product.modelNo || "N/A"}</td>
                <td className="py-2 px-4 border-b text-black">{product.manufacturer}</td>
                <td className="py-2 px-4 border-b text-black">{product.uom || "PCS"}</td>
                <td className="py-2 px-4 border-b text-black">${product?.price?.toFixed(2) || "0.00"}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500 italic">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showLowStockModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4 text-black border-b pb-2">⚠ Low Stock Products</h2>
            {lowStockProducts.length > 0 ? (
              <ul className="space-y-2 max-h-72 overflow-y-auto mt-4">
                {lowStockProducts.map((p) => (
                  <li key={p._id} className="flex justify-between px-4 py-2 rounded border border-red-500 hover:bg-gray-100 transition">
                    <span className="font-bold text-black">{p.name}</span>
                    <span className="font-bold text-red-600">{p.stock}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-4 italic">No low stock products.</p>
            )}
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                onClick={() => setShowLowStockModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Warehouse;
*/












/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isSuccess, isLoading } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  // Redirect if not logged in
  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  // Fetch products
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Check low stock
  useEffect(() => {
    if (isSuccess && products?.length > 0) {
      toast.success("Inventory Rendered Successfully");
      const lowStock = products.filter((p) => p.stock <= 100);
      setLowStockProducts(lowStock);
    }
  }, [isSuccess, products]);

  const handleCheckbox = (product) => {
    if (selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const navigateToDetails = () => {
    if (selectedProducts.length === 0) return;
    navigate("/product-details", { state: { selectedProducts } });
  };

  const filteredProducts = products?.filter((product) =>
    [
      product.name,
      product.category,
      product.price,
      product.stock,
      product.supplier,
      product.modelNo,
      product.manufacturer,
      product.uom,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

      
      <div className="mb-6 p-6 rounded-lg shadow-lg shadow-blue-200 bg-gradient-to-r from-blue-400 to-blue-600 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <nav className="text-sm mb-1" aria-label="Breadcrumb">
            <ol className="list-reset flex text-white/80">
              <li><Link to="/" className="hover:text-white">Dashboard</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="font-semibold">Warehouse</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-extrabold flex items-center">📦 Warehouse Inventory</h1>
          <p className="mt-1 text-white/90">Overview of all products stored in each warehouse</p>
        </div>

        
        <button
          className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition"
          onClick={() => setShowLowStockModal(true)}
        >
          View Low Stock ({lowStockProducts.length})
        </button>
      </div>

      
      <div className="mb-4 sticky top-4 z-20">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-gradient-to-r from-white via-gray-100 to-white transition"
        />
      </div>

      
      {selectedProducts.length > 0 && (
        <div className="sticky top-20 z-20 mb-4">
          <button
            className="px-6 py-3 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-all"
            onClick={navigateToDetails}
          >
            Proceed with {selectedProducts.length} Requisition
          </button>
        </div>
      )}

      
      <div className="overflow-x-auto rounded-xl shadow-lg shadow-blue-200 bg-white">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0 z-10 text-sm uppercase tracking-wide text-white">
            <tr>
              {["Select", "Name", "Category", "Supplier", "Stock", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(9).fill("").map((_, idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredProducts?.length > 0 ? filteredProducts.map((product) => (
              <tr key={product._id} className={`transition-colors ${product.stock <= 100 ? "border border-red-600" : "border border-gray-200"} rounded-lg mb-1 shadow-sm hover:shadow-md`}>
                <td className="py-2 px-4 border-b text-black">
                  <input
                    type="checkbox"
                    checked={selectedProducts.some((p) => p._id === product._id)}
                    onChange={() => handleCheckbox(product)}
                  />
                </td>
                <td className="py-2 px-4 border-b text-black font-bold">{product.name}</td>
                <td className="py-2 px-4 border-b text-black">{product.category}</td>
                <td className="py-2 px-4 border-b text-black">{product.supplier}</td>
                <td className={`py-2 px-4 border-b font-bold ${product.stock <= 100 ? "text-red-600" : "text-black"}`}>{product.stock}</td>
                <td className="py-2 px-4 border-b text-black">{product.modelNo || "N/A"}</td>
                <td className="py-2 px-4 border-b text-black">{product.manufacturer}</td>
                <td className="py-2 px-4 border-b text-black">{product.uom || "PCS"}</td>
                <td className="py-2 px-4 border-b text-black">${product?.price?.toFixed(2) || "0.00"}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500 italic">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
      {showLowStockModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fadeIn">
          <div className="bg-white p-8 rounded-2xl shadow-2xl shadow-blue-300 max-w-lg w-full transform transition-all scale-95 hover:scale-100">
            <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg py-2 shadow-md">
              ⚠ Low Stock Products
            </h2>
            {lowStockProducts.length > 0 ? (
              <ul className="space-y-3 max-h-80 overflow-y-auto mt-4">
                {lowStockProducts.map((p) => (
                  <li key={p._id} className="flex justify-between items-center px-4 py-3 rounded-lg border border-red-500 shadow-sm hover:shadow-md hover:bg-gray-50 transition">
                    <span className="font-bold text-black">{p.name}</span>
                    <span className="font-bold text-red-600">{p.stock}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-4 italic text-center">No low stock products.</p>
            )}
            <div className="mt-6 flex justify-center">
              <button
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition"
                onClick={() => setShowLowStockModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Warehouse;
*/







/*

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isSuccess, isLoading } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && products?.length > 0) {
      toast.success("Inventory Rendered Successfully");
      const lowStock = products.filter((p) => p.stock <= 100);
      setLowStockProducts(lowStock);
    }
  }, [isSuccess, products]);

  const handleCheckbox = (product) => {
    if (selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const navigateToDetails = () => {
    if (selectedProducts.length === 0) return;
    navigate("/product-details", { state: { selectedProducts } });
  };

  const filteredProducts = products?.filter((product) =>
    [
      product.name,
      product.category,
      product.price,
      product.stock,
      product.supplier,
      product.modelNo,
      product.manufacturer,
      product.uom,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

      
      <div className="mb-6 p-6 rounded-lg shadow-lg shadow-blue-200 bg-gradient-to-r from-blue-400 to-blue-600 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <nav className="text-sm mb-1" aria-label="Breadcrumb">
            <ol className="list-reset flex text-white/80">
              <li><Link to="/" className="hover:text-white">Dashboard</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="font-semibold">Warehouse</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-extrabold flex items-center">📦 Warehouse Inventory</h1>
          <p className="mt-1 text-white/90">Overview of all products stored in each warehouse</p>
        </div>

        <button
          className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition"
          onClick={() => setShowLowStockModal(true)}
        >
          View Low Stock ({lowStockProducts.length})
        </button>
      </div>

      
      <div className="mb-4 sticky top-4 z-20">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-gradient-to-r from-white via-gray-100 to-white transition"
        />
      </div>

      
      {selectedProducts.length > 0 && (
        <div className="sticky top-20 z-20 mb-4">
          <button
            className="px-6 py-3 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-all"
            onClick={navigateToDetails}
          >
            Proceed with {selectedProducts.length} Requisition
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl shadow-lg shadow-blue-200 bg-white">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0 z-10 text-sm uppercase tracking-wide text-white">
            <tr>
              {["Select", "Name", "Category", "Supplier", "Stock", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(9).fill("").map((_, idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredProducts?.length > 0 ? filteredProducts.map((product) => (
              <tr key={product._id} className={`transition-colors ${product.stock <= 100 ? "border border-red-600" : "border border-gray-200"} rounded-lg mb-1 shadow-sm hover:shadow-md`}>
                <td className="py-2 px-4 border-b text-black">
                  <input
                    type="checkbox"
                    checked={selectedProducts.some((p) => p._id === product._id)}
                    onChange={() => handleCheckbox(product)}
                  />
                </td>
                <td className="py-2 px-4 border-b text-black font-bold">{product.name}</td>
                <td className="py-2 px-4 border-b text-black">{product.category}</td>
                <td className="py-2 px-4 border-b text-black">{product.supplier}</td>
                <td className={`py-2 px-4 border-b font-bold ${product.stock <= 100 ? "text-red-600" : "text-black"}`}>{product.stock}</td>
                <td className="py-2 px-4 border-b text-black">{product.modelNo || "N/A"}</td>
                <td className="py-2 px-4 border-b text-black">{product.manufacturer}</td>
                <td className="py-2 px-4 border-b text-black">{product.uom || "PCS"}</td>
                <td className="py-2 px-4 border-b text-black">${product?.price?.toFixed(2) || "0.00"}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500 italic">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showLowStockModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fadeIn">
          <div className="bg-white p-8 rounded-2xl shadow-2xl shadow-blue-300 max-w-lg w-full transform transition-all scale-95 hover:scale-100">
            <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg py-2 shadow-md">
              ⚠ Low Stock Products
            </h2>
            {lowStockProducts.length > 0 ? (
              <ul className="space-y-3 max-h-80 overflow-y-auto mt-4">
                {lowStockProducts.map((p, idx) => (
                  <li
                    key={p._id}
                    className="flex justify-between items-center px-4 py-3 rounded-lg border border-red-500 shadow-sm hover:shadow-md hover:bg-gray-50 transition transform opacity-0 animate-slideUp"
                    style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'forwards' }}
                  >
                    <span className="font-bold text-black">{p.name}</span>
                    <span className="font-bold text-red-600">{p.stock}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-4 italic text-center">No low stock products.</p>
            )}
            <div className="mt-6 flex justify-center">
              <button
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition"
                onClick={() => setShowLowStockModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes slideUp {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-slideUp { animation: slideUp 0.4s ease forwards; }
          .animate-fadeIn { animation: fadeIn 0.3s ease forwards; }
          @keyframes fadeIn { 0% { opacity: 0 } 100% { opacity: 1 } }
        `}
      </style>

    </div>
  );
};

export default Warehouse;
*/







/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isSuccess, isLoading } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && products?.length > 0) {
      toast.success("Inventory Rendered Successfully");
      const lowStock = products.filter((p) => p.stock <= 100);
      setLowStockProducts(lowStock);
    }
  }, [isSuccess, products]);

  const handleCheckbox = (product) => {
    if (selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const navigateToDetails = () => {
    if (selectedProducts.length === 0) return;
    navigate("/product-details", { state: { selectedProducts } });
  };

  const filteredProducts = products?.filter((product) =>
    [
      product.name,
      product.category,
      product.price,
      product.stock,
      product.supplier,
      product.modelNo,
      product.manufacturer,
      product.uom,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

      <div className="mb-6 p-6 rounded-lg shadow-lg shadow-blue-200 bg-gradient-to-r from-blue-400 to-blue-600 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <nav className="text-sm mb-1" aria-label="Breadcrumb">
            <ol className="list-reset flex text-white/80">
              <li><Link to="/" className="hover:text-white">Dashboard</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="font-semibold">Warehouse</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-extrabold flex items-center">📦 Warehouse Inventory</h1>
          <p className="mt-1 text-white/90">Overview of all products stored in each warehouse</p>
        </div>

        <button
          className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition"
          onClick={() => setShowLowStockModal(true)}
        >
          View Low Stock ({lowStockProducts.length})
        </button>
      </div>

      <div className="mb-4 sticky top-4 z-20">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-gradient-to-r from-white via-gray-100 to-white transition"
        />
      </div>

      {selectedProducts.length > 0 && (
        <div className="sticky top-20 z-20 mb-4">
          <button
            className="px-6 py-3 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-all"
            onClick={navigateToDetails}
          >
            Proceed with {selectedProducts.length} Requisition
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl shadow-lg shadow-blue-200 bg-white">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0 z-10 text-sm uppercase tracking-wide text-white">
            <tr>
              {["Select", "Name", "Category", "Supplier", "Stock", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(9).fill("").map((_, idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredProducts?.length > 0 ? filteredProducts.map((product) => (
              <tr key={product._id} className={`transition-colors ${product.stock <= 100 ? "border border-red-600" : "border border-gray-200"} rounded-lg mb-1 shadow-sm hover:shadow-md`}>
                <td className="py-2 px-4 border-b text-black">
                  <input
                    type="checkbox"
                    checked={selectedProducts.some((p) => p._id === product._id)}
                    onChange={() => handleCheckbox(product)}
                  />
                </td>
                <td className="py-2 px-4 border-b text-black font-bold">{product.name}</td>
                <td className="py-2 px-4 border-b text-black">{product.category}</td>
                <td className="py-2 px-4 border-b text-black">{product.supplier}</td>
                <td className={`py-2 px-4 border-b font-bold ${product.stock <= 100 ? "text-red-600" : "text-black"} ${product.stock < 50 ? "animate-pulse" : ""}`}>{product.stock}</td>
                <td className="py-2 px-4 border-b text-black">{product.modelNo || "N/A"}</td>
                <td className="py-2 px-4 border-b text-black">{product.manufacturer}</td>
                <td className="py-2 px-4 border-b text-black">{product.uom || "PCS"}</td>
                <td className="py-2 px-4 border-b text-black">${product?.price?.toFixed(2) || "0.00"}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500 italic">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showLowStockModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 animate-fadeIn">
          <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl shadow-blue-300 max-w-lg w-full transform transition-all scale-95 hover:scale-100">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-400 flex items-center justify-center gap-2">
              <span className="text-yellow-400">⚠</span> Low Stock Products
            </h2>
            {lowStockProducts.length > 0 ? (
              <ul className="space-y-3 max-h-80 overflow-y-auto mt-4">
                {lowStockProducts.map((p, idx) => (
                  <li
                    key={p._id}
                    className={`flex justify-between items-center px-4 py-3 rounded-lg border border-red-500 shadow-sm hover:shadow-md hover:bg-gray-800 transition transform opacity-0 animate-slideUp`}
                    style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'forwards' }}
                  >
                    <span className="font-bold text-blue-400">{p.name}</span>
                    <span className={`font-bold ${p.stock < 50 ? "text-red-500 animate-pulse" : "text-red-400"}`}>{p.stock}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 mt-4 italic text-center">No low stock products.</p>
            )}
            <div className="mt-6 flex justify-center">
              <button
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition"
                onClick={() => setShowLowStockModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes slideUp {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-slideUp { animation: slideUp 0.4s ease forwards; }
          @keyframes fadeIn { 0% { opacity: 0 } 100% { opacity: 1 } }
          .animate-fadeIn { animation: fadeIn 0.3s ease forwards; }
        `}
      </style>

    </div>
  );
};

export default Warehouse;
*/





/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isSuccess, isLoading } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  // Redirect if not logged in
  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  // Fetch products
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Check for low stock
  useEffect(() => {
    if (isSuccess && products?.length > 0) {
      toast.success("Inventory Rendered Successfully");
      const lowStock = products.filter((p) => p.stock <= 100);
      setLowStockProducts(lowStock);
    }
  }, [isSuccess, products]);

  const handleCheckbox = (product) => {
    if (selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const navigateToDetails = () => {
    if (selectedProducts.length === 0) return;
    navigate("/product-details", { state: { selectedProducts } });
  };

  const filteredProducts = products?.filter((product) =>
    [
      product.name,
      product.category,
      product.price,
      product.stock,
      product.supplier,
      product.modelNo,
      product.manufacturer,
      product.uom,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

      <div className="mb-6 p-6 rounded-lg shadow-lg shadow-blue-200 bg-gradient-to-r from-blue-400 to-blue-600 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <nav className="text-sm mb-1" aria-label="Breadcrumb">
            <ol className="list-reset flex text-white/80">
              <li>
                <Link to="/" className="hover:text-white">Dashboard</Link>
              </li>
              <li><span className="mx-2">/</span></li>
              <li className="font-semibold">Warehouse</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-extrabold flex items-center">📦 Warehouse Inventory</h1>
          <p className="mt-1 text-white/90">Overview of all products stored in each warehouse</p>
        </div>

        <button
          className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition"
          onClick={() => setShowLowStockModal(true)}
        >
          View Low Stock ({lowStockProducts.length})
        </button>
      </div>

      <div className="mb-4 sticky top-4 z-20">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-gradient-to-r from-white via-gray-100 to-white transition"
        />
      </div>

      {selectedProducts.length > 0 && (
        <div className="sticky top-20 z-20 mb-4">
          <button
            className="px-6 py-3 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-all"
            onClick={navigateToDetails}
          >
            Proceed with {selectedProducts.length} Requisition
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl shadow-lg shadow-blue-200 bg-white">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0 z-10 text-sm uppercase tracking-wide text-white">
            <tr>
              {["Select", "Name", "Category", "Supplier", "Stock", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(9).fill("").map((_, idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredProducts?.length > 0 ? filteredProducts.map((product) => (
              <tr key={product._id} className={`transition-colors ${product.stock <= 100 ? "border border-red-600" : "border border-gray-200"} rounded-lg mb-1 shadow-sm hover:shadow-md`}>
                <td className="py-2 px-4 border-b text-black">
                  <input
                    type="checkbox"
                    checked={selectedProducts.some((p) => p._id === product._id)}
                    onChange={() => handleCheckbox(product)}
                  />
                </td>
                <td className="py-2 px-4 border-b text-black font-bold">{product.name}</td>
                <td className="py-2 px-4 border-b text-black">{product.category}</td>
                <td className="py-2 px-4 border-b text-black">{product.supplier}</td>
                <td className={`py-2 px-4 border-b font-bold ${product.stock <= 100 ? "text-red-600" : "text-black"}`}>{product.stock}</td>
                <td className="py-2 px-4 border-b text-black">{product.modelNo || "N/A"}</td>
                <td className="py-2 px-4 border-b text-black">{product.manufacturer}</td>
                <td className="py-2 px-4 border-b text-black">{product.uom || "PCS"}</td>
                <td className="py-2 px-4 border-b text-black">${product?.price?.toFixed(2) || "0.00"}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500 italic">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showLowStockModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="relative bg-gray-800 p-8 rounded-2xl shadow-2xl shadow-blue-400/50 max-w-lg w-full transform transition-all scale-95 hover:scale-100">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-300 flex items-center justify-center gap-2">
              <span className="text-yellow-400">⚠</span> Low Stock Products
            </h2>

            {lowStockProducts.length > 0 ? (
              <ul className="space-y-3 max-h-80 overflow-y-auto mt-4">
                {lowStockProducts.map((p) => (
                  <li
                    key={p._id}
                    className="flex justify-between items-center px-4 py-3 rounded-lg border border-red-500 bg-gray-700 shadow-sm hover:shadow-md hover:bg-gray-600 transition"
                  >
                    <span className="font-bold text-blue-300">
                      {p.name} <span className="text-gray-300 ml-2">({p.category})</span>
                    </span>
                    <span className="font-bold text-red-400">{p.stock}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300 mt-4 italic text-center">No low stock products.</p>
            )}

            <div className="mt-6 flex justify-center">
              <button
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition"
                onClick={() => setShowLowStockModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Warehouse;
*/













//best code that works
/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isSuccess, isLoading } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  // Redirect if not logged in
  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  // Fetch products
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Check for low stock
  useEffect(() => {
    if (isSuccess && products?.length > 0) {
      toast.success("Inventory Rendered Successfully");
      const lowStock = products.filter((p) => p.stock <= 100);
      setLowStockProducts(lowStock);
    }
  }, [isSuccess, products]);

  const handleCheckbox = (product) => {
    if (selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const navigateToDetails = () => {
    if (selectedProducts.length === 0) return;
    navigate("/product-details", { state: { selectedProducts } });
  };

  const filteredProducts = products?.filter((product) =>
    [
      product.name,
      product.category,
      product.price,
      product.stock,
      product.supplier,
      product.modelNo,
      product.manufacturer,
      product.uom,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

      <div className="mb-6 p-6 rounded-lg shadow-lg shadow-blue-200 bg-gradient-to-r from-blue-400 to-blue-600 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <nav className="text-sm mb-1" aria-label="Breadcrumb">
            <ol className="list-reset flex text-white/80">
              <li>
                <Link to="/" className="hover:text-white">Dashboard</Link>
              </li>
              <li><span className="mx-2">/</span></li>
              <li className="font-semibold">Warehouse</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-extrabold flex items-center">📦 Warehouse Inventory</h1>
          <p className="mt-1 text-white/90">Overview of all products stored in each warehouse</p>
        </div>

        <button
          className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition"
          onClick={() => setShowLowStockModal(true)}
        >
          View Low Stock ({lowStockProducts.length})
        </button>
      </div>

      <div className="mb-4 sticky top-4 z-20">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-gradient-to-r from-white via-gray-100 to-white transition"
        />
      </div>

      {selectedProducts.length > 0 && (
        <div className="sticky top-20 z-20 mb-4">
          <button
            className="px-6 py-3 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-all"
            onClick={navigateToDetails}
          >
            Proceed with {selectedProducts.length} Requisition
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl shadow-lg shadow-blue-200 bg-white">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0 z-10 text-sm uppercase tracking-wide text-white">
            <tr>
              {["Select", "Name", "Category", "Supplier", "Stock", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(9).fill("").map((_, idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredProducts?.length > 0 ? filteredProducts.map((product) => (
              <tr key={product._id} className={`transition-colors ${product.stock <= 100 ? "border border-red-600" : "border border-gray-200"} rounded-lg mb-1 shadow-sm hover:shadow-md`}>
                <td className="py-2 px-4 border-b text-black">
                  <input
                    type="checkbox"
                    checked={selectedProducts.some((p) => p._id === product._id)}
                    onChange={() => handleCheckbox(product)}
                  />
                </td>
                <td className="py-2 px-4 border-b text-black font-bold">{product.name}</td>
                <td className="py-2 px-4 border-b text-black">{product.category}</td>
                <td className="py-2 px-4 border-b text-black">{product.supplier}</td>
                <td className={`py-2 px-4 border-b font-bold ${product.stock <= 100 ? "text-red-600" : "text-black"}`}>{product.stock}</td>
                <td className="py-2 px-4 border-b text-black">{product.modelNo || "N/A"}</td>
                <td className="py-2 px-4 border-b text-black">{product.manufacturer}</td>
                <td className="py-2 px-4 border-b text-black">{product.uom || "PCS"}</td>
                <td className="py-2 px-4 border-b text-black">${product?.price?.toFixed(2) || "0.00"}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500 italic">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showLowStockModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="relative bg-gray-800 p-8 rounded-2xl shadow-2xl shadow-blue-400/50 max-w-lg w-full transform transition-all scale-95 animate-scale-up">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-300 flex items-center justify-center gap-2">
              <span className="text-yellow-400">⚠</span> Low Stock Products
            </h2>

            {lowStockProducts.length > 0 ? (
              <ul className="space-y-3 max-h-80 overflow-y-auto mt-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700">
                {lowStockProducts.map((p) => (
                  <li
                    key={p._id}
                    className="flex justify-between items-center px-4 py-3 rounded-lg border border-red-500 bg-gray-700 shadow-sm hover:shadow-lg hover:bg-gray-600 transition"
                  >
                    <span className="font-bold text-blue-300">
                      {p.name} <span className="text-gray-300 ml-2">({p.category})</span>
                    </span>
                    <span className="font-bold text-red-400">
                      {p.stock === 0 ? "Out of Stock!!!" : p.stock}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300 mt-4 italic text-center">No low stock products.</p>
            )}

            <div className="mt-6 flex justify-center">
              <button
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition"
                onClick={() => setShowLowStockModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Warehouse;
*/




//best latest
/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { products, isSuccess, isLoading } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  // ✅ preload selections + quantities if coming back from ProductDetails
  useEffect(() => {
    if (location.state?.selectedProducts) {
      setSelectedProducts(location.state.selectedProducts);
    }
    if (location.state?.quantities) {
      setQuantities(location.state.quantities);
    }
  }, [location.state]);

  // Redirect if not logged in
  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  // Fetch products
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Check for low stock
  useEffect(() => {
    if (isSuccess && products?.length > 0) {
      toast.success("Inventory Rendered Successfully");
      const lowStock = products.filter((p) => p.stock <= 100);
      setLowStockProducts(lowStock);
    }
  }, [isSuccess, products]);

  const handleCheckbox = (product) => {
    if (selectedProducts.some((p) => p._id === product._id)) {
      // remove product + qty
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
      const newQuantities = { ...quantities };
      delete newQuantities[product._id];
      setQuantities(newQuantities);
    } else {
      // add product with default qty=1
      setSelectedProducts([...selectedProducts, product]);
      setQuantities({ ...quantities, [product._id]: 1 });
    }
  };

  const handleQtyChange = (productId, value) => {
    setQuantities({ ...quantities, [productId]: Number(value) });
  };

  const navigateToDetails = () => {
    if (selectedProducts.length === 0) return;
    navigate("/product-details", { state: { selectedProducts, quantities } });
  };

  const filteredProducts = products?.filter((product) =>
    [
      product.name,
      product.category,
      product.price,
      product.stock,
      product.supplier,
      product.modelNo,
      product.manufacturer,
      product.uom,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mb-6 p-6 rounded-lg shadow-lg shadow-blue-200 bg-gradient-to-r from-blue-400 to-blue-600 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <nav className="text-sm mb-1" aria-label="Breadcrumb">
            <ol className="list-reset flex text-white/80">
              <li>
                <Link to="/" className="hover:text-white">Dashboard</Link>
              </li>
              <li><span className="mx-2">/</span></li>
              <li className="font-semibold">Warehouse</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-extrabold flex items-center">📦 Warehouse Inventory</h1>
          <p className="mt-1 text-white/90">Overview of all products stored in each warehouse</p>
        </div>

        <button
          className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition"
          onClick={() => setShowLowStockModal(true)}
        >
          View Low Stock ({lowStockProducts.length})
        </button>
      </div>

      <div className="mb-4 sticky top-4 z-20">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-gradient-to-r from-white via-gray-100 to-white transition"
        />
      </div>

      {selectedProducts.length > 0 && (
        <div className="sticky top-20 z-20 mb-4">
          <button
            className="px-6 py-3 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-all"
            onClick={navigateToDetails}
          >
            Proceed with {selectedProducts.length} Requisition
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl shadow-lg shadow-blue-200 bg-white">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0 z-10 text-sm uppercase tracking-wide text-white">
            <tr>
              {["Select", "Name", "Category", "Supplier", "Stock", "Qty", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(10).fill("").map((_, idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredProducts?.length > 0 ? filteredProducts.map((product) => (
              <tr key={product._id} className={`transition-colors ${product.stock <= 100 ? "border border-red-600" : "border border-gray-200"} rounded-lg mb-1 shadow-sm hover:shadow-md`}>
                <td className="py-2 px-4 border-b text-black">
                  <input
                    type="checkbox"
                    checked={selectedProducts.some((p) => p._id === product._id)}
                    onChange={() => handleCheckbox(product)}
                  />
                </td>
                <td className="py-2 px-4 border-b text-black font-bold">{product.name}</td>
                <td className="py-2 px-4 border-b text-black">{product.category}</td>
                <td className="py-2 px-4 border-b text-black">{product.supplier}</td>
                <td className={`py-2 px-4 border-b font-bold ${product.stock <= 100 ? "text-red-600" : "text-black"}`}>{product.stock}</td>

                <td className="py-2 px-4 border-b text-black">
                  {selectedProducts.some((p) => p._id === product._id) ? (
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantities[product._id] || 1}
                      onChange={(e) => handleQtyChange(product._id, e.target.value)}
                      className="w-20 border rounded px-2 py-1"
                    />
                  ) : (
                    "-"
                  )}
                </td>

                <td className="py-2 px-4 border-b text-black">{product.modelNo || "N/A"}</td>
                <td className="py-2 px-4 border-b text-black">{product.manufacturer}</td>
                <td className="py-2 px-4 border-b text-black">{product.uom || "PCS"}</td>
                <td className="py-2 px-4 border-b text-black">${product?.price?.toFixed(2) || "0.00"}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500 italic">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showLowStockModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="relative bg-gray-800 p-8 rounded-2xl shadow-2xl shadow-blue-400/50 max-w-lg w-full transform transition-all scale-95 animate-scale-up">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-300 flex items-center justify-center gap-2">
              <span className="text-yellow-400">⚠</span> Low Stock Products
            </h2>

            {lowStockProducts.length > 0 ? (
              <ul className="space-y-3 max-h-80 overflow-y-auto mt-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700">
                {lowStockProducts.map((p) => (
                  <li
                    key={p._id}
                    className="flex justify-between items-center px-4 py-3 rounded-lg border border-red-500 bg-gray-700 shadow-sm hover:shadow-lg hover:bg-gray-600 transition"
                  >
                    <span className="font-bold text-blue-300">
                      {p.name} <span className="text-gray-300 ml-2">({p.category})</span>
                    </span>
                    <span className="font-bold text-red-400">
                      {p.stock === 0 ? "Out of Stock!!!" : p.stock}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300 mt-4 italic text-center">No low stock products.</p>
            )}

            <div className="mt-6 flex justify-center">
              <button
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition"
                onClick={() => setShowLowStockModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warehouse;

*/












/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { products, isSuccess, isLoading } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    if (location.state?.selectedProducts) setSelectedProducts(location.state.selectedProducts);
    if (location.state?.quantities) setQuantities(location.state.quantities);
  }, [location.state]);

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && products?.length > 0) {
      toast.success("Inventory Rendered Successfully");
      setLowStockProducts(products.filter((p) => p.stock <= 100));
    }
  }, [isSuccess, products]);

  // ------------------ SIMILARITY FUNCTION ------------------
  const similarity = (s1 = "", s2 = "") => {
    s1 = s1.toString().toLowerCase();
    s2 = s2.toString().toLowerCase();
    if (!s1 || !s2) return 0;
    if (s1.includes(s2) || s2.includes(s1)) return 1;
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    const longerLength = longer.length;
    if (longerLength === 0) return 1;

    let editDistance = 0;
    const minLen = Math.min(longer.length, shorter.length);
    for (let i = 0; i < minLen; i++) if (longer[i] !== shorter[i]) editDistance++;
    editDistance += Math.abs(longer.length - shorter.length);
    return (longerLength - editDistance) / longerLength;
  };

  // ------------------ HIGHLIGHT FUNCTION ------------------
  const highlightMatches = (text, search) => {
    if (!search) return text;
    const searchWords = search.toLowerCase().split(" ").filter(Boolean);
    let result = text;
    searchWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      result = result.replace(
        regex,
        `<span class="bg-blue-700 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
      );
    });
    return result;
  };

  // ------------------ FILTERED PRODUCTS ------------------
  const filteredProducts = !search
    ? products
    : products
        ?.map((product) => {
          const searchWords = search.toLowerCase().split(" ").filter(Boolean);
          const productFields = [
            product.name || "",
            product.modelNo || "",
            product.uom || "",
            product.category || "",
            product.location || "",
            product.supplier || "",
            product.manufacturer || "",
            (product.price?.toString()) || "",
          ];

          let score = 0;
          searchWords.forEach((word) => {
            const bestMatch = Math.max(...productFields.map((field) => similarity(field, word)));
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const handleCheckbox = (product) => {
    if (selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
      const newQuantities = { ...quantities };
      delete newQuantities[product._id];
      setQuantities(newQuantities);
    } else {
      setSelectedProducts([...selectedProducts, product]);
      setQuantities({ ...quantities, [product._id]: 1 });
    }
  };

  const handleQtyChange = (productId, value) => {
    setQuantities({ ...quantities, [productId]: Number(value) });
  };

  const navigateToDetails = () => {
    if (selectedProducts.length === 0) return;
    navigate("/product-details", { state: { selectedProducts, quantities } });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mb-6 p-6 rounded-lg shadow-lg shadow-blue-200 bg-gradient-to-r from-blue-400 to-blue-600 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <nav className="text-sm mb-1" aria-label="Breadcrumb">
            <ol className="list-reset flex text-white/80">
              <li><Link to="/" className="hover:text-white">Dashboard</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="font-semibold">Warehouse</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-extrabold flex items-center">📦 Warehouse Inventory</h1>
          <p className="mt-1 text-white/90">Overview of all products stored in each warehouse</p>
        </div>

        <button
          className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition"
          onClick={() => setShowLowStockModal(true)}
        >
          View Low Stock ({lowStockProducts.length})
        </button>
      </div>

      <div className="mb-4 sticky top-4 z-20">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-gradient-to-r from-white via-gray-100 to-white transition"
        />
      </div>

      {selectedProducts.length > 0 && (
        <div className="sticky top-20 z-20 mb-4">
          <button
            className="px-6 py-3 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-all"
            onClick={navigateToDetails}
          >
            Proceed with {selectedProducts.length} Requisition
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl shadow-lg shadow-blue-200 bg-white">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0 z-10 text-sm uppercase tracking-wide text-white">
            <tr>
              {["Select", "Name", "Category", "Supplier", "Stock", "Qty", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(10).fill("").map((_, idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredProducts?.length > 0 ? filteredProducts.map((product) => (
              <tr key={product._id} className={`transition-colors ${product.stock <= 100 ? "border border-red-600" : "border border-gray-200"} rounded-lg mb-1 shadow-sm hover:shadow-md`}>
                <td className="py-2 px-4 border-b text-black">
                  <input
                    type="checkbox"
                    checked={selectedProducts.some((p) => p._id === product._id)}
                    onChange={() => handleCheckbox(product)}
                  />
                </td>
                <td className="py-2 px-4 border-b text-black font-bold">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: product.name.toUpperCase().includes("FIRE")
                        ? highlightMatches(product.name + " 🔥", search)
                        : highlightMatches(product.name, search)
                    }}
                  />
                </td>
                <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.category || "", search) }} />
                <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.supplier || "", search) }} />
                <td className={`py-2 px-4 border-b font-bold ${product.stock <= 100 ? "text-red-600" : "text-black"}`} dangerouslySetInnerHTML={{ __html: highlightMatches(product.stock?.toString() || "0", search) }} />

                <td className="py-2 px-4 border-b text-black">
                  {selectedProducts.some((p) => p._id === product._id) ? (
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantities[product._id] || 1}
                      onChange={(e) => handleQtyChange(product._id, e.target.value)}
                      className="w-20 border rounded px-2 py-1"
                    />
                  ) : "-"}
                </td>

                <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.modelNo || "N/A", search) }} />
                <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.manufacturer || "", search) }} />
                <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.uom || "PCS", search) }} />
                <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.price?.toString() || "0.00", search) }} />
              </tr>
            )) : (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500 italic">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default Warehouse;
*/











/*
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { products, isSuccess, isLoading } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [showLowStockModal, setShowLowStockModal] = useState(false);

  // Load selected products & quantities from location state
  useEffect(() => {
    if (location.state?.selectedProducts) setSelectedProducts(location.state.selectedProducts);
    if (location.state?.quantities) setQuantities(location.state.quantities);
  }, [location.state]);

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && products?.length > 0) {
      toast.success("Inventory Rendered Successfully");
      setLowStockProducts(products.filter((p) => p.stock <= 100));
    }
  }, [isSuccess, products]);

  // ------------------ SIMILARITY FUNCTION ------------------
  const similarity = (s1 = "", s2 = "") => {
    s1 = s1.toString().toLowerCase();
    s2 = s2.toString().toLowerCase();
    if (!s1 || !s2) return 0;
    if (s1.includes(s2) || s2.includes(s1)) return 1;
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    const longerLength = longer.length;
    if (longerLength === 0) return 1;

    let editDistance = 0;
    const minLen = Math.min(longer.length, shorter.length);
    for (let i = 0; i < minLen; i++) if (longer[i] !== shorter[i]) editDistance++;
    editDistance += Math.abs(longer.length - shorter.length);
    return (longerLength - editDistance) / longerLength;
  };

  // ------------------ HIGHLIGHT FUNCTION ------------------
  const highlightMatches = (text, search) => {
    if (!search) return text;
    const searchWords = search.toLowerCase().split(" ").filter(Boolean);

    let result = text;
    searchWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      result = result.replace(
        regex,
        `<span class="bg-blue-500 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
      );
    });
    return result;
  };

  // ------------------ FILTER PRODUCTS ------------------
  const filteredProducts = useMemo(() => {
    if (!search) return products;

    return products
      ?.map((product) => {
        const searchWords = search.toLowerCase().split(" ").filter(Boolean);
        const productFields = [
          product.name || "",
          product.modelNo || "",
          product.uom || "",
          product.category || "",
          product.location || "",
          product.supplier || "",
          product.manufacturer || "",
          product.price?.toString() || "",
        ];

        let score = 0;
        searchWords.forEach((word) => {
          const bestMatch = Math.max(...productFields.map((field) => similarity(field, word)));
          score += bestMatch;
        });

        return { product, score };
      })
      .filter(({ score }) => score > 0.2)
      .sort((a, b) => b.score - a.score)
      .map(({ product }) => product);
  }, [products, search]);

  // ------------------ SELECTION HANDLERS ------------------
  const handleCheckbox = (product) => {
    if (selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
      const newQuantities = { ...quantities };
      delete newQuantities[product._id];
      setQuantities(newQuantities);
    } else {
      setSelectedProducts([...selectedProducts, product]);
      setQuantities({ ...quantities, [product._id]: quantities[product._id] || 1 });
    }
  };

  const handleQtyChange = (productId, value) => {
    setQuantities({ ...quantities, [productId]: Number(value) });
  };

  const navigateToDetails = () => {
    if (selectedProducts.length === 0) return;
    navigate("/product-details", { state: { selectedProducts, quantities } });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mb-6 p-6 rounded-lg shadow-lg shadow-blue-200 bg-gradient-to-r from-blue-400 to-blue-600 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <nav className="text-sm mb-1" aria-label="Breadcrumb">
            <ol className="list-reset flex text-white/80">
              <li><Link to="/" className="hover:text-white">Dashboard</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="font-semibold">Warehouse</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-extrabold flex items-center">📦 Warehouse Inventory</h1>
          <p className="mt-1 text-white/90">Overview of all products stored in each warehouse</p>
        </div>

        <button
          className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition"
          onClick={() => setShowLowStockModal(true)}
        >
          View Low Stock ({lowStockProducts.length})
        </button>
      </div>

      <div className="mb-4 sticky top-4 z-20">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-gradient-to-r from-white via-gray-100 to-white transition"
        />
      </div>

      {selectedProducts.length > 0 && (
        <div className="sticky top-20 z-20 mb-4">
          <button
            className="px-6 py-3 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-all"
            onClick={navigateToDetails}
          >
            Proceed with {selectedProducts.length} Requisition
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl shadow-lg shadow-blue-200 bg-white">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0 z-10 text-sm uppercase tracking-wide text-white">
            <tr>
              {["Select", "Name", "Category", "Supplier", "Stock", "Qty", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(10).fill("").map((_, idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredProducts?.length > 0 ? filteredProducts.map((product) => {
              const isSelected = selectedProducts.some((p) => p._id === product._id);
              return (
                <tr
                  key={product._id}
                  className={`transition-colors cursor-pointer ${isSelected ? "bg-blue-300/50 hover:bg-blue-400/60" : ""} ${product.stock <= 100 ? "border border-red-600" : "border border-gray-200"} rounded-lg mb-1 shadow-sm hover:shadow-md`}
                  onClick={() => handleCheckbox(product)}
                >
                  <td className="py-2 px-4 border-b text-black">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCheckbox(product)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-black font-bold">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: product.name.toUpperCase().includes("FIRE")
                          ? highlightMatches(product.name + " 🔥", search)
                          : highlightMatches(product.name, search)
                      }}
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.category || "", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.supplier || "", search) }} />
                  <td className={`py-2 px-4 border-b font-bold ${product.stock <= 100 ? "text-red-600" : "text-black"}`} dangerouslySetInnerHTML={{ __html: highlightMatches(product.stock?.toString() || "0", search) }} />
                  <td className="py-2 px-4 border-b text-black">
                    {isSelected ? (
                      <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantities[product._id] || 1}
                        onChange={(e) => handleQtyChange(product._id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-20 border rounded px-2 py-1"
                      />
                    ) : "-"}
                  </td>
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.modelNo || "N/A", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.manufacturer || "", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.uom || "PCS", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.price?.toString() || "0.00", search) }} />
                </tr>
              )
            }) : (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500 italic">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Warehouse;
*/














/*

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { products, isSuccess, isLoading } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  // Load selected products and quantities from location state
  useEffect(() => {
    if (location.state?.selectedProducts) setSelectedProducts(location.state.selectedProducts);
    if (location.state?.quantities) setQuantities(location.state.quantities);
  }, [location.state]);

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && products?.length > 0) {
      toast.success("Inventory Rendered Successfully");
      setLowStockProducts(products.filter((p) => p.stock <= 100));
    }
  }, [isSuccess, products]);

  const similarity = (s1 = "", s2 = "") => {
    s1 = s1.toString().toLowerCase();
    s2 = s2.toString().toLowerCase();
    if (!s1 || !s2) return 0;
    if (s1.includes(s2) || s2.includes(s1)) return 1;
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    const longerLength = longer.length;
    if (longerLength === 0) return 1;

    let editDistance = 0;
    const minLen = Math.min(longer.length, shorter.length);
    for (let i = 0; i < minLen; i++) if (longer[i] !== shorter[i]) editDistance++;
    editDistance += Math.abs(longer.length - shorter.length);
    return (longerLength - editDistance) / longerLength;
  };

  const highlightMatches = (text, search) => {
    if (!search) return text;
    const searchWords = search.toLowerCase().split(" ").filter(Boolean);
    let result = text;
    searchWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      result = result.replace(
        regex,
        `<span class="bg-blue-500 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
      );
    });
    return result;
  };

  const filteredProducts = !search
    ? products
    : products
        ?.map((product) => {
          const searchWords = search.toLowerCase().split(" ").filter(Boolean);
          const productFields = [
            product.name || "",
            product.modelNo || "",
            product.uom || "",
            product.category || "",
            product.location || "",
            product.supplier || "",
            product.manufacturer || "",
            (product.price?.toString()) || "",
          ];

          let score = 0;
          searchWords.forEach((word) => {
            const bestMatch = Math.max(...productFields.map((field) => similarity(field, word)));
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const handleCheckbox = (product) => {
    if (selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
      const newQuantities = { ...quantities };
      delete newQuantities[product._id];
      setQuantities(newQuantities);
    } else {
      setSelectedProducts([...selectedProducts, product]);
      setQuantities({ ...quantities, [product._id]: quantities[product._id] || 1 });
    }
  };

  const handleQtyChange = (productId, value) => {
    setQuantities({ ...quantities, [productId]: Number(value) });
  };

  const navigateToDetails = () => {
    if (selectedProducts.length === 0) return;
    navigate("/product-details", { state: { selectedProducts, quantities } });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mb-6 p-6 rounded-lg shadow-lg shadow-blue-200 bg-gradient-to-r from-blue-400 to-blue-600 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <nav className="text-sm mb-1" aria-label="Breadcrumb">
            <ol className="list-reset flex text-white/80">
              <li><Link to="/" className="hover:text-white">Dashboard</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="font-semibold">Warehouse</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-extrabold flex items-center">📦 Warehouse Inventory</h1>
          <p className="mt-1 text-white/90">Overview of all products stored in each warehouse</p>
        </div>

        <button
          className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition"
          onClick={() => setShowLowStockModal(true)}
        >
          View Low Stock ({lowStockProducts.length})
        </button>
      </div>

      <div className="mb-4 sticky top-4 z-20">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-gradient-to-r from-white via-gray-100 to-white transition"
        />
      </div>

      {selectedProducts.length > 0 && (
        <div className="sticky top-20 z-20 mb-4">
          <button
            className="px-6 py-3 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-all"
            onClick={navigateToDetails}
          >
            Proceed with {selectedProducts.length} Requisition
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl shadow-lg shadow-blue-200 bg-white">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0 z-10 text-sm uppercase tracking-wide text-white">
            <tr>
              {["Select", "Name", "Category", "Supplier", "Stock", "Qty", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(10).fill("").map((_, idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredProducts?.length > 0 ? filteredProducts.map((product) => {
              const isSelected = selectedProducts.some((p) => p._id === product._id);
              return (
                <tr
                  key={product._id}
                  className={`
                    transition-colors duration-200 cursor-pointer 
                    ${isSelected ? "bg-blue-300/40 hover:bg-blue-400/60" : "hover:bg-gray-100"} 
                    ${product.stock <= 100 ? "border border-red-600" : "border border-gray-200"} 
                    rounded-lg mb-1 shadow-sm hover:shadow-md
                  `}
                  onClick={() => handleCheckbox(product)}
                >
                  <td className="py-2 px-4 border-b text-black">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCheckbox(product)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-black font-bold">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: product.name.toUpperCase().includes("FIRE")
                          ? highlightMatches(product.name + " 🔥", search)
                          : highlightMatches(product.name, search)
                      }}
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.category || "", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.supplier || "", search) }} />
                  <td className={`py-2 px-4 border-b font-bold ${product.stock <= 100 ? "text-red-600" : "text-black"}`} dangerouslySetInnerHTML={{ __html: highlightMatches(product.stock?.toString() || "0", search) }} />

                  <td className="py-2 px-4 border-b text-black">
                    {isSelected ? (
                      <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantities[product._id] || 1}
                        onChange={(e) => handleQtyChange(product._id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-20 border rounded px-2 py-1"
                      />
                    ) : "-"}
                  </td>

                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.modelNo || "N/A", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.manufacturer || "", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.uom || "PCS", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.price?.toString() || "0.00", search) }} />
                </tr>
              )
            }) : (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500 italic">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Warehouse;
*/














/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const LOW_STOCK_THRESHOLD = 100;

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { products, isSuccess, isLoading } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  // Load selected products and quantities from location state
  useEffect(() => {
    if (location.state?.selectedProducts) setSelectedProducts(location.state.selectedProducts);
    if (location.state?.quantities) setQuantities(location.state.quantities);
  }, [location.state]);

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && products?.length > 0) {
      toast.success("Inventory Rendered Successfully");
      setLowStockProducts(products.filter((p) => p.stock <= LOW_STOCK_THRESHOLD));
    }
  }, [isSuccess, products]);

  // Close modal on ESC + lock page scroll while open
  useEffect(() => {
    if (!showLowStockModal) return;

    const onKey = (e) => {
      if (e.key === "Escape") setShowLowStockModal(false);
    };
    document.addEventListener("keydown", onKey);

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [showLowStockModal]);

  const similarity = (s1 = "", s2 = "") => {
    s1 = s1.toString().toLowerCase();
    s2 = s2.toString().toLowerCase();
    if (!s1 || !s2) return 0;
    if (s1.includes(s2) || s2.includes(s1)) return 1;
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    const longerLength = longer.length;
    if (longerLength === 0) return 1;

    let editDistance = 0;
    const minLen = Math.min(longer.length, shorter.length);
    for (let i = 0; i < minLen; i++) if (longer[i] !== shorter[i]) editDistance++;
    editDistance += Math.abs(longer.length - shorter.length);
    return (longerLength - editDistance) / longerLength;
  };

  const highlightMatches = (text, search) => {
    if (!search) return text;
    const searchWords = search.toLowerCase().split(" ").filter(Boolean);
    let result = text;
    searchWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      result = result.replace(
        regex,
        `<span class="bg-blue-500 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
      );
    });
    return result;
  };

  const filteredProducts = !search
    ? products
    : products
        ?.map((product) => {
          const searchWords = search.toLowerCase().split(" ").filter(Boolean);
          const productFields = [
            product.name || "",
            product.modelNo || "",
            product.uom || "",
            product.category || "",
            product.location || "",
            product.supplier || "",
            product.manufacturer || "",
            (product.price?.toString()) || "",
          ];

          let score = 0;
          searchWords.forEach((word) => {
            const bestMatch = Math.max(...productFields.map((field) => similarity(field, word)));
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const handleCheckbox = (product) => {
    if (selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
      const newQuantities = { ...quantities };
      delete newQuantities[product._id];
      setQuantities(newQuantities);
    } else {
      setSelectedProducts([...selectedProducts, product]);
      setQuantities({ ...quantities, [product._id]: quantities[product._id] || 1 });
    }
  };

  const handleQtyChange = (productId, value) => {
    setQuantities({ ...quantities, [productId]: Number(value) });
  };

  const navigateToDetails = () => {
    if (selectedProducts.length === 0) return;
    navigate("/product-details", { state: { selectedProducts, quantities } });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-8">
      <div className="mb-6 p-6 rounded-lg shadow-lg shadow-blue-200 bg-gradient-to-r from-blue-400 to-blue-600 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <nav className="text-sm mb-1" aria-label="Breadcrumb">
            <ol className="list-reset flex text-white/80">
              <li><Link to="/" className="hover:text-white">Dashboard</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="font-semibold">Warehouse</li>
            </ol>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center">📦 Warehouse Inventory</h1>
          <p className="mt-1 text-white/90">Overview of all products stored in each warehouse</p>
        </div>

        <button
          className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition"
          onClick={() => setShowLowStockModal(true)}
        >
          View Low Stock ({lowStockProducts.length})
        </button>
      </div>

      <div className="mb-4 sticky top-4 z-20">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-gradient-to-r from-white via-gray-100 to-white transition"
        />
      </div>

      {selectedProducts.length > 0 && (
        <div className="sticky top-20 z-20 mb-4">
          <button
            className="w-full sm:w-auto px-6 py-3 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-all"
            onClick={navigateToDetails}
          >
            Proceed with {selectedProducts.length} Requisition
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl shadow-lg shadow-blue-200 bg-white hidden sm:block">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0 z-10 text-sm uppercase tracking-wide text-white">
            <tr>
              {["Select", "Name", "Category", "Supplier", "Stock", "Qty", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(10).fill("").map((_, idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredProducts?.length > 0 ? filteredProducts.map((product) => {
              const isSelected = selectedProducts.some((p) => p._id === product._id);
              return (
                <tr
                  key={product._id}
                  className={`transition-colors duration-200 cursor-pointer 
                    ${isSelected ? "bg-blue-300/40 hover:bg-blue-400/60" : "hover:bg-gray-100"} 
                    ${product.stock <= LOW_STOCK_THRESHOLD ? "border border-red-600" : "border border-gray-200"} 
                    rounded-lg mb-1 shadow-sm hover:shadow-md
                  `}
                  onClick={() => handleCheckbox(product)}
                >
                  <td className="py-2 px-4 border-b text-black">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCheckbox(product)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-black font-bold">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: product.name.toUpperCase().includes("FIRE")
                          ? highlightMatches(product.name + " 🔥", search)
                          : highlightMatches(product.name, search)
                      }}
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.category || "", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.supplier || "", search) }} />
                  <td className={`py-2 px-4 border-b font-bold ${product.stock <= LOW_STOCK_THRESHOLD ? "text-red-600" : "text-black"}`} dangerouslySetInnerHTML={{ __html: highlightMatches(product.stock?.toString() || "0", search) }} />

                  <td className="py-2 px-4 border-b text-black">
                    {isSelected ? (
                      <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantities[product._id] || 1}
                        onChange={(e) => handleQtyChange(product._id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-20 border rounded px-2 py-1"
                      />
                    ) : "-"}
                  </td>

                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.modelNo || "N/A", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.manufacturer || "", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.uom || "PCS", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.price?.toString() || "0.00", search) }} />
                </tr>
              )
            }) : (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500 italic">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-4">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="p-4 rounded-lg shadow-md bg-gray-100 animate-pulse">
              <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
            </div>
          ))
        ) : filteredProducts?.length > 0 ? (
          filteredProducts.map((product) => {
            const isSelected = selectedProducts.some((p) => p._id === product._id);
            return (
              <div
                key={product._id}
                className={`p-4 rounded-xl shadow-md transition-colors duration-200 
                  ${isSelected ? "bg-blue-100 border-blue-400" : "bg-white border-gray-200"}
                  ${product.stock <= LOW_STOCK_THRESHOLD ? "border-red-500" : "border"} 
                `}
                onClick={() => handleCheckbox(product)}
              >
                <div className="flex justify-between items-center">
                  <h2
                    className="font-bold text-lg text-gray-800"
                    dangerouslySetInnerHTML={{
                      __html: product.name.toUpperCase().includes("FIRE")
                        ? highlightMatches(product.name + " 🔥", search)
                        : highlightMatches(product.name, search)
                    }}
                  />
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleCheckbox(product)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <p className="text-sm text-gray-600">Category: {product.category}</p>
                <p className="text-sm text-gray-600">Supplier: {product.supplier}</p>
                <p className={`text-sm font-semibold ${product.stock <= LOW_STOCK_THRESHOLD ? "text-red-600" : "text-gray-800"}`}>
                  Stock: {product.stock}
                </p>

                {isSelected && (
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantities[product._id] || 1}
                    onChange={(e) => handleQtyChange(product._id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-2 w-24 border rounded px-2 py-1 text-black text-sm"
                  />
                )}

                <div className="mt-2 text-xs text-gray-500">
                  <p>Model: {product.modelNo || "N/A"}</p>
                  <p>Manufacturer: {product.manufacturer || "N/A"}</p>
                  <p>UOM: {product.uom || "PCS"}</p>
                  <p>Price: ${product.price?.toFixed(2)}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 italic">No products found.</p>
        )}
      </div>

      {showLowStockModal && (
        <div
          className="fixed inset-0 z-50"
          aria-modal="true"
          role="dialog"
          aria-labelledby="low-stock-title"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowLowStockModal(false)}
          />
          <div className="absolute inset-x-0 top-[10%] mx-auto w-11/12 sm:w-[640px]">
            <div className="bg-white rounded-2xl shadow-2xl p-5 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <h2 id="low-stock-title" className="text-xl font-bold text-red-600">
                  ⚠️ Low Stock Products ({lowStockProducts.length})
                </h2>
                <button
                  className="h-9 w-9 bg-red-500 inline-flex items-center justify-center rounded-full hover:bg-red-900 text-2xl leading-none"
                  onClick={() => setShowLowStockModal(false)}
                  aria-label="Close"
                  title="Close"
                >
                  &times;
                </button>
              </div>

              {lowStockProducts.length > 0 ? (
                <ul className="space-y-3">
                  {lowStockProducts
                    .slice()
                    .sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0))
                    .map((p) => (
                      <li
                        key={p._id}
                        className="p-3 border rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:bg-red-50"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 truncate">{p.name}</p>
                          <p className="text-sm text-gray-600">
                            Category: {p.category || "N/A"} • Supplier: {p.supplier || "N/A"}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-red-600 font-bold">Stock: {p.stock}</span>
                        </div>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-gray-600 italic">No low stock products 🎉</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warehouse;
*/










/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const LOW_STOCK_THRESHOLD = 100;

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { products, isSuccess, isLoading } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  // Load selected products and quantities from location state
  useEffect(() => {
    if (location.state?.selectedProducts) setSelectedProducts(location.state.selectedProducts);
    if (location.state?.quantities) setQuantities(location.state.quantities);
  }, [location.state]);

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && products?.length > 0) {
      toast.success("Inventory Rendered Successfully");
      setLowStockProducts(products.filter((p) => p.stock <= LOW_STOCK_THRESHOLD));
    }
  }, [isSuccess, products]);

  useEffect(() => {
    if (!showLowStockModal) return;

    const onKey = (e) => {
      if (e.key === "Escape") setShowLowStockModal(false);
    };
    document.addEventListener("keydown", onKey);

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [showLowStockModal]);

  const similarity = (s1 = "", s2 = "") => {
    s1 = s1.toString().toLowerCase();
    s2 = s2.toString().toLowerCase();
    if (!s1 || !s2) return 0;
    if (s1.includes(s2) || s2.includes(s1)) return 1;
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    const longerLength = longer.length;
    if (longerLength === 0) return 1;

    let editDistance = 0;
    const minLen = Math.min(longer.length, shorter.length);
    for (let i = 0; i < minLen; i++) if (longer[i] !== shorter[i]) editDistance++;
    editDistance += Math.abs(longer.length - shorter.length);
    return (longerLength - editDistance) / longerLength;
  };

  const highlightMatches = (text, search) => {
    if (!search) return text;
    const searchWords = search.toLowerCase().split(" ").filter(Boolean);
    let result = text;
    searchWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      result = result.replace(
        regex,
        `<span class="bg-blue-500 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
      );
    });
    return result;
  };

  const filteredProducts = !search
    ? products
    : products
        ?.map((product) => {
          const searchWords = search.toLowerCase().split(" ").filter(Boolean);
          const productFields = [
            product.name || "",
            product.modelNo || "",
            product.uom || "",
            product.category || "",
            product.location || "",
            product.supplier || "",
            product.manufacturer || "",
            (product.price?.toString()) || "",
          ];

          let score = 0;
          searchWords.forEach((word) => {
            const bestMatch = Math.max(...productFields.map((field) => similarity(field, word)));
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const handleCheckbox = (product) => {
    if (selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
      const newQuantities = { ...quantities };
      delete newQuantities[product._id];
      setQuantities(newQuantities);
    } else {
      setSelectedProducts([...selectedProducts, product]);
      setQuantities({ ...quantities, [product._id]: quantities[product._id] ?? 1 });
    }
  };

  const handleQtyChange = (productId, value) => {
    if (value === "") {
      setQuantities({ ...quantities, [productId]: "" });
    } else {
      const num = Number(value);
      if (!isNaN(num)) setQuantities({ ...quantities, [productId]: num });
    }
  };

  const navigateToDetails = () => {
    if (selectedProducts.length === 0) return;
    navigate("/product-details", { state: { selectedProducts, quantities } });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-8">
      <div className="mb-6 p-6 rounded-lg shadow-lg shadow-blue-200 bg-gradient-to-r from-blue-400 to-blue-600 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <nav className="text-sm mb-1" aria-label="Breadcrumb">
            <ol className="list-reset flex text-white/80">
              <li><Link to="/" className="hover:text-white">Dashboard</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="font-semibold">Warehouse</li>
            </ol>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center">📦 Warehouse Inventory</h1>
          <p className="mt-1 text-white/90">Overview of all products stored in each warehouse</p>
        </div>

        <button
          className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition"
          onClick={() => setShowLowStockModal(true)}
        >
          View Low Stock ({lowStockProducts.length})
        </button>
      </div>

      <div className="mb-4 sticky top-4 z-20">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-gradient-to-r from-white via-gray-100 to-white transition"
        />
      </div>

      {selectedProducts.length > 0 && (
        <div className="sticky top-20 z-20 mb-4">
          <button
            className="w-full sm:w-auto px-6 py-3 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-all"
            onClick={navigateToDetails}
          >
            Proceed with {selectedProducts.length} Requisition
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl shadow-lg shadow-blue-200 bg-white hidden sm:block">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0 z-10 text-sm uppercase tracking-wide text-white">
            <tr>
              {["Select", "Name", "Category", "Supplier", "Stock", "Qty", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(10).fill("").map((_, idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredProducts?.length > 0 ? filteredProducts.map((product) => {
              const isSelected = selectedProducts.some((p) => p._id === product._id);
              return (
                <tr
                  key={product._id}
                  className={`transition-colors duration-200 cursor-pointer 
                    ${isSelected ? "bg-blue-300/40 hover:bg-blue-400/60" : "hover:bg-gray-100"} 
                    ${product.stock <= LOW_STOCK_THRESHOLD ? "border border-red-600" : "border border-gray-200"} 
                    rounded-lg mb-1 shadow-sm hover:shadow-md
                  `}
                  onClick={() => handleCheckbox(product)}
                >
                  <td className="py-2 px-4 border-b text-black">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCheckbox(product)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-black font-bold">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: product.name.toUpperCase().includes("FIRE")
                          ? highlightMatches(product.name + " 🔥", search)
                          : highlightMatches(product.name, search)
                      }}
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.category || "", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.supplier || "", search) }} />
                  <td className={`py-2 px-4 border-b font-bold ${product.stock <= LOW_STOCK_THRESHOLD ? "text-red-600" : "text-black"}`} dangerouslySetInnerHTML={{ __html: highlightMatches(product.stock?.toString() || "0", search) }} />

                  <td className="py-2 px-4 border-b text-black">
                    {isSelected ? (
                      <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantities[product._id] !== undefined ? quantities[product._id] : 1}
                        onChange={(e) => handleQtyChange(product._id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-20 border rounded px-2 py-1"
                      />
                    ) : "-"}
                  </td>

                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.modelNo || "N/A", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.manufacturer || "", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.uom || "PCS", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.price?.toString() || "0.00", search) }} />
                </tr>
              )
            }) : (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500 italic">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-4">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="p-4 rounded-lg shadow-md bg-gray-100 animate-pulse">
              <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
            </div>
          ))
        ) : filteredProducts?.length > 0 ? (
          filteredProducts.map((product) => {
            const isSelected = selectedProducts.some((p) => p._id === product._id);
            return (
              <div
                key={product._id}
                className={`p-4 rounded-xl shadow-md transition-colors duration-200 
                  ${isSelected ? "bg-blue-100 border-blue-400" : "bg-white border-gray-200"}
                  ${product.stock <= LOW_STOCK_THRESHOLD ? "border-red-500" : "border"} 
                `}
                onClick={() => handleCheckbox(product)}
              >
                <div className="flex justify-between items-center">
                  <h2
                    className="font-bold text-lg text-gray-800"
                    dangerouslySetInnerHTML={{
                      __html: product.name.toUpperCase().includes("FIRE")
                        ? highlightMatches(product.name + " 🔥", search)
                        : highlightMatches(product.name, search)
                    }}
                  />
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleCheckbox(product)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <p className="text-sm text-gray-600">Category: {product.category}</p>
                <p className="text-sm text-gray-600">Supplier: {product.supplier}</p>
                <p className={`text-sm font-semibold ${product.stock <= LOW_STOCK_THRESHOLD ? "text-red-600" : "text-gray-800"}`}>
                  Stock: {product.stock}
                </p>

                {isSelected && (
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantities[product._id] !== undefined ? quantities[product._id] : 1}
                    onChange={(e) => handleQtyChange(product._id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-2 w-24 border rounded px-2 py-1 text-black text-sm"
                  />
                )}

                <div className="mt-2 text-xs text-gray-500">
                  <p>Model: {product.modelNo || "N/A"}</p>
                  <p>Manufacturer: {product.manufacturer || "N/A"}</p>
                  <p>UOM: {product.uom || "PCS"}</p>
                  <p>Price: ${product.price?.toFixed(2)}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 italic">No products found.</p>
        )}
      </div>

      {showLowStockModal && (
        <div
          className="fixed inset-0 z-50"
          aria-modal="true"
          role="dialog"
          aria-labelledby="low-stock-title"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowLowStockModal(false)}
          />
          <div className="absolute inset-x-0 top-[10%] mx-auto w-11/12 sm:w-[640px]">
            <div className="bg-white rounded-2xl shadow-2xl p-5 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <h2 id="low-stock-title" className="text-xl font-bold text-red-600">
                  ⚠️ Low Stock Products ({lowStockProducts.length})
                </h2>
                <button
                  className="h-9 w-9 bg-red-500 inline-flex items-center justify-center rounded-full hover:bg-red-900 text-2xl leading-none"
                  onClick={() => setShowLowStockModal(false)}
                  aria-label="Close"
                  title="Close"
                >
                  &times;
                </button>
              </div>

              {lowStockProducts.length > 0 ? (
                <ul className="space-y-3">
                  {lowStockProducts
                    .slice()
                    .sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0))
                    .map((p) => (
                      <li
                        key={p._id}
                        className="p-3 border rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:bg-red-50"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 truncate">{p.name}</p>
                          <p className="text-sm text-gray-600">
                            Category: {p.category || "N/A"} • Supplier: {p.supplier || "N/A"}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-red-600 font-bold">Stock: {p.stock}</span>
                        </div>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-gray-600 italic">No low stock products 🎉</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warehouse;

*/














/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const LOW_STOCK_THRESHOLD = 100;

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { products, isSuccess, isLoading } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    if (location.state?.selectedProducts) setSelectedProducts(location.state.selectedProducts);
    if (location.state?.quantities) setQuantities(location.state.quantities);
  }, [location.state]);

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && products?.length > 0) {
      toast.success("Inventory Rendered Successfully");
      setLowStockProducts(products.filter((p) => p.stock <= LOW_STOCK_THRESHOLD));
    }
  }, [isSuccess, products]);

  useEffect(() => {
    if (!showLowStockModal) return;

    const onKey = (e) => {
      if (e.key === "Escape") setShowLowStockModal(false);
    };
    document.addEventListener("keydown", onKey);

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [showLowStockModal]);

  const similarity = (s1 = "", s2 = "") => {
    s1 = s1.toString().toLowerCase();
    s2 = s2.toString().toLowerCase();
    if (!s1 || !s2) return 0;
    if (s1.includes(s2) || s2.includes(s1)) return 1;
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    const longerLength = longer.length;
    if (longerLength === 0) return 1;

    let editDistance = 0;
    const minLen = Math.min(longer.length, shorter.length);
    for (let i = 0; i < minLen; i++) if (longer[i] !== shorter[i]) editDistance++;
    editDistance += Math.abs(longer.length - shorter.length);
    return (longerLength - editDistance) / longerLength;
  };

  const highlightMatches = (text, search) => {
    if (!search) return text;
    const searchWords = search.toLowerCase().split(" ").filter(Boolean);
    let result = text;
    searchWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      result = result.replace(
        regex,
        `<span class="bg-blue-500 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
      );
    });
    return result;
  };

  const filteredProducts = !search
    ? products
    : products
        ?.map((product) => {
          const searchWords = search.toLowerCase().split(" ").filter(Boolean);
          const productFields = [
            product.name || "",
            product.modelNo || "",
            product.uom || "",
            product.category || "",
            product.location || "",
            product.supplier || "",
            product.manufacturer || "",
            (product.price?.toString()) || "",
          ];

          let score = 0;
          searchWords.forEach((word) => {
            const bestMatch = Math.max(...productFields.map((field) => similarity(field, word)));
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const handleCheckbox = (product) => {
    if (selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
      const newQuantities = { ...quantities };
      delete newQuantities[product._id];
      setQuantities(newQuantities);
    } else {
      setSelectedProducts([...selectedProducts, product]);
      setQuantities({ ...quantities, [product._id]: quantities[product._id] ?? 1 });
    }
  };

  const handleQtyChange = (productId, value) => {
    if (value === "") {
      setQuantities({ ...quantities, [productId]: "" });
    } else {
      const num = Number(value);
      if (!isNaN(num)) setQuantities({ ...quantities, [productId]: num });
    }
  };

  const navigateToDetails = () => {
    if (selectedProducts.length === 0) return;
    navigate("/product-details", { state: { selectedProducts, quantities } });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-8">
      <div className="mb-6 p-6 rounded-lg shadow-lg shadow-blue-200 bg-gradient-to-r from-blue-400 to-blue-600 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <nav className="text-sm mb-1" aria-label="Breadcrumb">
            <ol className="list-reset flex text-white/80">
              <li><Link to="/" className="hover:text-white">Dashboard</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="font-semibold">Warehouse</li>
            </ol>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center">📦 Warehouse Inventory</h1>
          <p className="mt-1 text-white/90">Overview of all products stored in each warehouse</p>
        </div>

        <button
          className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition"
          onClick={() => setShowLowStockModal(true)}
        >
          View Low Stock ({lowStockProducts.length})
        </button>
      </div>

      <div className="mb-4 sticky top-4 z-20">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-lg shadow-md border-2  border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-gradient-to-r from-white via-gray-100 to-white transition"
        />
      </div>

      {selectedProducts.length > 0 && (
        <div className="sticky top-20 z-20 mb-4">
          <button
            className="w-full sm:w-auto px-6 py-3 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-all"
            onClick={navigateToDetails}
          >
            Proceed with {selectedProducts.length} Requisition
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl shadow-lg shadow-blue-200 bg-white hidden sm:block">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0 z-10 text-sm uppercase tracking-wide text-white">
            <tr>
              {["Select", "Name", "Category", "Supplier", "Stock", "Qty", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(10).fill("").map((_, idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredProducts?.length > 0 ? filteredProducts.map((product) => {
              const isSelected = selectedProducts.some((p) => p._id === product._id);
              return (
                <tr
                  key={product._id}
                  className={`transition-colors duration-200 cursor-pointer 
                    ${isSelected ? "bg-blue-300/40 hover:bg-blue-400/60" : "hover:bg-gray-100"} 
                    ${product.stock <= LOW_STOCK_THRESHOLD ? "border border-red-600" : "border border-gray-200"} 
                    rounded-lg mb-1 shadow-sm hover:shadow-md
                  `}
                  onClick={() => handleCheckbox(product)}
                >
                  <td className="py-2 px-4 border-b text-black">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCheckbox(product)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-black font-bold">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: product.name.toUpperCase().includes("FIRE")
                          ? highlightMatches(product.name + " 🔥", search)
                          : highlightMatches(product.name, search)
                      }}
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.category || "", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.supplier || "", search) }} />
                  <td className={`py-2 px-4 border-b font-bold ${product.stock <= LOW_STOCK_THRESHOLD ? "text-red-600" : "text-black"}`} dangerouslySetInnerHTML={{ __html: highlightMatches(product.stock?.toString() || "0", search) }} />

                  <td className="py-2 px-4 border-b text-black">
                    {isSelected ? (
                      <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantities[product._id] !== undefined ? quantities[product._id] : 1}
                        onChange={(e) => handleQtyChange(product._id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-20 border rounded px-2 py-1"
                      />
                    ) : "-"}
                  </td>

                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.modelNo || "N/A", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.manufacturer || "", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.uom || "PCS", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.price?.toString() || "0.00", search) }} />
                </tr>
              )
            }) : (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500 italic">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-4">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="p-4 rounded-lg shadow-md bg-gray-100 animate-pulse border-gradient-to-r from-orange-400 via-blue-500 to-purple-500   ">
              <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
            </div>
          ))
        ) : filteredProducts?.length > 0 ? (
          filteredProducts.map((product) => {
            const isSelected = selectedProducts.some((p) => p._id === product._id);
            return (
              <div
                key={product._id}
                className={`p-4 rounded-xl shadow-md transition-colors duration-200 
                  border-2 border-gradient-to-r from-orange-400 via-blue-500 to-purple-500   
                  ${isSelected ? "bg-blue-100" : "bg-white"}
                  ${product.stock <= LOW_STOCK_THRESHOLD ? "border-gradient-to-r from-orange-400 via-blue-500 to-purple-500  " : ""} 
                `}
                onClick={() => handleCheckbox(product)}
              >
                <div className="flex justify-between items-center">
                  <h2
                    className="font-bold text-lg text-gray-800"
                    dangerouslySetInnerHTML={{
                      __html: product.name.toUpperCase().includes("FIRE")
                        ? highlightMatches(product.name + " 🔥", search)
                        : highlightMatches(product.name, search)
                    }}
                  />
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleCheckbox(product)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <p className="text-sm text-gray-600">Category: {product.category}</p>
                <p className="text-sm text-gray-600">Supplier: {product.supplier}</p>
                <p className={`text-sm font-semibold ${product.stock <= LOW_STOCK_THRESHOLD ? "text-red-600" : "text-gray-800"}`}>
                  Stock: {product.stock}
                </p>

                {isSelected && (
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantities[product._id] !== undefined ? quantities[product._id] : 1}
                    onChange={(e) => handleQtyChange(product._id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-2 w-24 border rounded px-2 py-1 text-black text-sm"
                  />
                )}

                <div className="mt-2 text-xs text-gray-500">
                  <p>Model: {product.modelNo || "N/A"}</p>
                  <p>Manufacturer: {product.manufacturer || "N/A"}</p>
                  <p>UOM: {product.uom || "PCS"}</p>
                  <p>Price: ${product.price?.toFixed(2)}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 italic">No products found.</p>
        )}
      </div>

      {showLowStockModal && (
        <div
          className="fixed inset-0 z-50"
          aria-modal="true"
          role="dialog"
          aria-labelledby="low-stock-title"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowLowStockModal(false)}
          />
          <div className="absolute inset-x-0 top-[10%] mx-auto w-11/12 sm:w-[640px]">
            <div className="bg-white rounded-2xl shadow-2xl p-5 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <h2 id="low-stock-title" className="text-xl font-bold text-red-600">
                  ⚠️ Low Stock Products ({lowStockProducts.length})
                </h2>
                <button
                  className="h-9 w-9 bg-red-500 inline-flex items-center justify-center rounded-full hover:bg-red-900 text-2xl leading-none"
                  onClick={() => setShowLowStockModal(false)}
                  aria-label="Close"
                  title="Close"
                >
                  &times;
                </button>
              </div>

              {lowStockProducts.length > 0 ? (
                <ul className="space-y-3">
                  {lowStockProducts
                    .slice()
                    .sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0))
                    .map((p) => (
                      <li
                        key={p._id}
                        className="p-3 border rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:bg-red-50"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 truncate">{p.name}</p>
                          <p className="text-sm text-gray-600">
                            Category: {p.category || "N/A"} • Supplier: {p.supplier || "N/A"}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-red-600 font-bold">Stock: {p.stock}</span>
                        </div>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-gray-600 italic">No low stock products 🎉</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warehouse;
*/







import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getProducts } from "../../redux/productSlice";

const LOW_STOCK_THRESHOLD = 100;

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { products, isSuccess, isLoading } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  useEffect(() => {
    if (location.state?.selectedProducts) setSelectedProducts(location.state.selectedProducts);
    if (location.state?.quantities) setQuantities(location.state.quantities);
  }, [location.state]);

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && products?.length > 0) {
      setShowSuccessNotification(true);
      setLowStockProducts(products.filter((p) => p.stock <= LOW_STOCK_THRESHOLD));

      // Auto-dismiss notification
      const timer = setTimeout(() => setShowSuccessNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, products]);

  useEffect(() => {
    if (!showLowStockModal) return;

    const onKey = (e) => {
      if (e.key === "Escape") setShowLowStockModal(false);
    };
    document.addEventListener("keydown", onKey);

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [showLowStockModal]);

  const similarity = (s1 = "", s2 = "") => {
    s1 = s1.toString().toLowerCase();
    s2 = s2.toString().toLowerCase();
    if (!s1 || !s2) return 0;
    if (s1.includes(s2) || s2.includes(s1)) return 1;
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    const longerLength = longer.length;
    if (longerLength === 0) return 1;

    let editDistance = 0;
    const minLen = Math.min(longer.length, shorter.length);
    for (let i = 0; i < minLen; i++) if (longer[i] !== shorter[i]) editDistance++;
    editDistance += Math.abs(longer.length - shorter.length);
    return (longerLength - editDistance) / longerLength;
  };

  const highlightMatches = (text, search) => {
    if (!search) return text;
    const searchWords = search.toLowerCase().split(" ").filter(Boolean);
    let result = text;
    searchWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      result = result.replace(
        regex,
        `<span class="bg-blue-500 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
      );
    });
    return result;
  };

  const filteredProducts = !search
    ? products
    : products
        ?.map((product) => {
          const searchWords = search.toLowerCase().split(" ").filter(Boolean);
          const productFields = [
            product.name || "",
            product.modelNo || "",
            product.uom || "",
            product.category || "",
            product.location || "",
            product.supplier || "",
            product.manufacturer || "",
            (product.price?.toString()) || "",
          ];

          let score = 0;
          searchWords.forEach((word) => {
            const bestMatch = Math.max(...productFields.map((field) => similarity(field, word)));
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const handleCheckbox = (product) => {
    if (selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
      const newQuantities = { ...quantities };
      delete newQuantities[product._id];
      setQuantities(newQuantities);
    } else {
      setSelectedProducts([...selectedProducts, product]);
      setQuantities({ ...quantities, [product._id]: quantities[product._id] ?? 1 });
    }
  };

  const handleQtyChange = (productId, value) => {
    if (value === "") {
      setQuantities({ ...quantities, [productId]: "" });
    } else {
      const num = Number(value);
      if (!isNaN(num)) setQuantities({ ...quantities, [productId]: num });
    }
  };

  const navigateToDetails = () => {
    if (selectedProducts.length === 0) return;
    navigate("/product-details", { state: { selectedProducts, quantities } });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-8 relative">

      {/* Success Notification */}
      {showSuccessNotification && (
        <div className="fixed top-6 right-6 z-50 animate-fadeInDown bg-gradient-to-r from-blue-500 to-slate-400 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 pointer-events-auto max-w-sm">
          <span className="text-2xl">📦</span>
          <span className="font-semibold text-lg flex-1">Inventory Rendered Successfully</span>
          <button
            className="ml-4 text-slate-900 font-bold bg-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-slate-200 transition"
            onClick={() => setShowSuccessNotification(false)}
            aria-label="Close Notification"
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 p-6 rounded-lg shadow-lg shadow-blue-200 bg-gradient-to-r from-blue-400 to-blue-600 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <nav className="text-sm mb-1" aria-label="Breadcrumb">
            <ol className="list-reset flex text-white/80">
              <li><Link to="/" className="hover:text-white">Dashboard</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="font-semibold">Warehouse</li>
            </ol>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center">📦 Warehouse Inventory</h1>
          <p className="mt-1 text-white/90">Overview of all products stored in each warehouse</p>
        </div>

        <button
          className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition"
          onClick={() => setShowLowStockModal(true)}
        >
          View Low Stock ({lowStockProducts.length})
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 sticky top-4 z-20">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-lg shadow-md border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-gradient-to-r from-white via-gray-100 to-white transition"
        />
      </div>

      {/* Requisition Button */}
      {selectedProducts.length > 0 && (
        <div className="sticky top-20 z-20 mb-4">
          <button
            className="w-full sm:w-auto px-6 py-3 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-all"
            onClick={navigateToDetails}
          >
            Proceed with {selectedProducts.length} Requisition
          </button>
        </div>
      )}

      {/* Product Table (Desktop) */}
      <div className="overflow-x-auto rounded-xl shadow-lg shadow-blue-200 bg-white hidden sm:block">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0 z-10 text-sm uppercase tracking-wide text-white">
            <tr>
              {["Select", "Name", "Category", "Supplier", "Stock", "Qty", "Model No", "Manufacturer", "UOM", "Price"].map((title) => (
                <th key={title} className="py-3 px-4 border-b border-gray-200 font-semibold">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array(10).fill("").map((_, idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredProducts?.length > 0 ? filteredProducts.map((product) => {
              const isSelected = selectedProducts.some((p) => p._id === product._id);
              return (
                <tr
                  key={product._id}
                  className={`transition-colors duration-200 cursor-pointer 
                    ${isSelected ? "bg-blue-300/40 hover:bg-blue-400/60" : "hover:bg-gray-100"} 
                    ${product.stock <= LOW_STOCK_THRESHOLD ? "border border-red-600" : "border border-gray-200"} 
                    rounded-lg mb-1 shadow-sm hover:shadow-md
                  `}
                  onClick={() => handleCheckbox(product)}
                >
                  <td className="py-2 px-4 border-b text-black">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCheckbox(product)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-black font-bold">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: product.name.toUpperCase().includes("FIRE")
                          ? highlightMatches(product.name + " 🔥", search)
                          : highlightMatches(product.name, search)
                      }}
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.category || "", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.supplier || "", search) }} />
                  <td className={`py-2 px-4 border-b font-bold ${product.stock <= LOW_STOCK_THRESHOLD ? "text-red-600" : "text-black"}`} dangerouslySetInnerHTML={{ __html: highlightMatches(product.stock?.toString() || "0", search) }} />
                  <td className="py-2 px-4 border-b text-black">
                    {isSelected ? (
                      <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantities[product._id] !== undefined ? quantities[product._id] : 1}
                        onChange={(e) => handleQtyChange(product._id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-20 border rounded px-2 py-1"
                      />
                    ) : "-"}
                  </td>
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.modelNo || "N/A", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.manufacturer || "", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.uom || "PCS", search) }} />
                  <td className="py-2 px-4 border-b text-black" dangerouslySetInnerHTML={{ __html: highlightMatches(product.price?.toString() || "0.00", search) }} />
                </tr>
              )
            }) : (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500 italic">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="p-4 rounded-lg shadow-md bg-gray-100 animate-pulse border-gradient-to-r from-orange-400 via-blue-500 to-purple-500">
              <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
            </div>
          ))
        ) : filteredProducts?.length > 0 ? (
          filteredProducts.map((product) => {
            const isSelected = selectedProducts.some((p) => p._id === product._id);
            return (
              <div
                key={product._id}
                className={`p-4 rounded-xl shadow-md transition-colors duration-200 
                  border-2 border-gradient-to-r from-orange-400 via-blue-500 to-purple-500   
                  ${isSelected ? "bg-blue-100" : "bg-white"}
                  ${product.stock <= LOW_STOCK_THRESHOLD ? "border-gradient-to-r from-orange-400 via-blue-500 to-purple-500" : ""} 
                `}
                onClick={() => handleCheckbox(product)}
              >
                <div className="flex justify-between items-center">
                  <h2
                    className="font-bold text-lg text-gray-800"
                    dangerouslySetInnerHTML={{
                      __html: product.name.toUpperCase().includes("FIRE")
                        ? highlightMatches(product.name + " 🔥", search)
                        : highlightMatches(product.name, search)
                    }}
                  />
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleCheckbox(product)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <p className="text-sm text-gray-600">Category: {product.category}</p>
                <p className="text-sm text-gray-600">Supplier: {product.supplier}</p>
                <p className={`text-sm font-semibold ${product.stock <= LOW_STOCK_THRESHOLD ? "text-red-600" : "text-gray-800"}`}>
                  Stock: {product.stock}
                </p>

                {isSelected && (
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantities[product._id] !== undefined ? quantities[product._id] : 1}
                    onChange={(e) => handleQtyChange(product._id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-2 w-24 border rounded px-2 py-1 text-black text-sm"
                  />
                )}

                <div className="mt-2 text-xs text-gray-500">
                  <p>Model: {product.modelNo || "N/A"}</p>
                  <p>Manufacturer: {product.manufacturer || "N/A"}</p>
                  <p>UOM: {product.uom || "PCS"}</p>
                  <p>Price: ${product.price?.toFixed(2)}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 italic">No products found.</p>
        )}
      </div>

      {/* Low Stock Modal */}
      {showLowStockModal && (
        <div className="fixed inset-0 z-50" aria-modal="true" role="dialog" aria-labelledby="low-stock-title">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowLowStockModal(false)} />
          <div className="absolute inset-x-0 top-[10%] mx-auto w-11/12 sm:w-[640px]">
            <div className="bg-white rounded-2xl shadow-2xl p-5 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <h2 id="low-stock-title" className="text-xl font-bold text-red-600">
                  ⚠️ Low Stock Products ({lowStockProducts.length})
                </h2>
                <button
                  className="h-9 w-9 bg-red-500 inline-flex items-center justify-center rounded-full hover:bg-red-900 text-2xl leading-none"
                  onClick={() => setShowLowStockModal(false)}
                  aria-label="Close"
                  title="Close"
                >
                  &times;
                </button>
              </div>

              {lowStockProducts.length > 0 ? (
                <ul className="space-y-3">
                  {lowStockProducts
                    .slice()
                    .sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0))
                    .map((p) => (
                      <li
                        key={p._id}
                        className="p-3 border rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:bg-red-50"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 truncate">{p.name}</p>
                          <p className="text-sm text-gray-600">
                            Category: {p.category || "N/A"} • Supplier: {p.supplier || "N/A"}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-red-600 font-bold">Stock: {p.stock}</span>
                        </div>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-gray-600 italic">No low stock products 🎉</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warehouse;

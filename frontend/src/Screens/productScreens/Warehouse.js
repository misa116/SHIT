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

// frontend/src/Screens/productScreens/Warehouse.js
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
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Redirect if not logged in
  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  // Fetch products on mount
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Handle success / error messages
  useEffect(() => {
    if (isSuccess) toast.success("Inventory Rendered Successfully");
    if (isError) toast.error(message || "Failed to fetch products");
  }, [isSuccess, isError, message]);

  // Handle product selection
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

  // Filter products by search
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
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-8">
      {/* Breadcrumb + Title */}
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

      {/* Search Bar */}
      <div className="mb-4 sticky top-4 z-20">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 border-2 border-blue-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white transition"
        />
      </div>

      {/* Requisition Button */}
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

      {/* Table / Card Layout */}
      {isLoading ? (
        // Skeleton loader
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse p-4 bg-white rounded-xl shadow-md"></div>
          ))}
        </div>
      ) : filteredProducts?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-lg">{product.name}</h2>
                <input
                  type="checkbox"
                  checked={selectedProducts.some((p) => p._id === product._id)}
                  onChange={() => handleCheckbox(product)}
                />
              </div>
              <p className="text-gray-600">
                <span className="font-semibold">Category:</span> {product.category || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Supplier:</span> {product.supplier || "N/A"}
              </p>
              <p className={`text-gray-600 ${product.stock < 100 ? "text-red-600 font-bold" : ""}`}>
                <span className="font-semibold">Stock:</span> {product.stock}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Model No:</span> {product.modelNo || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Manufacturer:</span> {product.manufacturer || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">UOM:</span> {product.uom || "PCS"}
              </p>
              <p className="text-gray-800 font-bold mt-2">
                ${product?.price?.toFixed(2) || "0.00"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 italic mt-8">No products found.</p>
      )}
    </div>
  );
};

export default Warehouse;

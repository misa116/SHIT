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
      {/* Breadcrumb / Page Header */}
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

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white transition"
        />
      </div>

      {/* Table */}
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

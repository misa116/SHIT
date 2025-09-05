

/*
 import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, Uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  const filteredProducts = products?.filter((product) =>
    [product.name, product.modelNo, product.uom, product.category]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-6">
      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="flex flex-wrap items-center justify-start gap-4 mb-6">
        <button
          onClick={() => setOpenCategoryModal(true)}
          disabled={userInfo && !userInfo.isAdmin}
          className="bg-orange-600 text-white px-5 py-2 rounded-full hover:bg-orange-500 flex flex-col items-center shadow-lg transition"
        >
          + Add Category
          <span className="mt-1 text-sm font-semibold">{categories?.length}</span>
        </button>

        <button
          onClick={() => setOpenProductModal(true)}
          disabled={userInfo && !userInfo.isAdmin}
          className="bg-blue-700 text-white px-5 py-2 rounded-full hover:bg-blue-500 flex flex-col items-center shadow-lg transition"
        >
          + Add Product
          <span className="mt-1 text-sm font-semibold">{products?.length}</span>
        </button>

        <button
          onClick={() => setOpenUomModal(true)}
          disabled={userInfo && !userInfo.isAdmin}
          className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-500 flex flex-col items-center shadow-lg transition"
        >
          + Add UOM
          <span className="mt-1 text-sm font-semibold">{Uom?.length}</span>
        </button>
      </div>

      <input
        type="text"
        placeholder="Search Name, ModelNo, Category or UOM"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-left text-gray-200 bg-gray-800 border-collapse">
              <thead className="bg-gray-900 text-gray-200 uppercase">
                <tr>
                  {["NAME", "CATEGORY", "SUPPLIER", "STOCK", "MODEL NO", "MANUFACTURER", "UOM", "EDIT", "DELETE"].map((head) => (
                    <th key={head} className="py-3 px-4 border-b border-gray-700">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentProducts?.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-700 transition-colors">
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">{product.category}</td>
                    <td className="py-2 px-4 border-b">{product.supplier}</td>
                    <td className="py-2 px-4 border-b">{product.stock}</td>
                    <td className="py-2 px-4 border-b">{product.modelNo || "N/A"}</td>
                    <td className="py-2 px-4 border-b">{product.manufacturer}</td>
                    <td className="py-2 px-4 border-b">{product.uom || "PCS"}</td>
                    <td className="py-2 px-4 border-b">
                      <Link to={`/edit/${product._id}`}>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => deleteProductHandler(product._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
/*/



































/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, Uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  const filteredProducts = products?.filter((product) =>
    [product.name, product.modelNo, product.uom, product.category]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-6">

      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg
                      bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                      p-[2px]
                      relative
                      shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]"
      >
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="mb-6 space-y-4">

        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition flex flex-col items-center shadow-md"
            >
              + Add Category
              <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{categories?.length}</span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition flex flex-col items-center shadow-md"
            >
              + Add UOM
              <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{Uom?.length}</span>
            </button>
          </div>
        </div>

        <div>
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg flex flex-col items-center"
          >
            + Add Product
            <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{products?.length}</span>
          </button>
        </div>

      </div>

      <input
        type="text"
        placeholder="Search Name, ModelNo, Category or UOM"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-left text-gray-200 bg-gray-800 border-collapse">
              <thead className="bg-gray-900 text-gray-200 uppercase">
                <tr>
                  {["NAME", "CATEGORY", "SUPPLIER", "STOCK", "MODEL NO", "MANUFACTURER", "UOM", "EDIT", "DELETE"].map((head) => (
                    <th key={head} className="py-3 px-4 border-b border-gray-700">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentProducts?.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-700 transition-colors">
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">{product.category}</td>
                    <td className="py-2 px-4 border-b">{product.supplier}</td>
                    <td className="py-2 px-4 border-b">{product.stock}</td>
                    <td className="py-2 px-4 border-b">{product.modelNo || "N/A"}</td>
                    <td className="py-2 px-4 border-b">{product.manufacturer}</td>
                    <td className="py-2 px-4 border-b">{product.uom || "PCS"}</td>
                    <td className="py-2 px-4 border-b">
                      <Link to={`/edit/${product._id}`}>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => deleteProductHandler(product._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
/*/


/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isLoading, isError, message } = useSelector((state) => state.products);
  const { categories, Uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  const filteredProducts = products?.filter((product) =>
    [product.name, product.modelNo, product.uom, product.category]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-6 bg-gray-900 min-h-screen text-gray-200">

      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg
                      bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                      p-[2px]
                      relative
                      shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]"
      >
        <div className="bg-gray-800 rounded-lg py-4 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-wide">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="mb-6 space-y-4">

        <div>
          <p className="text-gray-300 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="px-5 py-2 rounded-lg bg-orange-500 text-white 
                         hover:bg-gradient-to-r hover:from-orange-400 hover:to-yellow-400 
                         hover:shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(255,200,0,0.6)]
                         transition transform hover:scale-105 flex flex-col items-center shadow-md"
            >
              + Add Category
              <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{categories?.length}</span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="px-5 py-2 rounded-lg bg-green-500 text-white 
                         hover:bg-gradient-to-r hover:from-green-400 hover:to-teal-400 
                         hover:shadow-[0_0_12px_rgba(0,255,0,0.6),0_0_15px_rgba(0,200,0,0.5)]
                         transition transform hover:scale-105 flex flex-col items-center shadow-md"
            >
              + Add UOM
              <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{Uom?.length}</span>
            </button>
          </div>
        </div>

        <div>
          <p className="text-gray-300 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white 
                       hover:bg-gradient-to-r hover:from-orange-400 hover:via-blue-400 hover:to-purple-500 
                       hover:shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]
                       transition transform hover:scale-105 shadow-lg flex flex-col items-center"
          >
            + Add Product
            <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{products?.length}</span>
          </button>
        </div>

      </div>

      <input
        type="text"
        placeholder="Search Name, ModelNo, Category or UOM"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-left text-gray-200 bg-gray-800 border-collapse">
              <thead className="bg-gray-900 text-gray-200 uppercase">
                <tr>
                  {["NAME", "CATEGORY", "SUPPLIER", "STOCK", "MODEL NO", "MANUFACTURER", "UOM", "EDIT", "DELETE"].map((head) => (
                    <th key={head} className="py-3 px-4 border-b border-gray-700">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentProducts?.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-700 transition-colors">
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">{product.category}</td>
                    <td className="py-2 px-4 border-b">{product.supplier}</td>
                    <td className="py-2 px-4 border-b">{product.stock}</td>
                    <td className="py-2 px-4 border-b">{product.modelNo || "N/A"}</td>
                    <td className="py-2 px-4 border-b">{product.manufacturer}</td>
                    <td className="py-2 px-4 border-b">{product.uom || "PCS"}</td>
                    <td className="py-2 px-4 border-b">
                      <Link to={`/edit/${product._id}`}>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => deleteProductHandler(product._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
/*/

/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, Uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  const filteredProducts = products?.filter((product) =>
    [product.name, product.modelNo, product.uom, product.category]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-6">

      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg
                      bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                      p-[2px]
                      relative
                      shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]"
      >
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}
      {productModal && (
        <CreateProduct
          onClose={() => setOpenProductModal(false)}
          refreshProducts={() => dispatch(getProducts())} // Refresh dashboard after save
        />
      )}

      <div className="mb-6 space-y-4">

        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition flex flex-col items-center shadow-md"
            >
              + Add Category
              <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{categories?.length}</span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition flex flex-col items-center shadow-md"
            >
              + Add UOM
              <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{Uom?.length}</span>
            </button>
          </div>
        </div>

        <div>
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg flex flex-col items-center"
          >
            + Add Product
            <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{products?.length}</span>
          </button>
        </div>

      </div>

      <input
        type="text"
        placeholder="Search Name, ModelNo, Category or UOM"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-left text-gray-200 bg-gray-800 border-collapse">
              <thead className="bg-gray-900 text-gray-200 uppercase">
                <tr>
                  {["NAME", "CATEGORY", "SUPPLIER", "STOCK", "MODEL NO", "MANUFACTURER", "UOM", "EDIT", "DELETE"].map((head) => (
                    <th key={head} className="py-3 px-4 border-b border-gray-700">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentProducts?.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-700 transition-colors">
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">{product.category}</td>
                    <td className="py-2 px-4 border-b">{product.supplier}</td>
                    <td className="py-2 px-4 border-b">{product.stock}</td>
                    <td className="py-2 px-4 border-b">{product.modelNo || "N/A"}</td>
                    <td className="py-2 px-4 border-b">{product.manufacturer}</td>
                    <td className="py-2 px-4 border-b">{product.uom || "PCS"}</td>
                    <td className="py-2 px-4 border-b">
                      <Link to={`/edit/${product._id}`}>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => deleteProductHandler(product._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;

*/















//works well
/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, Uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  const filteredProducts = products?.filter((product) =>
    [product.name, product.modelNo, product.uom, product.category, product.location]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-6">
      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg
                      bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                      p-[2px] relative
                      shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]"
      >
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{categories?.length}</span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{Uom?.length}</span>
            </button>
          </div>
        </div>

        <div>
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{products?.length}</span>
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Name, ModelNo, Category, UOM, or Location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-left text-gray-200 bg-gray-800 border-collapse">
              <thead className="bg-gray-900 text-gray-200 uppercase">
                <tr>
                  {["NAME", "CATEGORY", "SUPPLIER", "STOCK", "MODEL NO", "MANUFACTURER", "UOM", "LOCATION", "EDIT", "DELETE"].map((head) => (
                    <th key={head} className="py-3 px-4 border-b border-gray-700">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentProducts?.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-700 transition-colors">
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">{product.category}</td>
                    <td className="py-2 px-4 border-b">{product.supplier}</td>
                    <td className="py-2 px-4 border-b">{product.stock}</td>
                    <td className="py-2 px-4 border-b">{product.modelNo || "N/A"}</td>
                    <td className="py-2 px-4 border-b">{product.manufacturer}</td>
                    <td className="py-2 px-4 border-b">{product.uom || "PCS"}</td>
                    <td className="py-2 px-4 border-b">{product.location || "N/A"}</td>
                    <td className="py-2 px-4 border-b">
                      <Link to={`/edit/${product._id}`}>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => deleteProductHandler(product._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
*/




/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, Uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  const filteredProducts = products?.filter((product) =>
    [product.name, product.modelNo, product.uom, product.category, product.location]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-6">
      <div
        className="mx-auto w-full max-w-3xl mb-6 rounded-lg
                   bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                   p-[2px] relative
                   shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]"
      >
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{categories?.length}</span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{Uom?.length}</span>
            </button>
          </div>
        </div>

        <div>
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{products?.length}</span>
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Name, ModelNo, Category, UOM, or Location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-left text-gray-200 bg-gray-800 border-collapse">
              <thead className="bg-gray-900 text-gray-200 uppercase">
                <tr>
                  {["NAME", "CATEGORY", "SUPPLIER", "STOCK", "MODEL NO", "MANUFACTURER", "UOM", "LOCATION", "EDIT", "DELETE"].map((head) => (
                    <th key={head} className="py-3 px-4 border-b border-gray-700">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentProducts?.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-700 transition-colors">
                    <td className="py-2 px-4 border-b">
                      {product.category?.toUpperCase() === "FIRE" ? (
                        <span className="font-bold text-red-500">{product.name} 🔥</span>
                      ) : (
                        product.name
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">{product.category}</td>
                    <td className="py-2 px-4 border-b">{product.supplier}</td>
                    <td className="py-2 px-4 border-b">{product.stock}</td>
                    <td className="py-2 px-4 border-b">{product.modelNo || "N/A"}</td>
                    <td className="py-2 px-4 border-b">{product.manufacturer}</td>
                    <td className="py-2 px-4 border-b">{product.uom || "PCS"}</td>
                    <td className="py-2 px-4 border-b">{product.location || "N/A"}</td>
                    <td className="py-2 px-4 border-b">
                      <Link to={`/edit/${product._id}`}>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => deleteProductHandler(product._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
*/








/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, Uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  const filteredProducts = products?.filter((product) =>
    [product.name, product.modelNo, product.uom, product.category, product.location]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-6">
      <div
        className="mx-auto w-full max-w-3xl mb-6 rounded-lg
                   bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                   p-[2px] relative
                   shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]"
      >
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{categories?.length}</span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{Uom?.length}</span>
            </button>
          </div>
        </div>

        <div>
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{products?.length}</span>
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Name, ModelNo, Category, UOM, or Location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-left text-gray-200 bg-gray-800 border-collapse">
              <thead className="bg-gray-900 text-gray-200 uppercase">
                <tr>
                  {["NAME", "CATEGORY", "SUPPLIER", "STOCK", "MODEL NO", "MANUFACTURER", "UOM", "LOCATION", "EDIT", "DELETE"].map((head) => (
                    <th key={head} className="py-3 px-4 border-b border-gray-700">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentProducts?.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-700 transition-colors">
                    <td className="py-2 px-4 border-b">
                      {product.name.toUpperCase().includes("FIRE") ? (
                        <span className="font-bold text-red-500">{product.name} 🔥</span>
                      ) : (
                        product.name
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">{product.category}</td>
                    <td className="py-2 px-4 border-b">{product.supplier}</td>
                    <td className="py-2 px-4 border-b">{product.stock}</td>
                    <td className="py-2 px-4 border-b">{product.modelNo || "N/A"}</td>
                    <td className="py-2 px-4 border-b">{product.manufacturer}</td>
                    <td className="py-2 px-4 border-b">{product.uom || "PCS"}</td>
                    <td className="py-2 px-4 border-b">{product.location || "N/A"}</td>
                    <td className="py-2 px-4 border-b">
                      <Link to={`/edit/${product._id}`}>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => deleteProductHandler(product._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
*/















/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, Uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  // ------------------ SIMILARITY FUNCTION ------------------
  const similarity = (s1 = "", s2 = "") => {
    s1 = s1.toString().toLowerCase();
    s2 = s2.toString().toLowerCase();
    if (!s1 || !s2) return 0;
    if (s1.includes(s2) || s2.includes(s1)) return 1; // partial match full score

    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    const longerLength = longer.length;
    if (longerLength === 0) return 1;

    let editDistance = 0;
    const minLen = Math.min(longer.length, shorter.length);
    for (let i = 0; i < minLen; i++) {
      if (longer[i] !== shorter[i]) editDistance++;
    }
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
        '<span class="bg-yellow-300 text-black rounded px-1">$1</span>'
      );
    });
    return result;
  };
  // -------------------------------------------------------

  // ------------------ MULTI-WORD FUZZY SEARCH ------------------
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
            const bestMatch = Math.max(
              ...productFields.map((field) => similarity(field, word))
            );
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);
  // -------------------------------------------------------

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-6">
      <div
        className="mx-auto w-full max-w-3xl mb-6 rounded-lg
                   bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                   p-[2px] relative
                   shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]"
      >
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{categories?.length}</span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{Uom?.length}</span>
            </button>
          </div>
        </div>

        <div>
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{products?.length}</span>
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-left text-gray-200 bg-gray-800 border-collapse">
              <thead className="bg-gray-900 text-gray-200 uppercase">
                <tr>
                  {["NAME", "CATEGORY", "SUPPLIER", "STOCK", "MODEL NO", "MANUFACTURER", "UOM", "LOCATION", "EDIT", "DELETE"].map((head) => (
                    <th key={head} className="py-3 px-4 border-b border-gray-700">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentProducts?.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-700 transition-colors">
                    <td className="py-2 px-4 border-b">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: product.name.toUpperCase().includes("FIRE")
                            ? highlightMatches(product.name + " 🔥", search)
                            : highlightMatches(product.name, search)
                        }}
                      />
                    </td>
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{ __html: highlightMatches(product.category || "", search) }} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{ __html: highlightMatches(product.supplier || "", search) }} />
                    <td className="py-2 px-4 border-b">{product.stock}</td>
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{ __html: highlightMatches(product.modelNo || "N/A", search) }} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{ __html: highlightMatches(product.manufacturer || "", search) }} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{ __html: highlightMatches(product.uom || "PCS", search) }} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{ __html: highlightMatches(product.location || "N/A", search) }} />
                    <td className="py-2 px-4 border-b">
                      <Link to={`/edit/${product._id}`}>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">Edit</button>
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => deleteProductHandler(product._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
*/










/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, Uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  // ------------------ SIMILARITY FUNCTION ------------------
  const similarity = (s1 = "", s2 = "") => {
    s1 = s1.toString().toLowerCase();
    s2 = s2.toString().toLowerCase();
    if (!s1 || !s2) return 0;
    if (s1.includes(s2) || s2.includes(s1)) return 1; // partial match full score

    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    const longerLength = longer.length;
    if (longerLength === 0) return 1;

    let editDistance = 0;
    const minLen = Math.min(longer.length, shorter.length);
    for (let i = 0; i < minLen; i++) {
      if (longer[i] !== shorter[i]) editDistance++;
    }
    editDistance += Math.abs(longer.length - shorter.length);
    return (longerLength - editDistance) / longerLength;
  };

  // ------------------ HIGHLIGHT FUNCTION (dark blue with glow) ------------------
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
  // -------------------------------------------------------

  // ------------------ MULTI-WORD FUZZY SEARCH ------------------
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
            const bestMatch = Math.max(
              ...productFields.map((field) => similarity(field, word))
            );
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);
  // -------------------------------------------------------

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-6">
      <div
        className="mx-auto w-full max-w-3xl mb-6 rounded-lg
                   bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                   p-[2px] relative
                   shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]"
      >
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{categories?.length}</span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{Uom?.length}</span>
            </button>
          </div>
        </div>

        <div>
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{products?.length}</span>
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-left text-gray-200 bg-gray-800 border-collapse">
              <thead className="bg-gray-900 text-gray-200 uppercase">
                <tr>
                  {["NAME", "CATEGORY", "SUPPLIER", "STOCK", "MODEL NO", "MANUFACTURER", "UOM", "LOCATION", "EDIT", "DELETE"].map((head) => (
                    <th key={head} className="py-3 px-4 border-b border-gray-700">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentProducts?.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-700 transition-colors">
                    <td className="py-2 px-4 border-b">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: product.name.toUpperCase().includes("FIRE")
                            ? highlightMatches(product.name + " 🔥", search)
                            : highlightMatches(product.name, search)
                        }}
                      />
                    </td>
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{ __html: highlightMatches(product.category || "", search) }} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{ __html: highlightMatches(product.supplier || "", search) }} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{ __html: highlightMatches(product.stock?.toString() || "0", search) }} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{ __html: highlightMatches(product.modelNo || "N/A", search) }} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{ __html: highlightMatches(product.manufacturer || "", search) }} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{ __html: highlightMatches(product.uom || "PCS", search) }} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{ __html: highlightMatches(product.location || "N/A", search) }} />
                    <td className="py-2 px-4 border-b">
                      <Link to={`/edit/${product._id}`}>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">Edit</button>
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => deleteProductHandler(product._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
*/















/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, Uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

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
    for (let i = 0; i < minLen; i++) {
      if (longer[i] !== shorter[i]) editDistance++;
    }
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

  // ------------------ FILTER PRODUCTS ------------------
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
            const bestMatch = Math.max(
              ...productFields.map((field) => similarity(field, word))
            );
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-4 md:px-6">
      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg
                   bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                   p-[2px] relative
                   shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]">
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{categories?.length}</span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{Uom?.length}</span>
            </button>
          </div>
        </div>

        <div>
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="mt-1 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{products?.length}</span>
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-left text-gray-200 bg-gray-800 border-collapse">
              <thead className="bg-gray-900 text-gray-200 uppercase">
                <tr>
                  {["NAME","CATEGORY","SUPPLIER","STOCK","MODEL NO","MANUFACTURER","UOM","LOCATION","EDIT","DELETE"].map(head => (
                    <th key={head} className="py-3 px-4 border-b border-gray-700">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentProducts?.map(product => (
                  <tr key={product._id} className="hover:bg-gray-700 transition-colors">
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.category || "", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.supplier || "", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.stock?.toString() || "0", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.modelNo || "N/A", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.manufacturer || "", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.uom || "PCS", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.location || "N/A", search)}} />
                    <td className="py-2 px-4 border-b">
                      <Link to={`/edit/${product._id}`}>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">Edit</button>
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button onClick={() => deleteProductHandler(product._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center">
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {currentProducts?.map(product => (
              <div key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                <div className="text-gray-200 text-sm space-y-1">
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Category: ${product.category || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Supplier: ${product.supplier || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Stock: ${product.stock || 0}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`UOM: ${product.uom || "PCS"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Location: ${product.location || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Model No: ${product.modelNo || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Manufacturer: ${product.manufacturer || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Price: $${product.price || "0.00"}`, search)}} />
                </div>
                <div className="flex gap-2 mt-3">
                  <Link to={`/edit/${product._id}`} className="flex-1">
                    <button className="w-full bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition flex items-center justify-center gap-1">
                      <AiOutlineEdit /> Edit
                    </button>
                  </Link>
                  <button onClick={() => deleteProductHandler(product._id)} className="w-full bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition flex items-center justify-center gap-1">
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
*/



/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, Uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

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
    for (let i = 0; i < minLen; i++) {
      if (longer[i] !== shorter[i]) editDistance++;
    }
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

  // ------------------ FILTER PRODUCTS ------------------
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
            const bestMatch = Math.max(
              ...productFields.map((field) => similarity(field, word))
            );
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-4 md:px-6">
      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg
                   bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                   p-[2px] relative
                   shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]">
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 rounded-full shadow">
                {categories?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-green-400 via-lime-400 to-emerald-500 rounded-full shadow">
                {Uom?.length || 0}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="flex items-center justify-between px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-full shadow-lg">
              {products?.length || 0}
            </span>
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-left text-gray-200 bg-gray-800 border-collapse">
              <thead className="bg-gray-900 text-gray-200 uppercase">
                <tr>
                  {["NAME","CATEGORY","SUPPLIER","STOCK","MODEL NO","MANUFACTURER","UOM","LOCATION","EDIT","DELETE"].map(head => (
                    <th key={head} className="py-3 px-4 border-b border-gray-700">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentProducts?.map(product => (
                  <tr key={product._id} className="hover:bg-gray-700 transition-colors">
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.category || "", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.supplier || "", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.stock?.toString() || "0", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.modelNo || "N/A", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.manufacturer || "", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.uom || "PCS", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.location || "N/A", search)}} />
                    <td className="py-2 px-4 border-b">
                      <Link to={`/edit/${product._id}`}>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">Edit</button>
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button onClick={() => deleteProductHandler(product._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center">
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {currentProducts?.map(product => (
              <div key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                <div className="text-gray-200 text-sm space-y-1">
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Category: ${product.category || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Supplier: ${product.supplier || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Stock: ${product.stock || 0}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`UOM: ${product.uom || "PCS"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Location: ${product.location || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Model No: ${product.modelNo || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Manufacturer: ${product.manufacturer || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Price: $${product.price || "0.00"}`, search)}} />
                </div>
                <div className="flex gap-2 mt-3">
                  <Link to={`/edit/${product._id}`} className="flex-1">
                    <button className="w-full bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition flex items-center justify-center gap-1">
                      <AiOutlineEdit /> Edit
                    </button>
                  </Link>
                  <button onClick={() => deleteProductHandler(product._id)} className="w-full bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition flex items-center justify-center gap-1">
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
*/









/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, uom } = useSelector((state) => state.category); // ✅ lowercase 'uom'

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

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
    for (let i = 0; i < minLen; i++) {
      if (longer[i] !== shorter[i]) editDistance++;
    }
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
        `<span class="bg-blue-700 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
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
            const bestMatch = Math.max(
              ...productFields.map((field) => similarity(field, word))
            );
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-4 md:px-6">
      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg
                   bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                   p-[2px] relative
                   shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]">
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 rounded-full shadow">
                {categories?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-green-400 via-lime-400 to-emerald-500 rounded-full shadow">
                {uom?.length || 0}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="flex items-center justify-between px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-full shadow-lg">
              {products?.length || 0}
            </span>
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-left text-gray-200 bg-gray-800 border-collapse">
              <thead className="bg-gray-900 text-gray-200 uppercase">
                <tr>
                  {["NAME","CATEGORY","SUPPLIER","STOCK","MODEL NO","MANUFACTURER","UOM","LOCATION","EDIT","DELETE"].map(head => (
                    <th key={head} className="py-3 px-4 border-b border-gray-700">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentProducts?.map(product => (
                  <tr key={product._id} className="hover:bg-gray-700 transition-colors">
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.category || "", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.supplier || "", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.stock?.toString() || "0", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.modelNo || "N/A", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.manufacturer || "", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.uom || "PCS", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.location || "N/A", search)}} />
                    <td className="py-2 px-4 border-b">
                      <Link to={`/edit/${product._id}`}>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">Edit</button>
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button onClick={() => deleteProductHandler(product._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center">
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {currentProducts?.map(product => (
              <div key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                <div className="text-gray-200 text-sm space-y-1">
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Category: ${product.category || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Supplier: ${product.supplier || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Stock: ${product.stock || 0}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`UOM: ${product.uom || "PCS"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Location: ${product.location || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Model No: ${product.modelNo || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Manufacturer: ${product.manufacturer || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Price: $${product.price || "0.00"}`, search)}} />
                </div>
                <div className="flex gap-2 mt-3">
                  <Link to={`/edit/${product._id}`} className="flex-1">
                    <button className="w-full bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition flex items-center justify-center gap-1">
                      <AiOutlineEdit /> Edit
                    </button>
                  </Link>
                  <button onClick={() => deleteProductHandler(product._id)} className="w-full bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition flex items-center justify-center gap-1">
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
*/



















/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

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
    for (let i = 0; i < minLen; i++) {
      if (longer[i] !== shorter[i]) editDistance++;
    }
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
        `<span class="bg-blue-700 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
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
            const bestMatch = Math.max(
              ...productFields.map((field) => similarity(field, word))
            );
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-4 md:px-6">
      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg
                      bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                      p-[2px] relative
                      shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]">
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 rounded-full shadow">
                {categories?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-green-400 via-lime-400 to-emerald-500 rounded-full shadow">
                {uom?.length || 0}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="flex items-center justify-between px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-full shadow-lg">
              {products?.length || 0}
            </span>
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-left text-gray-200 bg-gray-800 border-collapse">
              <thead className="text-white uppercase
                                bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                                shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]">
                <tr>
                  {["NAME","CATEGORY","SUPPLIER","STOCK","MODEL NO","MANUFACTURER","UOM","LOCATION","EDIT","DELETE"].map(head => (
                    <th key={head} className="py-3 px-4 border-b border-gray-700">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentProducts?.map(product => (
                  <tr key={product._id} className="hover:bg-gray-700 transition-colors">
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.category || "", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.supplier || "", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.stock?.toString() || "0", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.modelNo || "N/A", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.manufacturer || "", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.uom || "PCS", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.location || "N/A", search)}} />
                    <td className="py-2 px-4 border-b">
                      <Link to={`/edit/${product._id}`}>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">Edit</button>
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button onClick={() => deleteProductHandler(product._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center">
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {currentProducts?.map(product => (
              <div key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                <div className="text-gray-200 text-sm space-y-1">
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Category: ${product.category || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Supplier: ${product.supplier || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Stock: ${product.stock || 0}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`UOM: ${product.uom || "PCS"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Location: ${product.location || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Model No: ${product.modelNo || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Manufacturer: ${product.manufacturer || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Price: $${product.price || "0.00"}`, search)}} />
                </div>
                <div className="flex gap-2 mt-3">
                  <Link to={`/edit/${product._id}`} className="flex-1">
                    <button className="w-full bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition flex items-center justify-center gap-1">
                      <AiOutlineEdit /> Edit
                    </button>
                  </Link>
                  <button onClick={() => deleteProductHandler(product._id)} className="w-full bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition flex items-center justify-center gap-1">
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;








*/














/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

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
    for (let i = 0; i < minLen; i++) {
      if (longer[i] !== shorter[i]) editDistance++;
    }
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
        `<span class="bg-blue-700 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
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
            const bestMatch = Math.max(
              ...productFields.map((field) => similarity(field, word))
            );
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-4 md:px-6">
      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg
                      bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                      p-[2px] relative
                      shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]">
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 rounded-full shadow">
                {categories?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-green-400 via-lime-400 to-emerald-500 rounded-full shadow">
                {uom?.length || 0}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="flex items-center justify-between px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-full shadow-lg">
              {products?.length || 0}
            </span>
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-left text-gray-200 bg-gray-800 border-collapse">
              <thead className="text-white uppercase
                                bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                                shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]">
                <tr>
                  {["NAME","CATEGORY","SUPPLIER","STOCK","MODEL NO","MANUFACTURER","UOM","LOCATION","EDIT","DELETE"].map(head => (
                    <th key={head} className="py-4 px-4 border-b border-gray-700">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentProducts?.map(product => (
                  <tr key={product._id} className="hover:bg-gray-700 transition-colors">
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.category || "", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.supplier || "", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.stock?.toString() || "0", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.modelNo || "N/A", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.manufacturer || "", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.uom || "PCS", search)}} />
                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.location || "N/A", search)}} />
                    <td className="py-2 px-4 border-b">
                      <Link to={`/edit/${product._id}`}>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">Edit</button>
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button onClick={() => deleteProductHandler(product._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center">
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {currentProducts?.map(product => (
              <div key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                <div className="text-gray-200 text-sm space-y-1">
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Category: ${product.category || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Supplier: ${product.supplier || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Stock: ${product.stock || 0}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`UOM: ${product.uom || "PCS"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Location: ${product.location || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Model No: ${product.modelNo || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Manufacturer: ${product.manufacturer || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Price: $${product.price || "0.00"}`, search)}} />
                </div>
                <div className="flex gap-2 mt-3">
                  <Link to={`/edit/${product._id}`} className="flex-1">
                    <button className="w-full bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition flex items-center justify-center gap-1">
                      <AiOutlineEdit /> Edit
                    </button>
                  </Link>
                  <button onClick={() => deleteProductHandler(product._id)} className="w-full bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition flex items-center justify-center gap-1">
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
*/









/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

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
    for (let i = 0; i < minLen; i++) {
      if (longer[i] !== shorter[i]) editDistance++;
    }
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
        `<span class="bg-blue-700 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
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
            const bestMatch = Math.max(
              ...productFields.map((field) => similarity(field, word))
            );
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-4 md:px-6">
      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg
                      bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                      p-[2px] relative
                      shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]">
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 rounded-full shadow">
                {categories?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-green-400 via-lime-400 to-emerald-500 rounded-full shadow">
                {uom?.length || 0}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="flex items-center justify-between px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-full shadow-lg">
              {products?.length || 0}
            </span>
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-left text-gray-200 bg-gray-800 border-collapse">
              <thead className="text-white uppercase
                                bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                                shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]
                                rounded-t-lg">
                <tr>
                  {["NAME","CATEGORY","SUPPLIER","STOCK","MODEL NO","MANUFACTURER","UOM","LOCATION","EDIT","DELETE"].map(head => (
                    <th key={head} className="py-4 px-4 border-b border-gray-700">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentProducts?.map(product => (
                  <tr key={product._id} className="bg-gray-800 hover:bg-gray-700 transition-colors">
                    <td className="py-4 px-4 border-b" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                    <td className="py-4 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.category || "", search)}} />
                    <td className="py-4 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.supplier || "", search)}} />
                    <td className="py-4 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.stock?.toString() || "0", search)}} />
                    <td className="py-4 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.modelNo || "N/A", search)}} />
                    <td className="py-4 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.manufacturer || "", search)}} />
                    <td className="py-4 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.uom || "PCS", search)}} />
                    <td className="py-4 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.location || "N/A", search)}} />
                    <td className="py-4 px-4 border-b">
                      <Link to={`/edit/${product._id}`}>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">Edit</button>
                      </Link>
                    </td>
                    <td className="py-4 px-4 border-b">
                      <button onClick={() => deleteProductHandler(product._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center">
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {currentProducts?.map(product => (
              <div key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                <div className="text-gray-200 text-sm space-y-1">
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Category: ${product.category || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Supplier: ${product.supplier || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Stock: ${product.stock || 0}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`UOM: ${product.uom || "PCS"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Location: ${product.location || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Model No: ${product.modelNo || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Manufacturer: ${product.manufacturer || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Price: $${product.price || "0.00"}`, search)}} />
                </div>
                <div className="flex gap-2 mt-3">
                  <Link to={`/edit/${product._id}`} className="flex-1">
                    <button className="w-full bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition flex items-center justify-center gap-1">
                      <AiOutlineEdit /> Edit
                    </button>
                  </Link>
                  <button onClick={() => deleteProductHandler(product._id)} className="w-full bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition flex items-center justify-center gap-1">
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
*/














/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

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
    for (let i = 0; i < minLen; i++) {
      if (longer[i] !== shorter[i]) editDistance++;
    }
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
        `<span class="bg-blue-700 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
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
            const bestMatch = Math.max(
              ...productFields.map((field) => similarity(field, word))
            );
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-4 md:px-6">
      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg
                      bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                      p-[2px] relative
                      shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]">
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 rounded-full shadow">
                {categories?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-green-400 via-lime-400 to-emerald-500 rounded-full shadow">
                {uom?.length || 0}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="flex items-center justify-between px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-full shadow-lg">
              {products?.length || 0}
            </span>
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-lg p-[2px]
                          bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 shadow-lg">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full text-left text-gray-200 border-collapse">
                <thead className="text-white uppercase
                                  bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                                  shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]">
                  <tr className="h-16">
                    {["NAME","CATEGORY","SUPPLIER","STOCK","MODEL NO","MANUFACTURER","UOM","LOCATION","EDIT","DELETE"].map(head => (
                      <th key={head} className="py-4 px-4 border-b border-gray-700">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentProducts?.map(product => (
                    <tr
                      key={product._id}
                      className="transition-colors duration-300 hover:bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 hover:text-white"
                    >
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.category || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.supplier || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.stock?.toString() || "0", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.modelNo || "N/A", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.manufacturer || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.uom || "PCS", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.location || "N/A", search)}} />
                      <td className="py-2 px-4 border-b">
                        <Link to={`/edit/${product._id}`}>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">Edit</button>
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button onClick={() => deleteProductHandler(product._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center">
                          <AiOutlineDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {currentProducts?.map(product => (
              <div key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                <div className="text-gray-200 text-sm space-y-1">
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Category: ${product.category || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Supplier: ${product.supplier || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Stock: ${product.stock || 0}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`UOM: ${product.uom || "PCS"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Location: ${product.location || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Model No: ${product.modelNo || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Manufacturer: ${product.manufacturer || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Price: $${product.price || "0.00"}`, search)}} />
                </div>
                <div className="flex gap-2 mt-3">
                  <Link to={`/edit/${product._id}`} className="flex-1">
                    <button className="w-full bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition flex items-center justify-center gap-1">
                      <AiOutlineEdit /> Edit
                    </button>
                  </Link>
                  <button onClick={() => deleteProductHandler(product._id)} className="w-full bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition flex items-center justify-center gap-1">
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;

*/










/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

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
    for (let i = 0; i < minLen; i++) {
      if (longer[i] !== shorter[i]) editDistance++;
    }
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
        `<span class="bg-blue-700 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
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
            const bestMatch = Math.max(
              ...productFields.map((field) => similarity(field, word))
            );
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-4 md:px-6">
      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg
                      bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                      p-[2px] relative
                      shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]">
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 rounded-full shadow">
                {categories?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-green-400 via-lime-400 to-emerald-500 rounded-full shadow">
                {uom?.length || 0}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="flex items-center justify-between px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-full shadow-lg">
              {products?.length || 0}
            </span>
          </button>
        </div>
      </div>

      <div className="sticky top-0 z-50 flex justify-center mb-4">
        <div className="w-full md:w-1/2 p-[2px] rounded-lg bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500">
          <input
            type="text"
            placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-md border-none bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-lg p-[2px] bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 shadow-lg">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full text-left text-gray-200 border-collapse">
                <thead className="text-white uppercase bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500">
                  <tr className="h-16">
                    {["NAME","CATEGORY","SUPPLIER","STOCK","MODEL NO","MANUFACTURER","UOM","LOCATION","EDIT","DELETE"].map(head => (
                      <th key={head} className="py-4 px-4 border-b border-gray-700">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentProducts?.map(product => (
                    <tr key={product._id} className="transition-colors duration-300 hover:bg-gray-700">
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.category || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.supplier || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.stock?.toString() || "0", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.modelNo || "N/A", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.manufacturer || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.uom || "PCS", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.location || "N/A", search)}} />
                      <td className="py-2 px-4 border-b">
                        <Link to={`/edit/${product._id}`}>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">Edit</button>
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button onClick={() => deleteProductHandler(product._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center">
                          <AiOutlineDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {currentProducts?.map(product => (
              <div key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                <div className="text-gray-200 text-sm space-y-1">
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Category: ${product.category || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Supplier: ${product.supplier || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Stock: ${product.stock || 0}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`UOM: ${product.uom || "PCS"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Location: ${product.location || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Model No: ${product.modelNo || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Manufacturer: ${product.manufacturer || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Price: $${product.price || "0.00"}`, search)}} />
                </div>
                <div className="flex gap-2 mt-3">
                  <Link to={`/edit/${product._id}`} className="flex-1">
                    <button className="w-full bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition flex items-center justify-center gap-1">
                      <AiOutlineEdit /> Edit
                    </button>
                  </Link>
                  <button onClick={() => deleteProductHandler(product._id)} className="w-full bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition flex items-center justify-center gap-1">
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
*/













/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

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
    for (let i = 0; i < minLen; i++) {
      if (longer[i] !== shorter[i]) editDistance++;
    }
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
        `<span class="bg-blue-700 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
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
            const bestMatch = Math.max(
              ...productFields.map((field) => similarity(field, word))
            );
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-4 md:px-6">
      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg
                      bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                      p-[2px] relative
                      shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]">
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 rounded-full shadow">
                {categories?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-green-400 via-lime-400 to-emerald-500 rounded-full shadow">
                {uom?.length || 0}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="flex items-center justify-between px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-full shadow-lg">
              {products?.length || 0}
            </span>
          </button>
        </div>
      </div>

      <div className="sticky top-0 z-50 flex justify-center mb-4">
        <div className="w-full md:w-1/2 p-[2px] rounded-lg bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500">
          <input
            type="text"
            placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-md border-none bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-lg p-[2px] bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 shadow-lg">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full text-left text-gray-200 border-collapse">
                <thead className="text-white uppercase bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500">
                  <tr className="h-16">
                    {["NAME","CATEGORY","SUPPLIER","STOCK","MODEL NO","MANUFACTURER","UOM","LOCATION","EDIT","DELETE"].map(head => (
                      <th key={head} className="py-4 px-4 border-b border-gray-700">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentProducts?.map(product => (
                    <tr key={product._id} className="transition-colors duration-300 hover:bg-gray-700">
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.category || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.supplier || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.stock?.toString() || "0", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.modelNo || "N/A", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.manufacturer || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.uom || "PCS", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.location || "N/A", search)}} />
                      <td className="py-2 px-4 border-b">
                        <Link to={`/edit/${product._id}`}>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">Edit</button>
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button onClick={() => deleteProductHandler(product._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center">
                          <AiOutlineDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {currentProducts?.map(product => (
              <div key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                <div className="text-gray-200 text-sm space-y-1">
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Category: ${product.category || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Supplier: ${product.supplier || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Stock: ${product.stock || 0}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`UOM: ${product.uom || "PCS"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Location: ${product.location || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Model No: ${product.modelNo || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Manufacturer: ${product.manufacturer || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Price: $${product.price || "0.00"}`, search)}} />
                </div>
                <div className="flex gap-2 mt-3">
                  <Link to={`/edit/${product._id}`} className="flex-1">
                    <button className="w-full bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition flex items-center justify-center gap-1">
                      <AiOutlineEdit /> Edit
                    </button>
                  </Link>
                  <button onClick={() => deleteProductHandler(product._id)} className="w-full bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition flex items-center justify-center gap-1">
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;



*/






































/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

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
    for (let i = 0; i < minLen; i++) {
      if (longer[i] !== shorter[i]) editDistance++;
    }
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
        `<span class="bg-blue-700 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
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
            const bestMatch = Math.max(
              ...productFields.map((field) => similarity(field, word))
            );
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-4 md:px-6">
      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg
                      bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                      p-[2px] relative
                      shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]">
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 rounded-full shadow">
                {categories?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-green-400 via-lime-400 to-emerald-500 rounded-full shadow">
                {uom?.length || 0}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="flex items-center justify-between px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-full shadow-lg">
              {products?.length || 0}
            </span>
          </button>
        </div>
      </div>

      <div className="sticky top-0 z-50 flex justify-center mb-4">
        <div className="w-full md:w-1/2 p-[2px] rounded-lg bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500">
          <input
            type="text"
            placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-md border-none bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-lg p-[2px] bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 shadow-lg">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full text-left text-gray-200 border-collapse">
                <thead className="text-white uppercase bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500">
                  <tr className="h-16">
                    {["NAME","CATEGORY","SUPPLIER","STOCK","MODEL NO","MANUFACTURER","UOM","LOCATION","EDIT","DELETE"].map(head => (
                      <th key={head} className="py-4 px-4 border-b border-gray-700">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentProducts?.map(product => (
                    <tr
                      key={product._id}
                      className="transition-colors duration-300 
                                 hover:bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 
                                 hover:text-white hover:shadow-[0_0_12px_rgba(255,165,0,0.6),0_0_15px_rgba(0,123,255,0.5),0_0_20px_rgba(128,0,128,0.4)]"
                    >
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.category || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.supplier || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.stock?.toString() || "0", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.modelNo || "N/A", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.manufacturer || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.uom || "PCS", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.location || "N/A", search)}} />
                      <td className="py-2 px-4 border-b">
                        <Link to={`/edit/${product._id}`}>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">Edit</button>
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button onClick={() => deleteProductHandler(product._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center">
                          <AiOutlineDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {currentProducts?.map(product => (
              <div key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-lg transition-colors duration-300 hover:bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 hover:text-white">
                <h2 className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                <div className="text-gray-200 text-sm space-y-1">
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Category: ${product.category || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Supplier: ${product.supplier || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Stock: ${product.stock || 0}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`UOM: ${product.uom || "PCS"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Location: ${product.location || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Model No: ${product.modelNo || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Manufacturer: ${product.manufacturer || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Price: $${product.price || "0.00"}`, search)}} />
                </div>
                <div className="flex gap-2 mt-3">
                  <Link to={`/edit/${product._id}`} className="flex-1">
                    <button className="w-full bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition flex items-center justify-center gap-1">
                      <AiOutlineEdit /> Edit
                    </button>
                  </Link>
                  <button onClick={() => deleteProductHandler(product._id)} className="w-full bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition flex items-center justify-center gap-1">
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
*/










/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

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
    for (let i = 0; i < minLen; i++) {
      if (longer[i] !== shorter[i]) editDistance++;
    }
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
        `<span class="bg-blue-700 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
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
            const bestMatch = Math.max(
              ...productFields.map((field) => similarity(field, word))
            );
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-4 md:px-6">
      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg
                      bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                      p-[2px] relative
                      shadow-[0_0_12px_rgba(255,165,0,0.8),0_0_15px_rgba(0,123,255,0.6),0_0_20px_rgba(128,0,128,0.5)]">
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 rounded-full shadow">
                {categories?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-green-400 via-lime-400 to-emerald-500 rounded-full shadow">
                {uom?.length || 0}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="flex items-center justify-between px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-full shadow-lg">
              {products?.length || 0}
            </span>
          </button>
        </div>
      </div>

      <div className="sticky top-0 z-50 flex justify-center mb-4">
        <div className="w-full md:w-1/2 p-[2px] rounded-lg
                        bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                        shadow-[0_0_12px_rgba(255,165,0,0.6),0_0_15px_rgba(0,123,255,0.5),0_0_20px_rgba(128,0,128,0.4)]">
          <input
            type="text"
            placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-md border-none bg-gray-900 text-white placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-offset-1
                       focus:ring-orange-400 focus:ring-blue-400 focus:ring-purple-500 transition"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-lg p-[2px] bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 shadow-lg">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full text-left text-gray-200 border-collapse">
                <thead className="text-white uppercase bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500">
                  <tr className="h-16">
                    {["NAME","CATEGORY","SUPPLIER","STOCK","MODEL NO","MANUFACTURER","UOM","LOCATION","EDIT","DELETE"].map(head => (
                      <th key={head} className="py-4 px-4 border-b border-gray-700">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentProducts?.map(product => (
                    <tr
                      key={product._id}
                      className="transition-colors duration-300 hover:bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 hover:text-white"
                    >
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.category || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.supplier || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.stock?.toString() || "0", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.modelNo || "N/A", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.manufacturer || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.uom || "PCS", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.location || "N/A", search)}} />
                      <td className="py-2 px-4 border-b">
                        <Link to={`/edit/${product._id}`}>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">Edit</button>
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button onClick={() => deleteProductHandler(product._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center">
                          <AiOutlineDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {currentProducts?.map(product => (
              <div key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                <div className="text-gray-200 text-sm space-y-1">
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Category: ${product.category || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Supplier: ${product.supplier || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Stock: ${product.stock || 0}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`UOM: ${product.uom || "PCS"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Location: ${product.location || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Model No: ${product.modelNo || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Manufacturer: ${product.manufacturer || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Price: $${product.price || "0.00"}`, search)}} />
                </div>
                <div className="flex gap-2 mt-3">
                  <Link to={`/edit/${product._id}`} className="flex-1">
                    <button className="w-full bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition flex items-center justify-center gap-1">
                      <AiOutlineEdit /> Edit
                    </button>
                  </Link>
                  <button onClick={() => deleteProductHandler(product._id)} className="w-full bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition flex items-center justify-center gap-1">
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
*/






/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [deleteModal, setDeleteModal] = useState({ open: false, productId: null });
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  // Confirm deletion handler
  const confirmDeleteHandler = async () => {
    if (!deleteModal.productId) return;
    try {
      await dispatch(deleteProduct(deleteModal.productId)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
    setDeleteModal({ open: false, productId: null });
  };

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
    for (let i = 0; i < minLen; i++) {
      if (longer[i] !== shorter[i]) editDistance++;
    }
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
        `<span class="bg-blue-700 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
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
            const bestMatch = Math.max(
              ...productFields.map((field) => similarity(field, word))
            );
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-4 md:px-6 relative">
      {deleteModal.open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-11/12 max-w-md text-center shadow-lg border-2 border-gradient-to-r from-orange-400 via-blue-400 to-purple-500">
            <h2 className="text-xl font-bold text-white mb-4">Confirm Delete</h2>
            <p className="text-gray-200 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDeleteHandler}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteModal({ open: false, productId: null })}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg
                      bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500
                      p-[2px] relative shadow-lg">
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 rounded-full shadow">
                {categories?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-green-400 via-lime-400 to-emerald-500 rounded-full shadow">
                {uom?.length || 0}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="flex items-center justify-between px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-full shadow-lg">
              {products?.length || 0}
            </span>
          </button>
        </div>
      </div>

      <div className="sticky top-0 z-50 flex justify-center mb-4">
        <div className="w-full md:w-1/2 p-[2px] rounded-lg bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 shadow-lg">
          <input
            type="text"
            placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-md border-none bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-400 focus:ring-blue-400 focus:ring-purple-500 transition"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-lg p-[2px] bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 shadow-lg">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full text-left text-gray-200 border-collapse">
                <thead className="text-white uppercase bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500">
                  <tr className="h-16">
                    {["NAME","CATEGORY","SUPPLIER","STOCK","MODEL NO","MANUFACTURER","UOM","LOCATION","EDIT","DELETE"].map(head => (
                      <th key={head} className="py-4 px-4 border-b border-gray-700">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentProducts?.map(product => (
                    <tr key={product._id} className="transition-colors duration-300 hover:bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 hover:text-white">
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.category || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.supplier || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.stock?.toString() || "0", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.modelNo || "N/A", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.manufacturer || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.uom || "PCS", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.location || "N/A", search)}} />
                      <td className="py-2 px-4 border-b">
                        <Link to={`/edit/${product._id}`}>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">Edit</button>
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => setDeleteModal({ open: true, productId: product._id })}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center"
                        >
                          <AiOutlineDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {currentProducts?.map(product => (
              <div key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                <div className="text-gray-200 text-sm space-y-1">
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Category: ${product.category || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Supplier: ${product.supplier || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Stock: ${product.stock || 0}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`UOM: ${product.uom || "PCS"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Location: ${product.location || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Model No: ${product.modelNo || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Manufacturer: ${product.manufacturer || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Price: $${product.price || "0.00"}`, search)}} />
                </div>
                <div className="flex gap-2 mt-3">
                  <Link to={`/edit/${product._id}`} className="flex-1">
                    <button className="w-full bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition flex items-center justify-center gap-1">
                      <AiOutlineEdit /> Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => setDeleteModal({ open: true, productId: product._id })}
                    className="w-full bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition flex items-center justify-center gap-1"
                  >
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
*/









/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [deleteModal, setDeleteModal] = useState({ open: false, productId: null });
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const confirmDeleteHandler = async () => {
    if (!deleteModal.productId) return;
    try {
      await dispatch(deleteProduct(deleteModal.productId)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
    setDeleteModal({ open: false, productId: null });
  };

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
    for (let i = 0; i < minLen; i++) {
      if (longer[i] !== shorter[i]) editDistance++;
    }
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
        `<span class="bg-blue-700 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
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
            const bestMatch = Math.max(
              ...productFields.map((field) => similarity(field, word))
            );
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-4 md:px-6 relative">
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
          deleteModal.open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`bg-gray-800 p-6 rounded-xl w-11/12 max-w-md text-center shadow-lg border-2 border-gradient-to-r from-orange-400 via-blue-400 to-purple-500 transform transition-transform duration-300 ${
            deleteModal.open ? "scale-100" : "scale-95"
          }`}
        >
          <h2 className="text-xl font-bold text-white mb-4">Confirm Delete</h2>
          <p className="text-gray-200 mb-6">
            Are you sure you want to delete this product? This action cannot be undone.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={confirmDeleteHandler}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
            >
              Delete
            </button>
            <button
              onClick={() => setDeleteModal({ open: false, productId: null })}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 p-[2px] relative shadow-lg">
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 rounded-full shadow">
                {categories?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-green-400 via-lime-400 to-emerald-500 rounded-full shadow">
                {uom?.length || 0}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="flex items-center justify-between px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-full shadow-lg">
              {products?.length || 0}
            </span>
          </button>
        </div>
      </div>

      <div className="sticky top-0 z-50 flex justify-center mb-4">
        <div className="w-full md:w-1/2 p-[2px] rounded-lg bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 shadow-lg">
          <input
            type="text"
            placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-md border-none bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-400 focus:ring-blue-400 focus:ring-purple-500 transition"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-lg p-[2px] bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 shadow-lg">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full text-left text-gray-200 border-collapse">
                <thead className="text-white uppercase bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500">
                  <tr className="h-16">
                    {["NAME","CATEGORY","SUPPLIER","STOCK","MODEL NO","MANUFACTURER","UOM","LOCATION","EDIT","DELETE"].map(head => (
                      <th key={head} className="py-4 px-4 border-b border-gray-700">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentProducts?.map(product => (
                    <tr key={product._id} className="transition-colors duration-300 hover:bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 hover:text-white">
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.category || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.supplier || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.stock?.toString() || "0", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.modelNo || "N/A", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.manufacturer || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.uom || "PCS", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.location || "N/A", search)}} />
                      <td className="py-2 px-4 border-b">
                        <Link to={`/edit/${product._id}`}>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">Edit</button>
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => setDeleteModal({ open: true, productId: product._id })}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center"
                        >
                          <AiOutlineDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {currentProducts?.map(product => (
              <div key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                <div className="text-gray-200 text-sm space-y-1">
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Category: ${product.category || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Supplier: ${product.supplier || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Stock: ${product.stock || 0}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`UOM: ${product.uom || "PCS"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Location: ${product.location || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Model No: ${product.modelNo || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Manufacturer: ${product.manufacturer || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Price: $${product.price || "0.00"}`, search)}} />
                </div>
                <div className="flex gap-2 mt-3">
                  <Link to={`/edit/${product._id}`} className="flex-1">
                    <button className="w-full bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition flex items-center justify-center gap-1">
                      <AiOutlineEdit /> Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => setDeleteModal({ open: true, productId: product._id })}
                    className="w-full bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition flex items-center justify-center gap-1"
                  >
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
*/













/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [deleteModal, setDeleteModal] = useState({ open: false, productId: null });
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const confirmDeleteHandler = async () => {
    if (!deleteModal.productId) return;
    try {
      await dispatch(deleteProduct(deleteModal.productId)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
    setDeleteModal({ open: false, productId: null });
  };

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
    for (let i = 0; i < minLen; i++) {
      if (longer[i] !== shorter[i]) editDistance++;
    }
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
        `<span class="bg-blue-700 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
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
            const bestMatch = Math.max(
              ...productFields.map((field) => similarity(field, word))
            );
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-4 md:px-6 relative">
      {deleteModal.open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-11/12 max-w-md text-center shadow-lg border-2 border-gradient-to-r from-orange-400 via-blue-400 to-purple-500">
            <h2 className="text-xl font-bold text-white mb-4">Confirm Delete</h2>
            <p className="text-gray-200 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDeleteHandler}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteModal({ open: false, productId: null })}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 p-[2px] relative shadow-lg">
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      {!categoryModal && !uomModal && !productModal && !deleteModal.open && (
        <div className="sticky top-0 z-50 flex justify-center mb-4">
          <div className="w-full md:w-1/2 p-[2px] rounded-lg bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 shadow-lg">
            <input
              type="text"
              placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 rounded-md border-none bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-400 focus:ring-blue-400 focus:ring-purple-500 transition"
            />
          </div>
        </div>
      )}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 rounded-full shadow">
                {categories?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-green-400 via-lime-400 to-emerald-500 rounded-full shadow">
                {uom?.length || 0}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="flex items-center justify-between px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-full shadow-lg">
              {products?.length || 0}
            </span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-lg p-[2px] bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 shadow-lg">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full text-left text-gray-200 border-collapse">
                <thead className="text-white uppercase bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500">
                  <tr className="h-16">
                    {["NAME","CATEGORY","SUPPLIER","STOCK","MODEL NO","MANUFACTURER","UOM","LOCATION","EDIT","DELETE"].map(head => (
                      <th key={head} className="py-4 px-4 border-b border-gray-700">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentProducts?.map(product => (
                    <tr key={product._id} className="transition-colors duration-300 hover:bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 hover:text-white">
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.category || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.supplier || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.stock?.toString() || "0", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.modelNo || "N/A", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.manufacturer || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.uom || "PCS", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.location || "N/A", search)}} />
                      <td className="py-2 px-4 border-b">
                        <Link to={`/edit/${product._id}`}>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">Edit</button>
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => setDeleteModal({ open: true, productId: product._id })}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center"
                        >
                          <AiOutlineDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {currentProducts?.map(product => (
              <div key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                <div className="text-gray-200 text-sm space-y-1">
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Category: ${product.category || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Supplier: ${product.supplier || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Stock: ${product.stock || 0}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`UOM: ${product.uom || "PCS"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Location: ${product.location || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Model No: ${product.modelNo || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Manufacturer: ${product.manufacturer || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Price: $${product.price || "0.00"}`, search)}} />
                </div>
                <div className="flex gap-2 mt-3">
                  <Link to={`/edit/${product._id}`} className="flex-1">
                    <button className="w-full bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition flex items-center justify-center gap-1">
                      <AiOutlineEdit /> Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => setDeleteModal({ open: true, productId: product._id })}
                    className="w-full bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition flex items-center justify-center gap-1"
                  >
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;








*/





/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [deleteModal, setDeleteModal] = useState({ open: false, productId: null });
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const confirmDeleteHandler = async () => {
    if (!deleteModal.productId) return;
    try {
      await dispatch(deleteProduct(deleteModal.productId)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
    setDeleteModal({ open: false, productId: null });
  };

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
    for (let i = 0; i < minLen; i++) {
      if (longer[i] !== shorter[i]) editDistance++;
    }
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
        `<span class="bg-blue-700 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
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
            const bestMatch = Math.max(
              ...productFields.map((field) => similarity(field, word))
            );
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-4 md:px-6 relative">
      {deleteModal.open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-11/12 max-w-md text-center shadow-lg border-2 border-gradient-to-r from-orange-400 via-blue-400 to-purple-500">
            <h2 className="text-xl font-bold text-white mb-4">Confirm Delete</h2>
            <p className="text-gray-200 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDeleteHandler}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteModal({ open: false, productId: null })}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 p-[2px] relative shadow-lg">
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      {!categoryModal && !uomModal && !productModal && !deleteModal.open && (
        <>
          <div className="md:hidden flex justify-center mb-4">
            <div className="w-full p-[2px] rounded-lg bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 shadow-lg">
              <input
                type="text"
                placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 rounded-md border-none bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-400 focus:ring-blue-400 focus:ring-purple-500 transition"
              />
            </div>
          </div>

          <div className="hidden md:flex justify-center mb-4 sticky top-4 z-50">
            <div className="w-full md:w-1/2 p-[2px] rounded-lg bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 shadow-lg">
              <input
                type="text"
                placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 rounded-md border-none bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-400 focus:ring-blue-400 focus:ring-purple-500 transition"
              />
            </div>
          </div>
        </>
      )}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 rounded-full shadow">
                {categories?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-green-400 via-lime-400 to-emerald-500 rounded-full shadow">
                {uom?.length || 0}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="flex items-center justify-between px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-full shadow-lg">
              {products?.length || 0}
            </span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-lg p-[2px] bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 shadow-lg">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full text-left text-gray-200 border-collapse">
                <thead className="text-white uppercase bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500">
                  <tr className="h-16">
                    {["NAME","CATEGORY","SUPPLIER","STOCK","MODEL NO","MANUFACTURER","UOM","LOCATION","EDIT","DELETE"].map(head => (
                      <th key={head} className="py-4 px-4 border-b border-gray-700">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentProducts?.map(product => (
                    <tr key={product._id} className="transition-colors duration-300 hover:bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 hover:text-white">
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.category || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.supplier || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.stock?.toString() || "0", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.modelNo || "N/A", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.manufacturer || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.uom || "PCS", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.location || "N/A", search)}} />
                      <td className="py-2 px-4 border-b">
                        <Link to={`/edit/${product._id}`}>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">Edit</button>
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => setDeleteModal({ open: true, productId: product._id })}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center"
                        >
                          <AiOutlineDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {currentProducts?.map(product => (
              <div key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                <div className="text-gray-200 text-sm space-y-1">
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Category: ${product.category || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Supplier: ${product.supplier || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Stock: ${product.stock || 0}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`UOM: ${product.uom || "PCS"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Location: ${product.location || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Model No: ${product.modelNo || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Manufacturer: ${product.manufacturer || "N/A"}`, search)}} />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Price: $${product.price || "0.00"}`, search)}} />
                </div>
                <div className="flex gap-2 mt-3">
                  <Link to={`/edit/${product._id}`} className="flex-1">
                    <button className="w-full bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition flex items-center justify-center gap-1">
                      <AiOutlineEdit /> Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => setDeleteModal({ open: true, productId: product._id })}
                    className="w-full bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition flex items-center justify-center gap-1"
                  >
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
*/
















/*
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [deleteModal, setDeleteModal] = useState({ open: false, productId: null });
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const confirmDeleteHandler = async () => {
    if (!deleteModal.productId) return;
    try {
      await dispatch(deleteProduct(deleteModal.productId)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
    setDeleteModal({ open: false, productId: null });
  };

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
    for (let i = 0; i < minLen; i++) {
      if (longer[i] !== shorter[i]) editDistance++;
    }
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
        `<span class="bg-blue-700 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
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
            const bestMatch = Math.max(
              ...productFields.map((field) => similarity(field, word))
            );
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-4 md:px-6 relative">
      {deleteModal.open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-11/12 max-w-md text-center shadow-lg border-2 border-gradient-to-r from-orange-400 via-blue-400 to-purple-500">
            <h2 className="text-xl font-bold text-white mb-4">Confirm Delete</h2>
            <p className="text-gray-200 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDeleteHandler}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteModal({ open: false, productId: null })}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 p-[2px] relative shadow-lg">
         <nav className="text-sm mb-1" aria-label="Breadcrumb">
            <ol className="list-reset flex text-white/80">
              <li><Link to="/warehouse" className="hover:text-white">Warehouse</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="font-semibold">Dashboard</li>
            </ol>
          </nav>

        <div className="bg-black/40 rounded-lg py-4 text-center">
        <h1 className="text-3xl font-semibold text-white tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      {!categoryModal && !uomModal && !productModal && !deleteModal.open && (
        <>
          <div className="md:hidden flex justify-center mb-4">
            <div className="w-full p-[2px] rounded-lg bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 shadow-lg">
              <input
                type="text"
                placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 rounded-md border-none bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-400 focus:ring-blue-400 focus:ring-purple-500 transition"
              />
            </div>
          </div>

          <div className="hidden md:flex justify-center mb-4 sticky top-4 z-50">
            <div className="w-full md:w-1/2 p-[2px] rounded-lg bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 shadow-lg">
              <input
                type="text"
                placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 rounded-md border-none bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-400 focus:ring-blue-400 focus:ring-purple-500 transition"
              />
            </div>
          </div>
        </>
      )}

      <div className="mb-6 space-y-4">
        <div>
          <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setOpenCategoryModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
            >
              + Add Category
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 rounded-full shadow">
                {categories?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setOpenUomModal(true)}
              disabled={userInfo && !userInfo.isAdmin}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
            >
              + Add UOM
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-green-400 via-lime-400 to-emerald-500 rounded-full shadow">
                {uom?.length || 0}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-200 mb-2 font-medium">Create Products</p>
          <button
            onClick={() => setOpenProductModal(true)}
            disabled={userInfo && !userInfo.isAdmin}
            className="flex items-center justify-between px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
          >
            + Add Product
            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-full shadow-lg">
              {products?.length || 0}
            </span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
        </div>
      ) : isError ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-lg p-[2px] bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 shadow-lg">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full text-left text-gray-200 border-collapse">
                <thead className="text-white uppercase bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500">
                  <tr className="h-16">
                    {["NAME","CATEGORY","SUPPLIER","STOCK","MODEL NO","MANUFACTURER","UOM","LOCATION","EDIT","DELETE"].map(head => (
                      <th key={head} className="py-4 px-4 border-b border-gray-700">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentProducts?.map(product => (
                    <tr key={product._id} className="transition-colors duration-300 hover:bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 hover:text-white">
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.category || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.supplier || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.stock?.toString() || "0", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.modelNo || "N/A", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.manufacturer || "", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.uom || "PCS", search)}} />
                      <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.location || "N/A", search)}} />
                      <td className="py-2 px-4 border-b">
                        <Link to={`/edit/${product._id}`}>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">Edit</button>
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => setDeleteModal({ open: true, productId: product._id })}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center"
                        >
                          <AiOutlineDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {currentProducts?.map(product => (
              <div 
                key={product._id} 
                className="p-[1px] rounded-lg bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500"
              >
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <h2 className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                  <div className="text-gray-200 text-sm space-y-1">
                    <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Category: ${product.category || "N/A"}`, search)}} />
                    <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Supplier: ${product.supplier || "N/A"}`, search)}} />
                    <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Stock: ${product.stock || 0}`, search)}} />
                    <p dangerouslySetInnerHTML={{ __html: highlightMatches(`UOM: ${product.uom || "PCS"}`, search)}} />
                    <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Location: ${product.location || "N/A"}`, search)}} />
                    <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Model No: ${product.modelNo || "N/A"}`, search)}} />
                    <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Manufacturer: ${product.manufacturer || "N/A"}`, search)}} />
                    <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Price: $${product.price || "0.00"}`, search)}} />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Link to={`/edit/${product._id}`} className="flex-1">
                      <button className="w-full bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition flex items-center justify-center gap-1">
                        <AiOutlineEdit /> Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => setDeleteModal({ open: true, productId: product._id })}
                      className="w-full bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition flex items-center justify-center gap-1"
                    >
                      <AiOutlineDelete /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-6 space-x-2"
            pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            activeClassName="bg-blue-600 text-white font-bold"
            previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
            nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
















*/












//good

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";

import { getProducts, deleteProduct } from "../redux/productSlice";
import { getCategories, getUoms } from "../redux/categorySlice";

import CategoryModel from "../components/CategoryModel";
import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { categories, uom } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [deleteModal, setDeleteModal] = useState({ open: false, productId: null });
  const productsPerPage = 8;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUoms());
  }, [dispatch]);

  const confirmDeleteHandler = async () => {
    if (!deleteModal.productId) return;
    try {
      await dispatch(deleteProduct(deleteModal.productId)).unwrap();
      dispatch(getProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
    setDeleteModal({ open: false, productId: null });
  };

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
    for (let i = 0; i < minLen; i++) {
      if (longer[i] !== shorter[i]) editDistance++;
    }
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
        `<span class="bg-blue-700 text-white rounded px-1 shadow-[0_0_3px_rgba(0,0,100,0.6)]">$1</span>`
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
            const bestMatch = Math.max(
              ...productFields.map((field) => similarity(field, word))
            );
            score += bestMatch;
          });

          return { product, score };
        })
        .filter(({ score }) => score > 0.2)
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-full mt-8 px-4 md:px-6 relative">
      {deleteModal.open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-11/12 max-w-md text-center shadow-lg border-2 border-gradient-to-r from-orange-400 via-blue-400 to-purple-500">
            <h2 className="text-xl font-bold text-white mb-4">Confirm Delete</h2>
            <p className="text-gray-200 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDeleteHandler}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteModal({ open: false, productId: null })}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-3xl mb-6 rounded-lg bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 p-[2px] relative shadow-lg">
        <nav className="text-sm mb-1" aria-label="Breadcrumb">
          <ol className="list-reset flex text-white/80">
            <li><Link to="/warehouse" className="hover:text-black">Warehouse</Link></li>
            <li><span className="mx-2">/</span></li>
            <li className="font-semibold">Dashboard</li>
          </ol>
        </nav>
        <div className="bg-black/40 rounded-lg py-4 text-center">
          <h1 className="text-3xl font-semibold text-blue tracking-wider">Dashboard</h1>
        </div>
      </div>

      {categoryModal && <CategoryModel onClose={() => setOpenCategoryModal(false)} />}
      {productModal && <CreateProduct onClose={() => setOpenProductModal(false)} />}
      {uomModal && <UomModel onClose={() => setOpenUomModal(false)} />}

      {!categoryModal && !uomModal && !productModal && !deleteModal.open && (
        <>
          <div className="mb-6 space-y-4">
            <div>
              <p className="text-gray-200 mb-2 font-medium">Setup Options (before adding products)</p>
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => setOpenCategoryModal(true)}
                  disabled={userInfo && !userInfo.isAdmin}
                  className="flex items-center justify-between px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition shadow-md transform hover:scale-105"
                >
                  + Add Category
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 rounded-full shadow">
                    {categories?.length || 0}
                  </span>
                </button>

                <button
                  onClick={() => setOpenUomModal(true)}
                  disabled={userInfo && !userInfo.isAdmin}
                  className="flex items-center justify-between px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition shadow-md transform hover:scale-105"
                >
                  + Add UOM
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-green-400 via-lime-400 to-emerald-500 rounded-full shadow">
                    {uom?.length || 0}
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-200 mb-2 font-medium">Create Products</p>
              <button
                onClick={() => setOpenProductModal(true)}
                disabled={userInfo && !userInfo.isAdmin}
                className="flex items-center justify-between px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg transform hover:scale-105"
              >
                + Add Product
                <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-full shadow-lg">
                  {products?.length || 0}
                </span>
              </button>
            </div>

            <div className="mt-4 md:mt-6">
              <div className="w-full md:w-1/2 mx-auto p-[2px] rounded-lg bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 shadow-lg">
                <input
                  type="text"
                  placeholder="Search Name, ModelNo, Category, UOM, Supplier, Location, Price..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full p-3 rounded-md border-none bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-400 focus:ring-blue-400 focus:ring-purple-500 transition"
                />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
            </div>
          ) : isError ? (
            <p className="text-red-500">{message}</p>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto rounded-lg p-[2px] bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 shadow-lg">
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-gray-200 border-collapse">
                    <thead className="text-white uppercase bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500">
                      <tr className="h-16">
                        {["NAME","CATEGORY","SUPPLIER","STOCK","MODEL NO","MANUFACTURER","UOM","LOCATION","EDIT","DELETE"].map(head => (
                          <th key={head} className="py-4 px-4 border-b border-gray-700">{head}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentProducts?.map(product => (
                        <tr key={product._id} className="transition-colors duration-300 hover:bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500 hover:text-white">
                          <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                          <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.category || "", search)}} />
                          <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.supplier || "", search)}} />
                          <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.stock?.toString() || "0", search)}} />
                          <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.modelNo || "N/A", search)}} />
                          <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.manufacturer || "", search)}} />
                          <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.uom || "PCS", search)}} />
                          <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{__html: highlightMatches(product.location || "N/A", search)}} />
                          <td className="py-2 px-4 border-b">
                            <Link to={`/edit/${product._id}`}>
                              <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition">Edit</button>
                            </Link>
                          </td>
                          <td className="py-2 px-4 border-b">
                            <button
                              onClick={() => setDeleteModal({ open: true, productId: product._id })}
                              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center justify-center"
                            >
                              <AiOutlineDelete size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:hidden">
                {currentProducts?.map(product => (
                  <div key={product._id} className="p-[1px] rounded-lg bg-gradient-to-r from-orange-400 via-blue-400 to-purple-500">
                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                      <h2 className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: product.name.toUpperCase().includes("FIRE") ? highlightMatches(product.name + " 🔥", search) : highlightMatches(product.name, search)}} />
                      <div className="text-gray-200 text-sm space-y-1">
                        <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Category: ${product.category || "N/A"}`, search)}} />
                        <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Supplier: ${product.supplier || "N/A"}`, search)}} />
                        <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Stock: ${product.stock || 0}`, search)}} />
                        <p dangerouslySetInnerHTML={{ __html: highlightMatches(`UOM: ${product.uom || "PCS"}`, search)}} />
                        <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Location: ${product.location || "N/A"}`, search)}} />
                        <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Model No: ${product.modelNo || "N/A"}`, search)}} />
                        <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Manufacturer: ${product.manufacturer || "N/A"}`, search)}} />
                        <p dangerouslySetInnerHTML={{ __html: highlightMatches(`Price: $${product.price || "0.00"}`, search)}} />
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Link to={`/edit/${product._id}`} className="flex-1">
                          <button className="w-full bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition flex items-center justify-center gap-1">
                            <AiOutlineEdit /> Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => setDeleteModal({ open: true, productId: product._id })}
                          className="w-full bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition flex items-center justify-center gap-1"
                        >
                          <AiOutlineDelete /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <ReactPaginate
                previousLabel={"←"}
                nextLabel={"→"}
                breakLabel={"..."}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName="flex justify-center items-center mt-6 space-x-2"
                pageClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
                activeClassName="bg-blue-600 text-white font-bold"
                previousClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
                nextClassName="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 transition"
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;













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

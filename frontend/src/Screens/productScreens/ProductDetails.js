/*  import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Select } from "antd";
import { BiCart } from "react-icons/bi";
import { getProduct } from "../../redux/productSlice";
import { addToCart } from "../../redux/cartSlice";

const { Option } = Select;

const ProductDetails = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const { product, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const selectRef = useRef();
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      const parsedValue = parseInt(inputValue, 10);

      if (parsedValue && parsedValue > 0 && parsedValue <= product.stock) {
        setQty(parsedValue);
      }
    }
  };

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch]);

  const addRequisitionHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/store-requisition");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-3xl font-bold mb-6 text-center">ASSET DETAIL</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-500 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl text-white font-semibold mb-4">
            {product?.name}
          </h1>
          <p className="text-gray-300 text-lg leading-6 mb-4">
            {product?.description}
          </p>
          <p className="text-gray-300 text-lg mb-2">
            {product?.manufacturer && (
              <>
                <span className="font-semibold">Manufacturer:</span>{" "}
                {product?.manufacturer}
              </>
            )}
          </p>
          <p className="text-gray-300 text-lg mb-2">
            {product?.supplier && (
              <>
                <span className="font-semibold">Supplier:</span>{" "}
                {product?.supplier}
              </>
            )}
          </p>
          <p className="text-gray-300 text-lg mb-2">
            <span className="font-semibold">Price:</span> ${product?.price}
          </p>
          <div>
            <div className=" py-3">
              <h3>SElect QTY</h3>
            </div>
            <div className="flex items-center space-x-4">
              <input
                placeholder=" ADD  QTY  HERE"
                value={inputValue}
                onChange={handleInputChange}
                ref={selectRef}
                onKeyPress={handleInputKeyPress}
                className="text-gray-700 outline-none p-1 rounded-2xl"
              />
              <Select
                onChange={(value) => setQty(value)}
                value={qty}
                className="w-[100%]"
              >
                {[
                  ...Array(product.stock)
                    .keys()
                  
                ]}
              </Select>
            </div>
          </div>
        </div>
        <div className="bg-gray-600 p-6 rounded-lg shadow-lg">
          <div className="text-white">
            <p className="text-lg font-semibold mb-2">Stock Information:</p>
            <p className="text-md mb-4">
              {product?.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <p className="text-md mb-4">
              <span className="font-semibold">Stock:</span> {product?.stock}
            </p>
            <p className="text-md mb-4">
              <span className="font-semibold">Quantity:</span> {product?.qty}
            </p>
            <p className="text-md mb-4">
              <span className="font-semibold">Unit of Measure:</span>{" "}
              {product?.uom}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full text-left my-4">
        <button
          className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-red-500 text-white text-md font-bold border border-red-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-red-500 lg:m-0 md:px-6"
          title="Confirm Order"
          onClick={addRequisitionHandler}
          disabled={product?.stock === 0}
        >
          <span>Add Requisition</span>
          <BiCart size={28} />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
/*/




/*
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
import { BiCart } from "react-icons/bi";
import { getProduct } from "../../redux/productSlice";
import { addToCart } from "../../redux/cartSlice";

const { Option } = Select;

const ProductDetails = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const { product, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const selectRef = useRef();
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();
  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      const parsedValue = parseInt(inputValue, 10);
      if (parsedValue && parsedValue > 0 && parsedValue <= product.stock) {
        setQty(parsedValue);
      }
    }
  };

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  const addRequisitionHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/store-requisition");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h3 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Asset Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl text-white font-bold mb-4">{product?.name}</h1>
          <p className="text-gray-300 text-lg leading-6 mb-6">{product?.description}</p>

          {product?.manufacturer && (
            <p className="text-gray-300 text-lg mb-2">
              <span className="font-semibold">Manufacturer:</span> {product.manufacturer}
            </p>
          )}
          {product?.supplier && (
            <p className="text-gray-300 text-lg mb-2">
              <span className="font-semibold">Supplier:</span> {product.supplier}
            </p>
          )}

          <p className="text-gray-300 text-lg mb-6">
            <span className="font-semibold">Price:</span> ${product?.price}
          </p>

          <div className="mb-4">
            <h3 className="text-white mb-2 font-semibold">Quantity to Request</h3>
            <div className="flex items-center gap-3">
              <input
                placeholder="Enter quantity"
                value={inputValue}
                onChange={handleInputChange}
                ref={selectRef}
                onKeyPress={handleInputKeyPress}
                className="w-32 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={product?.stock === 0}
              />
              <Select
                onChange={(value) => setQty(value)}
                value={qty}
                className="min-w-[100px]"
                disabled={product?.stock === 0}
              >
                {[...Array(product.stock).keys()].map((x) => (
                  <Option key={x + 1} value={x + 1}>
                    {x + 1}
                  </Option>
                ))}
              </Select>
            </div>
            {product?.stock > 0 && (
              <p className="text-gray-300 text-sm mt-1">
                You can request up to {product.stock} items.
              </p>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-600 to-gray-800 p-8 rounded-2xl shadow-lg">
          <div className="text-white space-y-3">
            <p className="text-lg font-semibold">Available Stock:</p>
            <p
              className={`text-md font-medium ${
                product?.stock > 0 ? "text-green-400" : "text-red-500"
              }`}
            >
              {product?.stock > 0 ? `✅ ${product.stock} units available` : "❌ Out of Stock"}
            </p>
            <p className="text-md">
              <span className="font-semibold">Unit of Measure:</span> {product?.uom}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          className="flex justify-center items-center gap-2 w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Confirm Order"
          onClick={addRequisitionHandler}
          disabled={product?.stock === 0}
        >
          <span>Add Requisition</span>
          <BiCart size={24} />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
*/





/*
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { Select } from "antd";

const { Option } = Select;

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedProducts } = location.state || {};

  const [quantities, setQuantities] = useState(
    selectedProducts?.reduce((acc, product) => {
      acc[product._id] = 1;
      return acc;
    }, {}) || {}
  );

  const handleQtyChange = (productId, value) => {
    setQuantities({ ...quantities, [productId]: value });
  };

  const addRequisitions = () => {
    selectedProducts.forEach((product) => {
      const qty = quantities[product._id] || 1;
      dispatch(addToCart({ ...product, qty }));
    });
    navigate("/store-requisition");
  };

  if (!selectedProducts || selectedProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
        No products selected.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
        Requisition Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              {product.manufacturer && (
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Manufacturer:</span> {product.manufacturer}
                </p>
              )}
              {product.supplier && (
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Supplier:</span> {product.supplier}
                </p>
              )}
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Stock:</span> {product.stock}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Unit of Measure:</span> {product.uom || "PCS"}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Price:</span> ${product.price?.toFixed(2) || "0.00"}
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-gray-800 font-semibold mb-1">Select Quantity</h3>
              <div className="flex items-center gap-3">
                <Select
                  value={quantities[product._id]}
                  onChange={(value) => handleQtyChange(product._id, value)}
                  className="min-w-[100px]"
                >
                  {[...Array(product.stock > 0 ? product.stock : 1).keys()].map((x) => (
                    <Option key={x + 1} value={x + 1}>
                      {x + 1}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-4 bg-white py-4 flex justify-center">
        <button
          className="px-6 py-3 bg-blue-700 text-white font-bold rounded-lg shadow-md hover:bg-blue-800 transition-all flex items-center gap-2"
          onClick={addRequisitions}
        >
          <span>Add All Requisitions</span>
          <BiCart size={24} />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
*/






import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { Select } from "antd";

const { Option } = Select;

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedProducts } = location.state || {};

  const [quantities, setQuantities] = useState(
    selectedProducts?.reduce((acc, product) => {
      acc[product._id] = 1;
      return acc;
    }, {}) || {}
  );

  const handleQtyChange = (productId, value) => {
    setQuantities({ ...quantities, [productId]: value });
  };

  const addRequisitions = () => {
    selectedProducts.forEach((product) => {
      const qty = quantities[product._id] || 1;
      dispatch(addToCart({ ...product, qty }));
    });
    navigate("/store-requisition");
  };

  if (!selectedProducts || selectedProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
        No products selected.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
        Requisition Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              {product.manufacturer && (
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Manufacturer:</span> {product.manufacturer}
                </p>
              )}
              {product.supplier && (
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Supplier:</span> {product.supplier}
                </p>
              )}
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Stock:</span> {product.stock}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Unit of Measure:</span> {product.uom || "PCS"}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Price:</span> ${product.price?.toFixed(2) || "0.00"}
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-gray-800 font-semibold mb-1">Select Quantity</h3>
              <div className="flex items-center gap-3">
                <Select
                  value={quantities[product._id]}
                  onChange={(value) => handleQtyChange(product._id, value)}
                  className="min-w-[100px]"
                >
                  {[...Array(product.stock > 0 ? product.stock : 1).keys()].map((x) => (
                    <Option key={x + 1} value={x + 1}>
                      {x + 1}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-4 bg-white py-4 flex justify-center">
        <button
          className="px-6 py-3 bg-blue-700 text-white font-bold rounded-lg shadow-md hover:bg-blue-800 transition-all flex items-center gap-2"
          onClick={addRequisitions}
        >
          <span>Add All Requisitions</span>
          <BiCart size={24} />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

/*

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckSteps from "../../components/CheckSteps";
import { saveRequisitionMethod } from "../../redux/cartSlice";

const RequisitionType = () => {
  const [type1, saveTypeOne] = useState("FACTORY REQUISITION"); //for warehouse empolee
  const [type2, saveTypeTwo] = useState("PURCHASE REQUISITION"); //fo procurement people
  const [selectedRequisitionType, setSelectedRequisitionType] = useState(
    "FACTORY REQUISITION"
  );

  const cart = useSelector((state) => state.cart);
  const { requisitionSteps } = cart;
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [requisitionSteps, userInfo, navigate]);

  const handleSelectChange = (event) => {
    setSelectedRequisitionType(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Dispatch action to save the selected type
    dispatch(saveRequisitionMethod(selectedRequisitionType));

    if (selectedRequisitionType === "FACTORY REQUISITION") {
      navigate("/confirm-requisition");
    } else if (selectedRequisitionType === "PURCHASE REQUISITION") {
      navigate("/purchase-requisition");
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-4 py-3">

        <div>
          <h3>REQUISITION METHOD </h3>

          <form
            className="mt-1 flex flex-col space-y-3"
            onSubmit={submitHandler}
          >
            <div className="mb-4">
              <label
                htmlFor="requisitionType"
                className="text-lg font-medium text-slate-300 dark:text-gray-300"
              >
                Choose Requisition Type:
              </label>

              <select
                id="requisitionType"
                onChange={handleSelectChange}
                value={selectedRequisitionType}
                className="w-full py-2 px-3 mt-1 border border-gray-300 bg-white text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="FACTORY REQUISITION">FACTORY REQUISITION</option>
                <option value="PURCHASE REQUISITION">
                  PURCHASE REQUISITION
                </option>
              </select>
            </div>

            <button
              className="px-4 bg-blue-400 p-2 rounded-lg  w-[120px]"
              type="submit"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RequisitionType;
*/


/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckSteps from "../../components/CheckSteps";
import { saveRequisitionMethod } from "../../redux/cartSlice";

const RequisitionType = () => {
  const [selectedRequisitionType, setSelectedRequisitionType] = useState(
    "FACTORY REQUISITION"
  );

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  const handleCardClick = (type) => {
    setSelectedRequisitionType(type);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveRequisitionMethod(selectedRequisitionType));

    if (selectedRequisitionType === "FACTORY REQUISITION") {
      navigate("/confirm-requisition");
    } else {
      navigate("/purchase-requisition");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start py-10 px-4 sm:px-6 lg:px-8">
      <CheckSteps step1 step2 />

      <div className="w-full max-w-2xl flex flex-col items-center space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-blue-400 drop-shadow-md">
          Requisition Method
        </h2>

        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          {["FACTORY REQUISITION", "PURCHASE REQUISITION"].map((type) => (
            <div
              key={type}
              onClick={() => handleCardClick(type)}
              className={`cursor-pointer flex-1 p-6 rounded-2xl text-center font-bold text-lg sm:text-xl transition
                ${
                  selectedRequisitionType === type
                    ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-md"
                }`}
            >
              {type}
            </div>
          ))}
        </div>

        <button
          onClick={submitHandler}
          className="mt-6 w-full sm:w-auto py-3 px-6 bg-blue-500 hover:bg-blue-600 transition text-white font-bold rounded-xl shadow-lg text-lg"
        >
          Continue
        </button>

        {cartItems.length > 0 && (
          <div className="mt-6 bg-gray-700 rounded-xl p-4 shadow-md overflow-x-auto w-full">
            <h3 className="text-blue-400 font-bold mb-3 text-lg text-center">
              Selected Products
            </h3>
            <table className="min-w-full border-collapse text-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-800">
                  <th className="py-2 px-3 text-left">Product</th>
                  <th className="py-2 px-3 text-left">Qty</th>
                  <th className="py-2 px-3 text-left">Stock</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                    }`}
                  >
                    <td className="py-2 px-3">{item.name}</td>
                    <td className="py-2 px-3 font-bold text-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.8)]">
                      {item.qty}
                    </td>
                    <td className="py-2 px-3">{item.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequisitionType;
*/






/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckSteps from "../../components/CheckSteps";
import { saveRequisitionMethod } from "../../redux/cartSlice";

const RequisitionType = () => {
  const [selectedRequisitionType, setSelectedRequisitionType] = useState(
    "FACTORY REQUISITION"
  );

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  const handleCardClick = (type) => {
    setSelectedRequisitionType(type);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveRequisitionMethod(selectedRequisitionType));

    if (selectedRequisitionType === "FACTORY REQUISITION") {
      navigate("/confirm-requisition");
    } else {
      navigate("/purchase-requisition");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start py-10 px-4 sm:px-6 lg:px-8">
      <CheckSteps step1 step2 />

      <div className="w-full max-w-2xl flex flex-col items-center space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-blue-400 drop-shadow-md">
          Requisition Method
        </h2>

        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          {["FACTORY REQUISITION", "PURCHASE REQUISITION"].map((type) => (
            <div
              key={type}
              onClick={() => handleCardClick(type)}
              className={`cursor-pointer flex-1 p-6 rounded-2xl text-center font-bold text-lg sm:text-xl transition
                ${
                  selectedRequisitionType === type
                    ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-md"
                }`}
            >
              {type}
            </div>
          ))}
        </div>

        <button
          onClick={submitHandler}
          className="mt-6 w-full sm:w-auto py-3 px-6 bg-blue-500 hover:bg-blue-600 transition text-white font-bold rounded-xl shadow-lg text-lg"
        >
          Continue
        </button>

        {cartItems.length > 0 && (
          <div className="mt-6 bg-gray-700 rounded-xl p-4 shadow-md overflow-x-auto w-full">
            <h3 className="text-blue-400 font-bold mb-3 text-lg text-center">
              Selected Products
            </h3>
            <table className="min-w-full border-collapse text-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-800">
                  <th className="py-2 px-3 text-left">Product</th>
                  <th className="py-2 px-3 text-left">Qty</th>
                  <th className="py-2 px-3 text-left">Stock</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                    }`}
                  >
                    <td className="py-2 px-3">{item.name}</td>

                    <td className="py-2 px-3 font-bold">
                      <span
                        className={`${
                          selectedRequisitionType === "PURCHASE REQUISITION"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {selectedRequisitionType === "PURCHASE REQUISITION"
                          ? "+"
                          : "-"}
                      </span>{" "}
                      <span className="text-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.8)]">
                        {item.qty}
                      </span>
                    </td>

                    <td className="py-2 px-3">{item.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequisitionType;
*/




/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckSteps from "../../components/CheckSteps";
import { saveRequisitionMethod } from "../../redux/cartSlice";

const RequisitionType = () => {
  const [selectedRequisitionType, setSelectedRequisitionType] = useState(
    "FACTORY REQUISITION"
  );

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  const handleCardClick = (type) => {
    setSelectedRequisitionType(type);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveRequisitionMethod(selectedRequisitionType));

    if (selectedRequisitionType === "FACTORY REQUISITION") {
      navigate("/confirm-requisition");
    } else {
      navigate("/purchase-requisition");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start py-10 px-4 sm:px-6 lg:px-8">
      <CheckSteps step1 step2 />

      <div className="w-full max-w-2xl flex flex-col items-center space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-blue-400 drop-shadow-md">
          Requisition Type
        </h2>

        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          {["FACTORY REQUISITION", "PURCHASE REQUISITION"].map((type) => (
            <div
              key={type}
              onClick={() => handleCardClick(type)}
              className={`cursor-pointer flex-1 p-6 rounded-2xl text-center font-bold text-lg sm:text-xl transition
                ${
                  selectedRequisitionType === type
                    ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-md"
                }`}
            >
              {type}
            </div>
          ))}
        </div>

        <button
          onClick={submitHandler}
          className="mt-6 w-full sm:w-auto py-3 px-6 bg-blue-500 hover:bg-blue-600 transition text-white font-bold rounded-xl shadow-lg text-lg"
        >
          Continue
        </button>

        {cartItems.length > 0 && (
          <div className="mt-6 bg-gray-700 rounded-xl p-4 shadow-md overflow-x-auto w-full">
            <h3 className="text-blue-400 font-bold mb-3 text-lg text-center">
              Selected Products
            </h3>
            <table className="min-w-full border-collapse text-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-800">
                  <th className="py-2 px-3 text-left">Product</th>
                  <th className="py-2 px-3 text-left">Qty</th>
                  <th className="py-2 px-3 text-left">Stock</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                    }`}
                  >
                    <td className="py-2 px-3">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-100">{item.name}</span>
                        {item.category && (
                          <span className="text-xs text-gray-400 italic">
                            {item.category}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-2 px-3 font-bold">
                      <span
                        className={`${
                          selectedRequisitionType === "PURCHASE REQUISITION"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {selectedRequisitionType === "PURCHASE REQUISITION"
                          ? "+"
                          : "-"}
                      </span>{" "}
                      <span className="text-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.8)]">
                        {item.qty}
                      </span>
                    </td>

                    <td className="py-2 px-3">{item.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequisitionType;
*/






/*
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckSteps from "../../components/CheckSteps";
import { saveRequisitionMethod } from "../../redux/cartSlice";

const RequisitionType = () => {
  const [selectedRequisitionType, setSelectedRequisitionType] = useState(
    "FACTORY REQUISITION"
  );

  const { cartItems } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = (type) => {
    setSelectedRequisitionType(type);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveRequisitionMethod(selectedRequisitionType));

    if (selectedRequisitionType === "FACTORY REQUISITION") {
      navigate("/confirm-requisition");
    } else {
      navigate("/purchase-requisition");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-start py-10 px-4 sm:px-6 lg:px-8">

      <div className="w-full max-w-3xl flex flex-col items-center space-y-8">
        <h2 className="text-3xl font-extrabold text-center text-blue-400 drop-shadow-lg tracking-wide">
          Choose Requisition Type
        </h2>

        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          {["FACTORY REQUISITION", "PURCHASE REQUISITION"].map((type) => (
            <div
              key={type}
              onClick={() => handleCardClick(type)}
              className={`cursor-pointer w-full sm:flex-1 p-6 rounded-2xl text-center font-semibold text-lg sm:text-xl transition duration-300 ease-in-out transform hover:scale-105
                ${
                  selectedRequisitionType === type
                    ? "bg-blue-600 text-white shadow-[0_0_25px_rgba(59,130,246,0.9)]"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-md"
                }`}
            >
              {type}
            </div>
          ))}
        </div>

        <button
          onClick={submitHandler}
          className="mt-6 w-full sm:w-auto py-3 px-8 bg-blue-500 hover:bg-blue-600 transition duration-200 text-white font-bold rounded-xl shadow-lg text-lg tracking-wide"
        >
          Continue
        </button>

        {cartItems.length > 0 && (
          <div className="mt-8 bg-gray-800/70 rounded-2xl p-5 shadow-xl backdrop-blur-sm w-full border border-gray-700">
            <h3 className="text-blue-400 font-bold mb-4 text-xl text-center">
              Selected Products
            </h3>

            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full border-collapse text-gray-200 text-sm rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-900/70">
                    <th className="py-3 px-4 text-left font-semibold">Product</th>
                    <th className="py-3 px-4 text-left font-semibold">Qty</th>
                    <th className="py-3 px-4 text-left font-semibold">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr
                      key={item._id}
                      className={`transition ${
                        index % 2 === 0 ? "bg-gray-800/60" : "bg-gray-900/40"
                      } hover:bg-gray-700/60`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-100">
                            {item.name}
                          </span>
                          {item.category && (
                            <span className="text-xs text-gray-400 italic">
                              {item.category}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-bold">
                        <span
                          className={`mr-1 ${
                            selectedRequisitionType === "PURCHASE REQUISITION"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {selectedRequisitionType === "PURCHASE REQUISITION"
                            ? "+"
                            : "-"}
                        </span>
                        <span className="text-blue-400 drop-shadow-md">
                          {item.qty}
                        </span>
                      </td>
                      <td className="py-3 px-4">{item.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="sm:hidden flex flex-col gap-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-900/70 rounded-xl p-4 shadow-md border border-gray-700"
                >
                  <div className="font-semibold text-gray-100 text-base">
                    {item.name}
                  </div>
                  {item.category && (
                    <div className="text-xs text-gray-400 italic mb-2">
                      {item.category}
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="font-bold">
                      Qty:{" "}
                      <span
                        className={
                          selectedRequisitionType === "PURCHASE REQUISITION"
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {selectedRequisitionType === "PURCHASE REQUISITION"
                          ? "+"
                          : "-"}
                      </span>{" "}
                      <span className="text-blue-400">{item.qty}</span>
                    </span>
                    <span>Stock: {item.stock}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequisitionType;
*/







//?
/*
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveRequisitionMethod } from "../../redux/cartSlice";

const RequisitionType = () => {
  const [selectedRequisitionType, setSelectedRequisitionType] = useState(
    "FACTORY REQUISITION"
  );

  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = (type) => setSelectedRequisitionType(type);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveRequisitionMethod(selectedRequisitionType));
    if (selectedRequisitionType === "FACTORY REQUISITION") {
      navigate("/confirm-requisition");
    } else {
      navigate("/purchase-requisition");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl flex flex-col items-center space-y-8">
        <h2 className="text-3xl font-extrabold text-center text-blue-400 drop-shadow-lg tracking-wide">
         📋 Choose Requisition Type
        </h2>

        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          {["FACTORY REQUISITION", "PURCHASE REQUISITION"].map((type) => (
            <div
              key={type}
              onClick={() => handleCardClick(type)}
              className={`cursor-pointer w-full sm:flex-1 p-6 rounded-2xl text-center font-semibold text-lg sm:text-xl transition-transform duration-300 ease-in-out hover:scale-105 ${
                selectedRequisitionType === type
                  ? "bg-blue-600 text-white shadow-[0_0_25px_rgba(59,130,246,0.9)]"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-md"
              }`}
            >
              {type}
            </div>
          ))}
        </div>

        <button
          onClick={submitHandler}
          className="mt-6 w-full sm:w-auto py-3 px-8 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg text-lg tracking-wide"
        >
          Continue
        </button>

        {cartItems.length > 0 && (
          <div className="mt-8 bg-gray-800/70 rounded-2xl p-5 shadow-xl backdrop-blur-sm w-full border border-gray-700">
            <h3 className="text-blue-400 font-bold mb-4 text-xl text-center">
              Selected Products
            </h3>

            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full border-collapse text-gray-200 text-sm rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-900/70">
                    <th className="py-3 px-4 text-left font-semibold">Product</th>
                    <th className="py-3 px-4 text-center font-semibold">Qty</th>
                    <th className="py-3 px-4 text-left font-semibold">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr
                      key={item._id}
                      className={`transition ${
                        index % 2 === 0 ? "bg-gray-800/60" : "bg-gray-900/40"
                      } hover:bg-gray-700/60`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-100">{item.name}</span>
                          {item.category && (
                            <span className="text-xs text-gray-400 italic">{item.category}</span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4 font-bold text-center">
                        <div className="inline-grid grid-cols-[auto_auto] justify-center items-center gap-1">
                          <span
                            className={
                              selectedRequisitionType === "PURCHASE REQUISITION"
                                ? "text-green-400 text-xl sm:text-2xl font-extrabold drop-shadow-[0_0_6px_rgba(72,187,120,0.9)] hover:drop-shadow-[0_0_12px_rgba(72,187,120,1)] transition-all"
                                : "text-red-500 text-xl sm:text-2xl font-extrabold drop-shadow-[0_0_6px_rgba(239,68,68,0.9)] hover:drop-shadow-[0_0_12px_rgba(239,68,68,1)] transition-all"
                            }
                          >
                            {selectedRequisitionType === "PURCHASE REQUISITION" ? "+" : "-"}
                          </span>
                          <span className="text-blue-400 drop-shadow-md">{item.qty}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4">{item.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="sm:hidden flex flex-col gap-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-900/70 rounded-xl p-4 shadow-md border border-gray-700"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-100 text-base">{item.name}</span>
                  </div>
                  {item.category && (
                    <div className="text-xs text-gray-400 italic mb-2">{item.category}</div>
                  )}
                  <div className="flex justify-between text-sm items-center">
                    <span className="font-bold flex items-center justify-center gap-1">
                      Qty:
                      <span
                        className={
                          selectedRequisitionType === "PURCHASE REQUISITION"
                            ? "text-green-400 text-xl font-extrabold drop-shadow-[0_0_6px_rgba(72,187,120,0.9)] hover:drop-shadow-[0_0_12px_rgba(72,187,120,1)] transition-all"
                            : "text-red-500 text-xl font-extrabold drop-shadow-[0_0_6px_rgba(239,68,68,0.9)] hover:drop-shadow-[0_0_12px_rgba(239,68,68,1)] transition-all"
                        }
                      >
                        {selectedRequisitionType === "PURCHASE REQUISITION" ? "+" : "-"}
                      </span>
                      <span className="text-blue-400">{item.qty}</span>
                    </span>
                    <span>Stock: {item.stock}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequisitionType;
*/




//??


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveRequisitionMethod } from "../../redux/cartSlice";

const RequisitionType = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get the current requisition type from Redux (if any)
  const requisitionTypeFromStore = useSelector((state) => state.cart.requisitionSteps);
  const [selectedRequisitionType, setSelectedRequisitionType] = useState(
    requisitionTypeFromStore || "FACTORY REQUISITION"
  );

  // Update Redux when a card is clicked
  const handleCardClick = (type) => {
    setSelectedRequisitionType(type);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Save the selected type in Redux
    dispatch(saveRequisitionMethod(selectedRequisitionType));

    if (selectedRequisitionType === "FACTORY REQUISITION") {
      navigate("/confirm-requisition");
    } else {
      navigate("/purchase-requisition");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl flex flex-col items-center space-y-8">
        <h2 className="text-3xl font-extrabold text-center text-blue-400 drop-shadow-lg tracking-wide">
          📋 Choose Requisition Type
        </h2>

        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          {["FACTORY REQUISITION", "PURCHASE REQUISITION"].map((type) => (
            <div
              key={type}
              onClick={() => handleCardClick(type)}
              className={`cursor-pointer w-full sm:flex-1 p-6 rounded-2xl text-center font-semibold text-lg sm:text-xl transition-transform duration-300 ease-in-out hover:scale-105 ${
                selectedRequisitionType === type
                  ? "bg-blue-600 text-white shadow-[0_0_25px_rgba(59,130,246,0.9)]"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-md"
              }`}
            >
              {type}
            </div>
          ))}
        </div>

        <button
          onClick={submitHandler}
          className="mt-6 w-full sm:w-auto py-3 px-8 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg text-lg tracking-wide"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RequisitionType;










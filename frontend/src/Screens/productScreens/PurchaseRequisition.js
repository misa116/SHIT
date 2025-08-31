/* import React, { useState } from "react";
import ApprovedModal from "../../components/ApprovedModal";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

const PurchaseRequisition = () => {
  const { cartItems, requisitionSteps } = useSelector((state) => state.cart);
  const [showApprovedModal, setShowApprovedModal] = useState(false);
  const navigate = useNavigate();
  const removeFromCartHandler = () => {};
  const requisitionTypeHandler = () => {
    navigate("/requisition-type");
  };
  return (
    <div className="product-list">
      <div className=" grid grid-rows-2 grid-flow-col gap-4 mt-3 md:mt-16 py-6">
        {" "}
        <div className="">
          <h1>FACTORY REQUISITION Note</h1>
          {cartItems.length === 0 ? (
            <h4>
              Your Cart is Empty{" "}
              <Link to="/dashboard" className="underline">
                Go back
              </Link>
            </h4>
          ) : (
            <div className="table w-full">
              <table className="min-w-full bg-gray-600 border border-gray-200 text-slate-100">
                <thead>
                  <tr className="py-2 px-4 border-b">
                    <th>PRODUCT NAME</th>
                    <th className="py-2 px-4 border-b">UOM</th>
                    <th className="py-2 px-4 border-b"> STOCK</th>
                    <th className="py-2 px-4 border-b">MANUFACTURER</th>
                    <th className="py-2 px-4 border-b">MODEL NO</th>
                    <th className="py-2 px-4 border-b">QTY</th>
                    <th className="py-2 px-4 border-b">RM</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>

                      <td className="py-2 px-4 border-b">PCS</td>
                      <td className="py-2 px-4 border-b">{item?.stock}</td>
                      <td className="py-2 px-4 border-b">
                        {item?.manufacturer ? item.manufacturer : "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {item?.modelNO ? item.modelNO : "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b">{item?.qty}</td>
                      <td onClick={() => removeFromCartHandler(item._id)}>
                        <AiOutlineDelete size={28} className="text-red-700  " />{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {cartItems.length > 0 &&
            Object.keys(requisitionSteps).length === 0 && (
              <div className="mt-4 flex justify-end mr-6">
                <div className="">
                  <button
                    onClick={requisitionTypeHandler}
                    className="btn btn-primary mt-4 px-6 bg-gray-300 text-gray-900 p-2 rounded-xl"
                  >
                    CONTINUE REQUISITION
                  </button>
                </div>
              </div>
            )}

          {cartItems?.length > 0 && requisitionSteps && (
            <div className="mt-4 flex justify-end mr-6">
              <div className="">
                <button
                  onClick={() => setShowApprovedModal(true)}
                  className="btn btn-primary mt-4 px-6 bg-gray-300 text-gray-900 p-2 rounded-xl"
                >
                  CONTINUE ORDER
                </button>
              </div>
            </div>
          )}

          {showApprovedModal && (
            <ApprovedModal
              showApprovedModal={showApprovedModal}
              setShowApprovedModal={setShowApprovedModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseRequisition;

*/







/*

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import ApprovedModal from "../../components/ApprovedModal";

const PurchaseRequisition = () => {
  const { cartItems, requisitionSteps } = useSelector((state) => state.cart);
  const [showApprovedModal, setShowApprovedModal] = useState(false);
  const navigate = useNavigate();

  const removeFromCartHandler = (id) => {
    // Implement remove logic here
  };

  const requisitionTypeHandler = () => navigate("/requisition-type");

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          FACTORY REQUISITION Note
        </h1>

        {cartItems.length === 0 ? (
          <h4 className="text-gray-700">
            Your Cart is Empty.{" "}
            <Link to="/dashboard" className="underline text-indigo-600 hover:text-indigo-800">
              Go back
            </Link>
          </h4>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full bg-gray-700 text-gray-100">
              <thead className="bg-gray-800">
                <tr>
                  <th className="py-3 px-4 text-left">PRODUCT NAME</th>
                  <th className="py-3 px-4 text-left">UOM</th>
                  <th className="py-3 px-4 text-left">STOCK</th>
                  <th className="py-3 px-4 text-left">MANUFACTURER</th>
                  <th className="py-3 px-4 text-left">MODEL NO</th>
                  <th className="py-3 px-4 text-left">QTY</th>
                  <th className="py-3 px-4 text-left">RM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                {cartItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-600 transition-colors">
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">PCS</td>
                    <td className="py-2 px-4">{item.stock}</td>
                    <td className="py-2 px-4">{item.manufacturer || "N/A"}</td>
                    <td className="py-2 px-4">{item.modelNO || "N/A"}</td>
                    <td className="py-2 px-4">{item.qty}</td>
                    <td className="py-2 px-4 cursor-pointer">
                      <AiOutlineDelete
                        size={24}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        onClick={() => removeFromCartHandler(item._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {cartItems.length > 0 && Object.keys(requisitionSteps).length === 0 && (
          <div className="flex justify-end mt-6">
            <button
              onClick={requisitionTypeHandler}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              CONTINUE REQUISITION
            </button>
          </div>
        )}

        {cartItems.length > 0 && requisitionSteps && (
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setShowApprovedModal(true)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              CONTINUE ORDER
            </button>
          </div>
        )}

        {showApprovedModal && (
          <ApprovedModal
            showApprovedModal={showApprovedModal}
            setShowApprovedModal={setShowApprovedModal}
          />
        )}
      </div>
    </div>
  );
};

export default PurchaseRequisition;
*/


/*
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import ApprovedModal from "../../components/ApprovedModal";

const PurchaseRequisition = () => {
  const { cartItems, requisitionSteps } = useSelector((state) => state.cart);
  const [showApprovedModal, setShowApprovedModal] = useState(false);
  const navigate = useNavigate();

  const removeFromCartHandler = (id) => {
    // Implement remove logic here
  };

  const requisitionTypeHandler = () => navigate("/requisition-type");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl flex flex-col space-y-8">
        <div className="flex w-full justify-start">
          <button
            onClick={requisitionTypeHandler}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg shadow-md transition-colors flex items-center gap-2"
          >
            ← Back
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-400 drop-shadow-lg tracking-wide">
          📋 PURCHASE REQUISITION NOTE
        </h1>

        {cartItems.length === 0 ? (
          <h4 className="text-gray-300 text-center text-lg">
            Your Cart is Empty.{" "}
            <Link
              to="/dashboard"
              className="underline text-blue-400 hover:text-blue-600"
            >
              Go back
            </Link>
          </h4>
        ) : (
          <div className="w-full">
            <div className="hidden sm:block overflow-x-auto rounded-2xl shadow-xl border border-gray-700">
              <table className="min-w-full text-gray-200 text-sm">
                <thead className="bg-gray-800">
                  <tr>
                    {[
                      "PRODUCT NAME",
                      "UOM",
                      "STOCK",
                      "MANUFACTURER",
                      "MODEL NO",
                      "QTY",
                      "RM",
                    ].map((title) => (
                      <th
                        key={title}
                        className="py-3 px-4 text-left font-semibold"
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {cartItems.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-700 transition-colors"
                    >
                      <td className="py-2 px-4">{item.name}</td>
                      <td className="py-2 px-4">PCS</td>
                      <td className="py-2 px-4">{item.stock}</td>
                      <td className="py-2 px-4">{item.manufacturer || "N/A"}</td>
                      <td className="py-2 px-4">{item.modelNO || "N/A"}</td>
                      <td className="py-2 px-4 font-bold text-center">
                        <span className="text-green-400 text-xl sm:text-2xl font-extrabold drop-shadow-[0_0_6px_rgba(72,187,120,0.9)] hover:drop-shadow-[0_0_12px_rgba(72,187,120,1)] transition-all mr-1">
                          +
                        </span>
                        <span className="text-blue-400 drop-shadow-md">{item.qty}</span>
                      </td>
                      <td className="py-2 px-4 cursor-pointer">
                        <AiOutlineDelete
                          size={24}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          onClick={() => removeFromCartHandler(item._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="sm:hidden flex flex-col gap-4">
              {cartItems.map((item) => (
                <div className="bg-gray-800/80 p-4 rounded-2xl shadow-md border border-gray-700 flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-100">{item.name}</span>
                    <AiOutlineDelete
                      size={22}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => removeFromCartHandler(item._id)}
                    />
                  </div>
                  <div className="text-sm text-gray-300 flex flex-col space-y-1">
                    <span>UOM: PCS</span>
                    <span>Stock: {item.stock}</span>
                    <span>Manufacturer: {item.manufacturer || "N/A"}</span>
                    <span>Model No: {item.modelNO || "N/A"}</span>
                    <span className="text-center font-bold text-blue-400 text-lg drop-shadow-md">
                      Qty:{" "}
                      <span className="text-green-400 text-2xl font-extrabold drop-shadow-[0_0_6px_rgba(72,187,120,0.9)] hover:drop-shadow-[0_0_12px_rgba(72,187,120,1)] transition-all mr-1">
                        +
                      </span>
                      {item.qty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
          {cartItems.length > 0 && Object.keys(requisitionSteps).length === 0 && (
            <button
              onClick={requisitionTypeHandler}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-colors"
            >
              CONTINUE REQUISITION
            </button>
          )}

          {cartItems.length > 0 && requisitionSteps && (
            <button
              onClick={() => setShowApprovedModal(true)}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition-colors"
            >
              CONTINUE ORDER
            </button>
          )}
        </div>

        {showApprovedModal && (
          <ApprovedModal
            showApprovedModal={showApprovedModal}
            setShowApprovedModal={setShowApprovedModal}
          />
        )}
      </div>
    </div>
  );
};

export default PurchaseRequisition;
*/







import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import ApprovedModal from "../../components/ApprovedModal";
import { BiCart, BiX } from "react-icons/bi";

const PurchaseRequisition = () => {
  const { cartItems, requisitionSteps } = useSelector((state) => state.cart);
  const [showApprovedModal, setShowApprovedModal] = useState(false);
  const navigate = useNavigate();

  const removeFromCartHandler = (id) => {
    // Implement remove logic here
  };

  const requisitionTypeHandler = () => navigate("/requisition-type");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl flex flex-col space-y-8">
        {/* Back button */}
        <div className="flex w-full justify-start">
          <button
            onClick={requisitionTypeHandler}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg shadow-md transition-colors flex items-center gap-2"
          >
            ← Back
          </button>
        </div>

        {/* Page heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-400 drop-shadow-lg tracking-wide">
          📋 PURCHASE - REQUISITION NOTE
        </h1>

        {cartItems.length === 0 ? (
          <h4 className="text-gray-300 text-center text-lg">
            Your Cart is Empty.{" "}
            <Link
              to="/dashboard"
              className="underline text-blue-400 hover:text-blue-600"
            >
              Go back
            </Link>
          </h4>
        ) : (
          <div className="w-full">
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto rounded-2xl shadow-xl border border-gray-700">
              <table className="min-w-full text-gray-200 text-sm">
                <thead className="bg-gray-800">
                  <tr>
                    {[
                      "PRODUCT NAME",
                      "UOM",
                      "STOCK",
                      "MANUFACTURER",
                      "MODEL NO",
                      "QTY",
                      "RM",
                    ].map((title) => (
                      <th
                        key={title}
                        className="py-3 px-4 text-left font-semibold"
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {cartItems.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-700 transition-colors"
                    >
                      <td className="py-2 px-4 flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.category && (
                          <span className="text-blue-400 text-sm">
                            ({item.category})
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-4">PCS</td>
                      <td className="py-2 px-4">{item.stock}</td>
                      <td className="py-2 px-4">{item.manufacturer || "N/A"}</td>
                      <td className="py-2 px-4">{item.modelNO || "N/A"}</td>
                      <td className="py-2 px-4 font-bold text-center">
                        <span className="text-green-400 text-xl sm:text-2xl font-extrabold drop-shadow-[0_0_6px_rgba(72,187,120,0.9)] hover:drop-shadow-[0_0_12px_rgba(72,187,120,1)] transition-all mr-1">
                          +
                        </span>
                        <span className="text-blue-400 drop-shadow-md">{item.qty}</span>
                      </td>
                      <td className="py-2 px-4 cursor-pointer">
                        <AiOutlineDelete
                          size={24}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          onClick={() => removeFromCartHandler(item._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden flex flex-col gap-4">
              {cartItems.map((item) => (
                <div className="bg-gray-800/80 p-4 rounded-2xl shadow-md border border-gray-700 flex flex-col space-y-2" key={item._id}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-100">{item.name}</span>
                      {item.category && (
                        <span className="text-blue-400 text-sm">({item.category})</span>
                      )}
                    </div>
                    <AiOutlineDelete
                      size={22}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => removeFromCartHandler(item._id)}
                    />
                  </div>
                  <div className="text-sm text-gray-300 flex flex-col space-y-1">
                    <span>UOM: PCS</span>
                    <span>Stock: {item.stock}</span>
                    <span>Manufacturer: {item.manufacturer || "N/A"}</span>
                    <span>Model No: {item.modelNO || "N/A"}</span>
                    <span className="text-center font-bold text-blue-400 text-lg drop-shadow-md">
                      Qty:{" "}
                      <span className="text-green-400 text-2xl font-extrabold drop-shadow-[0_0_6px_rgba(72,187,120,0.9)] hover:drop-shadow-[0_0_12px_rgba(72,187,120,1)] transition-all mr-1">
                        +
                      </span>
                      {item.qty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
          {cartItems.length > 0 && Object.keys(requisitionSteps).length === 0 && (
            <button
              onClick={requisitionTypeHandler}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-colors"
            >
              CONTINUE REQUISITION 
                          <BiCart size={24} />          

            </button>
          )}

          {cartItems.length > 0 && requisitionSteps && (
            <button
              onClick={() => setShowApprovedModal(true)}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center gap-2"
            >
              <span>CONTINUE ORDER</span>         
                <BiCart size={24} />          


            </button>
          )}
        </div>

        {/* Approved Modal */}
        {showApprovedModal && (
          <ApprovedModal
            showApprovedModal={showApprovedModal}
            setShowApprovedModal={setShowApprovedModal}
          />
        )}
      </div>
    </div>
  );
};

export default PurchaseRequisition;

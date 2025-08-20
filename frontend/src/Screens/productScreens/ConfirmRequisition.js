/* import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import ApprovedModal from "../../components/ApprovedModal";

const ConfirmRequisition = () => {
  const { cartItems, requisitionSteps } = useSelector((state) => state.cart);
  const [showApprovedModal, setShowApprovedModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success("removed Item Succesfuly !");
  };
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
              Your Cart is Empty,{" "}
              <Link to="/dashboard" className="underline text-blue-600 hover:text-white ">
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

          {cartItems.length > 0 && requisitionSteps && (
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

export default ConfirmRequisition;


*/

import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import ApprovedModal from "../../components/ApprovedModal";

const ConfirmRequisition = () => {
  const { cartItems, requisitionSteps } = useSelector((state) => state.cart);
  const [showApprovedModal, setShowApprovedModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed successfully!");
  };

  const requisitionTypeHandler = () => {
    navigate("/requisition-type");
  };

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-8 text-gray-200">
      <h1 className="text-3xl font-extrabold text-blue-300 mb-6">
        📋 Factory Requisition Notes
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-400">
          <h2 className="text-xl mb-4">Your Cart is Empty</h2>
          <Link
            to="/dashboard"
            className="text-blue-500 hover:text-blue-300 underline font-semibold"
          >
            Go back to Dashboard
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-700 mb-6">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-blue-900 text-gray-200 sticky top-0 z-10 text-sm uppercase tracking-wide">
                <tr>
                  {[
                    "Product Name",
                    "UOM",
                    "Stock",
                    "Manufacturer",
                    "Model No",
                    "Qty",
                    "Action",
                  ].map((title) => (
                    <th
                      key={title}
                      className="py-4 px-6 border-b border-gray-700 text-lg"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-800 transition-colors shadow-sm rounded-lg mb-2"
                  >
                    <td className="py-4 px-6 border-b">{item.name}</td>
                    <td className="py-4 px-6 border-b">PCS</td>
                    <td className="py-4 px-6 border-b">{item.stock}</td>
                    <td className="py-4 px-6 border-b">
                      {item.manufacturer || "N/A"}
                    </td>
                    <td className="py-4 px-6 border-b">{item.modelNO || "N/A"}</td>
                    <td className="py-4 px-6 border-b">{item.qty}</td>
                    <td
                      className="py-4 px-6 border-b cursor-pointer"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <AiOutlineDelete
                        size={28}
                        className="text-red-600 hover:text-red-400 transition"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row justify-end gap-4">
            {Object.keys(requisitionSteps).length === 0 && (
              <button
                onClick={requisitionTypeHandler}
                className="px-6 py-3 bg-blue-800 text-gray-100 font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
              >
                CONTINUE REQUISITION
              </button>
            )}

            {requisitionSteps && (
              <button
                onClick={() => setShowApprovedModal(true)}
                className="px-6 py-3 bg-blue-800 text-gray-100 font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
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
        </>
      )}
    </div>
  );
};

export default ConfirmRequisition;

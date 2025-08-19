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

        {/* Buttons */}
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

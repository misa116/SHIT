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











/*
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
*/





/*
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
                    <td className="py-4 px-6 border-b font-bold text-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.8)]">
                      {item.qty}
                    </td>
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
*/













/*
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
    <div className="min-h-screen bg-gray-900 px-4 sm:px-6 py-8 text-gray-200">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-300 mb-6 text-center sm:text-left">
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
          <div className="hidden sm:block overflow-x-auto rounded-lg shadow-lg border border-gray-700 mb-6">
            <table className="min-w-full text-left border-collapse text-sm sm:text-base">
              <thead className="bg-blue-900 text-gray-200 sticky top-0 z-10 text-xs sm:text-sm uppercase tracking-wide">
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
                      className="py-3 px-2 sm:px-4 border-b border-gray-700 font-semibold"
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
                    <td className="py-3 px-2 sm:px-4 border-b">{item.name}</td>
                    <td className="py-3 px-2 sm:px-4 border-b">PCS</td>
                    <td className="py-3 px-2 sm:px-4 border-b">{item.stock}</td>
                    <td className="py-3 px-2 sm:px-4 border-b">
                      {item.manufacturer || "N/A"}
                    </td>
                    <td className="py-3 px-2 sm:px-4 border-b">{item.modelNO || "N/A"}</td>
                    <td className="py-3 px-2 sm:px-4 border-b font-bold text-blue-400 text-center shadow-[0_0_6px_rgba(59,130,246,0.8)]">
                      {item.qty}
                    </td>
                    <td
                      className="py-3 px-2 sm:px-4 border-b cursor-pointer text-center"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <AiOutlineDelete
                        size={24}
                        className="text-red-600 hover:text-red-400 transition mx-auto"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden space-y-4 mb-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg text-blue-300">{item.name}</h2>
                  <AiOutlineDelete
                    size={24}
                    className="text-red-600 hover:text-red-400 cursor-pointer"
                    onClick={() => removeFromCartHandler(item._id)}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-300">
                  <span>UOM: PCS</span>
                  <span>Stock: {item.stock}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Manufacturer: {item.manufacturer || "N/A"}</span>
                  <span>Model No: {item.modelNO || "N/A"}</span>
                </div>
                <div className="text-center font-bold text-blue-400 text-lg shadow-[0_0_6px_rgba(59,130,246,0.8)]">
                  Qty: {item.qty}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4 w-full">
            {Object.keys(requisitionSteps).length === 0 && (
              <button
                onClick={requisitionTypeHandler}
                className="w-full sm:w-auto px-6 py-3 bg-blue-800 text-gray-100 font-semibold rounded-xl shadow-md hover:bg-blue-700 transition text-center"
              >
                CONTINUE REQUISITION
              </button>
            )}

            {requisitionSteps && (
              <button
                onClick={() => setShowApprovedModal(true)}
                className="w-full sm:w-auto px-6 py-3 bg-blue-800 text-gray-100 font-semibold rounded-xl shadow-md hover:bg-blue-700 transition text-center"
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
*/







/*
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import ApprovedModal from "../../components/ApprovedModal";

const ConfirmRequisition = () => {
  const { cartItems, requisitionSteps, requisitionType } = useSelector((state) => state.cart);
  const [showApprovedModal, setShowApprovedModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed successfully!");
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
          📋 {requisitionType || "FACTORY"} REQUISITION NOTE
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-400">
            <h2 className="text-xl mb-4">Your Cart is Empty</h2>
            <Link
              to="/dashboard"
              className="text-blue-400 hover:text-blue-600 underline font-semibold"
            >
              Go back to Dashboard
            </Link>
          </div>
        ) : (
          <>
            <div className="hidden sm:block overflow-x-auto rounded-2xl shadow-xl border border-gray-700 mb-6">
              <table className="min-w-full text-gray-200 text-sm">
                <thead className="bg-gray-800">
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
                        <span
                          className={`mr-1 ${
                            requisitionType === "PURCHASE REQUISITION"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {requisitionType === "PURCHASE REQUISITION" ? "+" : "-"}
                        </span>
                        <span className="text-blue-400 drop-shadow-md">{item.qty}</span>
                      </td>
                      <td
                        className="py-2 px-4 cursor-pointer text-center"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <AiOutlineDelete
                          size={24}
                          className="text-red-500 hover:text-red-700 transition-colors mx-auto"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="sm:hidden flex flex-col gap-4 mb-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-800/80 p-4 rounded-2xl shadow-md flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg text-blue-400">{item.name}</h2>
                    <AiOutlineDelete
                      size={22}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => removeFromCartHandler(item._id)}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>UOM: PCS</span>
                    <span>Stock: {item.stock}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Manufacturer: {item.manufacturer || "N/A"}</span>
                    <span>Model No: {item.modelNO || "N/A"}</span>
                  </div>
                  <div className="text-center font-bold text-blue-400 text-lg drop-shadow-md">
                    <span
                      className={`mr-1 ${
                        requisitionType === "PURCHASE REQUISITION"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {requisitionType === "PURCHASE REQUISITION" ? "+" : "-"}
                    </span>
                    {item.qty}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-4 w-full">
              {Object.keys(requisitionSteps).length === 0 && (
                <button
                  onClick={requisitionTypeHandler}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition"
                >
                  CONTINUE REQUISITION
                </button>
              )}

              {requisitionSteps && (
                <button
                  onClick={() => setShowApprovedModal(true)}
                  className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition"
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
import { BiCart, BiX } from "react-icons/bi";

const ConfirmRequisition = () => {
  const { cartItems, requisitionSteps, requisitionType } = useSelector((state) => state.cart);
  const [showApprovedModal, setShowApprovedModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed successfully!");
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
          📋 {requisitionType || "FACTORY -"} REQUISITION NOTE
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-400">
            <h2 className="text-xl mb-4">Your Cart is Empty</h2>
            <Link
              to="/dashboard"
              className="text-blue-400 hover:text-blue-600 underline font-semibold"
            >
              Go back to Dashboard
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto rounded-2xl shadow-xl border border-gray-700 mb-6">
              <table className="min-w-full text-gray-200 text-sm">
                <thead className="bg-gray-800">
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
                      <td className="py-2 px-4 flex flex-col">
                        <span>{item.name}</span>
                        {item.category && (
                          <span className="text-blue-400 text-sm mt-1">
                            {item.category}
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-4">PCS</td>
                      <td className="py-2 px-4">{item.stock}</td>
                      <td className="py-2 px-4">{item.manufacturer || "N/A"}</td>
                      <td className="py-2 px-4">{item.modelNO || "N/A"}</td>
                      <td className="py-2 px-4 font-bold text-center">
                        <span
                          className={`mr-1 ${
                            requisitionType === "PURCHASE REQUISITION"
                              ? "text-green-400 text-xl font-extrabold drop-shadow-[0_0_6px_rgba(72,187,120,0.9)] hover:drop-shadow-[0_0_12px_rgba(72,187,120,1)] transition-all"
                              : "text-red-500 text-xl font-extrabold drop-shadow-[0_0_6px_rgba(239,68,68,0.9)] hover:drop-shadow-[0_0_12px_rgba(239,68,68,1)] transition-all"
                          }`}
                        >
                          {requisitionType === "PURCHASE REQUISITION" ? "+" : "-"}
                        </span>
                        <span className="text-blue-400 drop-shadow-md">{item.qty}</span>
                      </td>
                      <td
                        className="py-2 px-4 cursor-pointer text-center"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <AiOutlineDelete
                          size={24}
                          className="text-red-500 hover:text-red-700 transition-colors mx-auto"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="sm:hidden flex flex-col gap-4 mb-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-800/80 p-4 rounded-2xl shadow-md flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-bold text-lg text-blue-400">{item.name}</span>
                      {item.category && (
                        <span className="text-blue-400 text-sm">{item.category}</span>
                      )}
                    </div>
                    <AiOutlineDelete
                      size={22}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => removeFromCartHandler(item._id)}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>UOM: PCS</span>
                    <span>Stock: {item.stock}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Manufacturer: {item.manufacturer || "N/A"}</span>
                    <span>Model No: {item.modelNO || "N/A"}</span>
                  </div>
                  <div className="text-center font-bold text-blue-400 text-lg drop-shadow-md">
                    <span
                      className={`mr-1 ${
                        requisitionType === "PURCHASE REQUISITION"
                          ? "text-green-400 text-xl font-extrabold drop-shadow-[0_0_6px_rgba(72,187,120,0.9)] hover:drop-shadow-[0_0_12px_rgba(72,187,120,1)] transition-all"
                          : "text-red-500 text-xl font-extrabold drop-shadow-[0_0_6px_rgba(239,68,68,0.9)] hover:drop-shadow-[0_0_12px_rgba(239,68,68,1)] transition-all"
                      }`}
                    >
                      {requisitionType === "PURCHASE REQUISITION" ? "+" : "-"}
                    </span>
                    {item.qty}
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 w-full">
              {Object.keys(requisitionSteps).length === 0 && (
                <button
                  onClick={requisitionTypeHandler}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition"
                >
                  CONTINUE REQUISITION
                </button>
              )}

              {requisitionSteps && (
                <button
                  onClick={() => setShowApprovedModal(true)}
                  className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition flex items-center "
                >
                  CONTINUE ORDER

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
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmRequisition;

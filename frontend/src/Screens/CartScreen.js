/* import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { removeFromCart } from "../redux/cartSlice";

const CartScreen = () => {
  const { cartItems } = useSelector((state) => state.cart);
  // console.log(cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Deleted Succesfuly !");
  };

  const requisitionTypeHandler = () => {
    navigate("/requisition-type");
  };
  return (
    <div>
      <div className="product-list">
        <div className=" grid grid-rows-2 grid-flow-col gap-4 mt-3 md:mt-16 py-6">
          {" "}
          <div className="">
            <h1 className=" flex justify-center text-3xl font-bold text-slate-100 ">
              Requisition Note
            </h1>
            {cartItems.length === 0 ? (
              <span className="py-3 text-3xl mr-2 m-6">
                Your Requisition is Empty
                <Link
                  to="/dashboard"
                  className="ml-4 underline text-2xl text-orange-600"
                >
                  Go BACK
                </Link>
              </span>
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
                          <AiOutlineDelete
                            size={28}
                            className="text-red-600 hover:text-white hover:underline "
                          />{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="flex justify-end mr-4 ">
                <button
                  onClick={requisitionTypeHandler}
                  className="btn btn-primary text-black bg-slate-200 px-5 p-2 rounded-xl mt-3  hover:text-slate-700 hover:underline"
                >
                  {" "}
                  Continue Requisition
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;

*/

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { removeFromCart } from "../redux/cartSlice";

const CartScreen = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Deleted Successfully!");
  };

  const requisitionTypeHandler = () => {
    navigate("/requisition-type");
  };

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-10 text-gray-200">
      <h1 className="text-4xl font-extrabold text-center text-blue-400 mb-8 drop-shadow-lg">
        📋 Requisition Note
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-xl text-gray-400 mb-4">
            Your Requisition is Empty
          </p>
          <Link
            to="/dashboard"
            className="text-blue-400 hover:text-blue-300 underline font-semibold"
          >
            Go BACK
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-lg bg-gradient-to-b from-gray-800 to-gray-700 border border-gray-600">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-blue-900 text-gray-100 text-sm uppercase tracking-wide">
                <th className="py-4 px-6 border-b border-gray-600 text-left">
                  Product Name
                </th>
                <th className="py-4 px-6 border-b border-gray-600 text-left">
                  UOM
                </th>
                <th className="py-4 px-6 border-b border-gray-600 text-left">
                  Stock
                </th>
                <th className="py-4 px-6 border-b border-gray-600 text-left">
                  Manufacturer
                </th>
                <th className="py-4 px-6 border-b border-gray-600 text-left">
                  Model No
                </th>
                <th className="py-4 px-6 border-b border-gray-600 text-left">
                  Qty
                </th>
                <th className="py-4 px-6 border-b border-gray-600 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item, index) => (
                <tr
                  key={item._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                  } hover:bg-gray-600 transition-colors`}
                >
                  <td className="py-4 px-6 border-b border-gray-700">
                    {item.name}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-700">PCS</td>
                  <td className="py-4 px-6 border-b border-gray-700">
                    {item?.stock}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-700">
                    {item?.manufacturer || "N/A"}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-700">
                    {item?.modelNO || "N/A"}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-700">
                    {item?.qty}
                  </td>
                  <td
                    className="py-4 px-6 border-b border-gray-700 text-center cursor-pointer"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <AiOutlineDelete
                      size={24}
                      className="text-red-500 hover:text-red-300 transition duration-200"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="flex justify-end mt-6">
          <button
            onClick={requisitionTypeHandler}
            className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 hover:shadow-lg transition"
          >
            Continue Requisition
          </button>
        </div>
      )}
    </div>
  );
};

export default CartScreen;

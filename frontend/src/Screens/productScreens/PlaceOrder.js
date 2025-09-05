
 /*
 import React, { useEffect } from "react";
import { useCreateOrderMutation } from "../../redux/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { clearCartItems } from "../../redux/cartSlice";
import { getProducts } from "../../redux/productSlice";

const PlaceOrder = () => {
  const { cartItems, approvedData, requisitionSteps } = useSelector(
    (state) => state.cart
  );

  const [createOrder, { isLoading, error, isSuccess }] =
    useCreateOrderMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!approvedData?.reqBy) {
      navigate("/store-requisition");
    }

    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      navigate("/my-orders-list");
    }
  }, [approvedData.reqBy, isSuccess]);

  const placeOrderHandler = async () => {
    try { 

      // this Works as Well 
      // const orderData = {
      //   orderItems: cartItems?.map((item) => ({
      //     product: item._id, // Ensure product ID is included
      //     name: item.name,
      //     qty: item.qty,
      //     category: item.category,
      //     stock: item.stock,
      //     supplier: item.supplier,
      //   })),
      //   approvedData,
      //   requisitionSteps,
      // };\

// as well this Works  but more Secure  
      const payload = {
        orderItems: await Promise.all(
          cartItems.map(async (item) => {
            if (!item.supplier) {
              const product = await getProducts(item._id);
              item = { ...item, supplier: product.supplier };
            }

            return {
              product: item._id,
              name: item.name,
              qty: item.qty,
              category: item.category,
              price: item.price,
              description: item.description,
              stock: item.stock,
              supplier: item.supplier,
              user: item.user,
            };
          })
        ),
        approvedData: approvedData,
        requisitionSteps: requisitionSteps,
      };
      // await createOrder(orderData).unwrap();
      const { res } = await createOrder(payload).unwrap();
      // console.log("res", res);
      dispatch(clearCartItems());
    } catch (err) {
      console.error("Failed to place order: ", err);
    }
  };
  return (
    <div className="w-full mt-[-42px] ">
      <div className=" grid grid-rows-2 grid-flow-col gap-4 mt-3 md:mt-16 py-6">
        {" "}
        <div className="">
          <h1 className="text-slate-200 flex justify-center pb-4">
            PLACE ORDER SCREEN
          </h1>
          {cartItems.length === 0 ? (
            <h4>
              Your Cart is Empty{" "}
              <Link to="/dashboard" className="underline">
                Go back
              </Link>
            </h4>
          ) : (
            <div className="table w-full ">
              <table className="min-w-full  bg-gray-600 border border-gray-200 text-slate-100">
                <thead>
                  <tr className="py-2 px-4 border-b">
                    <th>PRODUCT NAME</th>
                    <th className="py-2 px-4 border-b">UOM</th>
                    <th className="py-2 px-4 border-b"> STOCK</th>
                    <th className="py-2 px-4 border-b">MANUFACTURER</th>
                    <th className="py-2 px-4 border-b">MODEL NO</th>
                    <th className="py-2 px-4 border-b">QTY</th>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="py-3 ">
            <h3 className="mt-2 text-slate-200 text-2xl p-2">ADDITION INFO</h3>
            <div className="flex flex-col space-y-3">
              <div className="text-md font-semibold text-slate-100 uppercase  ">
                <b>REQ BY : {approvedData.reqBy} </b> <br />
                <b> APPROVED BY : {approvedData.approvedBy}</b>
                <p> REMARKS : {approvedData.comment} </p>
              </div>
            </div>
          </div>
 <div className="flex justify-end">
            {isLoading && <Loader />}
            <button
              disabled={cartItems?.length === 0}
              onClick={placeOrderHandler}
              className="text-lg bg-orange-400 text-black p-2 px-5 mr-5 rounded-lg"
            >
              SAVE REQUISITION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlaceOrder;
*/




















/*
import React, { useEffect, useState } from "react";
import { useCreateOrderMutation } from "../../redux/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { clearCartItems } from "../../redux/cartSlice";
import { getProducts } from "../../redux/productSlice";
import ApprovedModal from "../../components/ApprovedModal";

const PlaceOrder = () => {
  const { cartItems, approvedData, requisitionSteps } = useSelector(
    (state) => state.cart
  );

  const [showApprovedModal, setShowApprovedModal] = useState(false);

  const [createOrder, { isLoading, error, isSuccess }] =
    useCreateOrderMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redirect if no approvedData
  useEffect(() => {
    if (!approvedData?.reqBy) {
      navigate("/store-requisition");
    }

    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }

    if (isSuccess) {
      toast.success("Requisition saved successfully!");
      navigate("/my-orders-list");
    }
  }, [approvedData, isSuccess, error, navigate]);

  const placeOrderHandler = async () => {
    try {
      const orderItems = await Promise.all(
        cartItems
          .filter((item) => item._id)
          .map(async (item) => {
            if (!item.supplier) {
              const product = await getProducts(item._id);
              item = { ...item, supplier: product.supplier || "Unknown" };
            }
            return {
              product: item._id,
              name: item.name,
              qty: item.qty,
              category: item.category,
              price: item.price,
              description: item.description,
              stock: item.stock,
              supplier: item.supplier,
              user: item.user,
            };
          })
      );

      if (orderItems.length === 0) {
        toast.error("No valid items to save requisition!");
        return;
      }

      const payload = {
        orderItems,
        approvedData,
        requisitionSteps,
      };

      await createOrder(payload).unwrap();
      dispatch(clearCartItems());
    } catch (err) {
      console.error("Failed to place order:", err);
      toast.error("Failed to save requisition.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4 md:px-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-400 drop-shadow-lg">
        📋 Place Order
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center mt-10">
          <h4 className="text-lg text-gray-400">Your cart is empty</h4>
          <Link
            to="/dashboard"
            className="text-blue-400 underline hover:text-blue-300"
          >
            Go back
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto shadow-lg rounded-lg mb-8">
            <table className="min-w-full bg-gray-800 border border-gray-700 text-sm md:text-base">
              <thead className="bg-blue-900 text-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Product Name</th>
                  <th className="py-3 px-4 text-left">UOM</th>
                  <th className="py-3 px-4 text-left">Stock</th>
                  <th className="py-3 px-4 text-left">Manufacturer</th>
                  <th className="py-3 px-4 text-left">Model No</th>
                  <th className="py-3 px-4 text-left">Qty</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, idx) => (
                  <tr
                    key={item._id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                    } hover:bg-gray-600 transition-colors`}
                  >
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">PCS</td>
                    <td className="py-2 px-4">{item.stock}</td>
                    <td className="py-2 px-4">{item.manufacturer || "N/A"}</td>
                    <td className="py-2 px-4">{item.modelNO || "N/A"}</td>
                    <td className="py-2 px-4 font-bold text-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.7)]">
                      {item.qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg mb-6 shadow-lg flex justify-between items-start">
            <div className="space-y-2 text-gray-200">
              <p>
                <strong>Req By:</strong> {approvedData.reqBy}
              </p>
              <p>
                <strong>Approved By:</strong> {approvedData.approvedBy}
              </p>
              <p>
                <strong>Remarks:</strong> {approvedData.comment}
              </p>
            </div>

            <button
              onClick={() => setShowApprovedModal(true)}
              className="self-start bg-blue-500 hover:bg-blue-400 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              Edit Info
            </button>
          </div>

          <div className="flex flex-col md:flex-row justify-end items-center gap-4">
            {isLoading && <Loader />}
            <button
              disabled={cartItems.length === 0 || isLoading}
              onClick={placeOrderHandler}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6 rounded-lg transition-all disabled:opacity-50"
            >
              Save Requisition
            </button>
          </div>

          {showApprovedModal && (
            <ApprovedModal
              showApprovedModal={showApprovedModal}
              setShowApprovedModal={setShowApprovedModal}
              requisitionType={requisitionSteps?.type || "Unknown"}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PlaceOrder;

*/








import React, { useEffect, useState } from "react";
import { useCreateOrderMutation } from "../../redux/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { clearCartItems } from "../../redux/cartSlice";
import { getProducts } from "../../redux/productSlice";
import ApprovedModal from "../../components/ApprovedModal";

const PlaceOrder = () => {
  const { cartItems, approvedData, requisitionSteps } = useSelector(
    (state) => state.cart
  );

  const [showApprovedModal, setShowApprovedModal] = useState(false);

  const [createOrder, { isLoading, error, isSuccess }] =
    useCreateOrderMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!approvedData?.reqBy) navigate("/store-requisition");
    if (error) toast.error(error?.data?.message || "Something went wrong");
    if (isSuccess) {
      toast.success("Requisition saved successfully!");
      navigate("/my-orders-list");
    }
  }, [approvedData, isSuccess, error, navigate]);

  const placeOrderHandler = async () => {
    try {
      const orderItems = await Promise.all(
        cartItems
          .filter((item) => item._id)
          .map(async (item) => {
            if (!item.supplier) {
              const product = await getProducts(item._id);
              item = { ...item, supplier: product.supplier || "Unknown" };
            }
            return {
              product: item._id,
              name: item.name,
              qty: item.qty,
              category: item.category,
              price: item.price,
              description: item.description,
              stock: item.stock,
              supplier: item.supplier,
              user: item.user,
            };
          })
      );

      if (!orderItems.length) {
        toast.error("No valid items to save requisition!");
        return;
      }

      const payload = { orderItems, approvedData, requisitionSteps };
      await createOrder(payload).unwrap();
      dispatch(clearCartItems());
    } catch (err) {
      console.error("Failed to place order:", err);
      toast.error("Failed to save requisition.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4 md:px-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-400 drop-shadow-lg">
        📋 Place Order
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center mt-10">
          <h4 className="text-lg text-gray-400">Your cart is empty</h4>
          <Link
            to="/dashboard"
            className="text-blue-400 underline hover:text-blue-300"
          >
            Go back
          </Link>
        </div>
      ) : (
        <>
          <div className="hidden sm:block overflow-x-auto shadow-lg rounded-lg mb-8">
            <table className="min-w-full bg-gray-800 border border-gray-700 text-sm md:text-base">
              <thead className="bg-blue-900 text-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Product Name</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">UOM</th>
                  <th className="py-3 px-4 text-left">Stock</th>
                  <th className="py-3 px-4 text-left">Manufacturer</th>
                  <th className="py-3 px-4 text-left">Model No</th>
                  <th className="py-3 px-4 text-left">Qty</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, idx) => (
                  <tr
                    key={item._id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                    } hover:bg-gray-600 transition-colors`}
                  >
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4 text-blue-400 font-semibold">
                      {item.category || "N/A"}
                    </td>
                    <td className="py-2 px-4">PCS</td>
                    <td className="py-2 px-4">{item.stock}</td>
                    <td className="py-2 px-4">{item.manufacturer || "N/A"}</td>
                    <td className="py-2 px-4">{item.modelNO || "N/A"}</td>
                    <td className="py-2 px-4 font-bold text-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.7)]">
                      {item.qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden flex flex-col gap-4">
            {cartItems.map((item) => (
              <div className="bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-700 flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg text-gray-100">{item.name}</p>
                    <p className="text-blue-400 font-semibold">{item.category || "N/A"}</p>
                  </div>
                  <span className="font-bold text-blue-400 text-xl">{item.qty}</span>
                </div>
                <div className="text-sm text-gray-300 flex flex-col space-y-1">
                  <span>UOM: PCS</span>
                  <span>Stock: {item.stock}</span>
                  <span>Manufacturer: {item.manufacturer || "N/A"}</span>
                  <span>Model No: {item.modelNO || "N/A"}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 p-4 rounded-lg mb-6 shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2 text-gray-200">
              <p>
                <strong>Req By:</strong> {approvedData.reqBy}
              </p>
              <p>
                <strong>Approved By:</strong> {approvedData.approvedBy}
              </p>
              <p>
                <strong>Remarks:</strong> {approvedData.comment}
              </p>
            </div>

            <button
              onClick={() => setShowApprovedModal(true)}
              className="self-start sm:self-auto bg-blue-500 hover:bg-blue-400 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              Edit Info
            </button>
          </div>

          <div className="flex flex-col md:flex-row justify-end items-center gap-4">
            {isLoading && <Loader />}
            <button
              disabled={cartItems.length === 0 || isLoading}
              onClick={placeOrderHandler}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6 rounded-lg transition-all disabled:opacity-50"
            >
              Save Requisition
            </button>
          </div>

          {showApprovedModal && (
            <ApprovedModal
              showApprovedModal={showApprovedModal}
              setShowApprovedModal={setShowApprovedModal}
              requisitionType={requisitionSteps?.type || "Unknown"}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PlaceOrder;













//works?
/*
import React, { useEffect, useState } from "react";
import { useCreateOrderMutation } from "../../redux/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { clearCartItems } from "../../redux/cartSlice";
import { getProducts } from "../../redux/productSlice";
import ApprovedModal from "../../components/ApprovedModal";

const PlaceOrder = () => {
  const { cartItems, approvedData, requisitionSteps } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showApprovedModal, setShowApprovedModal] = useState(false);

  const [createOrder, { isLoading, error, isSuccess }] = useCreateOrderMutation();

  // Determine requisition type
  const requisitionType =
    requisitionSteps?.type === "PURCHASE REQUISITION"
      ? "PURCHASE REQUISITION"
      : requisitionSteps?.type === "FACTORY REQUISITION"
      ? "FACTORY REQUISITION"
      : "Not set";

  useEffect(() => {
    if (!approvedData?.reqBy) navigate("/store-requisition");
    if (error) toast.error(error?.data?.message || "Something went wrong");
    if (isSuccess) {
      toast.success("Requisition saved successfully!");
      navigate("/my-orders-list");
    }
  }, [approvedData, isSuccess, error, navigate]);

  const placeOrderHandler = async () => {
    try {
      const orderItems = await Promise.all(
        cartItems
          .filter((item) => item._id)
          .map(async (item) => {
            if (!item.supplier) {
              const product = await getProducts(item._id);
              item = { ...item, supplier: product.supplier || "Unknown" };
            }
            return {
              product: item._id,
              name: item.name,
              qty: item.qty,
              category: item.category,
              price: item.price,
              description: item.description,
              stock: item.stock,
              supplier: item.supplier,
              user: item.user,
            };
          })
      );

      if (!orderItems.length) {
        toast.error("No valid items to save requisition!");
        return;
      }

      const payload = { orderItems, approvedData, requisitionSteps };
      await createOrder(payload).unwrap();
      dispatch(clearCartItems());
    } catch (err) {
      console.error("Failed to place order:", err);
      toast.error("Failed to save requisition.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4 md:px-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-400 drop-shadow-lg">
          📋 Place Order
        </h1>
        <span
          className={`px-4 py-1 rounded-full text-white font-semibold text-sm mt-2 sm:mt-0 ${
            requisitionType === "PURCHASE REQUISITION"
              ? "bg-green-500"
              : requisitionType === "FACTORY REQUISITION"
              ? "bg-red-500"
              : "bg-gray-600"
          }`}
        >
          {requisitionType}
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center mt-10">
          <h4 className="text-lg text-gray-400">Your cart is empty</h4>
          <Link
            to="/dashboard"
            className="text-blue-400 underline hover:text-blue-300"
          >
            Go back
          </Link>
        </div>
      ) : (
        <>
          <div className="hidden sm:block overflow-x-auto shadow-lg rounded-lg mb-8">
            <table className="min-w-full bg-gray-800 border border-gray-700 text-sm md:text-base">
              <thead className="bg-blue-900 text-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Product Name</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">UOM</th>
                  <th className="py-3 px-4 text-left">Stock</th>
                  <th className="py-3 px-4 text-left">Manufacturer</th>
                  <th className="py-3 px-4 text-left">Model No</th>
                  <th className="py-3 px-4 text-left">Qty</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, idx) => (
                  <tr
                    key={item._id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                    } hover:bg-gray-600 transition-colors`}
                  >
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4 text-blue-400 font-semibold">
                      {item.category || "N/A"}
                    </td>
                    <td className="py-2 px-4">PCS</td>
                    <td className="py-2 px-4">{item.stock}</td>
                    <td className="py-2 px-4">{item.manufacturer || "N/A"}</td>
                    <td className="py-2 px-4">{item.modelNO || "N/A"}</td>
                    <td className="py-2 px-4 font-bold text-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.7)]">
                      {item.qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden flex flex-col gap-4">
            {cartItems.map((item) => (
              <div className="bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-700 flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg text-gray-100">{item.name}</p>
                    <p className="text-blue-400 font-semibold">{item.category || "N/A"}</p>
                  </div>
                  <span className="font-bold text-blue-400 text-xl">{item.qty}</span>
                </div>
                <div className="text-sm text-gray-300 flex flex-col space-y-1">
                  <span>UOM: PCS</span>
                  <span>Stock: {item.stock}</span>
                  <span>Manufacturer: {item.manufacturer || "N/A"}</span>
                  <span>Model No: {item.modelNO || "N/A"}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 p-4 rounded-lg mb-6 shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2 text-gray-200">
              <p>
                <strong>Req By:</strong> {approvedData.reqBy}
              </p>
              <p>
                <strong>Approved By:</strong> {approvedData.approvedBy}
              </p>
              <p>
                <strong>Remarks:</strong> {approvedData.comment}
              </p>
            </div>
            <button
              onClick={() => setShowApprovedModal(true)}
              className="self-start sm:self-auto bg-blue-500 hover:bg-blue-400 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              Edit Info
            </button>
          </div>

          <div className="flex flex-col md:flex-row justify-end items-center gap-4">
            {isLoading && <Loader />}
            <button
              disabled={cartItems.length === 0 || isLoading}
              onClick={placeOrderHandler}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6 rounded-lg transition-all disabled:opacity-50"
            >
              Save Requisition
            </button>
          </div>

          {showApprovedModal && (
            <ApprovedModal
              showApprovedModal={showApprovedModal}
              setShowApprovedModal={setShowApprovedModal}
              requisitionType={requisitionType}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PlaceOrder;

*/








/* import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
    useOrderMutation,
    useUpdateOrderRecievedMutation,
} from "../../redux/orderSlice";
import Loader from "../../components/Loader";

const OrderDetails = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);

  const { data, isLoading, error } = useGetOrderDetailsQuery(orderId);

  const [deliverOrder, { isLoading: deliverLoading }] =
    useDeliverOrderMutation();

 const [updateOrderRecieved, { isLoading: receivedLoading }] =
    useUpdateOrderRecievedMutation();

  useEffect(() => {
    if (data) {
      setOrder(data.order);
    }
  }, [data]);
  const navigate = useNavigate();

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      toast.success("Order Delivered And Decremented the Stock");
      navigate("/LPO-factory");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };


 const ReceiveHandler = async () => {
    try {
      await updateOrderRecieved(orderId);
      toast.success("Order Received Succsesfully");
      navigate("/LPO-factory");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };


  console.log("order", order);

  return (
    <div>
      <div>
        {error ? (
          <h3>{error}</h3>
        ) : (
          <div className="px-4">
            <div className="flex items-center justify-evenly">
              <div>
                <h3 className="text-3xl mb-5 underline">Order Info</h3>
                <p>
                  <span className="font-bold text-slate-100">Order LPO:</span>{" "}
                  {order?._id}
                </p>
                

                <p>
                  <span className="font-bold">
                    Payment : {order?.approvedStatusProcur?.paymentMethod}
                  </span>{" "}
                </p>
               
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold mb-4 underline ">Additional Info</h2>
                <p>
                  <span className="font-bold">Requested By:</span>{" "}
                  {order?.approvedData && order?.approvedData?.reqBy}
                </p>

                <p>
                  <span className="font-bold">Approved By:</span>{" "}
                  {order?.approvedData && order?.approvedData.approvedBy}
                </p>
                <p>
                  <span className="font-bold">Comment:</span>{" "}
                  {order?.approvedData && order?.approvedData.comment}
                </p>

                <div>
                  <h3 className=""> Req TYPE = {order?.requisitionSteps}</h3>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
              <div className="px-4">
                <table
                  striped
                  bordered
                  hover
                  responsive
                  className="w-full text-sm text-left text-slate-300 text-lg dark:text-gray-400"
                >
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>QUANTITY</th>
                      <th>price</th>
                      <th>supplier</th>
                      {!order?.isDelivered && <th> update</th>}
                    </tr>
                  </thead>

                  <tbody>
                    {order?.orderItems?.map((item) => (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>{item.price ? item.price : "0"}</td>
                        <td>{item.supplier ? order.supplier : "N/A"} </td>
                        <td>Edit</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {order && !order?.isDelivered && (
          <div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={deliverHandler}
                className="px-5 p-2 bg-green-600 text-slate-100 rounded-2xl hover:bg-slate-300 hover:text-orange-800"
              >
                {deliverLoading ? <Loader /> : " DELIVER ORDER FACTORY"}
              </button>
            </div>
          </div>
        )}

        {order && order?.isDelivered && !order.isReceived && (
          <div>
            <div className="mt-4 flex justify-end">
              <button 
              onClick={ReceiveHandler} 
              className="px-5 p-2 bg-green-600 text-slate-100 rounded-2xl hover:bg-slate-300 hover:text-blue-800">
        {receivedLoading ? <Loader /> :  "RECEIVE ORDER"} 
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;    

/*/












/*
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
  useUpdateOrderRecievedMutation,
} from "../../redux/orderSlice";
import Loader from "../../components/Loader";

const OrderDetails = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [deliverOrder, { isLoading: deliverLoading }] = useDeliverOrderMutation();
  const [updateOrderRecieved, { isLoading: receivedLoading }] = useUpdateOrderRecievedMutation();

  useEffect(() => {
    if (data) setOrder(data.order);
  }, [data]);

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      toast.success("Order Delivered & Stock Updated");
      navigate("/LPO-factory");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const receiveHandler = async () => {
    try {
      await updateOrderRecieved(orderId);
      toast.success("Order Received Successfully");
      navigate("/LPO-factory");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <h3 className="text-red-500">Error: {error}</h3>;

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-6 underline">
        Order Details
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg shadow-lg p-5 space-y-3">
          <h2 className="text-xl font-semibold text-blue-400">Order Info</h2>
          <p><span className="font-bold">Order LPO:</span> {order?._id}</p>
          <p><span className="font-bold">Payment:</span> {order?.approvedStatusProcur?.paymentMethod}</p>
          <p><span className="font-bold">Req Type:</span> {order?.requisitionSteps}</p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-5 space-y-3">
          <h2 className="text-xl font-semibold text-blue-400">Additional Info</h2>
          <p><span className="font-bold">Requested By:</span> {order?.approvedData?.reqBy || "N/A"}</p>
          <p><span className="font-bold">Approved By:</span> {order?.approvedData?.approvedBy || "N/A"}</p>
          <p><span className="font-bold">Comment:</span> {order?.approvedData?.comment || "N/A"}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Order Items</h2>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full text-sm text-gray-300">
            <thead className="bg-blue-600 text-white uppercase">
              <tr>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Supplier</th>
                {!order?.isDelivered && <th className="px-4 py-2">Update</th>}
              </tr>
            </thead>
            <tbody className="bg-gray-700">
              {order?.orderItems?.map((item) => (
                <tr key={item._id} className="border-b border-gray-600">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.qty}</td>
                  <td className="px-4 py-2">{item.price || "0"}</td>
                  <td className="px-4 py-2">{item.supplier || "N/A"}</td>
                  {!order?.isDelivered && (
                    <td className="px-4 py-2 text-blue-400 hover:underline cursor-pointer">
                      Edit
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 justify-end">
        {!order?.isDelivered && (
          <button
            onClick={deliverHandler}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {deliverLoading ? <Loader /> : "Deliver Order (Factory)"}
          </button>
        )}

        {order?.isDelivered && !order.isReceived && (
          <button
            onClick={receiveHandler}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {receivedLoading ? <Loader /> : "Receive Order"}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
*/













/*
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
  useUpdateOrderRecievedMutation,
} from "../../redux/orderSlice";
import Loader from "../../components/Loader";

const OrderDetails = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [deliverOrder, { isLoading: deliverLoading }] = useDeliverOrderMutation();
  const [updateOrderRecieved, { isLoading: receivedLoading }] = useUpdateOrderRecievedMutation();

  useEffect(() => {
    if (data) setOrder(data.order);
  }, [data]);

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      toast.success("Order Delivered & Stock Updated");
      navigate("/LPO-factory");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const receiveHandler = async () => {
    try {
      await updateOrderRecieved(orderId);
      toast.success("Order Received Successfully");
      navigate("/LPO-factory");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <h3 className="text-red-500">Error: {error}</h3>;

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-6 underline">
        Order Details
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative bg-gray-800 rounded-xl p-[2px] shadow-lg hover:shadow-blue-500/40 transition-all duration-300">
          <div className="bg-gray-900 rounded-xl p-5 space-y-3">
            <h2 className="text-xl font-semibold text-blue-400">Order Info</h2>
            <p><span className="font-bold">Order LPO:</span> {order?._id}</p>
            <p><span className="font-bold">Payment:</span> {order?.approvedStatusProcur?.paymentMethod}</p>
            <p><span className="font-bold">Req Type:</span> {order?.requisitionSteps}</p>
          </div>
          <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 -z-10"></div>
        </div>

        <div className="relative bg-gray-800 rounded-xl p-[2px] shadow-lg hover:shadow-purple-500/40 transition-all duration-300">
          <div className="bg-gray-900 rounded-xl p-5 space-y-3">
            <h2 className="text-xl font-semibold text-blue-400">Additional Info</h2>
            <p><span className="font-bold">Requested By:</span> {order?.approvedData?.reqBy || "N/A"}</p>
            <p><span className="font-bold">Approved By:</span> {order?.approvedData?.approvedBy || "N/A"}</p>
            <p><span className="font-bold">Comment:</span> {order?.approvedData?.comment || "N/A"}</p>
          </div>
          <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 -z-10"></div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Order Items</h2>
        <div className="relative overflow-x-auto rounded-xl p-[2px] shadow-lg hover:shadow-blue-400/40 transition-all duration-300">
          <div className="bg-gray-900 rounded-xl">
            <table className="min-w-full text-sm text-gray-300">
              <thead className="bg-blue-600 text-white uppercase">
                <tr>
                  <th className="px-4 py-2">Product Name</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Supplier</th>
                  {!order?.isDelivered && <th className="px-4 py-2">Update</th>}
                </tr>
              </thead>
              <tbody className="bg-gray-800">
                {order?.orderItems?.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-600 hover:bg-gray-700 transition"
                  >
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.qty}</td>
                    <td className="px-4 py-2">{item.price || "0"}</td>
                    <td className="px-4 py-2">{item.supplier || "N/A"}</td>
                    {!order?.isDelivered && (
                      <td className="px-4 py-2 text-blue-400 hover:underline cursor-pointer">
                        Edit
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 -z-10"></div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 justify-end">
        {!order?.isDelivered && (
          <button
            onClick={deliverHandler}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md hover:shadow-green-400/40 transition-all"
          >
            {deliverLoading ? <Loader /> : "Deliver Order (Factory)"}
          </button>
        )}

        {order?.isDelivered && !order.isReceived && (
          <button
            onClick={receiveHandler}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md hover:shadow-blue-400/40 transition-all"
          >
            {receivedLoading ? <Loader /> : "Receive Order"}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
*/









/*
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
  useUpdateOrderRecievedMutation,
} from "../../redux/orderSlice";
import Loader from "../../components/Loader";

const OrderDetails = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [deliverOrder, { isLoading: deliverLoading }] = useDeliverOrderMutation();
  const [updateOrderRecieved, { isLoading: receivedLoading }] =
    useUpdateOrderRecievedMutation();

  useEffect(() => {
    if (data) setOrder(data.order);
  }, [data]);

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      toast.success("Order Delivered & Stock Updated");
      navigate("/LPO-factory");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const receiveHandler = async () => {
    try {
      await updateOrderRecieved(orderId);
      toast.success("Order Received Successfully");
      navigate("/LPO-factory");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <h3 className="text-red-500">Error: {error}</h3>;

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-6 underline">
        Order Details
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg shadow-lg p-5 space-y-3 
          border-2 border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.6)]">
          <h2 className="text-xl font-semibold text-blue-400">Order Info</h2>
          <p>
            <span className="font-bold">Order LPO:</span> {order?._id}
          </p>
          <p>
            <span className="font-bold">Payment:</span>{" "}
            {order?.approvedStatusProcur?.paymentMethod}
          </p>
          <p>
            <span className="font-bold">Req Type:</span>{" "}
            {order?.requisitionSteps}
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-5 space-y-3 
          border-2 border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.6)]">
          <h2 className="text-xl font-semibold text-blue-400">Additional Info</h2>
          <p>
            <span className="font-bold">Requested By:</span>{" "}
            {order?.approvedData?.reqBy || "N/A"}
          </p>
          <p>
            <span className="font-bold">Approved By:</span>{" "}
            {order?.approvedData?.approvedBy || "N/A"}
          </p>
          <p>
            <span className="font-bold">Comment:</span>{" "}
            {order?.approvedData?.comment || "N/A"}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">
          Order Items
        </h2>
        <div className="overflow-x-auto rounded-lg shadow-lg 
          border-2 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.6)]">
          <table className="min-w-full text-sm text-gray-300">
            <thead className="bg-blue-600 text-white uppercase">
              <tr>
                <th className="px-4 py-2">Product Name (Category)</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Supplier</th>
                {!order?.isDelivered && <th className="px-4 py-2">Update</th>}
              </tr>
            </thead>
            <tbody className="bg-gray-700">
              {order?.orderItems?.map((item) => (
                <tr key={item._id} className="border-b border-gray-600">
                  <td className="px-4 py-2">
                    {item.name}{" "}
                    <span className="text-gray-400 italic">
                      ({item.category || "Uncategorized"})
                    </span>
                  </td>
                  <td className="px-4 py-2">{item.qty}</td>
                  <td className="px-4 py-2">{item.price || "0"}</td>
                  <td className="px-4 py-2">{item.supplier || "N/A"}</td>
                  {!order?.isDelivered && (
                    <td className="px-4 py-2 text-blue-400 hover:underline cursor-pointer">
                      Edit
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 justify-end">
        {!order?.isDelivered && (
          <button
            onClick={deliverHandler}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {deliverLoading ? <Loader /> : "Deliver Order (Factory)"}
          </button>
        )}

        {order?.isDelivered && !order.isReceived && (
          <button
            onClick={receiveHandler}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {receivedLoading ? <Loader /> : "Receive Order"}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
*/






























//works
/*
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
  useUpdateOrderRecievedMutation,
} from "../../redux/orderSlice";
import Loader from "../../components/Loader";

const OrderDetails = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [deliverOrder, { isLoading: deliverLoading }] = useDeliverOrderMutation();
  const [updateOrderRecieved, { isLoading: receivedLoading }] =
    useUpdateOrderRecievedMutation();

  useEffect(() => {
    if (data) setOrder(data.order);
  }, [data]);

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      toast.success("Order Delivered & Stock Updated");
      navigate("/LPO-factory");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const receiveHandler = async () => {
    try {
      await updateOrderRecieved(orderId);
      toast.success("Order Received Successfully");
      navigate("/LPO-factory");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <h3 className="text-red-500">Error: {error}</h3>;

  return (
    <div className="p-4 md:p-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-100 mb-6 underline">
        Order Details
      </h1>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 rounded-lg shadow-lg p-5 space-y-3 border-2 border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.6)]">
          <h2 className="text-xl font-semibold text-blue-400">Order Info</h2>
          <p><span className="font-bold">Order LPO:</span> {order?._id}</p>
          <p><span className="font-bold">Payment:</span> {order?.approvedStatusProcur?.paymentMethod}</p>
          <p><span className="font-bold">Req Type:</span> {order?.requisitionSteps}</p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-5 space-y-3 border-2 border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.6)]">
          <h2 className="text-xl font-semibold text-blue-400">Additional Info</h2>
          <p><span className="font-bold">Requested By:</span> {order?.approvedData?.reqBy || "N/A"}</p>
          <p><span className="font-bold">Approved By:</span> {order?.approvedData?.approvedBy || "N/A"}</p>
          <p><span className="font-bold">Comment:</span> {order?.approvedData?.comment || "N/A"}</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Order Items</h2>

        <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg border-2 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.6)]">
          <table className="min-w-full text-sm text-gray-300 table-fixed">
            <thead className="bg-blue-600 text-white uppercase">
              <tr>
                <th className="px-4 py-2 text-left w-1/3">Product Name (Category)</th>
                <th className="px-4 py-2 text-center w-1/6">Quantity</th>
                <th className="px-4 py-2 text-center w-1/6">Price</th>
                <th className="px-4 py-2 text-center w-1/6">Supplier</th>
                {!order?.isDelivered && <th className="px-4 py-2 text-center w-1/6">Update</th>}
              </tr>
            </thead>
            <tbody className="bg-gray-700">
              {order?.orderItems?.map((item) => (
                <tr key={item._id} className="border-b border-gray-600">
                  <td className="px-4 py-2 flex flex-col">
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-gray-400 italic text-sm">{item.category || "Uncategorized"}</span>
                  </td>
                  <td className="px-4 py-2 text-center">{item.qty}</td>
                  <td className="px-4 py-2 text-center">{item.price || "0"}</td>
                  <td className="px-4 py-2 text-center">{item.supplier || "N/A"}</td>
                  {!order?.isDelivered && (
                    <td className="px-4 py-2 text-center text-blue-400 hover:underline cursor-pointer">
                      Edit
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid md:hidden gap-4">
          {order?.orderItems?.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 rounded-lg p-4 shadow-md border-2 border-blue-600 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-100">{item.name}</span>
                <span className="text-gray-400 italic text-sm">{item.category || "Uncategorized"}</span>
              </div>
              <div className="flex justify-between text-gray-200">
                <span>Qty: {item.qty}</span>
                <span>Price: {item.price || "0"}</span>
                <span>Supplier: {item.supplier || "N/A"}</span>
              </div>
              {!order?.isDelivered && (
                <div className="text-blue-400 hover:underline cursor-pointer text-sm">Edit</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 justify-end">
        {!order?.isDelivered && (
          <button
            onClick={deliverHandler}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md"
          >
            {deliverLoading ? <Loader /> : "Deliver Order (Factory)"}
          </button>
        )}

        {order?.isDelivered && !order.isReceived && (
          <button
            onClick={receiveHandler}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md"
          >
            {receivedLoading ? <Loader /> : "Receive Order"}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
*/









//////////////////////



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
  useGetOrdersQuery, // For LPO refresh
} from "../../redux/orderSlice";
import Loader from "../../components/Loader";

const OrderDetails = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);

  // Fetch order details
  const { data, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId);

  // LPO refresh hook
  const { refetch: refetchOrders } = useGetOrdersQuery();

  // Mutations
  const [deliverOrder, { isLoading: deliverLoading }] =
    useDeliverOrderMutation();

  // Update local state when data changes
  useEffect(() => {
    if (data) setOrder(data.order);
  }, [data]);

  // Deliver order (minus stock)
  const deliverHandler = async () => {
    try {
      const updatedOrder = await deliverOrder(orderId).unwrap();
      setOrder(updatedOrder);
      toast.success("Order Delivered & Stock Deducted");
      refetchOrders();
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // Status badge
  const statusBadge = (order) => {
    if (order?.isDelivered)
      return (
        <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
          Delivered
        </span>
      );
    return (
      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
        Pending
      </span>
    );
  };

  if (isLoading || !order) return <Loader />;
  if (error) return <h3 className="text-red-500">Error: {error}</h3>;

  // Restrict: only FACTORY REQUISITION can use this page
  const isFactoryReq = order?.requisitionSteps === "FACTORY REQUISITION";

  return (
    <div className="p-4 md:p-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-100 mb-6 underline">
        Order Details
      </h1>

      {/* Order Info */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 rounded-lg shadow-lg p-5 space-y-3 border-2 border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.6)]">
          <h2 className="text-xl font-semibold text-blue-400">Order Info</h2>
          <p>
            <span className="font-bold">Order LPO:</span> {order._id}
          </p>
          <p>
            <span className="font-bold">Payment:</span>{" "}
            {order?.approvedStatusProcur?.paymentMethod}
          </p>
          <p>
            <span className="font-bold">Req Type:</span>{" "}
            {order?.requisitionSteps}
          </p>
          <p>
            <span className="font-bold">Status:</span> {statusBadge(order)}
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-5 space-y-3 border-2 border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.6)]">
          <h2 className="text-xl font-semibold text-blue-400">
            Additional Info
          </h2>
          <p>
            <span className="font-bold">Requested By:</span>{" "}
            {order?.approvedData?.reqBy || "N/A"}
          </p>
          <p>
            <span className="font-bold">Approved By:</span>{" "}
            {order?.approvedData?.approvedBy || "N/A"}
          </p>
          <p>
            <span className="font-bold">Comment:</span>{" "}
            {order?.approvedData?.comment || "N/A"}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">
          Order Items
        </h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg border-2 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.6)]">
          <table className="min-w-full text-sm text-gray-300 table-fixed">
            <thead className="bg-blue-600 text-white uppercase">
              <tr>
                <th className="px-4 py-2 text-left w-1/3">
                  Product Name (Category)
                </th>
                <th className="px-4 py-2 text-center w-1/6">Quantity</th>
                <th className="px-4 py-2 text-center w-1/6">Price</th>
                <th className="px-4 py-2 text-center w-1/6">Supplier</th>
              </tr>
            </thead>
            <tbody className="bg-gray-700">
              {order.orderItems.map((item) => (
                <tr key={item._id} className="border-b border-gray-600">
                  <td className="px-4 py-2 flex flex-col">
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-gray-400 italic text-sm">
                      {item.category || "Uncategorized"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">{item.qty}</td>
                  <td className="px-4 py-2 text-center">
                    {item.price || "0"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {item.supplier || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="grid md:hidden gap-4">
          {order.orderItems.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 rounded-lg p-4 shadow-md border-2 border-blue-600 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-100">{item.name}</span>
                <span className="text-gray-400 italic text-sm">
                  {item.category || "Uncategorized"}
                </span>
              </div>
              <div className="flex justify-between text-gray-200">
                <span>Qty: {item.qty}</span>
                <span>Price: {item.price || "0"}</span>
                <span>Supplier: {item.supplier || "N/A"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons (only for Factory Requisition) */}
      {isFactoryReq && (
        <div className="mt-6 flex flex-wrap gap-4 justify-end">
          {!order.isDelivered && (
            <button
              onClick={deliverHandler}
              disabled={deliverLoading}
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deliverLoading ? <Loader /> : "Deliver Order (Minus Stock)"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderDetails;

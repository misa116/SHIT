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
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-100 mb-6 underline">
        Order Details
      </h1>

      {/* Order Info */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Card */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-5 space-y-3">
          <h2 className="text-xl font-semibold text-blue-400">Order Info</h2>
          <p><span className="font-bold">Order LPO:</span> {order?._id}</p>
          <p><span className="font-bold">Payment:</span> {order?.approvedStatusProcur?.paymentMethod}</p>
          <p><span className="font-bold">Req Type:</span> {order?.requisitionSteps}</p>
        </div>

        {/* Right Card */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-5 space-y-3">
          <h2 className="text-xl font-semibold text-blue-400">Additional Info</h2>
          <p><span className="font-bold">Requested By:</span> {order?.approvedData?.reqBy || "N/A"}</p>
          <p><span className="font-bold">Approved By:</span> {order?.approvedData?.approvedBy || "N/A"}</p>
          <p><span className="font-bold">Comment:</span> {order?.approvedData?.comment || "N/A"}</p>
        </div>
      </div>

      {/* Order Items */}
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

      {/* Buttons */}
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

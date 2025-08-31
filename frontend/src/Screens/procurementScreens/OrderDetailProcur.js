/*
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import {
  useDeliverOrderProcurMutation,
  useGetOrderDetailsQuery,
} from "../../redux/orderSlice";

const OrderDetailsProcur = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);

  const { data, isLoading, error } = useGetOrderDetailsQuery(orderId);

  const [deliverOrderProcurement, { isLoading: deliverLoading }] =
    useDeliverOrderProcurMutation();
  useEffect(() => {
    if (data) {
      setOrder(data.order);
    }
  }, [data]);
  const navigate = useNavigate();

  const deliverHandler = async () => {
    try {
      await deliverOrderProcurement(orderId);
      toast.success("Order Delivered And  Incremented the Stock");
      navigate("/warehouse");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handlePriceUpdate = (itemId, updatedOrderItem) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      orderItems: prevOrder?.orderItems?.map((i) =>
        i?._id === updatedOrderItem?._id ? updatedOrderItem : i
      ),
    }));

    // refetch();
  };


  return (
    <div>
      <div>
        {error ? (
          <h3>{error}</h3>
        ) : (
          <div className="px-4">
            <div className="flex items-center justify-evenly">
              <div>
                <h3>Order Info</h3>
                <p>
                  <span className="font-bold text-slate-100">Order LPO:</span>{" "}
                  {order?._id}
                </p>
                <p>
                  <span className="font-bold">Order Date:</span>{" "}
                  {order?.createdAt && order?.createdAt?.substring(0, 10)}
                </p>

                <p>
                  <span className="font-bold">
                    Payment : {order?.approvedStatusProcur?.paymentMethod}
                  </span>{" "}
                </p>
                <p>
                  <span className="font-bold">Delivery Status:</span>{" "}
                  {order?.isDelivered
                    ? `Delivered at ${order?.deliveredAt.substring(0, 10)}`
                    : "Not Delivered"}
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold mb-4">Additional Info</h2>
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
                        <orderItems 
                      key={item._id}
                        orderItem={item}
                        isDeliver={order?.isDeliver}
                        onPriceUpdate={handlePriceUpdate}
                        
                        />
                        
                        
                      
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
                {deliverLoading ? <Loader /> : " DELIVER ORDER WAREHOUSE"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsProcur;

*/










/*
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import {
  useDeliverOrderProcurMutation,
  useGetOrderDetailsQuery,
} from "../../redux/orderSlice";

const OrderDetailsProcur = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);

  const { data, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [deliverOrderProcurement, { isLoading: deliverLoading }] =
    useDeliverOrderProcurMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) setOrder(data.order);
  }, [data]);

  const deliverHandler = async () => {
    try {
      await deliverOrderProcurement(orderId);
      toast.success("Order Delivered and Stock Incremented");
      navigate("/warehouse");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handlePriceUpdate = (itemId, updatedOrderItem) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      orderItems: prevOrder?.orderItems?.map((i) =>
        i?._id === updatedOrderItem?._id ? updatedOrderItem : i
      ),
    }));
  };

  if (isLoading || !order)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        <p>{error?.data?.message || "Something went wrong!"}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6 space-y-8">
      
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold mb-4">Order Info</h2>
          <p>
            <span className="font-bold">LPO No:</span> {order._id}
          </p>
          <p>
            <span className="font-bold">Order Date:</span>{" "}
            {order?.createdAt?.substring(0, 10)}
          </p>
          <p>
            <span className="font-bold">Payment:</span>{" "}
            {order?.approvedStatusProcur?.paymentMethod || "N/A"}
          </p>
          <p>
            <span className="font-bold">Delivery Status:</span>{" "}
            {order?.isDelivered
              ? `Delivered at ${order?.deliveredAt?.substring(0, 10)}`
              : "Not Delivered"}
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold mb-4">Additional Info</h2>
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
          <p>
            <span className="font-bold">Requisition Type:</span>{" "}
            {order?.requisitionSteps || "N/A"}
          </p>
        </div>
      </div>

      
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
        <table className="w-full table-auto text-left text-gray-200">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-3 px-4">Product Name</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Supplier</th>
              {!order?.isDelivered && <th className="py-3 px-4">Update</th>}
            </tr>
          </thead>
          <tbody>
            {order?.orderItems?.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-600 hover:bg-gray-700 transition"
              >
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4">{item.qty}</td>
                <td className="py-3 px-4">{item.price || "0"}</td>
                <td className="py-3 px-4">{item.supplier || "N/A"}</td>
                {!order?.isDelivered && (
                  <td className="py-3 px-4">
                    <button className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-lg text-white">
                      Edit
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      {!order?.isDelivered && (
        <div className="flex justify-end">
          <button
            onClick={deliverHandler}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-2xl font-semibold transition"
          >
            {deliverLoading ? <Loader /> : "Deliver Order to Warehouse"}
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsProcur;
*/












import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import {
  useDeliverOrderProcurMutation,
  useGetOrderDetailsQuery,
} from "../../redux/orderSlice";

const OrderDetailsProcur = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);

  const { data, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [deliverOrderProcurement, { isLoading: deliverLoading }] =
    useDeliverOrderProcurMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) setOrder(data.order);
  }, [data]);

  const deliverHandler = async () => {
    try {
      await deliverOrderProcurement(orderId);
      toast.success("Order Delivered and Stock Incremented");
      navigate("/warehouse");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading || !order)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        <p>{error?.data?.message || "Something went wrong!"}</p>
      </div>
    );

  const statusBadge = (isDelivered) =>
    isDelivered ? (
      <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
        Delivered
      </span>
    ) : (
      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
        Pending
      </span>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6 space-y-8">
      {/* Order Info */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 grid md:grid-cols-2 gap-6 relative"
           style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold mb-4">Order Info</h2>
          <p>
            <span className="font-bold">LPO No:</span> {order._id}
          </p>
          <p>
            <span className="font-bold">Order Date:</span>{" "}
            {order?.createdAt?.substring(0, 10)}
          </p>
          <p>
            <span className="font-bold">Payment:</span>{" "}
            {order?.approvedStatusProcur?.paymentMethod || "N/A"}
          </p>
          <p>
            <span className="font-bold">Delivery Status:</span>{" "}
            {order?.isDelivered
              ? `Delivered at ${order?.deliveredAt?.substring(0, 10)}`
              : "Not Delivered"}
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold mb-4">Additional Info</h2>
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
          <p>
            <span className="font-bold">Requisition Type:</span>{" "}
            {order?.requisitionSteps || "N/A"}
          </p>
        </div>
      </div>

      {/* Order Items Table */}
      <div
        className="bg-gray-800 rounded-lg shadow-lg p-6 overflow-x-auto relative"
        style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
      >
        <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
        <table className="w-full table-auto text-left text-gray-200">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-3 px-4">Product Name</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Supplier</th>
              <th className="py-3 px-4">Status</th>
              {!order?.isDelivered && <th className="py-3 px-4">Update</th>}
            </tr>
          </thead>
          <tbody>
            {order?.orderItems?.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-600 hover:bg-gray-700 transition"
              >
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4">{item.qty}</td>
                <td className="py-3 px-4">{item.price || "0"}</td>
                <td className="py-3 px-4">{item.supplier || "N/A"}</td>
                <td className="py-3 px-4">{statusBadge(order?.isDelivered)}</td>
                {!order?.isDelivered && (
                  <td className="py-3 px-4">
                    <button className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-lg text-white">
                      Edit
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Deliver Button */}
      {!order?.isDelivered && (
        <div className="flex justify-end">
          <button
            onClick={deliverHandler}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-2xl font-semibold transition"
          >
            {deliverLoading ? <Loader /> : "Deliver Order to Warehouse"}
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsProcur;

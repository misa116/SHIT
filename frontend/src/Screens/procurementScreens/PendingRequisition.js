  /* import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/orderSlice";
import { FaTimes } from "react-icons/fa";



const PendingRequsitions = () => {
  const { data, isLoading, error } = useGetOrdersQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

 const filteredOrders = data?.orders
    ? data?.orders?.filter((order) => !order.isDelivered)
    : [];

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="py-4">
      <div>
        <h4 className="mt-2 flex justify-center text-3xl ">
          PENDING LOCAL PURCHASE REQUISITIONs
        </h4>
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div
              className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2
         border-gray-100"
            ></div>
          </div>
        ) : error ? (
          <h3>{error?.data.message || "Some thing went wrong "} </h3>
        ) : (
          <div className="px-4">
            <div className="overflow-x-auto">
              <table
                className="w-full text-sm text-left text-gray-200 
              dark:text-gray-400"
              >
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">LPO - NO</th>
                    <th className="py-2 px-4 border-b text-sm">PRODUCT NAME</th>

                    <th className="py-2 px-4 border-b">QTY</th>
                    <th className="py-2 px-4 border-b">USER</th>
                    <th className="py-2 px-4 border-b">DEPARTMENT</th>

                    <th className="py-2 px-4 border-b">ORDER DATE</th>
                    <th className="py-2 px-4 border-b">DELIVERED</th>
                    <th className="py-2 px-4 border-b"></th>
                    {// <th className="py-2 px-4 border-b"></th> }
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders?.map((order, index) => (
                    <tr className=" bg-gray-700 border-b border-gray-600 ">
                      <td className="py-6 px-4">{order._id}</td>
                      <td className="py-6 px4">
                        <p className="uppercase ml-3">
                          {" "}
                          {order?.orderItems[0]?.name}
                        </p>
                      </td>
                      <td className="flex items-center space-x-2 m-3">
                        {order?.orderItems.map((item) => (
                          <p key={item._id}>{item.qty}</p>
                        ))}
                      </td>
                      <td>{order.user.name}</td>
                      <td>{order.user.dept}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>
                        {order?.deliveredAt
                          ? order.deliveredAt.substring(0, 10)
                          :  "X .. on process"}{" "}
                      </td>
                      <td>
                        <Link to={`/inventory/order/${order._id}`}>
                          <button variant="light" className="btn-sm">
                            Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingRequsitions;
/*/


import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/orderSlice";

const PendingRequisitions = () => {
  const { data, isLoading, error } = useGetOrdersQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const filteredOrders = data?.orders
    ? data.orders.filter((order) => !order.isDelivered)
    : [];

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Pending Local Purchase Requisitions
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-gray-300"></div>
        </div>
      ) : error ? (
        <p className="text-red-400 text-center text-lg">
          {error?.data?.message || "Something went wrong"}
        </p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-lg mt-6">No pending requisitions.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">LPO No</th>
                <th className="py-3 px-4 text-left">Product Name</th>
                <th className="py-3 px-4 text-left">Qty</th>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Department</th>
                <th className="py-3 px-4 text-left">Order Date</th>
                <th className="py-3 px-4 text-left">Delivered</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <td className="py-4 px-4 font-medium">{order._id}</td>
                  <td className="py-4 px-4">
                    {order.orderItems[0]?.name.toUpperCase()}
                  </td>
                  <td className="py-4 px-4">
                    {order.orderItems.map((item) => (
                      <span key={item._id} className="mr-2">
                        {item.qty}
                      </span>
                    ))}
                  </td>
                  <td className="py-4 px-4">{order.user.name}</td>
                  <td className="py-4 px-4">{order.user.dept}</td>
                  <td className="py-4 px-4">{order.createdAt.substring(0, 10)}</td>
                  <td className="py-4 px-4 text-red-400">
                    {order.deliveredAt
                      ? order.deliveredAt.substring(0, 10)
                      : "X .. in process"}
                  </td>
                  <td className="py-4 px-4">
                    <Link to={`/inventory/order/${order._id}`}>
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded-lg transition">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingRequisitions;

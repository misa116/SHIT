/*/ import React from "react";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/orderSlice";

const GRN = () => {
  const { data, isLoading, error } = useGetOrdersQuery();

  const filteredOrders = data?.orders?.filter((order) => order?.isReceived);
  console.log("GRN", filteredOrders);
  return (
    <div className="py-4">
      <h4 className="mt-2 flex justify-center text-3xl ">
        GOODS RECEIVE NOTEs
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
          {filteredOrders?.length === 0 ? (
            <h3 variant="info">No received orders available.</h3>
          ) : (
            <div className="px-4">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-3 px-6 text-left border-r border-b">
                      Order GRN
                    </th>
                    <th className="py-3 px-6 text-left border-r border-b">
                      PRODUCT NAME
                    </th>
                    <th className="py-3 px-6 text-left border-r border-b">
                      QTY
                    </th>
                    <th className="py-3 px-6 text-left border-r border-b">
                      USER
                    </th>
                    <th className="py-3 px-6 text-left border-r border-b">
                      Order Date
                    </th>
                    <th className="py-3 px-6 text-left border-r border-b">
                      Delivered Date
                    </th>
                    <th className="py-3 px-6 text-left border-b">
                      Received Date
                    </th>
                    {}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders?.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-500">
                      <td className="py-3 px-6 border-r border-b">
                        {order._id}
                      </td>

                      <td className="py-2 px-4 border-r border-b">
                        <p className="uppercase">{order?.orderItems[0].name}</p>
                      </td>

                      <td className="py-2 px-4 border-r border-b">
                        {order?.orderItems.map((item, index) => (
                          <p className="uppercase" key={item._id}>
                            {item.qty}
                            {index !== order.orderItems.length - 1 && (
                              <br />
                            )}{" "}
                            
                          /*</p>
                        ))}
                      </td>
                      
                      <td className="py-2 px-4 border-r border-b">
                        {order.user && order.user.name}
                      </td>
                      <td className="py-2 px-4 border-r border-b">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="py-2 px-4 border-r border-b">
                        {order.deliveredAt?.substring(0, 10)}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {order.receivedAt?.substring(0, 10)}
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GRN;
/*/



/*
import React from "react";
import { useGetOrdersQuery } from "../../redux/orderSlice";

const GRN = () => {
  const { data, isLoading, error } = useGetOrdersQuery();
  const filteredOrders = data?.orders?.filter((order) => order?.isReceived);

  return (
    <div className="p-4">
      <h4 className="text-3xl font-bold text-center mb-6 text-gray-200">
        Goods Receive Notes
      </h4>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : error ? (
        <h3 className="text-center text-red-500">
          {error?.data?.message || "Something went wrong"}
        </h3>
      ) : filteredOrders?.length === 0 ? (
        <h3 className="text-center text-gray-400">
          No received orders available.
        </h3>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full text-sm text-gray-300">
            <thead className="bg-gray-800 text-gray-200 sticky top-0">
              <tr>
                <th className="py-3 px-4 text-left">Order GRN</th>
                <th className="py-3 px-4 text-left">Product Name</th>
                <th className="py-3 px-4 text-left">Qty</th>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Ordered On</th>
                <th className="py-3 px-4 text-left">Delivery Left On</th>
                <th className="py-3 px-4 text-left">Received On</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders?.map((order, idx) => (
                <tr
                  key={order._id}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
                  } hover:bg-gray-500 transition-colors`}
                >
                  <td className="py-3 px-4 font-mono">{order._id}</td>
                  <td className="py-3 px-4 uppercase">
                    {order?.orderItems[0]?.name}
                  </td>
                  <td className="py-3 px-4">
                    {order?.orderItems.map((item, index) => (
                      <p key={item._id}>
                        {item.qty}
                        {index !== order.orderItems.length - 1 && <br />}
                      </p>
                    ))}
                  </td>
                  <td className="py-3 px-4">{order.user?.name || "N/A"}</td>
                  <td className="py-3 px-4">
                    {order.createdAt?.substring(0, 10)}
                  </td>
                  <td className="py-3 px-4">
                    {order.deliveredAt?.substring(0, 10) || "-"}
                  </td>
                  <td className="py-3 px-4">
                    {order.receivedAt?.substring(0, 10) || "-"}
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

export default GRN;

*/








/*

import React, { useState } from "react";
import { useGetOrdersQuery } from "../../redux/orderSlice";

const GRN = () => {
  const { data, isLoading, error } = useGetOrdersQuery();
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const resetFilters = () => {
    setSearch("");
    setDateFilter("");
  };

  const filteredOrders = data?.orders
    ?.filter((order) => order?.isReceived)
    ?.filter((order) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        order._id.toLowerCase().includes(searchLower) ||
        order?.user?.name?.toLowerCase().includes(searchLower) ||
        order?.orderItems[0]?.name?.toLowerCase().includes(searchLower);

      const matchesDate = dateFilter
        ? order.receivedAt?.substring(0, 10) === dateFilter
        : true;

      return matchesSearch && matchesDate;
    });

  return (
    <div className="p-4 sm:p-6">
      <h4 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-200">
        Goods Receive Notes
      </h4>

      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by GRN, product, or user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-200 focus:outline-none focus:border-blue-400"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-200 focus:outline-none focus:border-blue-400"
        />
        {(search || dateFilter) && (
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Reset
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : error ? (
        <h3 className="text-center text-red-500">
          {error?.data?.message || "Something went wrong"}
        </h3>
      ) : filteredOrders?.length === 0 ? (
        <h3 className="text-center text-gray-400">
          No received orders available.
        </h3>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full text-sm text-gray-300">
              <thead className="bg-gray-800 text-gray-200 sticky top-0">
                <tr>
                  <th className="py-3 px-4 text-left">Order GRN</th>
                  <th className="py-3 px-4 text-left">Product Name</th>
                  <th className="py-3 px-4 text-left">Qty</th>
                  <th className="py-3 px-4 text-left">User</th>
                  <th className="py-3 px-4 text-left">Ordered On</th>
                  <th className="py-3 px-4 text-left">Delivery Left On</th>
                  <th className="py-3 px-4 text-left">Received On</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders?.map((order, idx) => (
                  <tr
                    key={order._id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
                    } hover:bg-gray-500 transition-colors`}
                  >
                    <td className="py-3 px-4 font-mono">{order._id}</td>
                    <td className="py-3 px-4 uppercase">
                      {order?.orderItems[0]?.name}
                    </td>
                    <td className="py-3 px-4">
                      {order?.orderItems.map((item, index) => (
                        <p key={item._id}>
                          {item.qty}
                          {index !== order.orderItems.length - 1 && <br />}
                        </p>
                      ))}
                    </td>
                    <td className="py-3 px-4">{order.user?.name || "N/A"}</td>
                    <td className="py-3 px-4">
                      {order.createdAt?.substring(0, 10)}
                    </td>
                    <td className="py-3 px-4">
                      {order.deliveredAt?.substring(0, 10) || "-"}
                    </td>
                    <td className="py-3 px-4">
                      {order.receivedAt?.substring(0, 10) || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredOrders?.map((order) => (
              <div
                key={order._id}
                className="bg-gray-700 rounded-xl shadow-md p-4 space-y-2 text-gray-200 border border-gray-600 hover:shadow-xl hover:border-blue-400 transition"
              >
                <p className="text-sm text-gray-400 font-mono break-all">
                  <span className="font-semibold">Order GRN:</span> {order._id}
                </p>
                <p>
                  <span className="font-semibold">Product:</span>{" "}
                  {order?.orderItems[0]?.name}
                </p>
                <p>
                  <span className="font-semibold">Qty:</span>{" "}
                  {order?.orderItems.map((item) => item.qty).join(", ")}
                </p>
                <p>
                  <span className="font-semibold">User:</span>{" "}
                  {order.user?.name || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Ordered On:</span>{" "}
                  {order.createdAt?.substring(0, 10)}
                </p>
                <p>
                  <span className="font-semibold">Delivery Left On:</span>{" "}
                  {order.deliveredAt?.substring(0, 10) || "-"}
                </p>
                <p>
                  <span className="font-semibold">Received On:</span>{" "}
                  {order.receivedAt?.substring(0, 10) || "-"}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GRN;

*/


































//works
/*
import React, { useState } from "react";
import { useGetOrdersQuery } from "../../redux/orderSlice";

const GRN = () => {
  const { data, isLoading, error } = useGetOrdersQuery();
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const resetFilters = () => {
    setSearch("");
    setDateFilter("");
    setStatusFilter("all");
  };

  const getStatus = (order) => {
    if (order.isReceived) return "received";
    if (order.isDelivered && !order.isReceived) return "delivered";
    return "pending";
  };

  const filteredOrders = data?.orders
    ?.filter((order) => order?.isReceived) // ✅ Only show received orders as base
    ?.filter((order) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        order._id.toLowerCase().includes(searchLower) ||
        order?.user?.name?.toLowerCase().includes(searchLower) ||
        order?.orderItems[0]?.name?.toLowerCase().includes(searchLower);

      const matchesDate = dateFilter
        ? order.receivedAt?.substring(0, 10) === dateFilter
        : true;

      const matchesStatus =
        statusFilter === "all" ? true : getStatus(order) === statusFilter;

      return matchesSearch && matchesDate && matchesStatus;
    });

  const getStatusBadge = (order) => {
    if (order.isReceived) {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-600 text-white">
          ✅ Received
        </span>
      );
    }
    if (order.isDelivered && !order.isReceived) {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-500 text-white">
          📦 Delivered
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-600 text-white">
        ⏳ Pending
      </span>
    );
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-900 min-h-screen">
      <h4 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-blue-300 drop-shadow">
        Goods Receive Notes
      </h4>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
        <input
          type="text"
          placeholder="🔍 Search by GRN, product, or user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full sm:w-1/4 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-1/4 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="all">All Status</option>
          <option value="received">✅ Received</option>
          <option value="delivered">📦 Delivered</option>
          <option value="pending">⏳ Pending</option>
        </select>
        {(search || dateFilter || statusFilter !== "all") && (
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md transition w-full sm:w-auto"
          >
            Reset
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : error ? (
        <h3 className="text-center text-red-500">
          {error?.data?.message || "Something went wrong"}
        </h3>
      ) : filteredOrders?.length === 0 ? (
        <h3 className="text-center text-gray-400">
          No received orders available.
        </h3>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg border border-gray-700">
            <table className="min-w-full text-sm text-gray-300">
              <thead className="bg-gray-800 text-blue-300 uppercase sticky top-0">
                <tr>
                  <th className="py-3 px-4 text-left">Order GRN</th>
                  <th className="py-3 px-4 text-left">Product Name</th>
                  <th className="py-3 px-4 text-left">Qty</th>
                  <th className="py-3 px-4 text-left">User</th>
                  <th className="py-3 px-4 text-left">Ordered On</th>
                  <th className="py-3 px-4 text-left">Delivery Left On</th>
                  <th className="py-3 px-4 text-left">Received On</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders?.map((order, idx) => (
                  <tr
                    key={order._id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
                    } hover:bg-gray-500 transition-colors`}
                  >
                    <td className="py-3 px-4 font-mono text-blue-400">
                      {order._id}
                    </td>
                    <td className="py-3 px-4 uppercase">
                      {order?.orderItems[0]?.name}
                    </td>
                    <td className="py-3 px-4">
                      {order?.orderItems.map((item, index) => (
                        <p key={item._id}>
                          {item.qty}
                          {index !== order.orderItems.length - 1 && <br />}
                        </p>
                      ))}
                    </td>
                    <td className="py-3 px-4">{order.user?.name || "N/A"}</td>
                    <td className="py-3 px-4">
                      {order.createdAt?.substring(0, 10)}
                    </td>
                    <td className="py-3 px-4">
                      {order.deliveredAt?.substring(0, 10) || "-"}
                    </td>
                    <td className="py-3 px-4">
                      {order.receivedAt?.substring(0, 10) || "-"}
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(order)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredOrders?.map((order) => (
              <div
                key={order._id}
                className="bg-gray-800 rounded-xl shadow-lg p-4 space-y-2 text-gray-200 border border-gray-700 hover:border-blue-400 hover:shadow-xl transition"
              >
                <p className="text-sm text-gray-400 font-mono break-all">
                  <span className="font-semibold text-blue-300">Order GRN:</span>{" "}
                  {order._id}
                </p>
                <p>
                  <span className="font-semibold text-blue-300">Product:</span>{" "}
                  {order?.orderItems[0]?.name}
                </p>
                <p>
                  <span className="font-semibold text-blue-300">Qty:</span>{" "}
                  {order?.orderItems.map((item) => item.qty).join(", ")}
                </p>
                <p>
                  <span className="font-semibold text-blue-300">User:</span>{" "}
                  {order.user?.name || "N/A"}
                </p>
                <p>
                  <span className="font-semibold text-blue-300">Ordered On:</span>{" "}
                  {order.createdAt?.substring(0, 10)}
                </p>
                <p>
                  <span className="font-semibold text-blue-300">
                    Delivery Left On:
                  </span>{" "}
                  {order.deliveredAt?.substring(0, 10) || "-"}
                </p>
                <p>
                  <span className="font-semibold text-blue-300">Received On:</span>{" "}
                  {order.receivedAt?.substring(0, 10) || "-"}
                </p>
                <p>
                  <span className="font-semibold text-blue-300">Status:</span>{" "}
                  {getStatusBadge(order)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GRN;
*/














//works
  /*
import React, { useState } from "react";
import { useGetOrdersQuery } from "../../redux/orderSlice";

const GRN = () => {
  const { data, isLoading, error } = useGetOrdersQuery();
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const resetFilters = () => {
    setSearch("");
    setDateFilter("");
    setStatusFilter("all");
  };

  const getStatus = (order) => {
    if (order.isReceived) return "received";
    if (order.isDelivered && !order.isReceived) return "delivered";
    return "pending";
  };

  // ✅ Normalize API response: works for both `data.orders` or just `data`
  const orders = Array.isArray(data) ? data : data?.orders || [];

  const filteredOrders = orders
    .filter((order) => order?.isReceived) // only received
    .filter((order) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        order._id.toLowerCase().includes(searchLower) ||
        order?.user?.name?.toLowerCase().includes(searchLower) ||
        order?.orderItems[0]?.name?.toLowerCase().includes(searchLower);

      const matchesDate = dateFilter
        ? order.receivedAt?.substring(0, 10) === dateFilter
        : true;

      const matchesStatus =
        statusFilter === "all" ? true : getStatus(order) === statusFilter;

      return matchesSearch && matchesDate && matchesStatus;
    });

  const getStatusBadge = (order) => {
    if (order.isReceived) {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-600 text-white">
          ✅ Received
        </span>
      );
    }
    if (order.isDelivered && !order.isReceived) {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-500 text-white">
          📦 Delivered
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-600 text-white">
        ⏳ Pending
      </span>
    );
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-900 min-h-screen">
      <h4 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-blue-300 drop-shadow">
        Goods Receive Notes
      </h4>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
        <input
          type="text"
          placeholder="🔍 Search by GRN, product, or user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full sm:w-1/4 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-1/4 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="all">All Status</option>
          <option value="received">✅ Received</option>
          <option value="delivered">📦 Delivered</option>
          <option value="pending">⏳ Pending</option>
        </select>
        {(search || dateFilter || statusFilter !== "all") && (
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md transition w-full sm:w-auto"
          >
            Reset
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : error ? (
        <h3 className="text-center text-red-500">
          {error?.data?.message || "Something went wrong"}
        </h3>
      ) : filteredOrders?.length === 0 ? (
        <h3 className="text-center text-gray-400">
          No received orders available.
        </h3>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg border border-gray-700">
            <table className="min-w-full text-sm text-gray-300">
              <thead className="bg-gray-800 text-blue-300 uppercase sticky top-0">
                <tr>
                  <th className="py-3 px-4 text-left">Order GRN</th>
                  <th className="py-3 px-4 text-left">Product Name</th>
                  <th className="py-3 px-4 text-left">Qty</th>
                  <th className="py-3 px-4 text-left">User</th>
                  <th className="py-3 px-4 text-left">Ordered On</th>
                  <th className="py-3 px-4 text-left">Delivery Left On</th>
                  <th className="py-3 px-4 text-left">Received On</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders?.map((order, idx) => (
                  <tr
                    key={order._id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
                    } hover:bg-gray-500 transition-colors`}
                  >
                    <td className="py-3 px-4 font-mono text-blue-400">
                      {order._id}
                    </td>
                    <td className="py-3 px-4 uppercase">
                      {order?.orderItems[0]?.name}
                    </td>
                    <td className="py-3 px-4">
                      {order?.orderItems.map((item, index) => (
                        <p key={item._id}>
                          {item.qty}
                          {index !== order.orderItems.length - 1 && <br />}
                        </p>
                      ))}
                    </td>
                    <td className="py-3 px-4">{order.user?.name || "N/A"}</td>
                    <td className="py-3 px-4">
                      {order.createdAt?.substring(0, 10)}
                    </td>
                    <td className="py-3 px-4">
                      {order.deliveredAt?.substring(0, 10) || "-"}
                    </td>
                    <td className="py-3 px-4">
                      {order.receivedAt?.substring(0, 10) || "-"}
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(order)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredOrders?.map((order) => (
              <div
                key={order._id}
                className="bg-gray-800 rounded-xl shadow-lg p-4 space-y-2 text-gray-200 border border-gray-700 hover:border-blue-400 hover:shadow-xl transition"
              >
                <p className="text-sm text-gray-400 font-mono break-all">
                  <span className="font-semibold text-blue-300">Order GRN:</span>{" "}
                  {order._id}
                </p>
                <p>
                  <span className="font-semibold text-blue-300">Product:</span>{" "}
                  {order?.orderItems[0]?.name}
                </p>
                <p>
                  <span className="font-semibold text-blue-300">Qty:</span>{" "}
                  {order?.orderItems.map((item) => item.qty).join(", ")}
                </p>
                <p>
                  <span className="font-semibold text-blue-300">User:</span>{" "}
                  {order.user?.name || "N/A"}
                </p>
                <p>
                  <span className="font-semibold text-blue-300">Ordered On:</span>{" "}
                  {order.createdAt?.substring(0, 10)}
                </p>
                <p>
                  <span className="font-semibold text-blue-300">
                    Delivery Left On:
                  </span>{" "}
                  {order.deliveredAt?.substring(0, 10) || "-"}
                </p>
                <p>
                  <span className="font-semibold text-blue-300">Received On:</span>{" "}
                  {order.receivedAt?.substring(0, 10) || "-"}
                </p>
                <p>
                  <span className="font-semibold text-blue-300">Status:</span>{" "}
                  {getStatusBadge(order)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GRN;
*/
















import React, { useState, useEffect } from "react";
import { useGetOrdersQuery } from "../../redux/orderSlice";

const GRN = () => {
  const { data, isLoading, error, refetch } = useGetOrdersQuery();
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Auto-refresh every 10s (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, [refetch]);

  const resetFilters = () => {
    setSearch("");
    setDateFilter("");
    setStatusFilter("all");
  };

  const getStatus = (order) => {
    if (order.isReceived) return "received";
    if (order.isDelivered && !order.isReceived) return "delivered";
    return "pending";
  };

  const orders = Array.isArray(data) ? data : data?.orders || [];

  const filteredOrders = orders
    .filter((order) => order?.isReceived) // only received
    .filter((order) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        order._id.toLowerCase().includes(searchLower) ||
        order?.user?.name?.toLowerCase().includes(searchLower) ||
        order?.orderItems[0]?.name?.toLowerCase().includes(searchLower);

      const matchesDate = dateFilter
        ? order.receivedAt?.substring(0, 10) === dateFilter
        : true;

      const matchesStatus =
        statusFilter === "all" ? true : getStatus(order) === statusFilter;

      return matchesSearch && matchesDate && matchesStatus;
    });

  const getStatusBadge = (order) => {
    if (order.isReceived) {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-600 text-white">
          ✅ Received
        </span>
      );
    }
    if (order.isDelivered && !order.isReceived) {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-500 text-white">
          📦 Delivered
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-600 text-white">
        ⏳ Pending
      </span>
    );
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-900 min-h-screen">
      <h4 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-blue-300 drop-shadow">
        Goods Receive Notes
      </h4>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
        <input
          type="text"
          placeholder="🔍 Search by GRN, product, or user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full sm:w-1/4 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-1/4 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="all">All Status</option>
          <option value="received">✅ Received</option>
          <option value="delivered">📦 Delivered</option>
          <option value="pending">⏳ Pending</option>
        </select>
        {(search || dateFilter || statusFilter !== "all") && (
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md transition w-full sm:w-auto"
          >
            Reset
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : error ? (
        <h3 className="text-center text-red-500">
          {error?.data?.message || "Something went wrong"}
        </h3>
      ) : filteredOrders?.length === 0 ? (
        <h3 className="text-center text-gray-400">No received orders available.</h3>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg border border-gray-700">
            <table className="min-w-full text-sm text-gray-300">
              <thead className="bg-gray-800 text-blue-300 uppercase sticky top-0">
                <tr>
                  <th className="py-3 px-4 text-left">Order GRN</th>
                  <th className="py-3 px-4 text-left">Product Name</th>
                  <th className="py-3 px-4 text-left">Qty</th>
                  <th className="py-3 px-4 text-left">User</th>
                  <th className="py-3 px-4 text-left">Ordered On</th>
                  <th className="py-3 px-4 text-left">Delivery Left On</th>
                  <th className="py-3 px-4 text-left">Received On</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders?.map((order, idx) => (
                  <tr
                    key={order._id}
                    className={`${idx % 2 === 0 ? "bg-gray-700" : "bg-gray-600"} hover:bg-gray-500 transition-colors`}
                  >
                    <td className="py-3 px-4 font-mono text-blue-400">{order._id}</td>
                    <td className="py-3 px-4 uppercase">{order?.orderItems[0]?.name}</td>
                    <td className="py-3 px-4">{order?.orderItems.map((item) => item.qty).join(", ")}</td>
                    <td className="py-3 px-4">{order.user?.name || "N/A"}</td>
                    <td className="py-3 px-4">{order.createdAt?.substring(0, 10)}</td>
                    <td className="py-3 px-4">{order.deliveredAt?.substring(0, 10) || "-"}</td>
                    <td className="py-3 px-4">{order.receivedAt?.substring(0, 10) || "-"}</td>
                    <td className="py-3 px-4">{getStatusBadge(order)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredOrders?.map((order) => (
              <div key={order._id} className="bg-gray-800 rounded-xl shadow-lg p-4 space-y-2 text-gray-200 border border-gray-700 hover:border-blue-400 hover:shadow-xl transition">
                <p className="text-sm text-gray-400 font-mono break-all">
                  <span className="font-semibold text-blue-300">Order GRN:</span> {order._id}
                </p>
                <p><span className="font-semibold text-blue-300">Product:</span> {order?.orderItems[0]?.name}</p>
                <p><span className="font-semibold text-blue-300">Qty:</span> {order?.orderItems.map((item) => item.qty).join(", ")}</p>
                <p><span className="font-semibold text-blue-300">User:</span> {order.user?.name || "N/A"}</p>
                <p><span className="font-semibold text-blue-300">Ordered On:</span> {order.createdAt?.substring(0, 10)}</p>
                <p><span className="font-semibold text-blue-300">Delivery Left On:</span> {order.deliveredAt?.substring(0, 10) || "-"}</p>
                <p><span className="font-semibold text-blue-300">Received On:</span> {order.receivedAt?.substring(0, 10) || "-"}</p>
                <p><span className="font-semibold text-blue-300">Status:</span> {getStatusBadge(order)}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GRN;









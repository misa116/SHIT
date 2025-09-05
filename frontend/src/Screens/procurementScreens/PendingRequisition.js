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























/*
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
*/












/*


import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/orderSlice";

const PendingRequisitions = () => {
  const { data, isLoading, error } = useGetOrdersQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const filteredOrders = data?.orders?.filter((order) => !order.isDelivered) || [];

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-400 drop-shadow-lg">
        Pending Local Purchase Requisitions
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : error ? (
        <p className="text-red-400 text-center text-lg">{error?.data?.message || "Something went wrong"}</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-lg mt-6 text-gray-400">No pending requisitions.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-yellow-300">LPO No</th>
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
              {filteredOrders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                  } hover:bg-gray-600 transition-colors`}
                >
                  <td className="py-4 px-4 font-mono text-yellow-400">{order._id}</td>
                  <td className="py-4 px-4 font-semibold">{order.orderItems[0]?.name.toUpperCase()}</td>
                  <td className="py-4 px-4">
                    {order.orderItems.map((item) => (
                      <span key={item._id} className="mr-2 bg-gray-600 px-2 py-1 rounded text-sm">
                        {item.qty}
                      </span>
                    ))}
                  </td>
                  <td className="py-4 px-4">{order.user.name}</td>
                  <td className="py-4 px-4">{order.user.dept}</td>
                  <td className="py-4 px-4">{order.createdAt.substring(0, 10)}</td>
                  <td className={`py-4 px-4 ${order.deliveredAt ? "text-green-400" : "text-red-400"}`}>
                    {order.deliveredAt ? order.deliveredAt.substring(0, 10) : "X .. in process"}
                  </td>
                  <td className="py-4 px-4">
                    <Link to={`/inventory/order/${order._id}`}>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-lg shadow-sm transition transform hover:scale-105">
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
*/





//works
/*
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
                    <Link to={`/procurement/order/${order._id}`}>
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
*/







//hecka nice
/*
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/orderSlice";

const PendingRequisitions = () => {
  const { data, isLoading, error } = useGetOrdersQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Filters & sort state
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("inprocess");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  // Collect unique departments for filter
  const departments =
    data?.orders
      ?.map((order) => order.user.dept)
      .filter((value, index, self) => self.indexOf(value) === index) || [];

  // Filter + sort
  const filteredOrders = data?.orders
    ? data.orders
        .filter((order) => {
          const matchesSearch =
            order._id.toLowerCase().includes(search.toLowerCase()) ||
            order.orderItems[0]?.name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            order.user.name.toLowerCase().includes(search.toLowerCase());

          const matchesDept =
            deptFilter === "all" || order.user.dept === deptFilter;

          const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "inprocess" && !order.deliveredAt) ||
            (statusFilter === "delivered" && order.deliveredAt);

          return matchesSearch && matchesDept && matchesStatus;
        })
        .sort((a, b) =>
          sortOrder === "newest"
            ? new Date(b.createdAt) - new Date(a.createdAt)
            : new Date(a.createdAt) - new Date(b.createdAt)
        )
    : [];

  // Status badge component
  const StatusBadge = ({ deliveredAt }) => {
    return deliveredAt ? (
      <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded-full text-xs font-semibold">
        ✅ Delivered {deliveredAt.substring(0, 10)}
      </span>
    ) : (
      <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded-full text-xs font-semibold">
        ⏳ In Process
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 py-8 px-4">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-2 drop-shadow-md">
        Pending Local Purchase Requisitions
      </h1>

      <p className="text-center text-indigo-400 text-lg md:text-xl mb-6 font-semibold">
        Total Pending Orders: {filteredOrders.length}
      </p>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <input
          type="text"
          placeholder="🔍 Search by LPO, product, or user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-2/3">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="inprocess">In Process</option>
            <option value="delivered">Delivered</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-400"></div>
        </div>
      ) : error ? (
        <p className="text-red-400 text-center text-lg">
          {error?.data?.message || "Something went wrong"}
        </p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-lg mt-6">No requisitions found.</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full table-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-gray-700 text-gray-200">
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
                    <td className="py-4 px-4">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge deliveredAt={order.deliveredAt} />
                    </td>
                    <td className="py-4 px-4">
                      <Link to={`/procurement/order/${order._id}`}>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded-lg shadow transition">
                          Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:hidden gap-4">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700"
              >
                <h2 className="text-lg font-bold text-indigo-400 mb-2">
                  LPO: {order._id}
                </h2>
                <p className="text-sm">
                  <span className="font-semibold">Product:</span>{" "}
                  {order.orderItems[0]?.name.toUpperCase()}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Qty:</span>{" "}
                  {order.orderItems.map((item) => (
                    <span key={item._id} className="mr-2">
                      {item.qty}
                    </span>
                  ))}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">User:</span> {order.user.name}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Dept:</span> {order.user.dept}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Date:</span>{" "}
                  {order.createdAt.substring(0, 10)}
                </p>
                <div className="mt-2">
                  <StatusBadge deliveredAt={order.deliveredAt} />
                </div>
                <div className="mt-3 flex justify-end">
                  <Link to={`/procurement/order/${order._id}`}>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded-lg shadow transition">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PendingRequisitions;
*/









/*
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/orderSlice";

const PendingRequisitions = () => {
  const { data, isLoading, error } = useGetOrdersQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("inprocess");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  const departments =
    data?.orders
      ?.map((order) => order.user.dept)
      .filter((value, index, self) => self.indexOf(value) === index) || [];

  const filteredOrders = data?.orders
    ? data.orders
        .filter((order) => {
          const matchesSearch =
            order._id.toLowerCase().includes(search.toLowerCase()) ||
            order.orderItems[0]?.name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            order.user.name.toLowerCase().includes(search.toLowerCase());
          const matchesDept =
            deptFilter === "all" || order.user.dept === deptFilter;
          const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "inprocess" && !order.deliveredAt) ||
            (statusFilter === "delivered" && order.deliveredAt);
          return matchesSearch && matchesDept && matchesStatus;
        })
        .sort((a, b) =>
          sortOrder === "newest"
            ? new Date(b.createdAt) - new Date(a.createdAt)
            : new Date(a.createdAt) - new Date(b.createdAt)
        )
    : [];

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const StatusBadge = ({ deliveredAt }) =>
    deliveredAt ? (
      <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded-full text-xs font-semibold">
        ✅ Delivered {deliveredAt.substring(0, 10)}
      </span>
    ) : (
      <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded-full text-xs font-semibold">
        ⏳ In Process
      </span>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 py-8 px-4">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-2 drop-shadow-md">
        Pending Local Purchase Requisitions
      </h1>
      <p className="text-center text-indigo-400 text-lg md:text-xl mb-6 font-semibold">
        Total Pending Orders: {filteredOrders.length}
      </p>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <input
          type="text"
          placeholder="🔍 Search by LPO, product, or user..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-2/3">
          <select
            value={deptFilter}
            onChange={(e) => {
              setDeptFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="inprocess">In Process</option>
            <option value="delivered">Delivered</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={5}>5 rows/page</option>
            <option value={10}>10 rows/page</option>
            <option value={20}>20 rows/page</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-400"></div>
        </div>
      ) : error ? (
        <p className="text-red-400 text-center text-lg">
          {error?.data?.message || "Something went wrong"}
        </p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-lg mt-6">No requisitions found.</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full table-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-gray-700 text-gray-200">
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
                {paginatedOrders.map((order, index) => (
                  <tr
                    key={order._id}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className="bg-gray-800 hover:bg-gray-700 hover:shadow-lg hover:shadow-indigo-500/50 transform hover:scale-[1.01] transition-all duration-200 animate-fadeIn"
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
                    <td className="py-4 px-4">
                      <StatusBadge deliveredAt={order.deliveredAt} />
                    </td>
                    <td className="py-4 px-4">
                      <Link to={`/procurement/order/${order._id}`}>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded-lg shadow transition transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-400/50 duration-200">
                          Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:hidden gap-4">
            {paginatedOrders.map((order, index) => (
              <div
                key={order._id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-200 animate-fadeIn"
              >
                <h2 className="text-lg font-bold text-indigo-400 mb-2">
                  LPO: {order._id}
                </h2>
                <p className="text-sm">
                  <span className="font-semibold">Product:</span>{" "}
                  {order.orderItems[0]?.name.toUpperCase()}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Qty:</span>{" "}
                  {order.orderItems.map((item) => (
                    <span key={item._id} className="mr-2">{item.qty}</span>
                  ))}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">User:</span> {order.user.name}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Dept:</span> {order.user.dept}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Date:</span>{" "}
                  {order.createdAt.substring(0, 10)}
                </p>
                <div className="mt-2">
                  <StatusBadge deliveredAt={order.deliveredAt} />
                </div>
                <div className="mt-3 flex justify-end">
                  <Link to={`/procurement/order/${order._id}`}>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded-lg shadow transition transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-400/50 duration-200">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 gap-2 flex-wrap">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 disabled:opacity-50 transition"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition ${
                  currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 disabled:opacity-50 transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PendingRequisitions;
*/






import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/orderSlice";

const PendingRequisitions = () => {
  const { data, isLoading, error } = useGetOrdersQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("inprocess");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  const departments =
    data?.orders
      ?.map((order) => order.user.dept)
      .filter((value, index, self) => self.indexOf(value) === index) || [];

  const filteredOrders = data?.orders
    ? data.orders
        .filter((order) => {
          const matchesSearch =
            order._id.toLowerCase().includes(search.toLowerCase()) ||
            order.orderItems[0]?.name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            order.user.name.toLowerCase().includes(search.toLowerCase());
          const matchesDept =
            deptFilter === "all" || order.user.dept === deptFilter;
          const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "inprocess" && !order.deliveredAt) ||
            (statusFilter === "delivered" && order.deliveredAt);
          return matchesSearch && matchesDept && matchesStatus;
        })
        .sort((a, b) =>
          sortOrder === "newest"
            ? new Date(b.createdAt) - new Date(a.createdAt)
            : new Date(a.createdAt) - new Date(b.createdAt)
        )
    : [];

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const StatusBadge = ({ deliveredAt }) =>
    deliveredAt ? (
      <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded-full text-xs font-semibold">
        ✅ Delivered {deliveredAt.substring(0, 10)}
      </span>
    ) : (
      <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded-full text-xs font-semibold">
        ⏳ In Process
      </span>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 py-8 px-4">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-2 drop-shadow-md">
        Pending Local Purchase Requisitions
      </h1>
      <p className="text-center text-indigo-400 text-lg md:text-xl mb-6 font-semibold">
        Total Pending Orders: {filteredOrders.length}
      </p>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <input
          type="text"
          placeholder="🔍 Search by LPO, product, or user..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-2/3">
          <select
            value={deptFilter}
            onChange={(e) => {
              setDeptFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="inprocess">In Process</option>
            <option value="delivered">Delivered</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={5}>5 rows/page</option>
            <option value={10}>10 rows/page</option>
            <option value={20}>20 rows/page</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-400"></div>
        </div>
      ) : error ? (
        <p className="text-red-400 text-center text-lg">
          {error?.data?.message || "Something went wrong"}
        </p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-lg mt-6">No requisitions found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full table-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-gray-700 text-gray-200">
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
                {paginatedOrders.map((order, index) => (
                  <tr
                    key={order._id}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className="bg-gray-800 hover:bg-gray-700 hover:shadow-lg hover:shadow-indigo-500/50 transform hover:scale-[1.01] transition-all duration-200 animate-fadeIn"
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
                    <td className="py-4 px-4">
                      <StatusBadge deliveredAt={order.deliveredAt} />
                    </td>
                    <td className="py-4 px-4">
                      <Link to={`/procurement/order/${order._id}`}>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded-lg shadow transition transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-400/50 duration-200">
                          Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid md:hidden gap-4">
            {paginatedOrders.map((order, index) => (
              <div
                key={order._id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-200 animate-fadeIn"
              >
                <h2 className="text-lg font-bold text-indigo-400 mb-3">
                  LPO: {order._id}
                </h2>

                <p className="text-sm mb-1">
                  <span className="font-semibold">Product:</span>{" "}
                  <span className="bg-indigo-700/50 px-2 py-1 rounded">{order.orderItems[0]?.name.toUpperCase()}</span>
                </p>

                <p className="text-sm mb-1">
                  <span className="font-semibold">Qty:</span>{" "}
                  {order.orderItems.map((item) => (
                    <span
                      key={item._id}
                      className="bg-green-600/30 text-green-300 px-2 py-1 rounded mr-1"
                    >
                      {item.qty}
                    </span>
                  ))}
                </p>

                <p className="text-sm mb-1">
                  <span className="font-semibold">User:</span>{" "}
                  <span className="bg-yellow-600/30 text-yellow-200 px-2 py-1 rounded">
                    {order.user.name}
                  </span>
                </p>

                <p className="text-sm mb-1">
                  <span className="font-semibold">Dept:</span>{" "}
                  <span className="bg-pink-600/30 text-pink-200 px-2 py-1 rounded">
                    {order.user.dept}
                  </span>
                </p>

                <p className="text-sm mb-1">
                  <span className="font-semibold">Date:</span>{" "}
                  <span className="bg-gray-700/50 px-2 py-1 rounded">
                    {order.createdAt.substring(0, 10)}
                  </span>
                </p>

                <div className="mt-2">
                  <StatusBadge deliveredAt={order.deliveredAt} />
                </div>

                <div className="mt-3 flex justify-end">
                  <Link to={`/procurement/order/${order._id}`}>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded-lg shadow transition transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-400/50 duration-200">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 gap-2 flex-wrap">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 disabled:opacity-50 transition"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition ${
                  currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 disabled:opacity-50 transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PendingRequisitions;

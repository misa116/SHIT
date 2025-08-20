/*import React from "react";
import { useGetMyOrdersQuery } from "../../redux/orderSlice";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { BiCheck } from "react-icons/bi";

const MyOrders = () => {
  const { data, error, isLoading } = useGetMyOrdersQuery();

  const deleteOrderHandler = () => {};

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100"></div>
      </div>
    );
  }

  return (
    <div className="">
      <div>
        <h1 className="flex justify-center text-3xl">MY REQUISITIONS ORDERS</h1>
        {data?.orders.length === 0 ? (
          <h3 className="text-sm text-blue-100 ">
            YOUR REQUISITION IS EMPTY
            <Link to="/dashboard" className="ml-2 underline text-blue-800">
              GO BACK
            </Link>{" "}
          </h3>
        ) : (
          <div>
            <table className="w-full text-sm text-left text-slate-300 text-lg dark:text-gray-400">
              <thead>
                <tr>
                  <th>S/N</th>

                  <th>GRN</th>
                  <th>PRODUCT NAME </th>
                  <th>DATE</th>
                  <th>QTY</th>
                  <th>REQUISITION STATUS </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className=" ">
                {data?.orders?.map((order, i) => (
                  <tr key={order?._id} className="border-b border-gray-300">
                    <td>{i}</td>
                    <td>{order?._id}</td>
                    <td className="uppercase"> {order?.orderItems[0]?.name}</td>
                    <td>{order?.createdAt?.substring(0, 10)}</td>

                    <td>
                      {order?.isDelivered ? (
                        <b>
                          <BiCheck className="text-green-700" />{" "}
                          {order?.deliveredAt.substring(0, 10)}
                        </b>
                      ) : (
                        <b className="flex items-center space-x-1">
                          <FaTimes className="mr-1" style={{ color: "red" }} />{" "}
                          Pending
                        </b>
                      )}
                    </td>
                    <td>
                      <button className="px-3 bg-orange-400 text-slate-100 rounded-lg py-2">
                        <Link to={`/orderdetail/${order._id}`}>View</Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
/*/







/*


import React from "react";
import { useGetMyOrdersQuery } from "../../redux/orderSlice";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { BiCheck } from "react-icons/bi";

const MyOrders = () => {
  const { data, error, isLoading } = useGetMyOrdersQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-400"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-center text-2xl md:text-3xl font-bold text-slate-200 mb-6">
        My Requisitions Orders
      </h1>

      {data?.orders?.length === 0 ? (
        <div className="text-center text-slate-300">
          <p className="mb-3">Your requisition is empty.</p>
          <Link
            to="/dashboard"
            className="text-orange-400 underline hover:text-orange-500"
          >
            Go Back
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-gray-700 text-slate-200 text-sm md:text-base">
              <tr>
                <th className="px-4 py-3 text-left">S/N</th>
                <th className="px-4 py-3 text-left">GRN</th>
                <th className="px-4 py-3 text-left">Product Name</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.orders?.map((order, i) => (
                <tr
                  key={order?._id}
                  className="border-b border-gray-600 hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-3 text-slate-300">{i + 1}</td>
                  <td className="px-4 py-3 text-slate-300">{order?._id}</td>
                  <td className="px-4 py-3 uppercase text-slate-200">
                    {order?.orderItems[0]?.name}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {order?.createdAt?.substring(0, 10)}
                  </td>
                  <td className="px-4 py-3">
                    {order?.isDelivered ? (
                      <span className="flex items-center space-x-2 text-green-500 font-semibold">
                        <BiCheck /> <span>Delivered</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2 text-red-500 font-semibold">
                        <FaTimes /> <span>Pending</span>
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/orderdetail/${order._id}`}
                      className="px-4 py-2 bg-orange-400 text-black rounded-lg hover:bg-orange-500 transition-colors"
                    >
                      View
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

export default MyOrders;
*/

/*
import React from "react";
import { useGetMyOrdersQuery } from "../../redux/orderSlice";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { BiCheck } from "react-icons/bi";

const MyOrders = () => {
  const { data, error, isLoading } = useGetMyOrdersQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-400"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-center text-2xl md:text-3xl font-bold text-slate-200 mb-6">
        My Requisitions Orders
      </h1>

      {data?.orders?.length === 0 ? (
        <div className="text-center text-slate-300">
          <p className="mb-3">Your requisition is empty.</p>
          <Link
            to="/dashboard"
            className="text-orange-400 underline hover:text-orange-500"
          >
            Go Back
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-gray-700 text-slate-200 text-sm md:text-base">
              <tr>
                <th className="px-4 py-3 text-left">S/N</th>
                <th className="px-4 py-3 text-left">GRN</th>
                <th className="px-4 py-3 text-left">Products</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.orders?.map((order, i) => (
                <tr
                  key={order?._id}
                  className="border-b border-gray-600 hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-3 text-slate-300">{i + 1}</td>
                  <td className="px-4 py-3 text-slate-300">{order?._id}</td>

                  <td className="px-4 py-3 text-slate-200">
                    {order.orderItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="text-sm md:text-base uppercase text-slate-200"
                      >
                        • {item.name} <span className="text-slate-400">x{item.qty}</span>
                      </div>
                    ))}
                  </td>

                  <td className="px-4 py-3 text-slate-300">
                    {order?.createdAt?.substring(0, 10)}
                  </td>

                  <td className="px-4 py-3">
                    {order?.isDelivered ? (
                      <span className="flex items-center space-x-2 text-green-500 font-semibold">
                        <BiCheck /> <span>Delivered</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2 text-red-500 font-semibold">
                        <FaTimes /> <span>Pending</span>
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <Link
                      to={`/orderdetail/${order._id}`}
                      className="px-4 py-2 bg-orange-400 text-black rounded-lg hover:bg-orange-500 transition-colors"
                    >
                      View
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

export default MyOrders;
*/









import React from "react";
import { useGetMyOrdersQuery } from "../../redux/orderSlice";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { BiCheck } from "react-icons/bi";

const MyOrders = () => {
  const { data, error, isLoading } = useGetMyOrdersQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-400"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-center text-2xl md:text-3xl font-bold text-slate-200 mb-6">
        My Requisitions Orders
      </h1>

      {data?.orders?.length === 0 ? (
        <div className="text-center text-slate-300">
          <p className="mb-3">Your requisition is empty.</p>
          <Link
            to="/dashboard"
            className="text-orange-400 underline hover:text-orange-500"
          >
            Go Back
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-gray-700 text-slate-200 text-sm md:text-base">
              <tr>
                <th className="px-4 py-3 text-left">S/N</th>
                <th className="px-4 py-3 text-left">GRN</th>
                <th className="px-4 py-3 text-left">Products</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.orders?.map((order, i) => (
                <tr
                  key={order?._id}
                  className="border-b border-gray-600 hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-3 text-slate-300">{i + 1}</td>
                  <td className="px-4 py-3 text-slate-300">{order?._id}</td>

                  {/* Products Column with Categories */}
                  <td className="px-4 py-3 text-slate-200">
                    <ul className="space-y-2">
                      {order?.orderItems?.map((item, idx) => (
                        <li key={idx} className="flex flex-col">
                          <span className="font-semibold uppercase">
                            {item?.name}
                          </span>
                          <span className="text-xs text-slate-400 italic">
                            {item?.category || "Uncategorized"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="px-4 py-3 text-slate-300">
                    {order?.createdAt?.substring(0, 10)}
                  </td>

                  <td className="px-4 py-3">
                    {order?.isDelivered ? (
                      <span className="flex items-center space-x-2 text-green-500 font-semibold">
                        <BiCheck /> <span>Delivered</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2 text-red-500 font-semibold">
                        <FaTimes /> <span>Pending</span>
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <Link
                      to={`/orderdetail/${order._id}`}
                      className="px-4 py-2 bg-orange-400 text-black rounded-lg hover:bg-orange-500 transition-colors"
                    >
                      View
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

export default MyOrders;

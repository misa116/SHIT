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
        <>
          <div className="hidden md:block overflow-x-auto">
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

          <div className="grid gap-4 md:hidden">
            {data?.orders?.map((order, i) => (
              <div
                key={order._id}
                className="bg-gray-800 rounded-xl shadow-md p-4 border border-gray-700"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400 text-sm">#{i + 1}</span>
                  <span className="text-xs text-slate-500">
                    {order?.createdAt?.substring(0, 10)}
                  </span>
                </div>

                <p className="text-slate-200 font-semibold mb-2">
                  GRN: <span className="text-orange-400">{order?._id}</span>
                </p>

                <div className="mb-2">
                  <h2 className="text-slate-300 text-sm font-medium mb-1">
                    Products:
                  </h2>
                  <ul className="pl-3 list-disc text-slate-400 text-sm space-y-1">
                    {order?.orderItems?.map((item, idx) => (
                      <li key={idx}>
                        <span className="uppercase">{item?.name}</span>
                        <span className="block text-xs italic">
                          {item?.category || "Uncategorized"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mt-3">
                  {order?.isDelivered ? (
                    <span className="flex items-center text-green-500 text-sm font-semibold">
                      <BiCheck className="mr-1" /> Delivered
                    </span>
                  ) : (
                    <span className="flex items-center text-red-500 text-sm font-semibold">
                      <FaTimes className="mr-1" /> Pending
                    </span>
                  )}

                  <Link
                    to={`/orderdetail/${order._id}`}
                    className="px-3 py-1 bg-orange-400 text-black text-sm rounded-lg hover:bg-orange-500 transition-colors"
                  >
                    View
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

export default MyOrders;
*/






/*
import React from "react";
import { useGetMyOrdersQuery } from "../../redux/orderSlice";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { BiCheck,BiSolidUserPin  } from "react-icons/bi";

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
                  
                           <BiSolidUserPin /><span>My Requisitions Orders</span>
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
        <>
          <div className="hidden md:block overflow-x-auto">
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
                        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
                          <BiCheck className="inline mr-1" /> Delivered
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-semibold">
                          <FaTimes className="inline mr-1" /> Pending
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <Link
                        to={`/orderdetail/${order._id}`}
                        className="px-4 py-2 bg-orange-400 text-black rounded-lg hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/40 transition-all"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 md:hidden">
            {data?.orders?.map((order, i) => (
              <div
                key={order._id}
                className="bg-gray-900 rounded-xl shadow-md p-4 border-2 
                border-transparent bg-clip-padding
                [border-image:linear-gradient(90deg,#ff7e5f,#feb47b,#6a11cb,#2575fc)_1] 
                hover:shadow-lg hover:shadow-orange-500/30 transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400 text-sm">#{i + 1}</span>
                  <span className="text-xs text-slate-500">
                    {order?.createdAt?.substring(0, 10)}
                  </span>
                </div>

                <p className="text-slate-200 font-semibold mb-2">
                  GRN: <span className="text-orange-400">{order?._id}</span>
                </p>

                <div className="mb-2">
                  <h2 className="text-slate-300 text-sm font-medium mb-1">
                    Products:
                  </h2>
                  <ul className="pl-3 list-disc text-slate-400 text-sm space-y-1">
                    {order?.orderItems?.map((item, idx) => (
                      <li key={idx}>
                        <span className="uppercase">{item?.name}</span>
                        <span className="block text-xs italic">
                          {item?.category || "Uncategorized"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mt-3">
                  {order?.isDelivered ? (
                    <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
                      <BiCheck className="inline mr-1" /> Delivered
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-semibold">
                      <FaTimes className="inline mr-1" /> Pending
                    </span>
                  )}

                  <Link
                    to={`/orderdetail/${order._id}`}
                    className="px-3 py-1 bg-orange-400 text-black text-sm rounded-lg hover:bg-orange-500 hover:shadow-md hover:shadow-orange-500/50 transition-all"
                  >
                    View
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

export default MyOrders;
*/








/*
import React from "react";
import { useGetMyOrdersQuery } from "../../redux/orderSlice";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { BiCheck, BiSolidUserPin } from "react-icons/bi";

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
      <h1 className="text-center text-2xl md:text-3xl font-bold text-slate-200 mb-6 flex items-center justify-center gap-2">
        <BiSolidUserPin className="w-6 h-6" />
        <span>My Requisitions</span>
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
        <>
          <div className="hidden md:block overflow-x-auto">
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
                        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
                          <BiCheck className="inline mr-1" /> Delivered
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-semibold">
                          <FaTimes className="inline mr-1" /> Pending
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <Link
                        to={`/orderdetail/${order._id}`}
                        className="px-4 py-2 bg-orange-400 text-black rounded-lg hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/40 transition-all"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 md:hidden">
            {data?.orders?.map((order, i) => (
              <div
                key={order._id}
                className="bg-gray-900 rounded-xl shadow-md p-4 border-2 
                border-transparent bg-clip-padding
                [border-image:linear-gradient(90deg,#ff7e5f,#feb47b,#6a11cb,#2575fc)_1] 
                hover:shadow-lg hover:shadow-orange-500/30 transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400 text-sm">#{i + 1}</span>
                  <span className="text-xs text-slate-500">
                    {order?.createdAt?.substring(0, 10)}
                  </span>
                </div>

                <p className="text-slate-200 font-semibold mb-2">
                  GRN: <span className="text-orange-400">{order?._id}</span>
                </p>

                <div className="mb-2">
                  <h2 className="text-slate-300 text-sm font-medium mb-1">
                    Products:
                  </h2>
                  <ul className="pl-3 list-disc text-slate-400 text-sm space-y-1">
                    {order?.orderItems?.map((item, idx) => (
                      <li key={idx}>
                        <span className="uppercase">{item?.name}</span>
                        <span className="block text-xs italic">
                          {item?.category || "Uncategorized"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mt-3">
                  {order?.isDelivered ? (
                    <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
                      <BiCheck className="inline mr-1" /> Delivered
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-semibold">
                      <FaTimes className="inline mr-1" /> Pending
                    </span>
                  )}

                  <Link
                    to={`/orderdetail/${order._id}`}
                    className="px-3 py-1 bg-orange-400 text-black text-sm rounded-lg hover:bg-orange-500 hover:shadow-md hover:shadow-orange-500/50 transition-all"
                  >
                    View
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

export default MyOrders;
*/












//works
/*
import React, { useState, useEffect } from "react";
import { useGetMyOrdersQuery } from "../../redux/orderSlice";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { BiCheck, BiSolidUserPin } from "react-icons/bi";

const MyOrders = () => {
  const { data } = useGetMyOrdersQuery();
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  // ✅ Only new gradient notification logic
  useEffect(() => {
    if (data?.orders?.length > 0) {
      setShowSuccessNotification(true);
      const timer = setTimeout(() => setShowSuccessNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [data]);

  return (
    <div className="p-4 md:p-8 relative">
      {showSuccessNotification && (
        <div className="fixed top-6 right-6 z-50 animate-fadeInDown bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 pointer-events-auto max-w-sm">
          <span className="text-2xl">✅</span>
          <span className="font-semibold text-lg flex-1">
            Requisition Saved Successfully
          </span>
          <button
            className="ml-4 text-white font-bold bg-black/20 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/40 transition"
            onClick={() => setShowSuccessNotification(false)}
            aria-label="Close Notification"
          >
            ×
          </button>
        </div>
      )}

      <h1 className="text-center text-2xl md:text-3xl font-bold text-slate-200 mb-6 flex items-center justify-center gap-2">
        <BiSolidUserPin className="w-6 h-6" />
        <span>My Requisitions</span>
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
        <>
          <div className="hidden md:block overflow-x-auto">
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
                        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
                          <BiCheck className="inline mr-1" /> Delivered
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-semibold">
                          <FaTimes className="inline mr-1" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/orderdetail/${order._id}`}
                        className="px-4 py-2 bg-orange-400 text-black rounded-lg hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/40 transition-all"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 md:hidden">
            {data?.orders?.map((order, i) => (
              <div
                key={order._id}
                className="bg-gray-900 rounded-xl shadow-md p-4 border-2 border-transparent bg-clip-padding [border-image:linear-gradient(90deg,#ff7e5f,#feb47b,#6a11cb,#2575fc)_1] hover:shadow-lg hover:shadow-orange-500/30 transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400 text-sm">#{i + 1}</span>
                  <span className="text-xs text-slate-500">
                    {order?.createdAt?.substring(0, 10)}
                  </span>
                </div>

                <p className="text-slate-200 font-semibold mb-2">
                  GRN: <span className="text-orange-400">{order?._id}</span>
                </p>

                <div className="mb-2">
                  <h2 className="text-slate-300 text-sm font-medium mb-1">
                    Products:
                  </h2>
                  <ul className="pl-3 list-disc text-slate-400 text-sm space-y-1">
                    {order?.orderItems?.map((item, idx) => (
                      <li key={idx}>
                        <span className="uppercase">{item?.name}</span>
                        <span className="block text-xs italic">
                          {item?.category || "Uncategorized"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mt-3">
                  {order?.isDelivered ? (
                    <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
                      <BiCheck className="inline mr-1" /> Delivered
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-semibold">
                      <FaTimes className="inline mr-1" /> Pending
                    </span>
                  )}

                  <Link
                    to={`/orderdetail/${order._id}`}
                    className="px-3 py-1 bg-orange-400 text-black text-sm rounded-lg hover:bg-orange-500 hover:shadow-md hover:shadow-orange-500/50 transition-all"
                  >
                    View
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

export default MyOrders;
*/


















import React, { useState, useEffect } from "react";
import { useGetMyOrdersQuery } from "../../redux/orderSlice";
import { Link, useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { BiCheck, BiSolidUserPin } from "react-icons/bi";

const MyOrders = () => {
  const { data } = useGetMyOrdersQuery();
  const location = useLocation();
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  // ✅ Show notification ONLY if navigated here after creating requisition
  useEffect(() => {
    if (location.state?.requisitionCreated) {
      setShowSuccessNotification(true);
      const timer = setTimeout(() => setShowSuccessNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="p-4 md:p-8 relative">
      {/* ✅ Gradient Pop-out Notification */}
      {showSuccessNotification && (
        <div className="fixed top-6 right-6 z-50 animate-fadeInDown bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 pointer-events-auto max-w-sm">
          <span className="text-2xl">✅</span>
          <span className="font-semibold text-lg flex-1">
            Requisition Saved Successfully
          </span>
          <button
            className="ml-4 text-white font-bold bg-black/20 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/40 transition"
            onClick={() => setShowSuccessNotification(false)}
            aria-label="Close Notification"
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <h1 className="text-center text-2xl md:text-3xl font-bold text-slate-200 mb-6 flex items-center justify-center gap-2">
        <BiSolidUserPin className="w-6 h-6" />
        <span>My Requisitions</span>
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
        <>
          {/* ✅ Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
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
                        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
                          <BiCheck className="inline mr-1" /> Delivered
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-semibold">
                          <FaTimes className="inline mr-1" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/orderdetail/${order._id}`}
                        className="px-4 py-2 bg-orange-400 text-black rounded-lg hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/40 transition-all"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Mobile Cards */}
          <div className="grid gap-4 md:hidden">
            {data?.orders?.map((order, i) => (
              <div
                key={order._id}
                className="bg-gray-900 rounded-xl shadow-md p-4 border-2 border-transparent bg-clip-padding [border-image:linear-gradient(90deg,#ff7e5f,#feb47b,#6a11cb,#2575fc)_1] hover:shadow-lg hover:shadow-orange-500/30 transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400 text-sm">#{i + 1}</span>
                  <span className="text-xs text-slate-500">
                    {order?.createdAt?.substring(0, 10)}
                  </span>
                </div>

                <p className="text-slate-200 font-semibold mb-2">
                  GRN: <span className="text-orange-400">{order?._id}</span>
                </p>

                <div className="mb-2">
                  <h2 className="text-slate-300 text-sm font-medium mb-1">
                    Products:
                  </h2>
                  <ul className="pl-3 list-disc text-slate-400 text-sm space-y-1">
                    {order?.orderItems?.map((item, idx) => (
                      <li key={idx}>
                        <span className="uppercase">{item?.name}</span>
                        <span className="block text-xs italic">
                          {item?.category || "Uncategorized"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mt-3">
                  {order?.isDelivered ? (
                    <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
                      <BiCheck className="inline mr-1" /> Delivered
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-semibold">
                      <FaTimes className="inline mr-1" /> Pending
                    </span>
                  )}

                  <Link
                    to={`/orderdetail/${order._id}`}
                    className="px-3 py-1 bg-orange-400 text-black text-sm rounded-lg hover:bg-orange-500 hover:shadow-md hover:shadow-orange-500/50 transition-all"
                  >
                    View
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

export default MyOrders;

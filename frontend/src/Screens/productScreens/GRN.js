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
                <th className="py-3 px-4 text-left">Order Date</th>
                <th className="py-3 px-4 text-left">Delivered Date</th>
                <th className="py-3 px-4 text-left">Received Date</th>
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

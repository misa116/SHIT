/* import React from "react";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useGetOrdersQuery, useDeleteOrderMutation} from "../../redux/orderSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";



const LPO = () => {
  const { data, isLoading, error, refetch } = useGetOrdersQuery();
  
const [deleteOrder] = useDeleteOrderMutation();

const deleteOrderHandler = async (orderId) => {
  try {
    await deleteOrder(orderId).unwrap();
    toast.success("Order Deleted")
    refetch();
  } catch (err) {
    toast.error("ERROR acured while Deleting Order");

  }
};


  const filteredOrders = 
  data?.orders &&
   data?.orders?.filter((order) => order.user.dept === "Company");

  return (
    <div className="w-full">
      <div>
        <h1>LOCAL PURCHASE ORDERS</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <h4>{error}</h4>
        ) : (
          <div className="">
            <div className="">
              <table
                className="w-full text-sm text-left rtl:text-right
             text-blue-100 dark:text-blue-100 border-collapse  "
              >
                <thead
                  className="text-xs
                 text-white uppercase bg-blue-600 
                 border-b border-blue-400 dark:text-white "
                >
                  <tr>
                    <th>S/N</th>
                    <th className="px-6 py-3">Product name</th>
                    <th className="px-6 py-3">QTY</th>
                    <th className="px-6 py-3">USER</th>

                    <th className="px-6 py-3">ORDER DATE</th>
                    <th className="px-6 py-3">DELIVER DATE</th>
                    <th className="px-6 py-3">RECIEVED DATE</th>
                    <th></th>
                    <th>DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders?.map((order, index) => (
                        <tr
                          key={order._id}
                          className="bg-gray-700 border-b border-gray-600"
                        >
                          <td className="px-6 py-3">{index + 1}</td>
                          <td className="px-6 py-3">
                            {order.orderItems[0]?.name}
                          </td>
                          <td className="px-6 py-3">
                            {order.orderItems[0]?.qty}
                          </td>
                          <td className="px-6 py-3">{order.user?.name}</td>
                          <td className="px-6 py-3">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-3">
                            {order.isDelivered 
                            ? (
                              order.deliveredAt
                            ) : (
                              <b className="flex items-center ">
                                <FaTimes
                                  style={{ color: "red" }}
                                  className="mr-2"
                                />{" "}
                                Pending
                              </b>
                            )}
                          </td>
                          <td className="px-6 py-3">
                            {order.isRecieved ? (
                              order.recievedAt.substring(0, 10)
                            ) : (
                              <b className="flex items-center ">
                                <FaTimes
                                  style={{ color: "red" }}
                                  className="mr-2"
                                />{" "}
                                processing
                              </b>
                            )}
                          </td>


                          <td className="px-6 py-3">
                            <Link to={`/orderdetail/${order._id}`}>
                              <button className="font-medium text-white hover:underline uppercase">
                                Details
                              </button>
                            </Link>
                          </td>
                        <th className="hover:text-red-900">
                          <button onClick={deleteOrderHandler} 
                          className="p-2 bg-red-600 px-2 rounded-full m-3">
                       <AiOutlineDelete size={28} />
                          </button>
                        </th>
                        
                        
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

export default LPO;
/*/

/*
import React from "react";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../redux/orderSlice";
import { toast } from "react-toastify";

const LPO = () => {
  const { data, isLoading, error, refetch } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();

  const deleteOrderHandler = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order Deleted");
      refetch();
    } catch (err) {
      toast.error("Error occurred while deleting order");
    }
  };

  const filteredOrders =
    data?.orders?.filter((order) => order.user.dept === "Company") || [];

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // formats as DD/MM/YYYY
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold text-gray-100 mb-4 text-center">Local Purchase Orders</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <h4 className="text-red-500 text-center">{error}</h4>
      ) : (
        <div className="w-full overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
          <table className="min-w-full text-sm text-left text-gray-200 border-collapse">
            <thead className="bg-blue-600 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-2">S/N</th>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">QTY</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Order Date</th>
                <th className="px-4 py-2">Delivered Date</th>
                <th className="px-4 py-2">Received Date</th>
                <th className="px-4 py-2">Details</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr
                  key={order._id}
                  className="bg-gray-700 border-b border-gray-600 hover:bg-gray-600"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{order.orderItems[0]?.name}</td>
                  <td className="px-4 py-2">{order.orderItems[0]?.qty}</td>
                  <td className="px-4 py-2">{order.user?.name}</td>
                  <td className="px-4 py-2">{formatDate(order.createdAt)}</td>
                  <td className="px-4 py-2">
                    {order.isDelivered && order.deliveredAt ? (
                      formatDate(order.deliveredAt)
                    ) : (
                      <span className="flex items-center text-red-400">
                        <FaTimes className="mr-1" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {order.isRecieved && order.recievedAt ? (
                      formatDate(order.recievedAt)
                    ) : (
                      <span className="flex items-center text-yellow-400">
                        <FaTimes className="mr-1" /> Processing
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/orderdetail/${order._id}`}
                      className="text-blue-400 hover:underline"
                    >
                      Details
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => deleteOrderHandler(order._id)}
                      className="p-2 bg-red-600 rounded-full hover:bg-red-700"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
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

export default LPO;

*/













/*
import React from "react";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../redux/orderSlice";
import { toast } from "react-toastify";

const LPO = () => {
  const { data, isLoading, error, refetch } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();

  const deleteOrderHandler = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order Deleted");
      refetch();
    } catch (err) {
      toast.error("Error occurred while deleting order");
    }
  };

  const filteredOrders =
    data?.orders?.filter((order) => order.user.dept === "Company") || [];

  // Format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-3xl font-bold text-gray-100 mb-6 text-center">Local Purchase Orders</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <h4 className="text-red-500 text-center">{error}</h4>
      ) : (
        <div className="w-full overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
          <table className="min-w-full text-sm text-left text-gray-200 border-collapse">
            <thead className="bg-blue-600 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-2">S/N</th>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">QTY</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Order Date</th>
                <th className="px-4 py-2">Deliver Date</th>
                <th className="px-4 py-2">Received Date</th>
                <th className="px-4 py-2">Details</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr
                  key={order._id}
                  className="bg-gray-700 border-b border-gray-600 hover:bg-gray-600"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{order.orderItems[0]?.name}</td>
                  <td className="px-4 py-2">{order.orderItems[0]?.qty}</td>
                  <td className="px-4 py-2">{order.user?.name}</td>
                  <td className="px-4 py-2">{formatDate(order.createdAt)}</td>
                  <td className="px-4 py-2">
                    {order.isDelivered && order.deliveredAt ? (
                      formatDate(order.deliveredAt)
                    ) : (
                      <span className="flex items-center text-red-400">
                        <FaTimes className="mr-1" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {order.isRecieved && order.recievedAt ? (
                      formatDate(order.recievedAt)
                    ) : (
                      <span className="flex items-center text-yellow-400">
                        <FaTimes className="mr-1" /> Processing
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/orderdetail/${order._id}`}
                      className="text-blue-400 hover:underline font-medium"
                    >
                      Details
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => deleteOrderHandler(order._id)}
                      className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
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

export default LPO;
*/




/*
import React from "react";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../redux/orderSlice";
import { toast } from "react-toastify";

const LPO = () => {
  const { data, isLoading, error, refetch } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();

  const deleteOrderHandler = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order Deleted");
      refetch();
    } catch (err) {
      toast.error("Error occurred while deleting order");
    }
  };

  const filteredOrders = data?.orders?.filter(order => order.user?.dept === "Company") || [];

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-3xl font-bold text-gray-100 mb-6 text-center">
        Local Purchase Orders
      </h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <h4 className="text-red-500 text-center">{error?.data || "An error occurred"}</h4>
      ) : (
        <div className="w-full overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
          <table className="min-w-full text-sm text-left text-gray-200 border-collapse">
            <thead className="bg-blue-600 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-2">S/N</th>
                <th className="px-4 py-2">Products (Qty)</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Order Date</th>
                <th className="px-4 py-2">Deliver Date</th>
                <th className="px-4 py-2">Received Date</th>
                <th className="px-4 py-2">Details</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-2 text-center text-gray-400">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, index) => (
                  <tr
                    key={order._id}
                    className="bg-gray-700 border-b border-gray-600 hover:bg-gray-600"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      {order.orderItems?.map((item, i) => (
                        <div key={i}>
                          {item.name} x{item.qty}
                        </div>
                      )) || "-"}
                    </td>
                    <td className="px-4 py-2">{order.user?.name || "-"}</td>
                    <td className="px-4 py-2">{formatDate(order.createdAt)}</td>
                    <td className="px-4 py-2">
                      {order.isDelivered && order.deliveredAt ? (
                        formatDate(order.deliveredAt)
                      ) : (
                        <span className="flex items-center text-red-400">
                          <FaTimes className="mr-1" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {order.isRecieved && order.recievedAt ? (
                        formatDate(order.recievedAt)
                      ) : (
                        <span className="flex items-center text-yellow-400">
                          <FaTimes className="mr-1" /> Processing
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <Link
                        to={`/orderdetail/${order._id}`}
                        className="text-blue-400 hover:underline font-medium"
                      >
                        Details
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => deleteOrderHandler(order._id)}
                        className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LPO;
*/








/*
import React from "react";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../redux/orderSlice";
import { toast } from "react-toastify";

const LPO = () => {
  const { data, isLoading, error, refetch } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();

  const deleteOrderHandler = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order Deleted");
      refetch();
    } catch (err) {
      toast.error("Error occurred while deleting order");
    }
  };

  const filteredOrders =
    data?.orders?.filter((order) => order.user.dept === "Company") || [];

  // Format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  // Extract readable error message from RTK Query error object
  const getErrorMessage = (err) => {
    if (!err) return "Unknown error";
    if (err.data?.message) return err.data.message;
    if (err.error) return err.error;
    if (err.message) return err.message;
    return JSON.stringify(err);
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-3xl font-bold text-gray-100 mb-6 text-center">Local Purchase Orders</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <h4 className="text-red-500 text-center">{getErrorMessage(error)}</h4>
      ) : (
        <div className="w-full overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
          <table className="min-w-full text-sm text-left text-gray-200 border-collapse">
            <thead className="bg-blue-600 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-2">S/N</th>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">QTY</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Order Date</th>
                <th className="px-4 py-2">Deliver Date</th>
                <th className="px-4 py-2">Received Date</th>
                <th className="px-4 py-2">Details</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr
                  key={order._id}
                  className="bg-gray-700 border-b border-gray-600 hover:bg-gray-600"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{order.orderItems[0]?.name}</td>
                  <td className="px-4 py-2">{order.orderItems[0]?.qty}</td>
                  <td className="px-4 py-2">{order.user?.name}</td>
                  <td className="px-4 py-2">{formatDate(order.createdAt)}</td>
                  <td className="px-4 py-2">
                    {order.isDelivered && order.deliveredAt ? (
                      formatDate(order.deliveredAt)
                    ) : (
                      <span className="flex items-center text-red-400">
                        <FaTimes className="mr-1" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {order.isRecieved && order.recievedAt ? (
                      formatDate(order.recievedAt)
                    ) : (
                      <span className="flex items-center text-yellow-400">
                        <FaTimes className="mr-1" /> Processing
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/orderdetail/${order._id}`}
                      className="text-blue-400 hover:underline font-medium"
                    >
                      Details
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => deleteOrderHandler(order._id)}
                      className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
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

export default LPO;
*/







/*
import React from "react";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../redux/orderSlice";
import { toast } from "react-toastify";

const LPO = () => {
  const { data, isLoading, error, refetch } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();

  const deleteOrderHandler = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order Deleted");
      refetch();
    } catch (err) {
      toast.error("Error occurred while deleting order");
    }
  };

  const filteredOrders = data?.orders?.filter((order) => order.user.dept === "Company") || [];

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-3xl font-bold text-gray-100 mb-6 text-center">Local Purchase Orders</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <h4 className="text-red-500 text-center">{error}</h4>
      ) : (
        <div className="w-full overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
          <table className="min-w-full text-sm text-left text-gray-200 border-collapse">
            <thead className="bg-blue-600 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-2">S/N</th>
                <th className="px-4 py-2">Products</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Order Date</th>
                <th className="px-4 py-2">Deliver Date</th>
                <th className="px-4 py-2">Received Date</th>
                <th className="px-4 py-2">Details</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr
                  key={order._id}
                  className="bg-gray-700 border-b border-gray-600 hover:bg-gray-600"
                >
                  <td className="px-4 py-2">{index + 1}</td>

                  <td className="px-4 py-2">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx}>
                        {item.name} - <span className="font-bold">{item.qty}</span>
                      </div>
                    ))}
                  </td>

                  <td className="px-4 py-2">{order.user?.name}</td>
                  <td className="px-4 py-2">{formatDate(order.createdAt)}</td>

                  <td className="px-4 py-2">
                    {order.isDelivered && order.deliveredAt ? (
                      formatDate(order.deliveredAt)
                    ) : (
                      <span className="flex items-center text-red-400">
                        <FaTimes className="mr-1" /> Pending
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {order.isRecieved && order.recievedAt ? (
                      formatDate(order.recievedAt)
                    ) : (
                      <span className="flex items-center text-yellow-400">
                        <FaTimes className="mr-1" /> Processing
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-2">
                    <Link
                      to={`/orderdetail/${order._id}`}
                      className="text-blue-400 hover:underline font-medium"
                    >
                      Details
                    </Link>
                  </td>

                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => deleteOrderHandler(order._id)}
                      className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
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

export default LPO;
*/


/*
import React from "react";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../redux/orderSlice";
import { toast } from "react-toastify";

const LPO = () => {
  const { data, isLoading, error, refetch } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();

  const deleteOrderHandler = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order Deleted");
      refetch();
    } catch (err) {
      toast.error("Error occurred while deleting order");
    }
  };

  const filteredOrders = data?.orders?.filter((order) => order.user.dept === "Company") || [];

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-3xl font-bold text-gray-100 mb-6 text-center">Local Purchase Orders</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <h4 className="text-red-500 text-center">{error}</h4>
      ) : (
        <div className="w-full overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
          <table className="min-w-full text-sm text-left text-gray-200 border-collapse">
            <thead className="bg-blue-600 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-2">S/N</th>
                <th className="px-4 py-2">Products</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Order Date</th>
                <th className="px-4 py-2">Deliver Date</th>
                <th className="px-4 py-2">Received Date</th>
                <th className="px-4 py-2">Details</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr
                  key={order._id}
                  className="bg-gray-700 border-b border-gray-600 hover:bg-gray-600"
                >
                  <td className="px-4 py-2">{index + 1}</td>

                  <td className="px-4 py-2 space-y-1">
                    {order.orderItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-gray-900 p-1 rounded"
                      >
                        <span className="font-semibold text-gray-100">{item.name}</span>
                        <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                          {item.qty}
                        </span>
                      </div>
                    ))}
                  </td>

                  <td className="px-4 py-2">{order.user?.name}</td>
                  <td className="px-4 py-2">{formatDate(order.createdAt)}</td>

                  <td className="px-4 py-2">
                    {order.isDelivered && order.deliveredAt ? (
                      <span className="bg-green-600 px-2 py-0.5 rounded-full text-white text-xs">
                        {formatDate(order.deliveredAt)}
                      </span>
                    ) : (
                      <span className="flex items-center text-red-400">
                        <FaTimes className="mr-1" /> Pending
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {order.isRecieved && order.recievedAt ? (
                      <span className="bg-green-500 px-2 py-0.5 rounded-full text-white text-xs">
                        {formatDate(order.recievedAt)}
                      </span>
                    ) : (
                      <span className="flex items-center text-yellow-400">
                        <FaTimes className="mr-1" /> Processing
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-2">
                    <Link
                      to={`/orderdetail/${order._id}`}
                      className="text-blue-400 hover:underline font-medium"
                    >
                      Details
                    </Link>
                  </td>

                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => deleteOrderHandler(order._id)}
                      className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
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

export default LPO;
*/














/*
import React, { useState } from "react";
import Loader from "../../components/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import { FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../redux/orderSlice";
import { toast } from "react-toastify";

const LPO = () => {
  const { data, isLoading, error, refetch } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [expandedOrders, setExpandedOrders] = useState({});

  const deleteOrderHandler = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order Deleted");
      refetch();
    } catch (err) {
      toast.error("Error occurred while deleting order");
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const filteredOrders = data?.orders?.filter((order) => order.user.dept === "Company") || [];

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-3xl font-bold text-gray-100 mb-6 text-center">Local Purchase Orders</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <h4 className="text-red-500 text-center">{error}</h4>
      ) : (
        <div className="w-full overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
          <table className="min-w-full text-sm text-left text-gray-200 border-collapse">
            <thead className="bg-blue-600 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-2">S/N</th>
                <th className="px-4 py-2">Products</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Order Date</th>
                <th className="px-4 py-2">Details</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <React.Fragment key={order._id}>
                  <tr className="bg-gray-700 border-b border-gray-600 hover:bg-gray-600">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2 flex justify-between items-center">
                      <span>{order.orderItems.length} item(s)</span>
                      <button
                        onClick={() => toggleExpand(order._id)}
                        className="p-1 hover:text-blue-400"
                      >
                        {expandedOrders[order._id] ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                    </td>
                    <td className="px-4 py-2">{order.user?.name}</td>
                    <td className="px-4 py-2">{formatDate(order.createdAt)}</td>
                    <td className="px-4 py-2">
                      <a
                        href={`/orderdetail/${order._id}`}
                        className="text-blue-400 hover:underline font-medium"
                      >
                        Details
                      </a>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => deleteOrderHandler(order._id)}
                        className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>

                  {expandedOrders[order._id] && (
                    <tr className="bg-gray-800 border-b border-gray-600">
                      <td colSpan={6} className="px-4 py-2">
                        <div className="max-h-64 overflow-y-auto space-y-1">
                          {order.orderItems.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between bg-gray-900 p-2 rounded shadow-sm"
                            >
                              <div className="flex flex-col">
                                <span className="font-semibold text-gray-100">{item.name}</span>
                                <span className="text-xs text-gray-300">Qty: {item.qty}</span>
                              </div>
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                  item.isDelivered
                                    ? "bg-green-600 text-white"
                                    : item.isRecieved
                                    ? "bg-yellow-500 text-white"
                                    : "bg-red-500 text-white"
                                }`}
                              >
                                {item.isDelivered
                                  ? "Delivered"
                                  : item.isRecieved
                                  ? "Received"
                                  : "Pending"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LPO;
*/











/*
import React, { useState } from "react";
import Loader from "../../components/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../redux/orderSlice";
import { toast } from "react-toastify";

const LPO = () => {
  const { data, isLoading, error, refetch } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [expandedOrders, setExpandedOrders] = useState({});

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const deleteOrderHandler = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order Deleted");
      refetch();
    } catch (err) {
      toast.error("Error occurred while deleting order");
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  // 🔎 Filter Orders
  const filteredOrders =
    data?.orders
      ?.filter((order) => order.user.dept === "Company")
      ?.filter((order) => {
        // Search filter
        const searchMatch =
          order.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.orderItems.some((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

        // Status filter
        const statusMatch =
          statusFilter === "all" ||
          order.orderItems.some((item) =>
            statusFilter === "delivered"
              ? item.isDelivered
              : statusFilter === "received"
              ? item.isRecieved
              : !item.isDelivered && !item.isRecieved
          );

        return searchMatch && statusMatch;
      }) || [];

  // 📄 Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-4xl font-extrabold text-gray-100 mb-8 text-center drop-shadow-md">
        Local Purchase Orders
      </h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <input
          type="text"
          placeholder="Search by user or product..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to page 1 on search
          }}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1); // reset to page 1 on filter
          }}
          className="w-full md:w-1/4 px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="delivered">Delivered</option>
          <option value="received">Received</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <h4 className="text-red-500 text-center">{error}</h4>
      ) : (
        <>
          <div className="w-full overflow-x-auto bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
            <table className="min-w-full text-sm text-left text-gray-200 relative">
              <thead className="bg-blue-600 text-white uppercase text-xs sticky top-0 z-20 shadow-md">
                <tr>
                  <th className="px-5 py-3">S/N</th>
                  <th className="px-5 py-3">Products</th>
                  <th className="px-5 py-3">User</th>
                  <th className="px-5 py-3">Order Date</th>
                  <th className="px-5 py-3">Details</th>
                  <th className="px-5 py-3 text-center">Delete</th>
                </tr>
              </thead>

              <tbody>
                {paginatedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-400">
                      No matching orders found
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map((order, index) => (
                    <React.Fragment key={order._id}>
                      <tr
                        className={`border-b border-gray-700 transition-colors ${
                          index % 2 === 0
                            ? "bg-gray-700 hover:bg-gray-600"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                      >
                        <td className="px-5 py-3">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="px-5 py-3 flex justify-between items-center">
                          <span className="font-medium">
                            {order.orderItems.length} item(s)
                          </span>
                          <button
                            onClick={() => toggleExpand(order._id)}
                            className="p-1 text-gray-300 hover:text-blue-400 transition-colors"
                          >
                            {expandedOrders[order._id] ? (
                              <FaChevronUp />
                            ) : (
                              <FaChevronDown />
                            )}
                          </button>
                        </td>
                        <td className="px-5 py-3">{order.user?.name}</td>
                        <td className="px-5 py-3">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-5 py-3">
                          <a
                            href={`/orderdetail/${order._id}`}
                            className="text-blue-400 hover:underline font-semibold"
                          >
                            View
                          </a>
                        </td>
                        <td className="px-5 py-3 text-center">
                          <button
                            onClick={() => deleteOrderHandler(order._id)}
                            className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-all shadow-md"
                          >
                            <AiOutlineDelete size={20} />
                          </button>
                        </td>
                      </tr>

                      {expandedOrders[order._id] && (
                        <tr className="bg-gray-900 border-b border-gray-700">
                          <td colSpan={6} className="px-5 py-4">
                            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                              {order.orderItems.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between bg-gray-800 p-3 rounded-lg shadow-sm hover:bg-gray-700 transition-colors"
                                >
                                  <div>
                                    <p className="font-semibold text-gray-100">
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      Qty: {item.qty}
                                    </p>
                                  </div>
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                                      item.isDelivered
                                        ? "bg-green-600 text-white"
                                        : item.isRecieved
                                        ? "bg-yellow-500 text-white"
                                        : "bg-red-500 text-white"
                                    }`}
                                  >
                                    {item.isDelivered
                                      ? "Delivered"
                                      : item.isRecieved
                                      ? "Received"
                                      : "Pending"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === num
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LPO;
*/










/*
import React, { useState } from "react";
import Loader from "../../components/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../redux/orderSlice";
import { toast } from "react-toastify";

const LPO = () => {
  const { data, isLoading, error, refetch } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [expandedOrders, setExpandedOrders] = useState({});

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const deleteOrderHandler = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order Deleted");
      refetch();
    } catch (err) {
      toast.error("Error occurred while deleting order");
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  // 🔎 Filter Orders
  const filteredOrders =
    data?.orders
      ?.filter((order) => order.user.dept === "Company")
      ?.filter((order) => {
        // Search filter
        const searchMatch =
          order.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.orderItems.some((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

        // Status filter
        const statusMatch =
          statusFilter === "all" ||
          order.orderItems.some((item) =>
            statusFilter === "delivered"
              ? item.isDelivered
              : statusFilter === "received"
              ? item.isRecieved
              : !item.isDelivered && !item.isRecieved
          );

        return searchMatch && statusMatch;
      }) || [];

  // 📄 Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-4xl font-extrabold text-gray-100 mb-8 text-center drop-shadow-md">
        Local Purchase Orders
      </h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <input
          type="text"
          placeholder="Search by user or product..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/4 px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="delivered">Delivered</option>
          <option value="received">Received</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <h4 className="text-red-500 text-center">{error}</h4>
      ) : (
        <>
          <div className="w-full overflow-x-auto bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
            <table className="min-w-full text-sm text-left text-gray-200 relative">
              <thead className="bg-blue-600 text-white uppercase text-xs sticky top-0 z-20 shadow-md">
                <tr>
                  <th className="px-5 py-3">S/N</th>
                  <th className="px-5 py-3">Products</th>
                  <th className="px-5 py-3">User</th>
                  <th className="px-5 py-3">Order Date</th>
                  <th className="px-5 py-3">Details</th>
                  <th className="px-5 py-3 text-center">Delete</th>
                </tr>
              </thead>

              <tbody>
                {paginatedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-400">
                      No matching orders found
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map((order, index) => (
                    <React.Fragment key={order._id}>
                      <tr
                        className={`border-b border-gray-700 transition-colors ${
                          expandedOrders[order._id]
                            ? "bg-gray-600"
                            : index % 2 === 0
                            ? "bg-gray-700 hover:bg-gray-600"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                      >
                        <td className="px-5 py-3 text-lg font-bold text-yellow-400">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>

                        <td className="px-5 py-3 flex justify-between items-center">
                          <span className="font-medium">
                            {order.orderItems.length} item(s)
                          </span>
                          <button
                            onClick={() => toggleExpand(order._id)}
                            className="p-1 text-gray-300 hover:text-blue-400 transition-colors"
                          >
                            {expandedOrders[order._id] ? (
                              <FaChevronUp />
                            ) : (
                              <FaChevronDown />
                            )}
                          </button>
                        </td>
                        <td className="px-5 py-3">{order.user?.name}</td>
                        <td className="px-5 py-3">{formatDate(order.createdAt)}</td>
                        <td className="px-5 py-3">
                          <a
                            href={`/orderdetail/${order._id}`}
                            className="text-blue-400 hover:underline font-semibold"
                          >
                            View
                          </a>
                        </td>
                        <td className="px-5 py-3 text-center">
                          <button
                            onClick={() => deleteOrderHandler(order._id)}
                            className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-all shadow-md"
                          >
                            <AiOutlineDelete size={20} />
                          </button>
                        </td>
                      </tr>

                      {expandedOrders[order._id] && (
                        <tr className="bg-gray-900 border-b border-gray-700">
                          <td colSpan={6} className="px-5 py-4">
                            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                              {order.orderItems.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between bg-gray-800 p-3 rounded-lg shadow-sm hover:bg-gray-700 transition-colors"
                                >
                                  <div>
                                    <p className="font-semibold text-gray-100">
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      Qty: {item.qty}
                                    </p>
                                  </div>
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                                      item.isDelivered
                                        ? "bg-green-600 text-white"
                                        : item.isRecieved
                                        ? "bg-yellow-500 text-white"
                                        : "bg-red-500 text-white"
                                    }`}
                                  >
                                    {item.isDelivered
                                      ? "Delivered"
                                      : item.isRecieved
                                      ? "Received"
                                      : "Pending"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === num
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LPO;
*/
















/*
import React, { useState } from "react";
import Loader from "../../components/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import { FaChevronDown, FaChevronUp, FaJediOrder } from "react-icons/fa";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../redux/orderSlice";
import { toast } from "react-toastify";

const LPO = () => {
  const { data, isLoading, error, refetch } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [expandedOrders, setExpandedOrders] = useState({});

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const deleteOrderHandler = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order Deleted");
      refetch();
    } catch (err) {
      toast.error("Error occurred while deleting order");
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  // Filter Orders
  const filteredOrders =
    data?.orders
      ?.filter((order) => order.user.dept === "Company")
      ?.filter((order) => {
        const searchMatch =
          order.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.orderItems.some((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

        const statusMatch =
          statusFilter === "all" ||
          order.orderItems.some((item) =>
            statusFilter === "delivered"
              ? item.isDelivered
              : statusFilter === "received"
              ? item.isRecieved
              : !item.isDelivered && !item.isRecieved
          );

        return searchMatch && statusMatch;
      }) || [];

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-4xl font-extrabold text-gray-100 mb-8 text-center drop-shadow-md flex items-center justify-center gap-3 transform transition duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 group">
        <FaJediOrder
          className="w-10 h-10 text-blue-400 transition-colors duration-300 ease-in-out group-hover:text-blue-300"
        />
        <span className="transition-colors duration-300 ease-in-out group-hover:text-blue-300">
          Local Purchase Orders
        </span>
      </h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <input
          type="text"
          placeholder="Search by user or product..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/4 px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="delivered">Delivered</option>
          <option value="received">Received</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <h4 className="text-red-500 text-center">{error}</h4>
      ) : (
        <>
          <div className="w-full overflow-x-auto bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
            <table className="min-w-full text-sm text-left text-gray-200 relative">
              <thead className="bg-blue-600 sticky top-0 z-20 shadow-md">
                <tr>
                  <th className="px-5 py-4 text-lg font-bold text-yellow-400">S/N</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Products</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">User</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Order Date</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Details</th>
                  <th className="px-5 py-4 text-lg font-bold text-white text-center">Delete</th>
                </tr>
              </thead>

              <tbody>
                {paginatedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-400">
                      No matching orders found
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map((order, index) => (
                    <React.Fragment key={order._id}>
                      <tr
                        className={`border-b border-gray-700 transition-colors ${
                          expandedOrders[order._id]
                            ? "bg-gray-600"
                            : index % 2 === 0
                            ? "bg-gray-700 hover:bg-gray-600"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                      >
                        <td className="px-5 py-3 text-lg font-bold text-yellow-400 text-center align-middle">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>

                        <td className="px-5 py-3 flex justify-between items-center">
                          <span className="font-medium">{order.orderItems.length} item(s)</span>
                          <button
                            onClick={() => toggleExpand(order._id)}
                            className="p-1 text-gray-300 hover:text-blue-400 transition-colors"
                          >
                            {expandedOrders[order._id] ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        </td>
                        <td className="px-5 py-3">{order.user?.name}</td>
                        <td className="px-5 py-3">{formatDate(order.createdAt)}</td>
                        <td className="px-5 py-3">
                          <a
                            href={`/orderdetail/${order._id}`}
                            className="text-blue-400 hover:underline font-semibold"
                          >
                            View
                          </a>
                        </td>
                        <td className="px-5 py-3 text-center">
                          <button
                            onClick={() => deleteOrderHandler(order._id)}
                            className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-all shadow-md"
                          >
                            <AiOutlineDelete size={20} />
                          </button>
                        </td>
                      </tr>

                      {expandedOrders[order._id] && (
                        <tr className="bg-gray-900 border-b border-gray-700">
                          <td colSpan={6} className="px-5 py-4">
                            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                              {order.orderItems.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between bg-gray-800 p-3 rounded-lg shadow-sm hover:bg-gray-700 transition-colors"
                                >
                                  <div>
                                    <p className="font-semibold text-gray-100">{item.name}</p>
                                    <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                                  </div>
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                                      item.isDelivered
                                        ? "bg-green-600 text-white"
                                        : item.isRecieved
                                        ? "bg-yellow-500 text-white"
                                        : "bg-red-500 text-white"
                                    }`}
                                  >
                                    {item.isDelivered ? "Delivered" : item.isRecieved ? "Received" : "Pending"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === num
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LPO;
 

*/












/*
import React, { useState } from "react";
import Loader from "../../components/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import { FaChevronDown, FaChevronUp, FaJediOrder } from "react-icons/fa";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../redux/orderSlice";
import { toast } from "react-toastify";

const LPO = () => {
  const { data, isLoading, error, refetch } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [expandedOrders, setExpandedOrders] = useState({});

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const deleteOrderHandler = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order Deleted");
      refetch();
    } catch (err) {
      toast.error("Error occurred while deleting order");
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  // Filter Orders
  const filteredOrders =
    data?.orders
      ?.filter((order) => order.user.dept === "Company")
      ?.filter((order) => {
        const searchMatch =
          order.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.orderItems.some((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

        const statusMatch =
          statusFilter === "all" ||
          order.orderItems.some((item) =>
            statusFilter === "delivered"
              ? item.isDelivered
              : statusFilter === "received"
              ? item.isRecieved
              : !item.isDelivered && !item.isRecieved
          );

        return searchMatch && statusMatch;
      }) || [];

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-4xl font-extrabold text-gray-100 mb-8 text-center drop-shadow-md flex items-center justify-center gap-3 transform transition duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 group">
        <FaJediOrder
          className="w-10 h-10 text-blue-400 transition-colors duration-300 ease-in-out group-hover:text-blue-300 group-hover:animate-bounce"
        />
        <span className="transition-colors duration-300 ease-in-out group-hover:text-blue-300">
          Local Purchase Orders
        </span>
      </h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <input
          type="text"
          placeholder="Search by user or product..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/4 px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="delivered">Delivered</option>
          <option value="received">Received</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <h4 className="text-red-500 text-center">{error}</h4>
      ) : (
        <>
          <div className="w-full overflow-x-auto bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
            <table className="min-w-full text-sm text-left text-gray-200 relative">
              <thead className="bg-blue-600 sticky top-0 z-20 shadow-md">
                <tr>
                  <th className="px-5 py-4 text-lg font-bold text-white">S/N</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Products</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">User</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Order Date</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Details</th>
                  <th className="px-5 py-4 text-lg font-bold text-white text-center">Delete</th>
                </tr>
              </thead>

              <tbody>
                {paginatedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-400">
                      No matching orders found
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map((order, index) => (
                    <React.Fragment key={order._id}>
                      <tr
                        className={`border-b border-gray-700 transition-colors ${
                          expandedOrders[order._id]
                            ? "bg-gray-600"
                            : index % 2 === 0
                            ? "bg-gray-700 hover:bg-gray-600"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                      >
                        <td className="px-5 py-3 text-lg font-bold text-yellow-400 text-center align-middle">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>

                        <td className="px-5 py-3 flex justify-between items-center">
                          <span className="font-medium">{order.orderItems.length} item(s)</span>
                          <button
                            onClick={() => toggleExpand(order._id)}
                            className="p-1 text-gray-300 hover:text-blue-400 transition-colors"
                          >
                            {expandedOrders[order._id] ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        </td>
                        <td className="px-5 py-3">{order.user?.name}</td>
                        <td className="px-5 py-3">{formatDate(order.createdAt)}</td>
                        <td className="px-5 py-3">
                          <a
                            href={`/orderdetail/${order._id}`}
                            className="text-blue-400 hover:underline font-semibold"
                          >
                            View
                          </a>
                        </td>
                        <td className="px-5 py-3 text-center">
                          <button
                            onClick={() => deleteOrderHandler(order._id)}
                            className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-all shadow-md"
                          >
                            <AiOutlineDelete size={20} />
                          </button>
                        </td>
                      </tr>

                      {expandedOrders[order._id] && (
                        <tr className="bg-gray-900 border-b border-gray-700">
                          <td colSpan={6} className="px-5 py-4">
                            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                              {order.orderItems.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between bg-gray-800 p-3 rounded-lg shadow-sm hover:bg-gray-700 transition-colors"
                                >
                                  <div>
                                    <p className="font-semibold text-gray-100">{item.name}</p>
                                    <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                                  </div>
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                                      item.isDelivered
                                        ? "bg-green-600 text-white"
                                        : item.isRecieved
                                        ? "bg-yellow-500 text-white"
                                        : "bg-red-500 text-white"
                                    }`}
                                  >
                                    {item.isDelivered ? "Delivered" : item.isRecieved ? "Received" : "Pending"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === num
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LPO;
*/












/*
import React, { useState } from "react";
import Loader from "../../components/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import { FaChevronDown, FaChevronUp, FaJediOrder } from "react-icons/fa";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../redux/orderSlice";
import { toast } from "react-toastify";

const LPO = () => {
  const { data, isLoading, error, refetch } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [expandedOrders, setExpandedOrders] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const deleteOrderHandler = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order Deleted");
      refetch();
    } catch (err) {
      toast.error("Error occurred while deleting order");
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const filteredOrders =
    data?.orders
      ?.filter((order) => order.user.dept === "Company")
      ?.filter((order) => {
        const searchMatch =
          order.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.orderItems.some((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

        const statusMatch =
          statusFilter === "all" ||
          order.orderItems.some((item) =>
            statusFilter === "delivered"
              ? item.isDelivered
              : statusFilter === "received"
              ? item.isRecieved
              : !item.isDelivered && !item.isRecieved
          );

        return searchMatch && statusMatch;
      }) || [];

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-4xl font-extrabold text-gray-100 mb-8 text-center drop-shadow-md flex items-center justify-center gap-3 transform transition duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 group">
        <FaJediOrder
          className="w-10 h-10 text-blue-400 transition-colors duration-300 ease-in-out group-hover:text-blue-300 group-hover:animate-bounce"
        />
        <span className="transition-colors duration-300 ease-in-out group-hover:text-blue-300">
          Local Purchase Orders
        </span>
      </h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <input
          type="text"
          placeholder="Search by User or Product..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
        
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <h4 className="text-red-500 text-center">{error}</h4>
      ) : (
        <>
          <div className="w-full overflow-x-auto bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
            <table className="min-w-full text-sm text-left text-gray-200 relative">
              <thead className="bg-blue-600 sticky top-0 z-20 shadow-md">
                <tr>
                  <th className="px-5 py-3.5 text-lg font-bold text-white text-center align-middle">
                    S/N
                  </th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Products</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Ordered By</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Order Date</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Details</th>
                  <th className="px-5 py-4 text-lg font-bold text-white text-center">Delete</th>
                </tr>
              </thead>

              <tbody>
                {paginatedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-400">
                      No matching orders found
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map((order, index) => (
                    <React.Fragment key={order._id}>
                      <tr
                        className={`border-b border-gray-700 transition-colors ${
                          expandedOrders[order._id]
                            ? "bg-gray-600"
                            : index % 2 === 0
                            ? "bg-gray-700 hover:bg-gray-600"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                      >
                        <td className="px-5 py-3 text-lg font-bold text-yellow-400 text-center align-middle">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="px-5 py-3 flex justify-between items-center">
                          <span className="font-medium">{order.orderItems.length} item(s)</span>
                          <button
                            onClick={() => toggleExpand(order._id)}
                            className="p-1 text-gray-300 hover:text-blue-400 transition-colors"
                          >
                            {expandedOrders[order._id] ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        </td>
                        <td className="px-5 py-3">{order.user?.name}</td>
                        <td className="px-5 py-3">{formatDate(order.createdAt)}</td>
                        <td className="px-5 py-3">
                          <a
                            href={`/orderdetail/${order._id}`}
                            className="text-blue-400 hover:underline font-semibold"
                          >
                            View
                          </a>
                        </td>
                        <td className="px-5 py-3 text-center">
                          <button
                            onClick={() => deleteOrderHandler(order._id)}
                            className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-all shadow-md"
                          >
                            <AiOutlineDelete size={20} />
                          </button>
                        </td>
                      </tr>

                      {expandedOrders[order._id] && (
                        <tr className="bg-gray-900 border-b border-gray-700">
                          <td colSpan={6} className="px-5 py-4">
                            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                              {order.orderItems.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between bg-gray-800 p-3 rounded-lg shadow-sm hover:bg-gray-700 transition-colors"
                                >
                                  <div>
                                    <p className="font-semibold text-gray-100">{item.name}</p>
                                    <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                                  </div>
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                                      item.isDelivered
                                        ? "bg-green-600 text-white"
                                        : item.isRecieved
                                        ? "bg-yellow-500 text-white"
                                        : "bg-red-500 text-white"
                                    }`}
                                  >
                                    {item.isDelivered ? "Delivered" : item.isRecieved ? "Received" : "Pending"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === num
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LPO;









*/










//works
/*
import React, { useState } from "react";
import Loader from "../../components/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import { FaChevronDown, FaChevronUp, FaJediOrder } from "react-icons/fa";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../redux/orderSlice";
import { toast } from "react-toastify";

const LPO = () => {
  const { data, isLoading, error, refetch } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [expandedOrders, setExpandedOrders] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const deleteOrderHandler = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order Deleted");
      refetch();
    } catch (err) {
      toast.error("Error occurred while deleting order");
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const filteredOrders =
    data?.orders
      ?.filter((order) => order.user.dept === "Company")
      ?.filter((order) => {
        const searchMatch =
          order.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.orderItems.some((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

        const statusMatch =
          statusFilter === "all" ||
          order.orderItems.some((item) =>
            statusFilter === "delivered"
              ? item.isDelivered
              : statusFilter === "received"
              ? item.isRecieved
              : !item.isDelivered && !item.isRecieved
          );

        return searchMatch && statusMatch;
      }) || [];

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full p-4 md:p-6 bg-gray-900 min-h-screen text-gray-200">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 flex items-center justify-center gap-3 drop-shadow-md transform transition duration-300 ease-in-out hover:scale-105 group">
        <FaJediOrder className="w-10 h-10 text-blue-400 group-hover:text-blue-300 animate-bounce" />
        <span className="group-hover:text-blue-300">Local Purchase Orders</span>
      </h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <input
          type="text"
          placeholder="Search by User or Product..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <h4 className="text-red-500 text-center">{error}</h4>
      ) : (
        <>
          <div className="hidden md:block w-full overflow-x-auto bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
            <table className="min-w-full text-sm text-left text-gray-200 relative">
              <thead className="bg-blue-600 sticky top-0 z-20 shadow-md">
                <tr>
                  <th className="px-5 py-3.5 text-lg font-bold text-white text-center">S/N</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Products</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Ordered By</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Order Date</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Details</th>
                  <th className="px-5 py-4 text-lg font-bold text-white text-center">Delete</th>
                </tr>
              </thead>

              <tbody>
                {paginatedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-400">
                      No matching orders found
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map((order, index) => (
                    <React.Fragment key={order._id}>
                      <tr
                        className={`border-b border-gray-700 transition-colors ${
                          expandedOrders[order._id]
                            ? "bg-gray-600"
                            : index % 2 === 0
                            ? "bg-gray-700 hover:bg-gray-600"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                      >
                        <td className="px-5 py-3 text-lg font-bold text-yellow-400 text-center">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="px-5 py-3 flex justify-between items-center">
                          <span className="font-medium">{order.orderItems.length} item(s)</span>
                          <button
                            onClick={() => toggleExpand(order._id)}
                            className="p-1 text-gray-300 hover:text-blue-400 transition-colors"
                          >
                            {expandedOrders[order._id] ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        </td>
                        <td className="px-5 py-3">{order.user?.name}</td>
                        <td className="px-5 py-3">{formatDate(order.createdAt)}</td>
                        <td className="px-5 py-3">
                          <a
                            href={`/orderdetail/${order._id}`}
                            className="text-blue-400 hover:underline font-semibold"
                          >
                            View
                          </a>
                        </td>
                        <td className="px-5 py-3 text-center">
                          <button
                            onClick={() => deleteOrderHandler(order._id)}
                            className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-all shadow-md"
                          >
                            <AiOutlineDelete size={20} />
                          </button>
                        </td>
                      </tr>

                      {expandedOrders[order._id] && (
                        <tr className="bg-gray-900 border-b border-gray-700">
                          <td colSpan={6} className="px-5 py-4">
                            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                              {order.orderItems.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-800 p-3 rounded-lg shadow-sm hover:bg-gray-700 transition-colors"
                                >
                                  <div>
                                    <p className="font-semibold text-gray-100">{item.name}</p>
                                    <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                                  </div>
                                  <span
                                    className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                                      item.isDelivered
                                        ? "bg-green-600 text-white"
                                        : item.isRecieved
                                        ? "bg-yellow-500 text-white"
                                        : "bg-red-500 text-white"
                                    }`}
                                  >
                                    {item.isDelivered
                                      ? "Delivered"
                                      : item.isRecieved
                                      ? "Received"
                                      : "Pending"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="grid md:hidden gap-4">
            {paginatedOrders.map((order, index) => (
              <div
                key={order._id}
                className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 transition transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/50"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-bold text-lg text-indigo-400">LPO: {order._id}</h2>
                  <button
                    onClick={() => toggleExpand(order._id)}
                    className="p-1 text-gray-300 hover:text-blue-400"
                  >
                    {expandedOrders[order._id] ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
                <p className="text-sm mb-1">
                  <span className="font-semibold">Ordered By:</span>{" "}
                  <span className="bg-yellow-600/30 px-2 py-1 rounded">{order.user?.name}</span>
                </p>
                <p className="text-sm mb-1">
                  <span className="font-semibold">Items:</span>{" "}
                  <span className="bg-indigo-600/30 px-2 py-1 rounded">{order.orderItems.length}</span>
                </p>
                <p className="text-sm mb-2">
                  <span className="font-semibold">Date:</span>{" "}
                  <span className="bg-gray-700/50 px-2 py-1 rounded">{formatDate(order.createdAt)}</span>
                </p>

                {expandedOrders[order._id] && (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {order.orderItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center bg-gray-700 p-2 rounded-lg shadow-sm hover:bg-gray-600"
                      >
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-xs text-gray-300">Qty: {item.qty}</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            item.isDelivered
                              ? "bg-green-600 text-white"
                              : item.isRecieved
                              ? "bg-yellow-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {item.isDelivered ? "Delivered" : item.isRecieved ? "Received" : "Pending"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between mt-3">
                  <a
                    href={`/orderdetail/${order._id}`}
                    className="text-blue-400 hover:underline font-semibold"
                  >
                    View Details
                  </a>
                  <button
                    onClick={() => deleteOrderHandler(order._id)}
                    className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-shadow shadow-md"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === num
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LPO;
*/










/*
import React, { useState } from "react";
import Loader from "../../components/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import { FaChevronDown, FaChevronUp, FaJediOrder } from "react-icons/fa";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../redux/orderSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const LPO = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: rawData, isLoading, error, refetch } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [expandedOrders, setExpandedOrders] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Determine clearance
  const userHasClearance = userInfo?.isAdmin || userInfo?.dept === "Procurement";

  // Normalize orders safely for any user
  const allOrders = Array.isArray(rawData?.orders)
    ? rawData.orders            // partial admin: data is array
    : rawData?.data?.orders || []; // full admin: data.orders exists

  // Filter orders based on clearance
  const visibleOrders = allOrders.filter((order) => {
    if (userHasClearance) return true; // full access
    // Partial access: only their dept (Company/Warehouse)
    return order.user?.dept === userInfo?.dept;
  });

  // Apply search filter
  const filteredOrders = visibleOrders.filter((order) => {
    if (!searchTerm) return true;
    const userName = order.user?.name || "";
    const items = order.orderItems || [];
    return (
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      items.some((item) => (item?.name || "").toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const deleteOrderHandler = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order Deleted");
      refetch();
    } catch {
      toast.error("Error occurred while deleting order");
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full p-4 md:p-6 bg-gray-900 min-h-screen text-gray-200">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 flex items-center justify-center gap-3 drop-shadow-md transform transition duration-300 ease-in-out hover:scale-105 group">
        <FaJediOrder className="w-10 h-10 text-blue-400 group-hover:text-blue-300 animate-bounce" />
        <span className="group-hover:text-blue-300">Local Purchase Orders</span>
      </h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <input
          type="text"
          placeholder="Search by User or Product..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <h4 className="text-red-500 text-center">{error?.message || "Something went wrong"}</h4>
      ) : !userHasClearance && visibleOrders.length === 0 ? (
        <h4 className="text-yellow-400 text-center font-semibold mt-10">
          You do not have clearance to view Local Purchase Orders.
        </h4>
      ) : filteredOrders.length === 0 ? (
        <h4 className="text-gray-400 text-center font-semibold mt-10">
          No matching orders found.
        </h4>
      ) : (
        <>
          <div className="hidden md:block w-full overflow-x-auto bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
            <table className="min-w-full text-sm text-left text-gray-200 relative">
              <thead className="bg-blue-600 sticky top-0 z-20 shadow-md">
                <tr>
                  <th className="px-5 py-3.5 text-lg font-bold text-white text-center">S/N</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Products</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Ordered By</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Order Date</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Details</th>
                  <th className="px-5 py-4 text-lg font-bold text-white text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order, index) => {
                  const items = order.orderItems || [];
                  return (
                    <React.Fragment key={order._id}>
                      <tr
                        className={`border-b border-gray-700 transition-colors ${
                          expandedOrders[order._id]
                            ? "bg-gray-600"
                            : index % 2 === 0
                            ? "bg-gray-700 hover:bg-gray-600"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                      >
                        <td className="px-5 py-3 text-lg font-bold text-yellow-400 text-center">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="px-5 py-3 flex justify-between items-center">
                          <span className="font-medium">{items.length} item(s)</span>
                          <button
                            onClick={() => toggleExpand(order._id)}
                            className="p-1 text-gray-300 hover:text-blue-400 transition-colors"
                          >
                            {expandedOrders[order._id] ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        </td>
                        <td className="px-5 py-3">{order.user?.name || "Unknown User"}</td>
                        <td className="px-5 py-3">{formatDate(order.createdAt)}</td>
                        <td className="px-5 py-3">
                          <a
                            href={`/orderdetail/${order._id}`}
                            className="text-blue-400 hover:underline font-semibold"
                          >
                            View
                          </a>
                        </td>
                        <td className="px-5 py-3 text-center">
                          <button
                            onClick={() => deleteOrderHandler(order._id)}
                            className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-all shadow-md"
                          >
                            <AiOutlineDelete size={20} />
                          </button>
                        </td>
                      </tr>

                      {expandedOrders[order._id] && (
                        <tr className="bg-gray-900 border-b border-gray-700">
                          <td colSpan={6} className="px-5 py-4">
                            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                              {items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-800 p-3 rounded-lg shadow-sm hover:bg-gray-700 transition-colors"
                                >
                                  <div>
                                    <p className="font-semibold text-gray-100">{item?.name || "Unnamed Item"}</p>
                                    <p className="text-xs text-gray-400">Qty: {item?.qty || 0}</p>
                                  </div>
                                  <span
                                    className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                                      item?.isDelivered
                                        ? "bg-green-600 text-white"
                                        : item?.isRecieved
                                        ? "bg-yellow-500 text-white"
                                        : "bg-red-500 text-white"
                                    }`}
                                  >
                                    {item?.isDelivered ? "Delivered" : item?.isRecieved ? "Received" : "Pending"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="grid md:hidden gap-4">
            {paginatedOrders.map((order) => {
              const items = order.orderItems || [];
              return (
                <div
                  key={order._id}
                  className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 transition transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-bold text-lg text-indigo-400">LPO: {order._id}</h2>
                    <button
                      onClick={() => toggleExpand(order._id)}
                      className="p-1 text-gray-300 hover:text-blue-400"
                    >
                      {expandedOrders[order._id] ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Ordered By:</span>{" "}
                    <span className="bg-yellow-600/30 px-2 py-1 rounded">{order.user?.name || "Unknown"}</span>
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Items:</span>{" "}
                    <span className="bg-indigo-600/30 px-2 py-1 rounded">{items.length}</span>
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-semibold">Date:</span>{" "}
                    <span className="bg-gray-700/50 px-2 py-1 rounded">{formatDate(order.createdAt)}</span>
                  </p>

                  {expandedOrders[order._id] && (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center bg-gray-700 p-2 rounded-lg shadow-sm hover:bg-gray-600"
                        >
                          <div>
                            <p className="font-semibold">{item?.name || "Unnamed Item"}</p>
                            <p className="text-xs text-gray-300">Qty: {item?.qty || 0}</p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                              item?.isDelivered
                                ? "bg-green-600 text-white"
                                : item?.isRecieved
                                ? "bg-yellow-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {item?.isDelivered ? "Delivered" : item?.isRecieved ? "Received" : "Pending"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between mt-3">
                    <a
                      href={`/orderdetail/${order._id}`}
                      className="text-blue-400 hover:underline font-semibold"
                    >
                      View Details
                    </a>
                    <button
                      onClick={() => deleteOrderHandler(order._id)}
                      className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-shadow shadow-md"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === num
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LPO;
*/














//works
/*
import React, { useState } from "react";
import Loader from "../../components/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import { FaChevronDown, FaChevronUp, FaJediOrder } from "react-icons/fa";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../redux/orderSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const LPO = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: rawData, isLoading, error, refetch } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [expandedOrders, setExpandedOrders] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Who can delete?
  const canDeleteOrders = userInfo?.isAdmin || userInfo?.dept === "Procurement";

  // Normalize orders safely
  const allOrders = Array.isArray(rawData?.orders)
    ? rawData.orders
    : rawData?.data?.orders || [];

  // Apply search filter
  const filteredOrders = allOrders.filter((order) => {
    if (!searchTerm) return true;
    const userName = order.user?.name || "";
    const items = order.orderItems || [];
    return (
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      items.some((item) =>
        (item?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const deleteOrderHandler = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order Deleted");
      refetch();
    } catch {
      toast.error("Error occurred while deleting order");
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full p-4 md:p-6 bg-gray-900 min-h-screen text-gray-200">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 flex items-center justify-center gap-3 drop-shadow-md transform transition duration-300 ease-in-out hover:scale-105 group">
        <FaJediOrder className="w-10 h-10 text-blue-400 group-hover:text-blue-300 animate-bounce" />
        <span className="group-hover:text-blue-300">Local Purchase Orders</span>
      </h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <input
          type="text"
          placeholder="Search by User or Product..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <h4 className="text-red-500 text-center">
          {error?.data?.message || error?.error || error?.status || "Something went wrong"}
        </h4>
      ) : filteredOrders.length === 0 ? (
        <h4 className="text-gray-400 text-center font-semibold mt-10">
          No matching orders found.
        </h4>
      ) : (
        <>
          <div className="hidden md:block w-full overflow-x-auto bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
            <table className="min-w-full text-sm text-left text-gray-200 relative">
              <thead className="bg-blue-600 sticky top-0 z-20 shadow-md">
                <tr>
                  <th className="px-5 py-3.5 text-lg font-bold text-white text-center">S/N</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Products</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Ordered By</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Order Date</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Details</th>
                  {canDeleteOrders && (
                    <th className="px-5 py-4 text-lg font-bold text-white text-center">Delete</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order, index) => {
                  const items = order.orderItems || [];
                  return (
                    <React.Fragment key={order._id}>
                      <tr
                        className={`border-b border-gray-700 transition-colors ${
                          expandedOrders[order._id]
                            ? "bg-gray-600"
                            : index % 2 === 0
                            ? "bg-gray-700 hover:bg-gray-600"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                      >
                        <td className="px-5 py-3 text-lg font-bold text-yellow-400 text-center">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="px-5 py-3 flex justify-between items-center">
                          <span className="font-medium">{items.length} item(s)</span>
                          <button
                            onClick={() => toggleExpand(order._id)}
                            className="p-1 text-gray-300 hover:text-blue-400 transition-colors"
                          >
                            {expandedOrders[order._id] ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        </td>
                        <td className="px-5 py-3">{order.user?.name || "Unknown User"}</td>
                        <td className="px-5 py-3">{formatDate(order.createdAt)}</td>
                        <td className="px-5 py-3">
                          <a
                            href={`/orderdetail/${order._id}`}
                            className="text-blue-400 hover:underline font-semibold"
                          >
                            View
                          </a>
                        </td>
                        {canDeleteOrders && (
                          <td className="px-5 py-3 text-center">
                            <button
                              onClick={() => deleteOrderHandler(order._id)}
                              className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-all shadow-md"
                            >
                              <AiOutlineDelete size={20} />
                            </button>
                          </td>
                        )}
                      </tr>

                      {expandedOrders[order._id] && (
                        <tr className="bg-gray-900 border-b border-gray-700">
                          <td colSpan={canDeleteOrders ? 6 : 5} className="px-5 py-4">
                            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                              {items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-800 p-3 rounded-lg shadow-sm hover:bg-gray-700 transition-colors"
                                >
                                  <div>
                                    <p className="font-semibold text-gray-100">
                                      {item?.name || "Unnamed Item"}
                                    </p>
                                    <p className="text-xs text-gray-400">Qty: {item?.qty || 0}</p>
                                  </div>
                                  <span
                                    className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                                      item?.isDelivered
                                        ? "bg-green-600 text-white"
                                        : item?.isRecieved
                                        ? "bg-yellow-500 text-white"
                                        : "bg-red-500 text-white"
                                    }`}
                                  >
                                    {item?.isDelivered
                                      ? "Delivered"
                                      : item?.isRecieved
                                      ? "Received"
                                      : "Pending"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="grid md:hidden gap-4">
            {paginatedOrders.map((order) => {
              const items = order.orderItems || [];
              return (
                <div
                  key={order._id}
                  className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 transition transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-bold text-lg text-indigo-400">LPO: {order._id}</h2>
                    <button
                      onClick={() => toggleExpand(order._id)}
                      className="p-1 text-gray-300 hover:text-blue-400"
                    >
                      {expandedOrders[order._id] ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Ordered By:</span>{" "}
                    <span className="bg-yellow-600/30 px-2 py-1 rounded">
                      {order.user?.name || "Unknown"}
                    </span>
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Items:</span>{" "}
                    <span className="bg-indigo-600/30 px-2 py-1 rounded">{items.length}</span>
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-semibold">Date:</span>{" "}
                    <span className="bg-gray-700/50 px-2 py-1 rounded">
                      {formatDate(order.createdAt)}
                    </span>
                  </p>

                  {expandedOrders[order._id] && (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center bg-gray-700 p-2 rounded-lg shadow-sm hover:bg-gray-600"
                        >
                          <div>
                            <p className="font-semibold">{item?.name || "Unnamed Item"}</p>
                            <p className="text-xs text-gray-300">Qty: {item?.qty || 0}</p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                              item?.isDelivered
                                ? "bg-green-600 text-white"
                                : item?.isRecieved
                                ? "bg-yellow-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {item?.isDelivered ? "Delivered" : item?.isRecieved ? "Received" : "Pending"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between mt-3">
                    <a
                      href={`/orderdetail/${order._id}`}
                      className="text-blue-400 hover:underline font-semibold"
                    >
                      View Details
                    </a>
                    {canDeleteOrders && (
                      <button
                        onClick={() => deleteOrderHandler(order._id)}
                        className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-shadow shadow-md"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === num
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LPO;
*/










//test newset nt gna wrk

import React, { useState } from "react";
import Loader from "../../components/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import { FaChevronDown, FaChevronUp, FaJediOrder } from "react-icons/fa";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../redux/orderSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const LPO = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: rawData, isLoading, error } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [expandedOrders, setExpandedOrders] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, orderId: null });
  const [localOrders, setLocalOrders] = useState([]);
  const itemsPerPage = 5;

  const canDeleteOrders = userInfo?.isAdmin || userInfo?.dept === "Procurement";

  // Normalize orders
  const allOrders = Array.isArray(rawData?.orders)
    ? rawData.orders
    : rawData?.data?.orders || [];

  // Keep a local copy for optimistic updates
  React.useEffect(() => {
    setLocalOrders(allOrders);
  }, [rawData]);

  // Filter orders by search
  const filteredOrders = localOrders.filter((order) => {
    if (!searchTerm) return true;
    const userName = order.user?.name || "";
    const items = order.orderItems || [];
    return (
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      items.some((item) =>
        (item?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = async (orderId) => {
    try {
      setLocalOrders((prev) => prev.filter((o) => o._id !== orderId)); // Optimistic UI
      await deleteOrder(orderId).unwrap();
      toast.success("Order deleted successfully");
    } catch {
      toast.error("Failed to delete order");
      setLocalOrders(allOrders); // rollback if error
    }
    setConfirmDelete({ open: false, orderId: null });
  };

  return (
    <div className="w-full p-4 md:p-6 bg-gray-900 min-h-screen text-gray-200">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 flex items-center justify-center gap-3 drop-shadow-md transform transition duration-300 ease-in-out hover:scale-105 group">
        <FaJediOrder className="w-10 h-10 text-blue-400 group-hover:text-blue-300 animate-bounce" />
        <span className="group-hover:text-blue-300">Local Purchase Orders</span>
      </h1>

      {/* Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <input
          type="text"
          placeholder="Search by User or Product..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete.open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-11/12 max-w-md text-center shadow-lg border-2 border-red-600">
            <h2 className="text-xl font-bold text-white mb-4">Confirm Delete</h2>
            <p className="text-gray-200 mb-6">
              Are you sure you want to delete this order? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleDelete(confirmDelete.orderId)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
              >
                Delete
              </button>
              <button
                onClick={() => setConfirmDelete({ open: false, orderId: null })}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <h4 className="text-red-500 text-center">
          {error?.data?.message || error?.error || error?.status || "Something went wrong"}
        </h4>
      ) : filteredOrders.length === 0 ? (
        <h4 className="text-gray-400 text-center font-semibold mt-10">No matching orders found.</h4>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block w-full overflow-x-auto bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
            <table className="min-w-full text-sm text-left text-gray-200 relative">
              <thead className="bg-blue-600 sticky top-0 z-20 shadow-md">
                <tr>
                  <th className="px-5 py-3.5 text-lg font-bold text-white text-center">S/N</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Products</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Ordered By</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Order Date</th>
                  <th className="px-5 py-4 text-lg font-bold text-white">Details</th>
                  {canDeleteOrders && (
                    <th className="px-5 py-4 text-lg font-bold text-white text-center">Delete</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order, index) => {
                  const items = order.orderItems || [];
                  return (
                    <React.Fragment key={order._id}>
                      <tr
                        className={`border-b border-gray-700 transition-colors ${
                          expandedOrders[order._id]
                            ? "bg-gray-600"
                            : index % 2 === 0
                            ? "bg-gray-700 hover:bg-gray-600"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                      >
                        <td className="px-5 py-3 text-lg font-bold text-yellow-400 text-center">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="px-5 py-3 flex justify-between items-center">
                          <span className="font-medium">{items.length} item(s)</span>
                          <button
                            onClick={() => toggleExpand(order._id)}
                            className="p-1 text-gray-300 hover:text-blue-400 transition-colors"
                          >
                            {expandedOrders[order._id] ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        </td>
                        <td className="px-5 py-3">{order.user?.name || "Unknown User"}</td>
                        <td className="px-5 py-3">{formatDate(order.createdAt)}</td>
                        <td className="px-5 py-3">
                          <a
                            href={`/orderdetail/${order._id}`}
                            className="text-blue-400 hover:underline font-semibold"
                          >
                            View
                          </a>
                        </td>
                        {canDeleteOrders && (
                          <td className="px-5 py-3 text-center">
                            <button
                              onClick={() => setConfirmDelete({ open: true, orderId: order._id })}
                              className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-all shadow-md"
                            >
                              <AiOutlineDelete size={20} />
                            </button>
                          </td>
                        )}
                      </tr>

                      {expandedOrders[order._id] && (
                        <tr className="bg-gray-900 border-b border-gray-700">
                          <td colSpan={canDeleteOrders ? 6 : 5} className="px-5 py-4">
                            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                              {items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-800 p-3 rounded-lg shadow-sm hover:bg-gray-700 transition-colors"
                                >
                                  <div>
                                    <p className="font-semibold text-gray-100">{item?.name || "Unnamed Item"}</p>
                                    <p className="text-xs text-gray-400">Qty: {item?.qty || 0}</p>
                                  </div>
                                  <span
                                    className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                                      item?.isDelivered
                                        ? "bg-green-600 text-white"
                                        : item?.isRecieved
                                        ? "bg-yellow-500 text-white"
                                        : "bg-red-500 text-white"
                                    }`}
                                  >
                                    {item?.isDelivered ? "Delivered" : item?.isRecieved ? "Received" : "Pending"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid md:hidden gap-4">
            {paginatedOrders.map((order) => {
              const items = order.orderItems || [];
              return (
                <div
                  key={order._id}
                  className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 transition transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-bold text-lg text-indigo-400">LPO: {order._id}</h2>
                    <button
                      onClick={() => toggleExpand(order._id)}
                      className="p-1 text-gray-300 hover:text-blue-400"
                    >
                      {expandedOrders[order._id] ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Ordered By:</span>{" "}
                    <span className="bg-yellow-600/30 px-2 py-1 rounded">{order.user?.name || "Unknown"}</span>
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Items:</span>{" "}
                    <span className="bg-indigo-600/30 px-2 py-1 rounded">{items.length}</span>
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-semibold">Date:</span>{" "}
                    <span className="bg-gray-700/50 px-2 py-1 rounded">{formatDate(order.createdAt)}</span>
                  </p>

                  {expandedOrders[order._id] && (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center bg-gray-700 p-2 rounded-lg shadow-sm hover:bg-gray-600"
                        >
                          <div>
                            <p className="font-semibold">{item?.name || "Unnamed Item"}</p>
                            <p className="text-xs text-gray-300">Qty: {item?.qty || 0}</p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                              item?.isDelivered
                                ? "bg-green-600 text-white"
                                : item?.isRecieved
                                ? "bg-yellow-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {item?.isDelivered ? "Delivered" : item?.isRecieved ? "Received" : "Pending"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between mt-3">
                    <a href={`/orderdetail/${order._id}`} className="text-blue-400 hover:underline font-semibold">
                      View Details
                    </a>
                    {canDeleteOrders && (
                      <button
                        onClick={() => setConfirmDelete({ open: true, orderId: order._id })}
                        className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-shadow shadow-md"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === num
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LPO;

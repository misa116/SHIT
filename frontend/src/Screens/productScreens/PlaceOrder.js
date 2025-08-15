 /*import React, { useEffect } from "react";
import { useCreateOrderMutation } from "../../redux/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { clearCartItems } from "../../redux/cartSlice";
import { getProducts } from "../../redux/productSlice";

const PlaceOrder = () => {
  const { cartItems, approvedData, requisitionSteps } = useSelector(
    (state) => state.cart
  );

  const [createOrder, { isLoading, error, isSuccess }] =
    useCreateOrderMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!approvedData?.reqBy) {
      navigate("/store-requisition");
    }

    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      navigate("/my-orders-list");
    }
  }, [approvedData.reqBy, isSuccess]);

  const placeOrderHandler = async () => {
    try { 

      // this Works as Well 
      // const orderData = {
      //   orderItems: cartItems?.map((item) => ({
      //     product: item._id, // Ensure product ID is included
      //     name: item.name,
      //     qty: item.qty,
      //     category: item.category,
      //     stock: item.stock,
      //     supplier: item.supplier,
      //   })),
      //   approvedData,
      //   requisitionSteps,
      // };\

// as well this Works  but more Secure  
      const payload = {
        orderItems: await Promise.all(
          cartItems.map(async (item) => {
            if (!item.supplier) {
              const product = await getProducts(item._id);
              item = { ...item, supplier: product.supplier };
            }

            return {
              product: item._id,
              name: item.name,
              qty: item.qty,
              category: item.category,
              price: item.price,
              description: item.description,
              stock: item.stock,
              supplier: item.supplier,
              user: item.user,
            };
          })
        ),
        approvedData: approvedData,
        requisitionSteps: requisitionSteps,
      };
      // await createOrder(orderData).unwrap();
      const { res } = await createOrder(payload).unwrap();
      // console.log("res", res);
      dispatch(clearCartItems());
    } catch (err) {
      console.error("Failed to place order: ", err);
    }
  };
  return (
    <div className="w-full mt-[-42px] ">
      <div className=" grid grid-rows-2 grid-flow-col gap-4 mt-3 md:mt-16 py-6">
        {" "}
        <div className="">
          <h1 className="text-slate-200 flex justify-center pb-4">
            PLACE ORDER SCREEN
          </h1>
          {cartItems.length === 0 ? (
            <h4>
              Your Cart is Empty{" "}
              <Link to="/dashboard" className="underline">
                Go back
              </Link>
            </h4>
          ) : (
            <div className="table w-full ">
              <table className="min-w-full  bg-gray-600 border border-gray-200 text-slate-100">
                <thead>
                  <tr className="py-2 px-4 border-b">
                    <th>PRODUCT NAME</th>
                    <th className="py-2 px-4 border-b">UOM</th>
                    <th className="py-2 px-4 border-b"> STOCK</th>
                    <th className="py-2 px-4 border-b">MANUFACTURER</th>
                    <th className="py-2 px-4 border-b">MODEL NO</th>
                    <th className="py-2 px-4 border-b">QTY</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>

                      <td className="py-2 px-4 border-b">PCS</td>
                      <td className="py-2 px-4 border-b">{item?.stock}</td>
                      <td className="py-2 px-4 border-b">
                        {item?.manufacturer ? item.manufacturer : "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {item?.modelNO ? item.modelNO : "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b">{item?.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="py-3 ">
            <h3 className="mt-2 text-slate-200 text-2xl p-2">ADDITION INFO</h3>
            <div className="flex flex-col space-y-3">
              <div className="text-md font-semibold text-slate-100 uppercase  ">
                <b>REQ BY : {approvedData.reqBy} </b> <br />
                <b> APPROVED BY : {approvedData.approvedBy}</b>
                <p> REMARKS : {approvedData.comment} </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            {isLoading && <Loader />}
            <button
              disabled={cartItems?.length === 0}
              onClick={placeOrderHandler}
              className="text-lg bg-orange-400 text-black p-2 px-5 mr-5 rounded-lg"
            >
              SAVE REQUISITION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
/*/


import React, { useEffect } from "react";
import { useCreateOrderMutation } from "../../redux/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { clearCartItems } from "../../redux/cartSlice";
import { getProducts } from "../../redux/productSlice";

const PlaceOrder = () => {
  const { cartItems, approvedData, requisitionSteps } = useSelector(
    (state) => state.cart
  );

  const [createOrder, { isLoading, error, isSuccess }] =
    useCreateOrderMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!approvedData?.reqBy) {
      navigate("/store-requisition");
    }

    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }

    if (isSuccess) {
      navigate("/my-orders-list");
    }
  }, [approvedData.reqBy, isSuccess, error, navigate]);

  const placeOrderHandler = async () => {
    try {
      const payload = {
        orderItems: await Promise.all(
          cartItems.map(async (item) => {
            if (!item.supplier) {
              const product = await getProducts(item._id);
              item = { ...item, supplier: product.supplier };
            }
            return {
              product: item._id,
              name: item.name,
              qty: item.qty,
              category: item.category,
              price: item.price,
              description: item.description,
              stock: item.stock,
              supplier: item.supplier,
              user: item.user,
            };
          })
        ),
        approvedData,
        requisitionSteps,
      };

      await createOrder(payload).unwrap();
      dispatch(clearCartItems());
    } catch (err) {
      console.error("Failed to place order:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Place Order
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <h4 className="text-lg">Your cart is empty</h4>
          <Link
            to="/dashboard"
            className="text-orange-400 underline hover:text-orange-300"
          >
            Go back
          </Link>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto shadow-lg rounded-lg mb-8">
            <table className="min-w-full bg-gray-800 border border-gray-700">
              <thead className="bg-gray-700 text-orange-400">
                <tr>
                  <th className="py-3 px-4 text-left">Product Name</th>
                  <th className="py-3 px-4 text-left">UOM</th>
                  <th className="py-3 px-4 text-left">Stock</th>
                  <th className="py-3 px-4 text-left">Manufacturer</th>
                  <th className="py-3 px-4 text-left">Model No</th>
                  <th className="py-3 px-4 text-left">Qty</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">PCS</td>
                    <td className="py-2 px-4">{item.stock}</td>
                    <td className="py-2 px-4">
                      {item.manufacturer || "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {item.modelNO || "N/A"}
                    </td>
                    <td className="py-2 px-4">{item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-800 p-4 rounded-lg mb-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-orange-400">
              Additional Info
            </h3>
            <div className="space-y-2">
              <p>
                <strong>Req By:</strong> {approvedData.reqBy}
              </p>
              <p>
                <strong>Approved By:</strong> {approvedData.approvedBy}
              </p>
              <p>
                <strong>Remarks:</strong> {approvedData.comment}
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            {isLoading && <Loader />}
            <button
              disabled={cartItems.length === 0}
              onClick={placeOrderHandler}
              className="bg-orange-500 hover:bg-orange-400 text-black font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              Save Requisition
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PlaceOrder;

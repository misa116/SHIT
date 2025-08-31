 /*
  import { Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveApprovedData } from "../redux/cartSlice";

const ApprovedModal = ({ showApprovedModal, setShowApprovedMadal }) => {
  const { approvedData } = useSelector((state) => state.cart);

  const [reqBy, setReqBy] = useState(approvedData?.reqBy);
  const [approvedBy, setApprovedBy] = useState(approvedData?.approvedBy);
  const [comment, SetComment] = useState(approvedData?.comment);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveApprovedData({ reqBy, approvedBy, comment }));
    navigate("/placeorder");
  };

  return (
    <Modal
      okType="add"
      open={showApprovedModal}
      footer={false}
      onCancel={() => {
        setShowApprovedMadal(false);
      }}
    >
      <div>
        <h1>Approved Modal</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div className="mb-3 mt-2">
          <label className="block text-sm font-medium text-gray-900 ">
            Requested By
          </label>
          <input
            name="name"
            type="text"
            onChange={(e) => setReqBy(e.target.value)}
            value={reqBy}
            className="inputForm"
            placeholder="Requested By"
          />
        </div>
        <div className="mb-3 mt-2">
          <label className="block text-sm font-medium text-gray-900 ">
            Approved By
          </label>
          <input
            name="approvedBy"
            type="text"
            onChange={(e) => setApprovedBy(e.target.value)}
            value={approvedBy}
            className="inputForm"
            placeholder="Approved By"
          />
        </div>{" "}
        <div className="mb-3 mt-2">
          <label className="block text-sm font-medium text-gray-900 ">
            Leave Comment
          </label>
          <input
            name="comment"
            type="text"
            onChange={(e) => SetComment(e.target.value)}
            value={comment}
            className="inputForm"
            placeholder="Add Some Comment "
          />
        </div>
        <div className="mt-4 flex justify-end mr-5">
          <button
            type="submit"
            className="px-3 p-2 bg-green-700  hover:text-black hover:underline rounded-2xl text-slate-50"
          >
            Continue
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ApprovedModal;
*/









/*

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveApprovedData } from "../redux/cartSlice";

const ApprovedModal = ({ showApprovedModal, setShowApprovedModal, requisitionType }) => {
  const { approvedData } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [reqBy, setReqBy] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (approvedData) {
      setReqBy(approvedData.reqBy || "");
      setApprovedBy(approvedData.approvedBy || "");
      setComment(approvedData.comment || "");
    }
  }, [approvedData]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveApprovedData({ reqBy, approvedBy, comment }));
    setShowApprovedModal(false);
  };

  if (!showApprovedModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-700 w-full max-w-md relative">
        <button
          onClick={() => setShowApprovedModal(false)}
          className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-red-500 transition"
        >
          ×
        </button>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-400 drop-shadow-lg">
            Approve Requisition
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${
              requisitionType === "PURCHASE REQUISITION" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {requisitionType || ""}
          </span>
        </div>

        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-200 mb-1">Requested By</label>
            <input
              type="text"
              value={reqBy}
              onChange={(e) => setReqBy(e.target.value)}
              placeholder="Requested By"
              className="rounded-xl px-3 py-2 bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-200 mb-1">Approved By</label>
            <input
              type="text"
              value={approvedBy}
              onChange={(e) => setApprovedBy(e.target.value)}
              placeholder="Approved By"
              className="rounded-xl px-3 py-2 bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-200 mb-1">Leave Comment</label>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add Some Comment"
              className="rounded-xl px-3 py-2 bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-2xl text-white font-semibold shadow-lg transition-all"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApprovedModal;
*/




import { Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveApprovedData } from "../redux/cartSlice";

const ApprovedModal = ({ showApprovedModal, setShowApprovedModal }) => {
  const { approvedData } = useSelector((state) => state.cart);

  const [reqBy, setReqBy] = useState(approvedData?.reqBy || "");
  const [approvedBy, setApprovedBy] = useState(approvedData?.approvedBy || "");
  const [comment, setComment] = useState(approvedData?.comment || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveApprovedData({ reqBy, approvedBy, comment }));
    setShowApprovedModal(false);
    navigate("/placeorder");
  };

  return (
    <Modal
      open={showApprovedModal}
      footer={false}
      onCancel={() => setShowApprovedModal(false)}
    >
      <div>
        <h1 className="text-xl font-bold text-blue-400 mb-4">Approve Requisition</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div className="mb-3 mt-2">
          <label className="block text-sm font-medium text-gray-900">
            Requested By
          </label>
          <input
            type="text"
            value={reqBy}
            onChange={(e) => setReqBy(e.target.value)}
            className="inputForm"
            placeholder="Requested By"
          />
        </div>

        <div className="mb-3 mt-2">
          <label className="block text-sm font-medium text-gray-900">
            Approved By
          </label>
          <input
            type="text"
            value={approvedBy}
            onChange={(e) => setApprovedBy(e.target.value)}
            className="inputForm"
            placeholder="Approved By"
          />
        </div>

        <div className="mb-3 mt-2">
          <label className="block text-sm font-medium text-gray-900">
            Leave Comment
          </label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="inputForm"
            placeholder="Add Some Comment"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-3 py-2 bg-green-700 hover:text-black hover:underline rounded-2xl text-slate-50"
          >
            Continue
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ApprovedModal;

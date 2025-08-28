"use client";
import { RootState } from "@/store";
import { clearMessage } from "@/store/slices/uiSlice";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

const Message = () => {
  const { message, type } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  if (!message) return null;

  return (
    <motion.div
      className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg z-50 text-white ${
        type === "success"
          ? "bg-green-500"
          : type === "error"
          ? "bg-red-500"
          : "bg-blue-500"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="flex items-center gap-2">
        <span>{message}</span>
        <button onClick={() => dispatch(clearMessage())} className="ml-2 font-bold">
          ×
        </button>
      </div>
    </motion.div>
  );
};

export default Message;

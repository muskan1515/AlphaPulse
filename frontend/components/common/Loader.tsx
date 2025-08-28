"use client";
import { RootState } from "@/store";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Loader = () => {
  const loading = useSelector((state: RootState) => state.ui.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        className="w-16 h-16 border-4 border-white border-t-indigo-500 rounded-full animate-spin"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default Loader;

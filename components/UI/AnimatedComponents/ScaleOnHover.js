import React from "react";
import { motion } from "framer-motion";

const ScaleOnHover = ({ children, className = "", backgroundColor = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ borderRadius: "10px", opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.03, backgroundColor, borderRadius: "10px" }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 1, type: "spring" }}
    >
      {children}
    </motion.div>
  );
};

export default ScaleOnHover;

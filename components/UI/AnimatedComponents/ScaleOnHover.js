import React from "react";
import { motion } from "framer-motion";

const ScaleOnHover = ({ children, className = "", backgroundColor = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ borderRadius: "10px" }}
      whileHover={{ scale: 1.01, backgroundColor, borderRadius: "10px" }}
      transition={{ duration: 1, type: "spring" }}
    >
      {children}
    </motion.div>
  );
};

export default ScaleOnHover;

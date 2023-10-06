import React from "react";
import { motion } from "framer-motion";

import CheckCircleIcon from "@/components/UI/Icons/CheckCircleIcon";

import classes from "./AddClassroom.module.css";

const AddClassroom = ({ keyName }) => {
  return (
    <motion.div
      layout
      key={keyName}
      initial={{ scale: 0.2, opacity: 0, x: "40%", y: "-50px" }}
      animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
      exit={{ scale: 0.2, opacity: 0, x: "40%", y: "-50px" }}
      transition={{ duration: 0.5, type: "spring" }}
      className={classes.container}
    >
      <select name="Curso" className={classes.select}>
        <option defaultValue={null}>Curso</option>
        <option value={1}>1ro</option>
        <option value={2}>2do</option>
        <option value={3}>3ro</option>
        <option value={4}>4to</option>
        <option value={5}>5to</option>
        <option value={6}>6to</option>
      </select>
      <select className={classes.select}>
        <option value={null}>División</option>
        <option value={1}>I</option>
        <option value={2}>II</option>
        <option value={3}>III</option>
      </select>
      <select className={classes.select}>
        <option value={null}>Año</option>
        <option value={2023}>2023</option>
        <option value={2024}>2024</option>
        <option value={2025}>2025</option>
        <option value={2026}>2026</option>
        <option value={2027}>2027</option>
        <option value={2028}>2028</option>
        <option value={2029}>2029</option>
        <option value={2030}>2030</option>
        <option value={2031}>2031</option>
        <option value={2032}>2032</option>
        <option value={2033}>2033</option>
        <option value={2034}>2034</option>
        <option value={2035}>2035</option>
        <option value={2036}>2036</option>
      </select>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={classes.button}
      >
        <CheckCircleIcon />
      </motion.button>
    </motion.div>
  );
};

export default AddClassroom;

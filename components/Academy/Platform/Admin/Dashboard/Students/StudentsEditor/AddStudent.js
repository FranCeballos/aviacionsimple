import React from "react";
import { motion } from "framer-motion";
import CheckCircleIcon from "@/components/UI/Icons/CheckCircleIcon";
import classes from "./AddStudent.module.css";
import Input from "@/components/UI/Forms/Inputs/Input";

const AddStudent = (props) => {
  return (
    <motion.div
      layout
      key="add"
      initial={{ scale: 0.2, opacity: 0, x: "40%", y: "-50px" }}
      animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
      exit={{ scale: 0.2, opacity: 0, x: "40%", y: "-50px" }}
      transition={{ duration: 0.5, type: "spring" }}
      className={classes.container}
    >
      <Input containerStyle={{}} type="text" placeholder="Nombre" />
      <Input type="text" placeholder="Apellido" />
      <Input type="email" placeholder="Email" />
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

export default AddStudent;

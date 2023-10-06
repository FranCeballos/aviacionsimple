import React from "react";
import { motion } from "framer-motion";
import classes from "./SubjectsDashboard.module.css";

const SubjectsDashboard = ({ keyName }) => {
  return (
    <motion.div
      key={keyName}
      initial={{ x: "50vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.75, type: "spring" }}
      exit={{
        x: "50vw",
        opacity: 0,
      }}
      className={classes.container}
    >
      <h2 className={classes.title}>Materias</h2>
    </motion.div>
  );
};

export default SubjectsDashboard;

import React from "react";
import { motion } from "framer-motion";
import classes from "./DashboardSectionWrapper.module.css";

const DashboardSectionWrapper = ({ title, variant, children, style = {} }) => {
  return (
    <div className={classes.container} style={style}>
      <motion.h2
        key="second-title"
        variants={variant}
        initial="hide"
        animate="show"
        exit="exit"
        className={classes.title}
      >
        {title}
      </motion.h2>
      {children}
    </div>
  );
};

export default DashboardSectionWrapper;

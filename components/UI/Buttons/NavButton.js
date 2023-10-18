import React from "react";
import { motion } from "framer-motion";
import classes from "./NavButton.module.css";

const NavButton = ({ title, onClick, isSelected = false }) => {
  const backgroundColor = "rgb(20, 128, 118)";
  return (
    <motion.button
      animate={isSelected ? { backgroundColor: backgroundColor } : {}}
      className={classes.button}
      onClick={() => onClick()}
      whileTap={{ backgroundColor }}
      transition={{ duration: 0.3 }}
    >
      {title}
    </motion.button>
  );
};

export default NavButton;

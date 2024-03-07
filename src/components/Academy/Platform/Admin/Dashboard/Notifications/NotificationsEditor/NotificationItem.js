import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import classes from "./NotificationItem.module.css";

const NotificationItem = ({ data }) => {
  const { message, createdAt } = data;
  const date = new Date(createdAt);
  const dateString = `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
  return (
    <motion.li layout className={classes.container}>
      <p className={classes.title}>{message}</p>
      <p>{dateString}</p>
    </motion.li>
  );
};

export default NotificationItem;

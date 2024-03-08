import React, { useEffect } from "react";
import classes from "./NotificationItem.module.css";
import { motion } from "framer-motion";

const NotificationItem = ({ data, variant }) => {
  const { message, classroomName, teacher, createdAt, _id } = data;
  const date = new Date(createdAt);
  const dateString = `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
  return (
    <motion.li
      key={_id}
      variants={variant}
      initial="hide"
      animate="show"
      exit="exit"
      className={classes.container}
    >
      <div className={classes.body}>
        <p>{message}</p>
      </div>
      <div className={classes.footer}>
        <p>{classroomName}</p>
        <p>Prof. {teacher}</p>
        <p>{dateString}</p>
      </div>
    </motion.li>
  );
};

export default NotificationItem;

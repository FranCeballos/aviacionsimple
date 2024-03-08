import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import ClassroomList from "./ClassroomList/ClassroomList";
import NotificationsEditor from "./NotificationsEditor/NotificationsEditor";
import classes from "./NotificationsDashboard.module.css";

const NotificationDashboard = ({ keyName }) => {
  return (
    <motion.div
      layout
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
      <AnimatePresence mode="popLayout">
        <ClassroomList />
        <NotificationsEditor />
      </AnimatePresence>
    </motion.div>
  );
};

export default NotificationDashboard;

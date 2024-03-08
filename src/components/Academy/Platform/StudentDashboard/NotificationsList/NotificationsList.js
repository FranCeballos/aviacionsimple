import React, { useEffect } from "react";
import { useLazyGetNotificationsQuery } from "@/src/store/services/students/platformStudentsApi";
import { AnimatePresence, motion } from "framer-motion";

import NotificationItem from "./NotificationItem";
import TripleSpinner from "@/src/components/UI/AnimatedComponents/loaders/TripleSpinner";
import classes from "./NotificationsList.module.css";

const NotificationsList = ({ variant }) => {
  const [getNotifications, { data, isLoading, isFetching }] =
    useLazyGetNotificationsQuery();
  const notifications = data?.notifications;

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <motion.ul
      className={classes.container}
      variants={variant}
      initial="hide"
      animate="show"
      exit="exit"
    >
      <AnimatePresence mode="wait">
        {isLoading || isFetching ? (
          <motion.div
            className={classes["loader__container"]}
            variants={variant}
            initial="hide"
            animate="show"
            exit="exit"
            key="loader"
          >
            <TripleSpinner />
          </motion.div>
        ) : notifications?.length > 0 ? (
          notifications.map((not) => (
            <NotificationItem variant={variant} key={not._id} data={not} />
          ))
        ) : (
          notifications && <p>No hay notificaciones</p>
        )}
      </AnimatePresence>
    </motion.ul>
  );
};

export default NotificationsList;

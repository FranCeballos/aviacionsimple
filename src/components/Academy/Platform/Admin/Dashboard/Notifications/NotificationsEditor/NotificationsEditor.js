import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import {
  useLazyGetNotificationsByClassroomIdQuery,
  usePostNotificationMutation,
} from "@/src/store/services/admin/adminNotificationsApi";
import { useSession } from "next-auth/react";

import TripleSpinner from "@/src/components/UI/AnimatedComponents/loaders/TripleSpinner";
import NotificationItem from "./NotificationItem";
import ConfirmButton from "@/src/components/UI/Buttons/ConfirmButton";
import TextArea from "@/src/components/UI/Forms/Inputs/TextArea";
import classes from "./NotificationsEditor.module.css";

const NotificationsEditor = (props) => {
  const { data: userData } = useSession();
  const {
    query: { curso },
  } = useRouter();
  const messageRef = useRef(null);
  const notificationsRef = useRef(null);

  const [
    getNotifications,
    { data: notificationsData, isLoading: notificationsAreLoading },
  ] = useLazyGetNotificationsByClassroomIdQuery();
  const [postNotification, { isLoading: postNotificationIsLoading }] =
    usePostNotificationMutation();

  useEffect(() => {
    if (curso) {
      getNotifications(curso);
    }
  }, [curso]);

  const scrollToBottom = () => {
    if (notificationsRef.current) {
      const scrollHeight = notificationsRef.current.scrollHeight;
      notificationsRef.current.scrollTop = scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [notificationsData]);

  const sendMessageHandler = async () => {
    const message = messageRef.current.value.trim();
    if (message && userData?.user?.isAdmin) {
      try {
        await postNotification({
          message,
          classroomId: curso,
        });
        getNotifications(curso);
        messageRef.current.value = "";
      } catch (error) {}
    }
  };

  return (
    <motion.div className={classes.container}>
      <AnimatePresence mode="popLayout">
        {curso && (
          <>
            {notificationsAreLoading && (
              <div key="loader" className={classes.loader}>
                <TripleSpinner />
              </div>
            )}
            {notificationsData?.notifications?.length > 0 &&
            !notificationsAreLoading ? (
              <motion.ul
                key="list"
                className={classes["notifications__container"]}
                ref={notificationsRef}
              >
                <AnimatePresence mode="popLayout">
                  {notificationsData.notifications.map((not) => (
                    <NotificationItem data={not} key={not._id} />
                  ))}
                </AnimatePresence>
              </motion.ul>
            ) : (
              !notificationsAreLoading && (
                <p key="empty" className={classes.empty}>
                  No has enviado notificaciones
                </p>
              )
            )}
            {!notificationsAreLoading && (
              <div className={classes["actions__container"]}>
                <TextArea placeholder="Mensaje" ref={messageRef} />

                {!postNotificationIsLoading ? (
                  <ConfirmButton
                    title="Enviar"
                    style={{ maxWidth: "100px" }}
                    onClick={sendMessageHandler}
                  />
                ) : (
                  <ConfirmButton
                    title="Enviando..."
                    style={{ maxWidth: "100px" }}
                  />
                )}
              </div>
            )}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NotificationsEditor;

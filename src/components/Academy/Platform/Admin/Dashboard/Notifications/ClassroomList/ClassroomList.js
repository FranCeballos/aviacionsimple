// NPM imports
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

// API
import { useGetAllClassroomsQuery } from "@/src/store/services/admin/adminClassroomsApi";

// Components
import PlusCircleIcon from "@/src/components/UI/Icons/PlusCircleIcon";
import XCircleIcon from "@/src/components/UI/Icons/XCircleIcon";
import TripleSpinner from "@/src/components/UI/AnimatedComponents/loaders/TripleSpinner";

import classes from "./ClassroomList.module.css";
import ClassroomItem from "./ClassroomItem";

const ClassroomList = (props) => {
  const {
    query: { curso: classroom },
  } = useRouter();
  const { data, isLoading } = useGetAllClassroomsQuery();

  return (
    <div className={classes.container}>
      <AnimatePresence mode="popLayout">
        <div key="header" className={classes["header__container"]}>
          <h2 className={classes.title}>Notificaciones</h2>
        </div>
        <h3 key="title" className={classes.subtitle}>
          IV Brigada Aérea
        </h3>
        {isLoading && (
          <div key="loader" className={classes.loader}>
            <TripleSpinner />
          </div>
        )}
        {data?.classrooms && data?.classrooms.length > 0 && (
          <motion.ul
            layout
            initial={{ opacity: 0, y: "50px" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            key="classrooms"
            className={classes.list}
          >
            {data.classrooms.map((item) => (
              <ClassroomItem
                key={item.customId}
                data={item}
                selectedClassroom={classroom}
              />
            ))}
          </motion.ul>
        )}
        {data?.classrooms.length === 0 && (
          <motion.p
            transition={{ duration: 0.5, type: "spring" }}
            layout
            className={classes["empty__text"]}
            key="no"
          >
            Creá un curso para comenzar a trabajar
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClassroomList;

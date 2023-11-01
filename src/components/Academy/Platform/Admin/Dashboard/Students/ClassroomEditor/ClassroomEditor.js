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
import AddClassroom from "./AddClassroom";
import TripleSpinner from "@/src/components/UI/AnimatedComponents/loaders/TripleSpinner";

import classes from "./ClassroomEditor.module.css";
import ClassroomItem from "./ClassroomItem";

const ClassroomEditor = (props) => {
  const {
    query: { curso: classroom },
  } = useRouter();
  const { data, isLoading } = useGetAllClassroomsQuery();
  const {
    query: { crear },
  } = useRouter();
  const isCreateMode = crear === "curso";
  return (
    <div className={classes.container}>
      <AnimatePresence mode="popLayout">
        <div key="header" className={classes["header__container"]}>
          <h2 className={classes.title}>Cursos</h2>
          <Link
            href={`/academia/iv-brigada-aerea/admin?vista=alumnos${
              isCreateMode ? "" : "&crear=curso"
            }`}
            scroll={false}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={classes["button__add"]}
            >
              {isCreateMode ? <XCircleIcon /> : <PlusCircleIcon />}
            </motion.div>
          </Link>
        </div>
        <h3 key="title" className={classes.subtitle}>
          IV Brigada Aérea
        </h3>
        {isCreateMode && <AddClassroom keyName="add" />}
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

export default ClassroomEditor;

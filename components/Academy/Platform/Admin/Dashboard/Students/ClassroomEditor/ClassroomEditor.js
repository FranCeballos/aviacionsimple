// NPM imports
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

// API
import { useGetClassroomsQuery } from "@/store/services/classroomsApi";

// Components
import PlusCircleIcon from "@/components/UI/Icons/PlusCircleIcon";
import XCircleIcon from "@/components/UI/Icons/XCircleIcon";
import AddClassroom from "./AddClassroom";
import TripleSpinner from "@/components/UI/AnimatedComponents/loaders/TripleSpinner";

import classes from "./ClassroomEditor.module.css";

const ClassroomEditor = (props) => {
  const { data, isLoading } = useGetClassroomsQuery();
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
        {data?.classrooms && (
          <motion.ul
            layout
            initial={{ opacity: 0, y: "50px" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            key="classrooms"
            className={classes.list}
          >
            {data.classrooms.map((item) => (
              <motion.li
                transition={{ duration: 0.5, type: "spring" }}
                key={item._id}
                whileHover={{
                  backgroundColor: "rgb(20, 128, 118)",
                  color: "#fff",
                }}
                className={classes.item}
              >
                <Link
                  href={`/academia/iv-brigada-aerea/admin?vista=alumnos&curso=${item._id}`}
                  scroll={false}
                  className={classes.link}
                >
                  <p>{`${item.grade} ${item.division}`}</p>
                  <p>{item.year}</p>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClassroomEditor;

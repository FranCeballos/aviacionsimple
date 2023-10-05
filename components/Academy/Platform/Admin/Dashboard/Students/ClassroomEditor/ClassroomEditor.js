import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import PlusCircleIcon from "@/components/UI/Icons/PlusCircleIcon";
import classes from "./ClassroomEditor.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import XCircleIcon from "@/components/UI/Icons/XCircleIcon";
import AddClassroom from "./AddClassroom";

const ClassroomEditor = (props) => {
  const {
    query: { crear },
  } = useRouter();
  const isCreateMode = crear === "curso";
  return (
    <div className={classes.container}>
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          key="header"
          className={classes["header__container"]}
        >
          <h2 className={classes.title}>Cursos</h2>
          <Link
            href={`/academia/iv-brigada-aerea/admin?vista=alumnos${
              isCreateMode ? "" : "&crear=curso"
            }`}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={classes["button__add"]}
            >
              {isCreateMode ? <XCircleIcon /> : <PlusCircleIcon />}
            </motion.div>
          </Link>
        </motion.div>
        {isCreateMode && <AddClassroom />}
        <motion.ul
          layout
          transition={{ duration: 0.5, type: "spring" }}
          key="classrooms"
          className={classes.list}
        >
          <motion.li
            whileHover={{ backgroundColor: "rgb(20, 128, 118)", color: "#fff" }}
            className={classes.item}
          >
            3ro I
          </motion.li>
        </motion.ul>
      </AnimatePresence>
    </div>
  );
};

export default ClassroomEditor;

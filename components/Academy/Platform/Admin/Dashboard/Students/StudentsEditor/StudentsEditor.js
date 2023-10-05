import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import XCircleIcon from "@/components/UI/Icons/XCircleIcon";
import PlusCircleIcon from "@/components/UI/Icons/PlusCircleIcon";
import classes from "./StudentsEditor.module.css";
import AddStudent from "./AddStudent";

const StudentsEditor = (props) => {
  const {
    query: { crear },
  } = useRouter();
  const isCreateMode = crear === "alumno";
  return (
    <motion.div className={classes.container}>
      <AnimatePresence mode="popLayout">
        <div layout key="header" className={classes["header__container"]}>
          <h2 className={classes.title}>Alumnos</h2>
          <Link
            href={`/academia/iv-brigada-aerea/admin?vista=alumnos${
              isCreateMode ? "" : "&crear=alumno"
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
        <h3 className={classes.subtitle}>3ro I</h3>
        {isCreateMode && <AddStudent />}
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
            <p>Pepe Onguito</p>
          </motion.li>
        </motion.ul>
      </AnimatePresence>
    </motion.div>
  );
};

export default StudentsEditor;

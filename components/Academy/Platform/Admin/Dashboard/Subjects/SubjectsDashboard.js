import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

import PlusCircleIcon from "@/components/UI/Icons/PlusCircleIcon";
import XCircleIcon from "@/components/UI/Icons/XCircleIcon";

import classes from "./SubjectsDashboard.module.css";
import SubjectsList from "./SubjectsList/SubjectsList";

const SubjectsDashboard = ({ keyName }) => {
  const {
    query: { crear },
  } = useRouter();
  const isCreateMode = crear === "materia";
  return (
    <motion.div
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
        <div key="header" className={classes["header__container"]}>
          <h2 className={classes.title}>Materias</h2>
          <Link
            href={`/academia/iv-brigada-aerea/admin?vista=materias${
              isCreateMode ? "" : "&crear=materia"
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
        <SubjectsList />
      </AnimatePresence>
    </motion.div>
  );
};

export default SubjectsDashboard;

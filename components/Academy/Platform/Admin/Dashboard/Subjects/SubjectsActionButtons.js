import React, { forwardRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import PlusCircleIcon from "@/components/UI/Icons/PlusCircleIcon";
import XCircleIcon from "@/components/UI/Icons/XCircleIcon";

import classes from "./SubjectsActionButtons.module.css";

const SubjectsActionButtons = forwardRef((props, ref) => {
  const {
    query: { crear },
  } = useRouter();
  const isCreateMode = crear === "materia";
  return (
    <motion.div layout key="action" className={classes.container}>
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
    </motion.div>
  );
});

export default SubjectsActionButtons;

import React, { forwardRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import PlusCircleIcon from "@/src/components/UI/Icons/PlusCircleIcon";
import XCircleIcon from "@/src/components/UI/Icons/XCircleIcon";

import classes from "./NotificationsActionButtons.module.css";
import PencilSquareIcon from "@/src/components/UI/Icons/PencilSquareIcon";

const NotificationsActionButtons = forwardRef((props, ref) => {
  const {
    query: { crear: create, materia: subjectId, modo: mode },
  } = useRouter();
  const isCreateMode = create === "materia";
  const isEditMode = mode === "editar";

  return (
    <motion.div layout key="action" className={classes.container}>
      <h2 className={classes.title}>{subjectId ? "" : "Notificaciones"}</h2>
      {!subjectId && (
        <Link
          href={`/academia/iv-brigada-aerea/admin?vista=materias${
            isCreateMode || subjectId ? "" : "&crear=materia"
          }`}
          scroll={false}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={classes["button__add"]}
          >
            {isCreateMode || subjectId ? <XCircleIcon /> : <PlusCircleIcon />}
          </motion.div>
        </Link>
      )}
      {subjectId && (
        <Link
          href={`/academia/iv-brigada-aerea/admin?vista=materias&materia=${subjectId}${
            isEditMode ? "" : "&modo=editar"
          }`}
          scroll={false}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={classes["button__add"]}
          >
            {isEditMode ? (
              <XCircleIcon />
            ) : (
              <div className={classes["edit-icon__container"]}>
                <PencilSquareIcon />
              </div>
            )}
          </motion.div>
        </Link>
      )}
    </motion.div>
  );
});

export default NotificationsActionButtons;

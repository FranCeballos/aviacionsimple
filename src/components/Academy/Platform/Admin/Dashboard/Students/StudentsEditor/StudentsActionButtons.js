import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import XCircleIcon from "@/src/components/UI/Icons/XCircleIcon";
import PlusCircleIcon from "@/src/components/UI/Icons/PlusCircleIcon";
import classes from "./StudentsActionButtons.module.css";
import ArrowUpOnSquareIcon from "@/src/components/UI/Icons/ArrowUpOnSquareIcon";
import ScaleOnHover from "@/src/components/UI/AnimatedComponents/ScaleOnHover";

const StudentsActionButtons = (props) => {
  const {
    query: { crear, curso, transferir },
  } = useRouter();
  const isCreateMode = crear === "alumno";
  const isTransferMode = transferir === "curso";
  return (
    <motion.div layout className={classes.container}>
      <AnimatePresence mode="popLayout">
        {!isCreateMode && (
          <Link
            layout
            key="transfer"
            href={`/academia/iv-brigada-aerea/admin?vista=alumnos${
              isTransferMode
                ? `&curso=${curso}`
                : `&curso=${curso}&transferir=curso`
            }`}
            scroll={false}
          >
            <ScaleOnHover className={classes["button__transfer"]}>
              {isTransferMode ? <XCircleIcon /> : <ArrowUpOnSquareIcon />}
            </ScaleOnHover>
          </Link>
        )}
        {!isTransferMode && (
          <Link
            layout
            key="add"
            href={`/academia/iv-brigada-aerea/admin?vista=alumnos${
              isCreateMode ? `&curso=${curso}` : `&curso=${curso}&crear=alumno`
            }`}
            scroll={false}
          >
            <ScaleOnHover className={classes["button__add"]}>
              {isCreateMode ? <XCircleIcon /> : <PlusCircleIcon />}
            </ScaleOnHover>
          </Link>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StudentsActionButtons;

import React, { forwardRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLazyGetSubjectsQuery } from "@/src/store/services/students/platformStudentsApi";

import TripleSpinner from "@/src/components/UI/AnimatedComponents/loaders/TripleSpinner";
import SubjectItem from "./SubjectItem";
import classes from "./SubjectsList.module.css";

const SubjectsList = forwardRef(({ variant }, ref) => {
  const [fetchSubjects, result] = useLazyGetSubjectsQuery();
  const { data, isLoading, isFetching } = result;

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <motion.div
      key="list"
      variants={variant}
      initial="hide"
      animate="show"
      exit="exit"
      className={classes.container}
    >
      {isLoading || isFetching ? (
        <motion.div className={classes["loader__container"]}>
          <TripleSpinner />
        </motion.div>
      ) : data?.subjects.length !== 0 ? (
        data?.subjects.map((i) => (
          <SubjectItem
            key={i.customId}
            title={i.title}
            link={`/academia/iv-brigada-aerea/plataforma?materia=${i.customId}`}
          />
        ))
      ) : (
        <p className={classes.empty}>
          No se te ha asignado una materia todavía.
        </p>
      )}
    </motion.div>
  );
});

export default SubjectsList;

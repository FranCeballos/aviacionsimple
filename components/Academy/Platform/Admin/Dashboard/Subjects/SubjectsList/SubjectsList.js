import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { useGetAllSubjectsTitlesQuery } from "@/store/services/subjectsApi";

import TripleSpinner from "@/components/UI/AnimatedComponents/loaders/TripleSpinner";
import SubjectItem from "./SubjectItem";

import classes from "./SubjectsList.module.css";

const SubjectsList = forwardRef((props, ref) => {
  const { data, isLoading, isFetching } = useGetAllSubjectsTitlesQuery();

  return (
    <motion.div
      key="list"
      layout
      initial={{ opacity: 0, y: "50px" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={classes.container}
    >
      {isLoading || isFetching ? (
        <motion.div className={classes["loader__container"]}>
          <TripleSpinner />
        </motion.div>
      ) : data?.subjects.length !== 0 ? (
        data.subjects.map((i) => (
          <SubjectItem
            key={i.customId}
            title={i.title}
            link={`/academia/iv-brigada-aerea/admin?vista=materias&materia=${i.customId}`}
          />
        ))
      ) : (
        <p className={classes.empty}>No hay materias creadas.</p>
      )}
    </motion.div>
  );
});

export default SubjectsList;

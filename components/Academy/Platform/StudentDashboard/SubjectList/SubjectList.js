import React, { forwardRef, useEffect } from "react";
import { motion } from "framer-motion";

import TripleSpinner from "@/components/UI/AnimatedComponents/loaders/TripleSpinner";
import SubjectItem from "../../Admin/Dashboard/Subjects/SubjectsList/SubjectItem";

import classes from "./SubjectsList.module.css";
import { useSession } from "next-auth/react";
import { useLazyGetSubjectsQuery } from "@/store/services/students/platformStudentsApi";

const SubjectsList = forwardRef(({ variant }, ref) => {
  const session = useSession();
  const customStudentId = session.data?.user.customId;
  const [fetchSubjects, result] = useLazyGetSubjectsQuery();
  const { data, isLoading, isFetching } = result;

  useEffect(() => {
    if (customStudentId) {
      fetchSubjects({ customStudentId });
    }
  }, [customStudentId]);

  return (
    <>
      <motion.h2
        key="second-title"
        variants={variant}
        initial="hide"
        animate="show"
        exit="exit"
        className={classes.title}
      >
        Tus materias
      </motion.h2>
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
    </>
  );
});

export default SubjectsList;

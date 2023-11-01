import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { useLazyGetClassroomQuery } from "@/src/store/services/admin/adminClassroomsApi";

import TripleSpinner from "@/src/components/UI/AnimatedComponents/loaders/TripleSpinner";
import StudentsActionButtons from "./StudentsActionButtons";
import StudentsDataList from "./StudentsDataList";

import classes from "./StudentsEditor.module.css";

const StudentsEditor = (props) => {
  const {
    query: { curso },
  } = useRouter();
  const [getClassroom, result] = useLazyGetClassroomQuery();

  const { isLoading, isFetching, data } = result;

  useEffect(() => {
    if (curso) {
      getClassroom({ customId: curso });
    }
  }, [curso]);

  return (
    <motion.div className={classes.container}>
      <AnimatePresence mode="popLayout">
        <div key="header" className={classes["header__container"]}>
          <h2 className={classes.title}>Alumnos</h2>
          {curso && <StudentsActionButtons />}
        </div>
        {(isLoading || isFetching) && (
          <div key="loader" className={classes.loader}>
            <TripleSpinner />
          </div>
        )}
        {result?.isSuccess && !isFetching && <StudentsDataList data={data} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default StudentsEditor;

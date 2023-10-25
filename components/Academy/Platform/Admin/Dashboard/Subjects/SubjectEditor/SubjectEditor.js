import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
  useGetSubjectQuery,
  useLazyGetSubjectQuery,
} from "@/store/services/subjectsApi";
import { motion } from "framer-motion";
import { NotionRenderer } from "react-notion-x";

import TripleSpinner from "@/components/UI/AnimatedComponents/loaders/TripleSpinner";
import CreateSubject from "../CreateSubject/CreateSubject";

import "react-notion-x/src/styles.css";
import classes from "./SubjectEditor.module.css";

const SubjectEditor = (props) => {
  const {
    query: { materia: subjectId, modo: mode },
  } = useRouter();
  const isEditMode = mode === "editar";
  const [fetchData, { data, isLoading, isFetching }] = useLazyGetSubjectQuery();

  useEffect(() => {
    if (subjectId) {
      fetchData({ subjectId });
    }
  }, [subjectId]);

  return (
    <motion.div
      key="editor"
      layout
      initial={{ opacity: 0, y: "50px" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={classes.container}
    >
      {isEditMode && <CreateSubject editMode={true} editData={data?.subject} />}
      {isLoading || isFetching ? (
        <motion.div layout className={classes["loader__container"]}>
          <TripleSpinner />
        </motion.div>
      ) : (
        <motion.div layout className={classes["notion__container"]}>
          {data?.recordMap ? (
            <NotionRenderer recordMap={data.recordMap} fullPage={true} />
          ) : (
            <p className={classes["error-text"]}>
              Es probable que la materia seleccionada no exista o el ID de
              Notion ingresado no sea correcto.
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SubjectEditor;

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
  useGetAllSubjectsTitlesQuery,
  useLazyGetSubjectQuery,
  usePostDeleteSubjectMutation,
} from "@/store/services/admin/adminSubjectsApi";
import { motion } from "framer-motion";
import { NotionRenderer } from "react-notion-x";

import TripleSpinner from "@/components/UI/AnimatedComponents/loaders/TripleSpinner";
import CreateSubject from "../CreateSubject/CreateSubject";

import "react-notion-x/src/styles.css";
import classes from "./SubjectEditor.module.css";
import ConfirmButton from "@/components/UI/Buttons/ConfirmButton";

const SubjectEditor = (props) => {
  const {
    query: { materia: subjectId, modo: mode, confirmar: confirm },
    push,
  } = useRouter();
  const isEditMode = mode === "editar";
  const isDeleteConfirm = confirm === "borrar";
  const [
    fetchData,
    { data, isLoading: getIsLoading, isFetching: getIsFetching },
  ] = useLazyGetSubjectQuery();
  const { refetch } = useGetAllSubjectsTitlesQuery();
  const [deleteSubject, { isLoading: deleteIsLoading }] =
    usePostDeleteSubjectMutation();

  useEffect(() => {
    if (subjectId) {
      fetchData({ subjectId });
    }
  }, [subjectId]);

  const submitDeleteHandler = async () => {
    const { data } = await deleteSubject({ subjectId });

    if (data?.isSuccess) {
      push(`/academia/iv-brigada-aerea/admin?vista=materias`);
      refetch();
    }
  };

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
      {getIsFetching || getIsFetching || deleteIsLoading ? (
        <motion.div layout className={classes["loader__container"]}>
          <TripleSpinner />
        </motion.div>
      ) : (
        <motion.div layout className={classes["notion__container"]}>
          {data?.recordMap ? (
            <>
              <NotionRenderer recordMap={data.recordMap} fullPage={true} />
              <ConfirmButton
                onClick={
                  isDeleteConfirm
                    ? submitDeleteHandler
                    : () =>
                        push(
                          `/academia/iv-brigada-aerea/admin?vista=materias&materia=${subjectId}&confirmar=borrar`,
                          "",
                          { scroll: false }
                        )
                }
                style={{ backgroundColor: "rgb(134, 1, 1)" }}
                title={
                  isDeleteConfirm
                    ? "Confirmar borrar materia"
                    : "Borrar materia"
                }
              />
            </>
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

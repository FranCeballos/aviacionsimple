import React, { forwardRef, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  useGetAllSubjectsTitlesQuery,
  usePostCreateSubjectMutation,
  usePostEditSubjectMutation,
} from "@/store/services/admin/adminSubjectsApi";
import { useRouter } from "next/router";

import Input from "@/components/UI/Forms/Inputs/Input";
import ScaleOnHover from "@/components/UI/AnimatedComponents/ScaleOnHover";
import CheckCircleIcon from "@/components/UI/Icons/CheckCircleIcon";

import classes from "./CreateSubject.module.css";
import CreateDotsLoader from "@/components/UI/AnimatedComponents/loaders/CreateDotsLoader";

const CreateSubject = forwardRef(({ editMode, editData = undefined }, ref) => {
  const titleRef = useRef(null);
  const notionIdRef = useRef(null);
  const classroomRef = useRef(null);

  const {
    query: { materia: subjectId },
    push,
  } = useRouter();

  const [
    createSubject,
    { isLoading: createIsLoading, isError: createIsError, error: createError },
  ] = usePostCreateSubjectMutation();
  const [
    editSubject,
    { isLoading: editIsLoading, isError: editIsError, error: editError },
  ] = usePostEditSubjectMutation();
  const isLoading = createIsLoading || editIsLoading;
  const isError = createIsError || editIsError;

  const { refetch } = useGetAllSubjectsTitlesQuery();

  const setInitialEditValues = () => {
    const subject = editData || {
      title: "",
      notionId: "",
      classrooms: "",
    };
    titleRef.current.value = subject.title;
    notionIdRef.current.value = subject.notionId;
    classroomRef.current.value = subject.gradeNum;
  };

  useEffect(() => {
    if (editMode) {
      setInitialEditValues();
    }
  }, [editData]);

  const submitHandler = async () => {
    const subjectName = titleRef.current.value;
    const notionId = notionIdRef.current.value;
    const classroomValue = parseFloat(classroomRef.current.value);

    if (subjectName && notionId && classroomValue) {
      let isSuccess = false;
      if (editMode) {
        const { data } = await editSubject({
          subjectName,
          notionId,
          classroomValue,
          prevCustomId: subjectId,
        });
        if (data?.isSuccess) {
          isSuccess = true;
        }
      } else {
        const { data } = await createSubject({
          subjectName,
          notionId,
          classroomValue,
        });
        if (data?.isSuccess) {
          isSuccess = true;
        }
      }

      if (isSuccess) {
        push(`/academia/iv-brigada-aerea/admin?vista=materias`, "", {
          scroll: false,
        });
        refetch();
      }
    }
  };

  return (
    <motion.div
      layout
      key="add"
      initial={{ scale: 0.2, opacity: 0, x: "40%", y: "-50px" }}
      animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
      exit={{ scale: 0.2, opacity: 0, x: "40%", y: "-50px" }}
      transition={{ duration: 0.5, type: "spring" }}
      className={classes.container}
      style={editMode ? { marginBottom: 40 } : {}}
    >
      {isLoading ? (
        <CreateDotsLoader />
      ) : (
        <>
          <p className={classes.title}>
            {editMode ? "Editar materia" : "Crear materia"}
          </p>
          <Input placeholder="Nombre" ref={titleRef} />
          <Input placeholder="ID Notion" ref={notionIdRef} />
          <select ref={classroomRef} className={classes.select}>
            <option value="">Curso</option>
            <option value="1">1ro</option>
            <option value="2">2do</option>
            <option value="3">3ro</option>
            <option value="4">4to</option>
            <option value="5">5to</option>
            <option value="6">6to</option>
          </select>
          <ScaleOnHover>
            <button onClick={submitHandler} className={classes.button}>
              <CheckCircleIcon />
            </button>
          </ScaleOnHover>
          {isError && <p>{createError?.data.error || editError?.data.error}</p>}
        </>
      )}
    </motion.div>
  );
});

export default CreateSubject;

import React, { forwardRef, useRef } from "react";
import { motion } from "framer-motion";
import {
  useGetAllSubjectsTitlesQuery,
  usePostCreateSubjectMutation,
} from "@/store/services/subjectsApi";
import { useRouter } from "next/router";

import Input from "@/components/UI/Forms/Inputs/Input";
import ScaleOnHover from "@/components/UI/AnimatedComponents/ScaleOnHover";
import CheckCircleIcon from "@/components/UI/Icons/CheckCircleIcon";

import classes from "./CreateSubject.module.css";
import CreateDotsLoader from "@/components/UI/AnimatedComponents/loaders/CreateDotsLoader";

const CreateSubject = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  const { refetch } = useGetAllSubjectsTitlesQuery();
  const [createSubjet, { isLoading, isError, error }] =
    usePostCreateSubjectMutation();
  const { push } = useRouter();

  console.log(error);

  const submitCreateHandler = async () => {
    const subjectName = inputRef.current.value;
    if (subjectName) {
      const { data } = await createSubjet({ subjectName });

      if (data?.isSuccess) {
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
    >
      {isLoading ? (
        <CreateDotsLoader />
      ) : (
        <>
          <p className={classes.title}>Crear materia</p>
          <Input
            placeholder="Nombre materia"
            ref={inputRef}
            error={isError ? error.data.error : ""}
          />
          <ScaleOnHover>
            <button onClick={submitCreateHandler} className={classes.button}>
              <CheckCircleIcon />
            </button>
          </ScaleOnHover>
        </>
      )}
    </motion.div>
  );
});

export default CreateSubject;

import React, { useRef } from "react";
import { motion } from "framer-motion";
import CheckCircleIcon from "@/components/UI/Icons/CheckCircleIcon";
import classes from "./AddStudent.module.css";
import Input from "@/components/UI/Forms/Inputs/Input";
import { usePostStudentMutation } from "@/store/services/studentsApi";
import { useRouter } from "next/router";
import CreateDotsLoader from "@/components/UI/AnimatedComponents/loaders/CreateDotsLoader";
import { useLazyGetClassroomQuery } from "@/store/services/classroomsApi";
import ScaleOnHover from "@/components/UI/AnimatedComponents/ScaleOnHover";

const AddStudent = (props) => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const [postStudent, result] = usePostStudentMutation();
  const [getClassroom] = useLazyGetClassroomQuery();
  const {
    query: { curso: classroomId },
    push,
  } = useRouter();

  const submitHandler = async () => {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;

    if (firstName && lastName && email) {
      const { data } = await postStudent({
        firstName,
        lastName,
        email,
        classroomId,
      });

      if (data?.isSuccess) {
        push(
          `/academia/iv-brigada-aerea/admin?vista=alumnos&curso=${classroomId}`,
          "",
          { scroll: false }
        );
        getClassroom({ customId: classroomId });
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
      {result.isLoading ? (
        <CreateDotsLoader />
      ) : (
        <>
          <p className={classes.title}>Añadir alumno</p>
          <Input
            ref={firstNameRef}
            containerStyle={{}}
            type="text"
            placeholder="Nombre"
          />
          <Input ref={lastNameRef} type="text" placeholder="Apellido" />
          <Input ref={emailRef} type="email" placeholder="Email" />
          <ScaleOnHover>
            <button onClick={submitHandler} className={classes.button}>
              <CheckCircleIcon />
            </button>
          </ScaleOnHover>
        </>
      )}
    </motion.div>
  );
};

export default AddStudent;

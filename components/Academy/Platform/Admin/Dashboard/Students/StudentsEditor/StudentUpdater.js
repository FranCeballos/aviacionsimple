import React, { useEffect, useRef } from "react";
import classes from "./StudentUpdater.module.css";
import Input from "@/components/UI/Forms/Inputs/Input";
import ConfirmButton from "@/components/UI/Buttons/ConfirmButton";
import { usePatchStudentMutation } from "@/store/services/studentsApi";
import { useRouter } from "next/router";
import { useLazyGetClassroomQuery } from "@/store/services/classroomsApi";
import CreateDotsLoader from "@/components/UI/AnimatedComponents/loaders/CreateDotsLoader";

const StudentUpdater = ({ data }) => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const {
    query: { alumno: studentId, curso: classroomId },
    push,
  } = useRouter();
  const [trigger] = useLazyGetClassroomQuery();
  const [patchStudent, { isLoading }] = usePatchStudentMutation();

  console.log(isLoading);

  const setInitialValues = () => {
    firstNameRef.current.value = data.firstName;
    lastNameRef.current.value = data.lastName;
    emailRef.current.value = data.email;
  };

  useEffect(() => {
    setInitialValues();
  }, []);

  const submitHandler = async () => {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;

    if (firstName && lastName && email) {
      const { data } = await patchStudent({
        firstName,
        lastName,
        email,
        studentId,
      });

      if (data.isSuccess) {
        push(
          `/academia/iv-brigada-aerea/admin?vista=alumnos&curso=${classroomId}`,
          "",
          { scroll: false }
        );
        trigger({ customId: classroomId });
      }
    }
  };

  return (
    <div className={classes.container}>
      {isLoading ? (
        <CreateDotsLoader />
      ) : (
        <>
          <p className={classes.title}>Editar</p>
          <Input
            ref={firstNameRef}
            placeholder="Nombre"
            initialValue={data.firstName}
          />
          <Input
            ref={lastNameRef}
            placeholder="Apellido"
            initialValue={data.lastName}
          />
          <Input ref={emailRef} placeholder="Email" initialValue={data.email} />
          <ConfirmButton
            onClick={submitHandler}
            style={{ backgroundColor: "rgb(20, 128, 118)", marginTop: "10px" }}
            title="Actualizar"
          />
        </>
      )}
    </div>
  );
};

export default StudentUpdater;

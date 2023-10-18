import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useLazyGetClassroomQuery } from "@/store/services/classroomsApi";
import { usePatchStudentMutation } from "@/store/services/studentsApi";
import Input from "@/components/UI/Forms/Inputs/Input";
import ConfirmButton from "@/components/UI/Buttons/ConfirmButton";
import CreateDotsLoader from "@/components/UI/AnimatedComponents/loaders/CreateDotsLoader";

const StudentEditForm = ({ data }) => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const {
    query: { alumno: studentId, curso: classroomId, modo: mode },
    push,
  } = useRouter();
  const [trigger] = useLazyGetClassroomQuery();
  const [patchStudent, { isLoading }] = usePatchStudentMutation();

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
  return isLoading ? (
    <CreateDotsLoader />
  ) : (
    <>
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
  );
};

export default StudentEditForm;

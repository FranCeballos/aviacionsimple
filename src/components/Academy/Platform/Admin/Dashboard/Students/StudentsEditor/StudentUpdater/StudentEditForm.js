import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useLazyGetClassroomQuery } from "@/src/store/services/admin/adminClassroomsApi";
import {
  usePatchStudentMutation,
  usePostResetPasswordMutation,
} from "@/src/store/services/admin/adminStudentsApi";

import Input from "@/src/components/UI/Forms/Inputs/Input";
import ConfirmButton from "@/src/components/UI/Buttons/ConfirmButton";
import CreateDotsLoader from "@/src/components/UI/AnimatedComponents/loaders/CreateDotsLoader";

const StudentEditForm = ({ data }) => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const {
    query: { alumno: studentId, curso: classroomId, confirmar: confirmAction },
    push,
  } = useRouter();
  const isConfirmAction = confirmAction === "reiniciarContraseña";
  const [trigger] = useLazyGetClassroomQuery();
  const [patchStudent, { isLoading: updateIsLoading }] =
    usePatchStudentMutation();
  const [resetPassword, { isLoading: resetPasswordIsLoading }] =
    usePostResetPasswordMutation();

  const setInitialValues = () => {
    firstNameRef.current.value = data.firstName;
    lastNameRef.current.value = data.lastName;
    emailRef.current.value = data.email;
  };

  useEffect(() => {
    setInitialValues();
  }, []);

  const submitUpdateHandler = async () => {
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

      if (data?.isSuccess) {
        push(
          `/academia/iv-brigada-aerea/admin?vista=alumnos&curso=${classroomId}`,
          "",
          { scroll: false }
        );
        trigger({ customId: classroomId });
      }
    }
  };

  const submitResetPassword = async () => {
    const { data } = await resetPassword({ studentId });

    if (data?.isSuccess) {
      push(
        `/academia/iv-brigada-aerea/admin?vista=alumnos&curso=${classroomId}`,
        "",
        { scroll: false }
      );
      trigger({ customId: classroomId });
    }
  };

  return updateIsLoading || resetPasswordIsLoading ? (
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
      {isConfirmAction ? (
        <ConfirmButton
          title="Confirmar reinicio"
          onClick={submitResetPassword}
          style={{ backgroundColor: "rgb(134, 1, 1)", marginTop: "10px" }}
        />
      ) : (
        <ConfirmButton
          title="Reiniciar contraseña"
          onClick={() =>
            push(
              `/academia/iv-brigada-aerea/admin?vista=alumnos&curso=${classroomId}&alumno=${studentId}&modo=editar&confirmar=reiniciarContraseña`,
              "",
              { scroll: false }
            )
          }
          style={{ backgroundColor: "#113946", marginTop: "10px" }}
        />
      )}
      <ConfirmButton
        onClick={submitUpdateHandler}
        style={{ backgroundColor: "rgb(20, 128, 118)", marginTop: "10px" }}
        title="Actualizar"
      />
    </>
  );
};

export default StudentEditForm;

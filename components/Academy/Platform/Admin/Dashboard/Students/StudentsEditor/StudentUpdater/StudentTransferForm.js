import React, { useRef } from "react";
import {
  useGetAllClassroomsQuery,
  useLazyGetClassroomQuery,
} from "@/store/services/admin/adminClassroomsApi";
import ConfirmButton from "@/components/UI/Buttons/ConfirmButton";
import classes from "./StudentTransferForm.module.css";
import {
  useCopyStudentToClassroomMutation,
  usePostDeleteStudentMutation,
  useTransferStudentMutation,
} from "@/store/services/admin/adminStudentsApi";
import { useRouter } from "next/router";
import TransferDotsLoader from "@/components/UI/AnimatedComponents/loaders/TransferDotsLoader";

const StudentTransferForm = (props) => {
  const selectRef = useRef(null);
  const { data } = useGetAllClassroomsQuery();
  const [getClassroom] = useLazyGetClassroomQuery();
  const [transferStudent, { isLoading: transferIsLoading }] =
    useTransferStudentMutation();
  const [deleteStudent, { isLoading: deletionIsLoading }] =
    usePostDeleteStudentMutation();
  const [copyStudent, { isLoading: copyIsLoading }] =
    useCopyStudentToClassroomMutation();
  const {
    query: {
      curso: prevClassroomId,
      alumno: studentId,
      confirmar: confirmAction,
    },
    push,
  } = useRouter();
  const isConfirmDeleteAction = confirmAction === "borrarAlumno";

  const filteredData = data?.classrooms?.filter(
    (i) => i.customId !== prevClassroomId
  );

  const submitTransferHandler = async () => {
    const nextClassroomId = selectRef.current.value;
    if (nextClassroomId) {
      const { data: responseData } = await transferStudent({
        prevClassroomId,
        studentId,
        nextClassroomId,
      });
      if (responseData?.isSuccess) {
        push(
          `/academia/iv-brigada-aerea/admin?vista=alumnos&curso=${prevClassroomId}`,
          "",
          { scroll: false }
        );
        getClassroom({ customId: prevClassroomId });
      }
    }
  };

  const submitDeleteHandler = async () => {
    const { data: deleteResult } = await deleteStudent({
      studentId,
      classroomId: prevClassroomId,
    });

    if (deleteResult?.isSuccess) {
      push(
        `/academia/iv-brigada-aerea/admin?vista=alumnos&curso=${prevClassroomId}`,
        "",
        { scroll: false }
      );
      getClassroom({ customId: prevClassroomId });
    }
  };

  const submitCopyHandler = async () => {
    const nextClassroomId = selectRef.current.value;
    if (nextClassroomId) {
      const { data: copyResult } = await copyStudent({
        studentCustomId: studentId,
        prevClassroomId,
        nextClassroomId,
      });

      if (copyResult?.isSuccess) {
        push(
          `/academia/iv-brigada-aerea/admin?vista=alumnos&curso=${prevClassroomId}`,
          "",
          { scroll: false }
        );
        getClassroom({ customId: prevClassroomId });
      }
    }
  };

  return (
    <>
      {transferIsLoading || deletionIsLoading || copyIsLoading ? (
        <TransferDotsLoader />
      ) : (
        <div className={classes.container}>
          <select ref={selectRef} className={classes.select}>
            <option value="">Seleccionar curso</option>
            {filteredData?.map((item) => (
              <option key={item.customId} value={item.customId}>
                {item.grade} {item.division} {item.year}
              </option>
            ))}
          </select>
          {isConfirmDeleteAction ? (
            <ConfirmButton
              onClick={submitDeleteHandler}
              style={{
                backgroundColor: "rgb(134, 1, 1)",
                marginTop: "10px",
              }}
              title="Confirmar Borrar"
            />
          ) : (
            <ConfirmButton
              onClick={() =>
                push(
                  `/academia/iv-brigada-aerea/admin?vista=alumnos&curso=${prevClassroomId}&alumno=${studentId}&modo=transferir&confirmar=borrarAlumno`,
                  "",
                  { scroll: false }
                )
              }
              style={{
                backgroundColor: "rgb(134, 1, 1)",
                marginTop: "10px",
              }}
              title="Borrar alumno"
            />
          )}
          <ConfirmButton
            onClick={submitCopyHandler}
            style={{ backgroundColor: "#113946", marginTop: "10px" }}
            title="Añadir a curso"
          />
          <ConfirmButton
            onClick={submitTransferHandler}
            style={{ backgroundColor: "rgb(20, 128, 118)", marginTop: "10px" }}
            title="Transferir"
          />
        </div>
      )}
    </>
  );
};

export default StudentTransferForm;

import React, { useRef } from "react";
import {
  useGetAllClassroomsQuery,
  useLazyGetClassroomQuery,
} from "@/store/services/classroomsApi";
import ConfirmButton from "@/components/UI/Buttons/ConfirmButton";
import classes from "./StudentTransferForm.module.css";
import { useTransferStudentMutation } from "@/store/services/studentsApi";
import { useRouter } from "next/router";
import TransferDotsLoader from "@/components/UI/AnimatedComponents/loaders/TransferDotsLoader";

const StudentTransferForm = (props) => {
  const selectRef = useRef(null);
  const { data } = useGetAllClassroomsQuery();
  const [getClassroom] = useLazyGetClassroomQuery();
  const [transferStudent, transferResult] = useTransferStudentMutation();
  const {
    query: { curso: prevClassroomId, alumno: studentId },
    push,
  } = useRouter();
  const filteredData = data.classrooms?.filter(
    (i) => i.customId !== prevClassroomId
  );

  const submitHandler = async () => {
    const nextClassroomId = selectRef.current.value;
    if (nextClassroomId) {
      const { data: responseData } = await transferStudent({
        prevClassroomId,
        studentId,
        nextClassroomId,
      });
      if (responseData.isSuccess) {
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
      {transferResult.isLoading ? (
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
          <ConfirmButton
            onClick={submitHandler}
            style={{ backgroundColor: "rgb(20, 128, 118)", marginTop: "10px" }}
            title="Transferir"
          />
        </div>
      )}
    </>
  );
};

export default StudentTransferForm;

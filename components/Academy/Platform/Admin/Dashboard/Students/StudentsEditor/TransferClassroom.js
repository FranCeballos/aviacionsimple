import React, { useRef } from "react";
import classes from "./TransferClassroom.module.css";
import CheckCircleIcon from "@/components/UI/Icons/CheckCircleIcon";
import ScaleOnHover from "@/components/UI/AnimatedComponents/ScaleOnHover";
import {
  useGetAllClassroomsQuery,
  useTransferClassroomMutation,
} from "@/store/services/classroomsApi";
import { useRouter } from "next/router";
import TransferDotsLoader from "@/components/UI/AnimatedComponents/loaders/TransferDotsLoader";

const TransferClassroom = (props) => {
  const selectRef = useRef(null);
  const { data } = useGetAllClassroomsQuery();
  const {
    query: { curso: classroomId },
    push,
  } = useRouter();
  const filteredData = data?.classrooms.filter(
    (i) => i.customId !== classroomId
  );

  const [transferClassroom, result] = useTransferClassroomMutation();

  const submitHandler = async () => {
    const selectValue = selectRef.current.value;

    if (selectValue && classroomId) {
      const { data } = await transferClassroom({
        prevClassroomId: classroomId,
        nextClassroomId: selectValue,
      });

      if (data?.isSuccess) {
        push(
          `/academia/iv-brigada-aerea/admin?vista=alumnos&curso=${selectValue}`,
          "",
          { scroll: false }
        );
      }
    }
  };

  return (
    <div className={classes.container}>
      <p className={classes.title}>Transferir curso</p>
      {result.isLoading && <TransferDotsLoader />}
      {data?.classrooms && !result.isLoading && (
        <>
          <select ref={selectRef} className={classes.select}>
            <option value="">Curso destino</option>
            {filteredData.map((item) => (
              <option key={item.customId} value={item.customId}>
                {item.grade} {item.division} {item.year}
              </option>
            ))}
          </select>
          <ScaleOnHover className={classes.button}>
            <button onClick={submitHandler} className={classes.button}>
              <CheckCircleIcon />
            </button>
          </ScaleOnHover>
        </>
      )}
    </div>
  );
};

export default TransferClassroom;

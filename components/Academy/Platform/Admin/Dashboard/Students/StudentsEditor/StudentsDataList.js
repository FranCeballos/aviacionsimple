import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import StudentItem from "./StudentItem";
import AddStudent from "./AddStudent";
import classes from "./StudentsDataList.module.css";
import TransferClassroom from "./TransferClassroom";

const StudentsDataList = ({ data }) => {
  const {
    query: { curso, crear, alumno, transferir },
  } = useRouter();
  const isCreateMode = crear === "alumno";
  const isTransferMode = transferir === "curso";
  const classroomTitle = data.classroom
    ? `${data.classroom.grade} ${data.classroom.division} ${data.classroom.year}`
    : `El curso seleccionado no existe`;
  return (
    <>
      <motion.h3 className={classes.subtitle}>{classroomTitle}</motion.h3>
      {isCreateMode && <AddStudent />}
      {isTransferMode && <TransferClassroom />}
      {data?.classroom?.students.length !== 0 ? (
        <motion.ul
          layout
          initial={{ opacity: 0, y: "50px" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          key="classrooms"
          className={classes.list}
        >
          {data?.classroom?.studentsData.map((student) => (
            <StudentItem
              key={student._id}
              data={student}
              selectedStudent={alumno}
              classroomCustomId={data.classroom.customId}
            />
          ))}
        </motion.ul>
      ) : (
        <p className={classes["empty__text"]}>No hay alumnos en este curso.</p>
      )}
    </>
  );
};

export default StudentsDataList;

import React from "react";
import classes from "./StudentUpdater.module.css";
import { usePatchStudentMutation } from "@/src/store/services/admin/adminStudentsApi";
import CreateDotsLoader from "@/src/components/UI/AnimatedComponents/loaders/CreateDotsLoader";
import NavButton from "@/src/components/UI/Buttons/NavButton";
import { useRouter } from "next/router";
import StudentEditForm from "./StudentEditForm";
import StudentTransferForm from "./StudentTransferForm";

const StudentUpdater = ({ data }) => {
  const {
    query: { modo: mode, curso: classroomId, alumno: studentId },
    push,
  } = useRouter();
  const [_, { isLoading }] = usePatchStudentMutation();

  const modeView = {
    editar: <StudentEditForm data={data} />,
    transferir: <StudentTransferForm />,
  };
  return (
    <div className={classes.container}>
      <div className={classes["nav__container"]}>
        <NavButton
          title="Editar"
          className={classes.title}
          onClick={() =>
            push(
              `/academia/iv-brigada-aerea/admin?vista=alumnos&curso=${classroomId}&alumno=${studentId}&modo=editar`,
              "",
              { scroll: false }
            )
          }
          isSelected={mode === "editar"}
        />
        <NavButton
          title="Transferir"
          className={classes.title}
          onClick={() =>
            push(
              `/academia/iv-brigada-aerea/admin?vista=alumnos&curso=${classroomId}&alumno=${studentId}&modo=transferir`,
              "",
              { scroll: false }
            )
          }
          isSelected={mode === "transferir"}
        />
      </div>
      {modeView[mode]}
    </div>
  );
};

export default StudentUpdater;

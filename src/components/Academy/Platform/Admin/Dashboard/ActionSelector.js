import React from "react";
import Action from "./Action";
import classes from "./ActionSelector.module.css";
import UsersIcon from "@/src/components/UI/Icons/UsersIcon";
import BookIcon from "@/src/components/UI/Icons/BookIcon";
import { useRouter } from "next/router";

const ActionSelector = (props) => {
  const {
    query: { vista },
  } = useRouter();
  return (
    <div className={classes.container}>
      <Action
        title="Alumnos y Cursos"
        link="/academia/iv-brigada-aerea/admin?vista=alumnos"
        icon={<UsersIcon />}
        isActive={vista === "alumnos"}
      />
      <Action
        title="Materias"
        link="/academia/iv-brigada-aerea/admin?vista=materias"
        icon={<BookIcon />}
        isActive={vista === "materias"}
      />
    </div>
  );
};

export default ActionSelector;

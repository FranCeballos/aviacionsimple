import React from "react";
import { useRouter } from "next/router";

import Action from "./Action";
import { HiUsers } from "react-icons/hi2";
import { FaBookOpen } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import classes from "./ActionSelector.module.css";

const ActionSelector = (props) => {
  const {
    query: { vista },
  } = useRouter();
  return (
    <div className={classes.container}>
      <Action
        title="Alumnos y Cursos"
        link="/academia/iv-brigada-aerea/admin?vista=alumnos"
        icon={<HiUsers size={25} color="" />}
        isActive={vista === "alumnos"}
      />
      <Action
        title="Materias"
        link="/academia/iv-brigada-aerea/admin?vista=materias"
        icon={<FaBookOpen size={25} color="" />}
        isActive={vista === "materias"}
      />
      <Action
        title="Notificaciones"
        link="/academia/iv-brigada-aerea/admin?vista=notificaciones"
        icon={<IoNotifications size={25} color="" />}
        isActive={vista === "notificaciones"}
      />
    </div>
  );
};

export default ActionSelector;

import React from "react";
import classes from "./Dashboard.module.css";
import ActionSelector from "./ActionSelector";
import { useRouter } from "next/router";
const Dashboard = (props) => {
  const {
    query: { vista },
  } = useRouter();
  const dashboardContent = {
    alumnos: "alumnos",
    materias: "materias",
  };
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Dashboard</h1>
      <ActionSelector />
      {dashboardContent[vista]}
    </div>
  );
};

export default Dashboard;

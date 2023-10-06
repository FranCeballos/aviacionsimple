import React from "react";
import classes from "./Dashboard.module.css";
import ActionSelector from "./ActionSelector";
import { useRouter } from "next/router";
import StudentsDashboard from "./Students/StudentsDashboard";
import { AnimatePresence } from "framer-motion";
import SubjectsDashboard from "./Subjects/SubjectsDashboard";
const Dashboard = (props) => {
  const {
    query: { vista },
  } = useRouter();
  const dashboardContent = {
    alumnos: <StudentsDashboard keyName="students" />,
    materias: <SubjectsDashboard keyName="subjects" />,
  };
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Dashboard</h1>
      <ActionSelector />
      <AnimatePresence mode="wait">{dashboardContent[vista]}</AnimatePresence>
    </div>
  );
};

export default Dashboard;

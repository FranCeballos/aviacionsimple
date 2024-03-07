import React from "react";
import classes from "./Dashboard.module.css";
import ActionSelector from "./ActionSelector";
import { useRouter } from "next/router";
import StudentsDashboard from "./Students/StudentsDashboard";
import { AnimatePresence } from "framer-motion";
import SubjectsDashboard from "./Subjects/SubjectsDashboard";
import NotificationDashboard from "./Notifications/NotificationsDashboard";

const Dashboard = (props) => {
  const {
    query: { vista },
  } = useRouter();
  const dashboardContent = {
    alumnos: <StudentsDashboard keyName="students" />,
    materias: <SubjectsDashboard keyName="subjects" />,
    notificaciones: <NotificationDashboard keyName="notifications" />,
  };
  return (
    <div className={classes.container}>
      <AnimatePresence mode="wait">
        {vista ? (
          dashboardContent[vista]
        ) : (
          <div className={classes["actions__container"]}>
            <h1 className={classes.title}>¿Qué deseas administrar?</h1>
            <ActionSelector />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;

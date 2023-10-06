import React from "react";
import { motion } from "framer-motion";
import classes from "./StudentsDashboard.module.css";
import ClassroomEditor from "./ClassroomEditor/ClassroomEditor";
import StudentsEditor from "./StudentsEditor/StudentsEditor";

const StudentsDashboard = ({ keyName }) => {
  return (
    <motion.div
      key={keyName}
      initial={{ x: "-50vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.75, type: "spring" }}
      exit={{
        x: "-50vw",
        opacity: 0,
      }}
      className={classes.container}
    >
      <ClassroomEditor />
      <StudentsEditor />
    </motion.div>
  );
};

export default StudentsDashboard;

import React from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

import SubjectsList from "./SubjectList/SubjectList";
import SubjectViewer from "./SubjectViewer/SubjectViewer";

import classes from "./StudentDashboard.module.css";

const viewVariants = {
  hide: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const StudentDashboard = (props) => {
  const session = useSession();
  const fullName = session.data?.user?.fullName;
  const {
    query: { materia: subjectId },
  } = useRouter();
  return (
    <div className={classes.container}>
      <AnimatePresence mode="wait">
        {!subjectId && (
          <motion.h1
            key="title"
            variants={viewVariants}
            initial="hide"
            animate="show"
            exit="exit"
            className={classes.title}
          >
            Hola, {fullName}.
          </motion.h1>
        )}
        {!subjectId && <SubjectsList variant={viewVariants} />}
        {subjectId && <SubjectViewer variant={viewVariants} />}
      </AnimatePresence>
    </div>
  );
};

export default StudentDashboard;

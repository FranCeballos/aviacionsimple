import React from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

import SubjectsList from "./SubjectsList/SubjectsList";
import SubjectsActionButtons from "./SubjectsActionButtons";
import CreateSubject from "./CreateSubject/CreateSubject";
import SubjectEditor from "./SubjectEditor/SubjectEditor";

import classes from "./SubjectsDashboard.module.css";

const SubjectsDashboard = ({ keyName }) => {
  const {
    query: { crear, materia: subjectId },
  } = useRouter();
  const isCreateMode = crear === "materia";

  return (
    <motion.div
      layout
      key={keyName}
      initial={{ x: "50vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.75, type: "spring" }}
      exit={{
        x: "50vw",
        opacity: 0,
      }}
      className={classes.container}
    >
      <AnimatePresence mode="popLayout">
        <SubjectsActionButtons key="action" />
        {isCreateMode && <CreateSubject key="create" />}
        {!subjectId && <SubjectsList key="list" />}
        {subjectId && <SubjectEditor />}
      </AnimatePresence>
    </motion.div>
  );
};

export default SubjectsDashboard;

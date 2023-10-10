import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import XCircleIcon from "@/components/UI/Icons/XCircleIcon";
import PlusCircleIcon from "@/components/UI/Icons/PlusCircleIcon";
import classes from "./StudentsEditor.module.css";
import AddStudent from "./AddStudent";
import { useLazyGetClassroomQuery } from "@/store/services/classroomsApi";
import TripleSpinner from "@/components/UI/AnimatedComponents/loaders/TripleSpinner";
import StudentItem from "./StudentItem";

const StudentsEditor = (props) => {
  const {
    query: { crear, curso, alumno },
  } = useRouter();
  const isCreateMode = crear === "alumno";
  const [getClassroom, result] = useLazyGetClassroomQuery();

  const { isLoading, isFetching, data } = result;

  useEffect(() => {
    if (curso) {
      getClassroom({ customId: curso });
    }
  }, [curso]);

  return (
    <motion.div className={classes.container}>
      <AnimatePresence mode="popLayout">
        <div key="header" className={classes["header__container"]}>
          <h2 className={classes.title}>Alumnos</h2>
          <Link
            href={`/academia/iv-brigada-aerea/admin?vista=alumnos${
              isCreateMode ? `&curso=${curso}` : `&curso=${curso}&crear=alumno`
            }`}
            scroll={false}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={classes["button__add"]}
            >
              {isCreateMode ? <XCircleIcon /> : <PlusCircleIcon />}
            </motion.div>
          </Link>
        </div>
        {isLoading ||
          (isFetching && (
            <div key="loader" className={classes.loader}>
              <TripleSpinner />
            </div>
          ))}
        {result.isSuccess && !isFetching && (
          <>
            <motion.h3 className={classes.subtitle}>
              {data.classroom.grade} {data.classroom.division}{" "}
              {data.classroom.year}
            </motion.h3>
            {isCreateMode && <AddStudent />}
            <motion.ul
              layout
              initial={{ opacity: 0, y: "50px" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              key="classrooms"
              className={classes.list}
            >
              {data.classroom.studentsData.map((student) => (
                <StudentItem
                  key={student._id}
                  data={student}
                  selectedStudent={alumno}
                  classroomCustomId={data.classroom.customId}
                />
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StudentsEditor;

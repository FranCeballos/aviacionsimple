import React, { useRef } from "react";
import { motion } from "framer-motion";

import CheckCircleIcon from "@/components/UI/Icons/CheckCircleIcon";

import classes from "./AddClassroom.module.css";
import {
  useGetClassroomsQuery,
  usePostClassroomMutation,
} from "@/store/services/classroomsApi";
import { useRouter } from "next/router";

const AddClassroom = ({ keyName }) => {
  const router = useRouter();
  const { data, refetch } = useGetClassroomsQuery();
  const [postClassroom, result] = usePostClassroomMutation();
  const gradeRef = useRef();
  const divisionRef = useRef();
  const yearRef = useRef();

  const submitHandler = async () => {
    const grade = gradeRef.current.value;
    const division = divisionRef.current.value;
    const year = yearRef.current.value;
    if (grade && division && year) {
      await postClassroom({ grade, division, year });
    }
  };

  if (result.isSuccess) {
    router.push("/academia/iv-brigada-aerea/admin?vista=alumnos", "", {
      scroll: false,
    });
    refetch();
  }
  console.log(result);

  return (
    <motion.div
      layout
      key={keyName}
      initial={{ scale: 0.2, opacity: 0, x: "40%", y: "-50px" }}
      animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
      exit={{ scale: 0.2, opacity: 0, x: "40%", y: "-50px" }}
      transition={{ duration: 0.5, type: "spring" }}
      className={classes.container}
    >
      {result.isLoading ? (
        <div className={classes.loader}></div>
      ) : (
        <>
          <select
            required
            ref={gradeRef}
            name="Curso"
            className={classes.select}
          >
            <option value="">Curso</option>
            <option value="1ro">1ro</option>
            <option value="2do">2do</option>
            <option value="3ro">3ro</option>
            <option value="4to">4to</option>
            <option value="5to">5to</option>
            <option value="6to">6to</option>
          </select>
          <select required ref={divisionRef} className={classes.select}>
            <option value="">División</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
          </select>
          <select required ref={yearRef} className={classes.select}>
            <option value="">Año</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2030">2030</option>
            <option value="2031">2031</option>
            <option value="2032">2032</option>
            <option value="2033">2033</option>
            <option value="2034">2034</option>
            <option value="2035">2035</option>
            <option value="2036">2036</option>
          </select>
          <motion.button
            onClick={submitHandler}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={classes.button}
          >
            <CheckCircleIcon />
          </motion.button>
          {result.isError && (
            <p className={classes.error}>{result.error.data.error}</p>
          )}
        </>
      )}
    </motion.div>
  );
};

export default AddClassroom;

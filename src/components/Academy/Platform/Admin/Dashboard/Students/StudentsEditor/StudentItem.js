import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import classes from "./StudentItem.module.css";
import useDimension from "@/src/hooks/use-dimension";
import StudentUpdater from "./StudentUpdater/StudentUpdater";

const StudentItem = ({ data, selectedStudent, classroomCustomId }) => {
  const isSelected = selectedStudent === data.customId;
  const { width } = useDimension();
  return (
    <motion.li
      animate={
        isSelected
          ? {
              backgroundColor: "rgb(20, 128, 118)",
              color: "#fff",
            }
          : {}
      }
      transition={{ duration: 0.5, type: "spring" }}
      key={data._id}
      whileHover={
        width > 768
          ? {
              backgroundColor: "rgb(20, 128, 118)",
              color: "#fff",
            }
          : {}
      }
      whileTap={{
        backgroundColor: "#112d4e",
        color: "#fff",
      }}
      className={classes.item}
    >
      <Link
        href={
          isSelected
            ? `/academia/iv-brigada-aerea/admin?vista=alumnos&curso=${classroomCustomId}`
            : `/academia/iv-brigada-aerea/admin?vista=alumnos&curso=${classroomCustomId}&alumno=${data.customId}`
        }
        scroll={false}
        className={classes.link}
      >
        <p>{`${data.lastName} ${data.firstName}`}</p>
      </Link>
      {isSelected && <StudentUpdater data={data} />}
    </motion.li>
  );
};

export default StudentItem;

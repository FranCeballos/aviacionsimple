import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import classes from "./ClassroomItem.module.css";
import useDimension from "@/src/hooks/use-dimension";

const ClassroomItem = ({ data, selectedClassroom }) => {
  const { width } = useDimension();
  return (
    <motion.li
      animate={
        selectedClassroom === data.customId
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
        href={`/academia/iv-brigada-aerea/admin?vista=notificaciones&curso=${data.customId}`}
        scroll={false}
        className={classes.link}
      >
        <p>{`${data.grade} ${data.division}`}</p>
        <p>{data.year}</p>
      </Link>
    </motion.li>
  );
};

export default ClassroomItem;

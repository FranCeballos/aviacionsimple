import React from "react";
import Link from "next/link";
import ScaleOnHover from "@/components/UI/AnimatedComponents/ScaleOnHover";

import classes from "./SubjectItem.module.css";

const SubjectItem = ({ title, link }) => {
  return (
    <ScaleOnHover className={classes.container}>
      <Link href={link} className={classes.link}>
        {title}
      </Link>
    </ScaleOnHover>
  );
};

export default SubjectItem;

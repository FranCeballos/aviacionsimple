import React from "react";
import classes from "./Action.module.css";
import Link from "next/link";

const Action = ({ title, icon, link, isActive }) => {
  return (
    <Link
      className={`${classes.container} ${isActive ? classes.active : ""}`}
      href={link}
      scroll={false}
    >
      <div
        className={`${classes.icon} ${isActive ? classes.activeContent : ""}`}
      >
        {icon}
      </div>
      <h2
        className={`${classes.title} ${isActive ? classes.activeContent : ""}`}
      >
        {title}
      </h2>
    </Link>
  );
};

export default Action;

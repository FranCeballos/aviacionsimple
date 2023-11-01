import React from "react";
import classes from "./SectionWrapper.module.css";

const SectionWrapper = ({ children, style, id }) => {
  return (
    <section id={id} style={style} className={classes.container}>
      {children}
    </section>
  );
};

export default SectionWrapper;

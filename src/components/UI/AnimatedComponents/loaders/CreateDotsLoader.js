import React from "react";
import classes from "./CreateDotsLoader.module.css";

const CreateDotsLoader = ({ style = {} }) => {
  return <div style={style} className={classes.loader}></div>;
};

export default CreateDotsLoader;

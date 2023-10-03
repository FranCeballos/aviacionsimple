import React from "react";
import classes from "./Input.module.css";

const Input = ({ placeholder = "", error = " " }) => {
  return (
    <div>
      <input className={classes.input} placeholder={placeholder} />
      <p className={classes.error}>{error}</p>
    </div>
  );
};

export default Input;

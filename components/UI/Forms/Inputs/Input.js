import React from "react";
import classes from "./Input.module.css";

const Input = ({
  placeholder = "",
  error = " ",
  style = {},
  type = "text",
}) => {
  return (
    <div className={classes.container}>
      <input
        type={type}
        style={style}
        className={classes.input}
        placeholder={placeholder}
      />
      <p className={classes.error}>{error}</p>
    </div>
  );
};

export default Input;

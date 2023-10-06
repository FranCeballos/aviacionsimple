import React from "react";
import classes from "./Input.module.css";

const Input = ({
  placeholder = "",
  error = " ",
  containerStyle = {},
  errorStyle = {},
  style = {},
  type = "text",
}) => {
  return (
    <div style={containerStyle} className={classes.container}>
      <input
        type={type}
        style={style}
        className={classes.input}
        placeholder={placeholder}
      />
      <p style={errorStyle} className={classes.error}>
        {error}
      </p>
    </div>
  );
};

export default Input;

import React, { forwardRef } from "react";
import classes from "./Input.module.css";

const Input = forwardRef(
  (
    {
      placeholder = "",
      error = " ",
      containerStyle = {},
      errorStyle = {},
      style = {},
      type = "text",
    },
    ref
  ) => {
    return (
      <div style={containerStyle} className={classes.container}>
        <input
          ref={ref}
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
  }
);

export default Input;

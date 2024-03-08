import React, { forwardRef } from "react";
import classes from "./TextArea.module.css";

const TextArea = forwardRef(
  (
    {
      placeholder = "",
      error = " ",
      containerStyle = {},
      errorStyle = {},
      style = {},

      type = "text",
      isColumnStyle = false,
    },
    ref
  ) => {
    return (
      <div
        style={containerStyle}
        className={
          isColumnStyle ? classes["container-column"] : classes.container
        }
      >
        <textarea
          ref={ref}
          type={type}
          style={{
            ...style,
            wordBreak: "break-all",
            resize: "none",
            padding: "10px",
          }}
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

export default TextArea;

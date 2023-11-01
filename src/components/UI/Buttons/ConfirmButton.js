import React from "react";
import classes from "./ConfirmButton.module.css";

const ConfirmButton = ({ title, onClick, style = {} }) => {
  return (
    <button style={style} className={classes.button} onClick={() => onClick()}>
      {title}
    </button>
  );
};

export default ConfirmButton;

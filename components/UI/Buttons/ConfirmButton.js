import React from "react";
import classes from "./ConfirmButton.module.css";

const ConfirmButton = ({ title, onClick }) => {
  return (
    <button className={classes.button} onClick={() => onClick()}>
      {title}
    </button>
  );
};

export default ConfirmButton;

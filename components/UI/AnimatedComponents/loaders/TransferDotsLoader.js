import React from "react";
import classes from "./TransferDotsLoader.module.css";

const TransferDotsLoader = ({ style = {} }) => {
  return <div style={style} className={classes.loader}></div>;
};

export default TransferDotsLoader;

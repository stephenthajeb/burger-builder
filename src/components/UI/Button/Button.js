import React from "react";
import "./Button.css";
// import classes from "./Button.module.css";

export default (props) => {
  return (
    <button className={`Button ${props.btntype}`} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

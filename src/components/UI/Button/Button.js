import React from "react";
// import classes from "./Button.module.css";
import "./Button.css";

export default (props) => {
  return (
    <button className={`Button ${props.btnType}`} onClick={props.clicked}>
      {/* {`Button ${props.btnType}`} */}
      {props.children}
    </button>
  );
};

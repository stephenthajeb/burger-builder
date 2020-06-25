import React from "react";
import "./Button.css";
// import classes from "./Button.module.css";

export default (props) => {
  return (
    <button
      className={`Button ${props.btnType}`}
      onClick={props.clicked}
      {...props}
    >
      {/* {`Button ${props.btnType}`} */}
      {props.children}
    </button>
  );
};

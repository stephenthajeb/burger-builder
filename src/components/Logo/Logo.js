import React from "react";
import burgerLogo from "../../assets/logo.png";
import classes from "./Logo.module.css";

export default () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="Burger" />
  </div>
);

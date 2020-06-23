import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

export default () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem active link="/">
        Tes 1
      </NavigationItem>
      <NavigationItem link="/">Tes 2</NavigationItem>
    </ul>
  );
};

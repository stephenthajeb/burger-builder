import React from "react";
import classes from "./Input.module.css";

export default (props) => {
  let inputElement = null;

  const inputClasses = [classes.InputElement];
  if (props.touched && props.invalid && props.shouldValidate) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          onChange={props.onChange}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          onChange={props.onChange}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          onChange={props.onChange}
          className={classes.InputElement}
          value={props.value}
        >
          <option value="" disabled hidden>
            {props.elementConfig.topic}
          </option>
          {props.elementConfig.options.map((datum) => (
            <option key={datum.value} value={datum.value}>
              {datum.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
    //Adding more custom input type later
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
];

export default (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>Rp {props.price}</strong>
    </p>
    {controls.map((datum) => (
      <BuildControl
        key={datum.label}
        label={datum.label}
        add={() => props.add(datum.type)}
        remove={() => props.remove(datum.type)}
        disabled={props.disabled[datum.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.purchaseHandler}
    >
      {props.isAuthenticated ? "Order Now" : "Sign in to Order"}
    </button>
  </div>
);

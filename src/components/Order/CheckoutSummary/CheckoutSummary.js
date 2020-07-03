import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

export default (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>This is what your order looks like</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btntype="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button btntype="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

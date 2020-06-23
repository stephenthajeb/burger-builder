import React from "react";
import Button from "../../UI/Button/Button";

export default (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients :</p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Total Price : Rp {props.price}</strong>
      </p>
      <h2 style={{ textAlign: "center" }}>Continue to check out ?</h2>
      <div style={{ float: "right" }}>
        <Button btnType="Danger" clicked={props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={props.purchaseContinued}>
          CONTINUE
        </Button>
      </div>
    </>
  );
};

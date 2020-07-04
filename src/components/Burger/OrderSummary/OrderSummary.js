import React from "react";
import Button from "../../UI/Button/Button";

export default (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map((igKey) => {
    return props.ingredients[igKey] !== 0 ? (
      <li style={{ listStyle: "none" }} key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
        {props.ingredients[igKey]}
      </li>
    ) : null;
  });
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients :</p>
      <ul style={{ paddingInlineStart: "0px" }}>
        <hr />
        {ingredientsSummary}
      </ul>
      <p>
        <strong>Total Price : Rp {props.price}</strong>
      </p>
      <h2 style={{ textAlign: "center" }}>Continue to check out ?</h2>
      <div style={{ float: "right" }}>
        <Button btntype="Danger" clicked={props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btntype="Success" clicked={props.purchaseContinued}>
          CONTINUE
        </Button>
      </div>
    </>
  );
};

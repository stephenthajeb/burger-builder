import React from "react";
import classes from "./Order.module.css";

export default (props) => {
  let ingredients = [];
  for (let ingredient in props.ingredients) {
    ingredients.push({
      name: ingredient,
      amount: props.ingredients[ingredient],
    });
  }

  return (
    <div className={classes.Order}>
      <p>
        {ingredients.map(
          (datum) =>
            datum.amount !== 0 && (
              <span key={datum.name} className={classes.Ingredient}>
                {datum.name} ({datum.amount})
              </span>
            )
        )}
      </p>
      <p style={{ padding: "10px" }}>
        Price : <strong> {props.price}</strong>
      </p>
    </div>
  );
};

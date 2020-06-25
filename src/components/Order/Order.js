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
        {ingredients.map((datum) => (
          <span key={datum.name} className={classes.Ingredient}>
            {datum.name} ({datum.amount})
          </span>
        ))}
      </p>
      <p>
        Price : <strong> {props.price}</strong>
      </p>
    </div>
  );
};

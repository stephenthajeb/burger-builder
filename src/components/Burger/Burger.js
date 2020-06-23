import React from "react";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import classes from "./Burger.module.css";

export default (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        //array with ingrediten[igKey] length; _ indicates element of array is not important, while i is the index
        return <BurgerIngredients key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      //Flattern array of arrays to 1D of array
      return arr.concat(el);
    }, []);
  // console.log(transformedIngredients);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p> Please start adding any ingredients !!! </p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

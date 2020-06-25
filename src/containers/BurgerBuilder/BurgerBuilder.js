import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 4000,
  meat: 8000,
  bacon: 10000,
  cheese: 3000,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 3000,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("https://burger-builder-8b17a.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  addIngredientHandler = (type) => {
    const updateCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updateCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchasable(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const updateCount = this.state.ingredients[type] - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updateCount;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchasable(updatedIngredients);
  };

  updatePurchasable(ingredients) {
    const sum = Object.keys(ingredients) //Array of string(ingredient)
      .map((igKey) => {
        return ingredients[igKey];
      }) //Array of integer(counter for each ingredient)
      .reduce((sum, el) => {
        //flaten the array to calculate the sum
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    // console.log(this.props);
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let burger = this.state.error ? (
      <p>ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            add={this.addIngredientHandler}
            remove={this.removeIngredientHandler}
            disabled={disableInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            purchaseHandler={this.purchaseHandler}
          />
        </>
      );
    }
    let orderSummary = null;
    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <>
        <Modal show={this.state.purchasing} closed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);

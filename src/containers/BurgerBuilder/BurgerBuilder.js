import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";
import { connect } from "react-redux";
import * as burgerBuilderActions from "../../store/actions/burgerBuilderAction";
import { purchaseInit } from "../../store/actions/orderAction";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.initIngredients();
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push("/auth");
    }
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
    return sum > 0;
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.initPurchase();
    this.props.history.push({
      pathname: "/checkout",
    });
  };

  render() {
    const disableInfo = {
      ...this.props.ingredients,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let burger = this.props.error ? (
      <p>ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            add={this.props.addIngredientHandler}
            remove={this.props.removeIngredientHandler}
            disabled={disableInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchasable(this.props.ingredients)}
            purchaseHandler={this.purchaseHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </>
      );
    }
    let orderSummary = null;
    if (this.props.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.totalPrice}
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilderReducer.ingredients,
    totalPrice: state.burgerBuilderReducer.totalPrice,
    error: state.burgerBuilderReducer.error,
    isAuthenticated: !(state.authReducer.token === null),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addIngredientHandler: (ingName) =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    removeIngredientHandler: (ingName) =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    initIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    initPurchase: () => dispatch(purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

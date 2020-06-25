import React, { Component } from "react";
import CheckoutSummary from "../../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  checkoutCancelled = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace("checkout/contact-data");
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      if (param[0] === "price") {
        this.setState({ totalPrice: param[1] });
      } else {
        ingredients[param[0]] = +param[1]; //Adding + sign to convert param to number type
      }
    }
    this.setState({ ingredients: ingredients });
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelled}
          checkoutContinued={this.checkoutContinued}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
export default Checkout;

import React, { Component } from "react";
import Button from "../../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../../axios-orders";
import Spinner from "../../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    //base url + orders (MUST BE IN FORM .json)
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      //Dummy data
      customer: {
        name: "Jeb",
        address: {
          street: "22B Baker Street",
          zipCode: "6969",
          country: "Germany",
        },
        email: "Sthajeb1@gmail.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  render() {
    let form = (
      <form>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className={classes.Input}
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className={classes.Input}
        />
        <input
          type="text"
          name="street"
          placeholder="Your address"
          className={classes.Input}
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Your postal code"
          className={classes.Input}
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}
export default ContactData;

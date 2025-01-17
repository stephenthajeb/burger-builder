import React, { Component } from "react";
import Button from "../../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Input from "../../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as orderActions from "../../../../store/actions/orderAction";
import { checkValidity } from "../../../../store/utility";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your address",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your postal code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
          topic: "Delivery Method",
        },
        value: "fastest",
        validation: {
          required: true,
        },
        valid: true,
        touched: false,
      },
    },
    formIsSubmittable: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    let formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.orderBurger(order, this.props.token);
  };

  onChangeHandler = (event, inputName) => {
    const updatedForm = {
      ...this.state.orderForm,
    };
    //Copy twice to 2 different Object to prevent shallow copy
    //because the orderForm has deeply nested child
    const updatedElement = {
      ...updatedForm[inputName],
    };
    updatedElement.value = event.target.value;
    updatedForm[inputName] = updatedElement;
    updatedElement.valid = checkValidity(
      updatedElement.value,
      updatedElement.validation
    );
    updatedElement.touched = true;
    let formIsValid = true;
    for (let inputName in updatedForm) {
      formIsValid = updatedForm[inputName].valid && formIsValid;
    }
    this.setState({ orderForm: updatedForm, formIsSubmittable: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        name: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((datum) => (
          <Input
            key={datum.name}
            elementType={datum.config.elementType}
            elementConfig={datum.config.elementConfig}
            value={datum.config.value}
            invalid={!datum.config.valid}
            shouldValidate={datum.config.validation}
            touched={datum.config.touched}
            onChange={(event) => this.onChangeHandler(event, datum.name)}
          />
        ))}
        <Button btntype="Success" disabled={!this.state.formIsSubmittable}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilderReducer.ingredients,
    price: state.burgerBuilderReducer.totalPrice,
    loading: state.orderReducer.loading,
    token: state.authReducer.token,
    userId: state.authReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderBurger: (orderData, token) =>
      dispatch(orderActions.purchaseBurger(orderData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);

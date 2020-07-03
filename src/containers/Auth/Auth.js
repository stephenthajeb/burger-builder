import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import { authenticate } from "../../store/actions/authAction";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.authenticate(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        name: key,
        config: this.state.controls[key],
      });
    }
    const form = formElementsArray.map((datum) => (
      <Input
        key={datum.name}
        elementType={datum.config.elementType}
        elementConfig={datum.config.elementConfig}
        value={datum.config.value}
        invalid={!datum.config.valid}
        shouldValidate={datum.config.validation}
        touched={datum.config.touched}
        onChange={(event) => this.inputChangedHandler(event, datum.name)}
      />
    ));

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      if (this.props.building) {
        authRedirect = <Redirect to="/checkout" />;
      } else {
        authRedirect = <Redirect to="/" />;
      }
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <>
          <h2 style={{ textAlign: "center" }}>{this.props.error.message}</h2>
          <h3 style={{ textAlign: "center" }}>Sorry, Please try again</h3>
        </>
      );
    }
    let pageContent = (
      <>
        <div className={classes.Auth}>
          {authRedirect}
          <form onSubmit={this.submitHandler}>
            {form}
            <Button btntype="Success">
              {this.state.isSignup ? "Sign Up" : "Sign In"}
            </Button>
          </form>
          <Button
            btntype="Danger"
            type="button"
            clicked={this.switchAuthModeHandler}
          >
            Switch To {this.state.isSignup ? "Sign In" : "Sign Up"}
          </Button>
        </div>
        {errorMessage}
      </>
    );
    if (this.props.loading) {
      pageContent = <Spinner />;
    }

    return pageContent;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.authReducer.loading,
    isAuthenticated: !(state.authReducer.token === null),
    error: state.authReducer.error,
    building: state.burgerBuilderReducer.building,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (email, password, isSignup) =>
      dispatch(authenticate(email, password, isSignup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

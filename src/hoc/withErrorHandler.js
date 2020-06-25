import React, { Component } from "react";
import Modal from "../components/UI/Modal/Modal";
import axios from "../axios-orders";

export default (WrappedComponent) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentWillMount() {
      axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
      axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            purchaseCancelHandler={this.errorConfirmedHandler} //bad naming,supposed to be closedModal
          >
            <h2>Error !!!</h2>
            <h3>{this.state.error ? this.state.error.message : null}</h3>
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

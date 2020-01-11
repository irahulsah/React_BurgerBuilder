import React, { Component } from "react";
import Modal from "../../components/Ui/Modal/Modals";
import Aux from "../Auxillary/Auxillary";


const withErrorHandler = (Wrappedomponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentDidMount() {
    this.reqInterceptor =axios.interceptors.request.use(req => {
          this.setState({error: null})
          return req
      })
    this.resInterceptor =axios.interceptors.response.use(
        res => res,
        error => this.setState({ error: error })
      );
    }
    componentWillUnmount() {
        console.log('will unmount')
        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.response.eject(this.resInterceptor);

    }

    errorConfirmedHanlder = () => this.setState({ error: null });

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHanlder}
          >
          {this.state.error ? this.state.error.message : null }</Modal>
          <Wrappedomponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
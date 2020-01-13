import React, { Component } from "react";
import Order from "../../components/Order/Order";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/Ui/Spinner/Spinner";
import withErrorHandler from "../../HigherOrderComponent/withErrorHandler/withErrorHandler";
import axios from "../../axios.orders";

class Orders extends Component {
  constructor(props) {
    super(props);

    this.props.onFetchedOrder(this.props.token, this.props.userId);
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          ingrediants={order.ingrediants}
          price={+order.price}
          key={order.id}
        />
      ));
    }

    return <div>{orders}</div>;
  }
}

const mapPropsToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchedOrder: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(
  mapPropsToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));

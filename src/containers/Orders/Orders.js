import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios.orders";
import withErrorHandler from "../../HigherOrderComponent/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/Ui/Spinner/Spinner";

class Orders extends Component {
  // constructor(props) {
  //   super(props);

  componentDidMount() {
    this.props.onFetchedOrder();
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

    return <div>
      {orders}
    </div>;
  }
}

const mapPropsToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchedOrder: () => dispatch(actions.fetchOrders())
  };
};

export default connect(
  mapPropsToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));

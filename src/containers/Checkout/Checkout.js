import React, { Component } from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../../store/actions/index';

class Checkout extends Component {
   
  
  // state = {
  //   ingrediants: null,
  //   totalPrice: 0
  // };

  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingrediants = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     if (param[0] === "price") {
  //           price = param[1];
  //     } else {
  //       ingrediants[param[0]] = +param[1];
  //     }
  //   }

  //   this.setState({ ingrediants: ingrediants, totalPrice: price });
  // }

  checkoutCancelledHandler = props => this.props.history.goBack();

  checkoutContinuedHandler = props =>
    this.props.history.replace("/checkout/contact-data");
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            ingrediants={this.props.ings}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
          
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingrediants,
    purchased: state.order.purchased
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onPurchaseInit: () => dispatch(actions.purchaseInit())
//   }
// }

export default connect(mapStateToProps)(Checkout);

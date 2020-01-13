import React, { Component } from "react";
import Aux from "../../../HigherOrderComponent/Auxillary/Auxillary";
import Button from "../../Ui/Button/Button";

class OrderSummary extends Component {

  render() {
    let ingrediantSummary = Object.keys(this.props.ingrediants).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {this.props.ingrediants[igKey]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingrediants:</p>
        <ul>{ingrediantSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue To Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;

import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../HigherOrderComponent/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/Ui/Modal/Modals";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import Spinner from "../../components/Ui/Spinner/Spinner";
import WithErrorHandler from "../../HigherOrderComponent/withErrorHandler/withErrorHandler";
import axios from "../../axios.orders";

import * as actions from '../../store/actions/index';

class burgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.props.onInitIngrediants();

  }

  //   axios
  //     .get("https://myprojectreact1.firebaseio.com/ingrediants.json")
  //     .then(response => this.setState({ ingrediants: response.data }))
  //     .catch(errpr => {
  //       this.setState({ error: true });
  //     });
  //   console.log(this.props);
  // }

  state = {
    purchasing: false
  };

  // componentDidMount() {
  //   console.log("[did mount burger builder]");
  //   this.props.onInitIngrediants();
  // }

  updatePurchaseState(ingrediants) {
    const sum = Object.keys(ingrediants)
      .map(igKey => {
        return ingrediants[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  // addIngrediantHandler = type => {
  //   const oldCount = this.state.ingrediants[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngrediants = {
  //     ...this.state.ingrediants
  //   };
  //   updatedIngrediants[type] = updatedCount;
  //   const priceAddition = Ingrediant_Price[type];

  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;

  //   this.setState({ totalPrice: newPrice, ingrediants: updatedIngrediants });
  //   this.updatePurchaseState(updatedIngrediants);
  // };

  // removeIngrediantHandler = type => {
  //   const oldCount = this.state.ingrediants[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngrediants = {
  //     ...this.state.ingrediants
  //   };

  //   updatedIngrediants[type] = updatedCount;

  //   const priceAddition = Ingrediant_Price[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceAddition;

  //   this.setState({ totalPrice: newPrice, ingrediants: updatedIngrediants });
  //   this.updatePurchaseState(updatedIngrediants);
  // };

  purchaseHandler = () => {
    if(this.props.isAuthenticated){

      this.setState({ purchasing: true })}
     else {
       this.props.onSetAuthRedirectPath('/checkout');
       this.props.history.push('/auth')


    }

  }
  purchaseCancelHandler = () => this.setState({ purchasing: false });

  purchaseContinueHandler = () => {

    //
    // console.log(this.props);

    // const queryParams = [];
    // for (let i in this.state.ingrediants) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingrediants[i])
    //   );
    // }
    // queryParams.push("price=" + this.state.totalPrice);

    // const queryString = queryParams.join("&");
    this.props.onInitPurchase();
    this.props.history.push(
      "/checkout"
      // pathname: "/checkout",
      // search: "?" + queryString
    );
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <p style={{ textAlign: "center" }}>Ingrediants can't be loaded!! </p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingrediants={this.props.ings} />
          <BuildControls
            IngrediantAdded={this.props.onAddedIngrediants}
            IngrediantRemoved={this.props.onRemovedIngrediants}
            disabled={disabledInfo}
            price={this.props.price}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingrediants={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }
    // if (this.state.Loading) {
    //   orderSummary = <Spinner />;
    // }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingrediants,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    purchased: state.order.purchased,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddedIngrediants: igName =>
      dispatch(actions.addIngrediant(igName)),
    onRemovedIngrediants: igName =>
      dispatch(actions.removeIngrediant(igName)),
    onInitIngrediants: () => dispatch(actions.initIngrediant()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirect(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(burgerBuilder, axios));

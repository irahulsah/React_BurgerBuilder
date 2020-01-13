import React, { Component } from "react";
import classes from "./Layout.css";
import Aux from "../Auxillary/Auxillary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from 'react-redux';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  cancelSideDrawer = () => {
    this.setState({ showSideDrawer: false });
  };

  toggleSideDrawerHandler = (prevState) => (
    this.setState({showSideDrawer: !prevState.showSideDrawer})
  )

  render() {
    return (
      <Aux>
        <Toolbar isAuth={this.props.isAutheticated} toggleSideDrawer={this.toggleSideDrawerHandler} />
        <SideDrawer
        isAuth={this.props.isAutheticated}
          open={this.state.showSideDrawer}
          closed={this.cancelSideDrawer}
        />
        <main className={classes.Layout}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAutheticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);

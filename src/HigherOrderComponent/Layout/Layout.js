import React, { Component } from "react";
import classes from "./Layout.css";
import Aux from "../Auxillary/Auxillary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

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
        <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.cancelSideDrawer}
        />
        <main className={classes.Layout}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;

import React from "react";
import Logo from "../../Logo/Logo";
import classes from "./SideDrawer.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import BackDrop from "../../Ui/Backdrop/Backdrop";
import Aux from "../../../HigherOrderComponent/Auxillary/Auxillary";

const sideDrawer = props => {
  let attachedClass = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClass = [classes.SideDrawer, classes.Open];
 
  }

  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.closed} />
      <div className={attachedClass.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;

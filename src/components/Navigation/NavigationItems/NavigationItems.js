import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationitems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact >
      Burger Builder
    </NavigationItem>
    <br></br>
    <NavigationItem link="/orders">Orders</NavigationItem>
  </ul>
);

export default navigationitems;

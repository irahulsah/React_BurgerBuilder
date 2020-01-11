import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
  {
    label: "Salad",
    type: "salad"
  },
  {
    type: "bacon",
    label: "Bacon"
  },
  {
    type: "cheese",
    label: "Cheese"
  },
  {
    label: "Meat",
    type: "meat"
  }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <h3>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </h3>
    {controls.map(control => {
      return (
        <BuildControl
          key={control.label}
          label={control.label}
          added={() => props.IngrediantAdded(control.type)}
          removed={() => props.IngrediantRemoved(control.type)}
          disabled={props.disabled[control.type]}
        />
      );
    })}
    <button className={classes.OrderButton} disabled={!props.purchaseable} 
      onClick={props.ordered}>
      ORDER NOW
    </button>
  </div>
);

export default buildControls;

import React from "react";
import classes from "./Order.css";

const order = props => {
  const Ingrediants = [];
  for (let ingrediantName in props.ingrediants) {
    Ingrediants.push({
      name: ingrediantName,

      amount: props.ingrediants[ingrediantName]
    });
  }

  const ingrediantOutput = Ingrediants.map(ig => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
        key={ig.name}
      > {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingrediants: {ingrediantOutput}</p>
      <p>
        Price: <strong>USD: {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;

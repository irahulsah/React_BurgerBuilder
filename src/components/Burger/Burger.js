import React from "react";
import BurgerIngrediant from "./BurgerIngrediants/BurgerIngrediants";
import classes from "./Burger.css";

const burger = props => {
  let transformedIngrediants = Object.keys(props.ingrediants)
    .map(igKey => {
      return [...Array(props.ingrediants[igKey])].map((_, i) => {
        return <BurgerIngrediant key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
        // console.log('the previous arr is :', arr,'the next element is ', el);
      return arr.concat(el);
    }, []);;
  if (transformedIngrediants.length === 0) {
    transformedIngrediants = <p> Please Start Adding Indregiants </p>;
  }
  // console.log(transformedIngrediants);

  return (
    <div className={classes.Burger}>
      <BurgerIngrediant type="bread-top" />
      {transformedIngrediants}
      <BurgerIngrediant type="bread-buttom" />
    </div>
  );
};

export default burger;

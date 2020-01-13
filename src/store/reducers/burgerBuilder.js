import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility"

const initialState = {
  ingrediants: null,
  totalPrice: 4,
  error: false,
  building: false
};

const Ingrediant_Price = {
  salad: 0.5,
  bacon: 0.9,
  meat: 1,
  cheese: 0.7
};

const addIngrediant = (state, action) => {
  const updatedIngrediantObject = {
    [action.ingrediantName]: state.ingrediants[action.ingrediantName] + 1
  };
  const updatedIngrediants = updateObject(
    state.ingrediants,
    updatedIngrediantObject
  );
  const updatedStateAdd = {
    ingrediants: updatedIngrediants,
    totalPrice: state.totalPrice + Ingrediant_Price[action.ingrediantName],
    building: true
  };
  return updateObject(state, updatedStateAdd);
};

const removeIngrediant = (state, action) => {
  const updatedIngrediant = {
    [action.ingrediantName]: state.ingrediants[action.ingrediantName] - 1
  };
  const updatedIngrediantsRem = updateObject(
    state.ingrediants,
    updatedIngrediant
  );
  const updatedStateRem = {
    ingrediants: updatedIngrediantsRem,
    totalPrice: state.totalPrice - Ingrediant_Price[action.ingrediantName],
    building: true
  };
  return updateObject(state, updatedStateRem);
};

const setIngrediant = (state, action) => {
  return updateObject(state, {
    ingrediants: {
      salad: action.ingrediants.salad,
      bacon: action.ingrediants.bacon,
      cheese: action.ingrediants.cheese,
      meat: action.ingrediants.meat
    },
    totalPrice: 4,
    error: false,
    building: false
  });
};

const fetchaFailedIngrediant = (state,action) => {
  return updateObject(state, { error: true });

}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIANT: return addIngrediant(state,action);

    case actionTypes.REMOVE_INGREDIANT: return removeIngrediant(state,action);

    case actionTypes.SET_INGREDIANT: return setIngrediant(state,action);

    case actionTypes.FECTHCHED_INGREDIANT_FAILED:return fetchaFailedIngrediant(state,action);
      

    default: return state;
  }
};
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case actionTypes.ADD_INGREDIANT:
//       return {
//         ...state,
//         ingrediants: {
//           ...state.ingrediants,
//           [action.ingrediantName]: state.ingrediants[action.ingrediantName] + 1
//         },
//         totalPrice: state.totalPrice + Ingrediant_Price[action.ingrediantName]
//       };
//     case actionTypes.REMOVE_INGREDIANT:
//       return {
//         ...state,
//         ingrediants: {
//           ...state.ingrediants,
//           [action.ingrediantName]: state.ingrediants[action.ingrediantName] - 1
//         },
//         totalPrice: state.totalPrice - Ingrediant_Price[action.ingrediantName]
//       };
//     case actionTypes.SET_INGREDIANT:
//       return {
//         ...state,
//         ingrediants: {
//           salad: action.ingrediants.salad,
//           bacon: action.ingrediants.bacon,
//           cheese: action.ingrediants.cheese,
//           meat: action.ingrediants.meat
//         },
//         totalPrice: 4,
//         error: false
//       }
//     case actionTypes.FECTHCHED_INGREDIANT_FAILED:
//       return {
//         ...state,
//         error: true
//       }

//     default:
//       return state;
//   }
// };

export default reducer;

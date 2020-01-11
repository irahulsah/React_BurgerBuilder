import * as actionTypes from './actionTypes';
import axios from '../../axios.orders';

export const addIngrediant = (name) => {
    return {
      type: actionTypes.ADD_INGREDIANT,
      ingrediantName: name
    };
}
export const removeIngrediant = (name) => {
    return {
      type: actionTypes.REMOVE_INGREDIANT,
      ingrediantName: name
    };
}

export const fetchedIngrediantFailed = () => {
    return {
      type: actionTypes.FECTHCHED_INGREDIANT_FAILED
    };
}

export const setIngrediant = (ingrediants) => {
    return {
      type: actionTypes.SET_INGREDIANT,
      ingrediants: ingrediants
    };
}

export const initIngrediant = () => {
    return dispatch => {
      axios
        .get("https://myprojectreact1.firebaseio.com/ingrediants.json")
        .then(response => {
         dispatch(setIngrediant(response.data));
        })
        .catch(error => {
          dispatch(fetchedIngrediantFailed())
        })
}}
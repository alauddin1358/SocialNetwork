// alertReducer.js
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = {
  alert: null,
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alert: null,
      };
    default:
      return state;
  }
};

export default alertReducer;




// import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

// const initialState = [];

// function alertReducer(state = initialState, action) {
//   const { type, payload } = action;

//   switch (type) {
//     case SET_ALERT:
//       return [...state, payload];
//     case REMOVE_ALERT:
//       //return [...state,null];
//       return state.filter((alert) => alert.id !== payload);
//     default:
//       return state;
//   }
// }
// export default alertReducer;
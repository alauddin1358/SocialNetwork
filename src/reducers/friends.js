import {
    ADD_FRIEND,
    REMOVE_FRIEND,
    CANCEL_REQUEST,
    DELETE_REQUEST,
    ACCEPT_REQUEST,
    ERROR_REQUEST
} from '../actions/types';
const initialState = {
    loading: true,
    pendingFriend: [],
    friendSuggestion: []
  };
export default  function friendReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case ADD_FRIEND:
          return {
            ...state,
            loading: false,
            friendSuggestion: payload 
          };
      case ACCEPT_REQUEST:
          return {
            ...state,
            loading: false
          };
      case CANCEL_REQUEST:
        return {
          ...state,
          loading: false
        };
      case REMOVE_FRIEND:
          return {
            ...state,
            loading: false
          };
      case ERROR_REQUEST:
        return {
          ...state,
          loading: false
        };
      case DELETE_REQUEST:
          return {
            ...state,
            loading: false
          };
      default:
        return state;
    }
  }
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED,
    ALLUSER_LOADED
  } from '../actions/types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    isSearch: false,
    user: null,
    allUsers: [],
    searchUser: null
  };
  
  export default  function authReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case USER_LOADED:
          return {
            ...state,
            isAuthenticated: true,
            loading: false,
            isSearch: false,
            user: payload
          };
      case ALLUSER_LOADED:
        return {
          ...state,
          loading: false,
          allUsers: payload
        };
      case REGISTER_SUCCESS:
          return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false
          };
      case LOGIN_SUCCESS:
          localStorage.setItem('token', payload.token)
            return {
              ...state,
              ...payload,
              isAuthenticated: true,
              loading: false
            };
      case REGISTER_FAIL:
      case AUTH_ERROR:
      case LOGIN_FAIL:
            localStorage.removeItem('token');
          return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false,
            isSuccess: false
          };
      case LOGOUT:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null
        };
      default:
        return state;
    }
  }
 
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT
  } from './types';
  //import setAuthToken from '../utils/setAuthToken';
import { Alert } from 'reactstrap';
import axios from 'axios';
const API = process.env.REACT_APP_API;

// Load User
export const loadUser = () => async dispatch => {
  /*if(localStorage.token) {
      console.log('calling Localstorage');
      setAuthToken(localStorage.token);
  }*/
  try {
    const res = await axios.get(`${API}/users`);
    console.log('Auth response ',res);
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = ({formData}) => async dispatch => {
    const config = {
        headers : {
            'Content-Type':'application/json'
        }
    };
    //const body = JSON.stringify({name, email, password});
    
  try {
    console.log(API);
    const res = await axios.post(`${API}/add`, formData, config);
    console.log('Users data', res.data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    //dispatch(loadUser());
  } catch (err) {
    const errors = err.response;
    console.log(errors);
    <Alert>{errors}</Alert>
    if (errors) {
        <Alert>{errors}</Alert>
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
// Login User
export const login = (email, password) => async dispatch => {
  const config = {
      headers : {
          'Content-Type':'application/json'
      }
  };
  const body = {email, password};
  
  try {
    const res = await axios.post(`${API}/login`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      <Alert>{errors}</Alert>
      //errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
}
};

// Logout
export const logout = ()=> dispatch => { 
  //dispatch( { type : CLEAR_PROFILE });
  dispatch( {type: LOGOUT} );
};
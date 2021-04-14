import {
    ADD_FRIEND,
    REMOVE_FRIEND,
    DELETE_FRIEND,
    ACCEPT_FRIEND,
    ERROR_FRIEND
} from './types';
//import axios from 'axios';
import {instance} from './instance';
import { setAlert } from './alert';
//import {config} from './config';
const API = process.env.REACT_APP_API;

// Send Friend request
export const sendFriendRequest = (id) => async dispatch => {
  //console.log(localStorage.token);
    const config = {
      headers : {
          'Authorization': `Bearer ${localStorage.token}`,
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
      }
    };
    try {
      //console.log('Calling SendFriendRq', id);
      //console.log(config);
      const res = await instance.get(`${API}/friendReq/${id}`, config);
      console.log('Friend response = ',res.data);
      // if(res.data.result.isError === 'false') {
      //   dispatch({
      //     type: ADD_FRIEND,
      //     payload: JSON.parse(res.data.data)
      //   });
      // }
      // else {
      //   // dispatch(setAlert(res.data.result.message, 'danger'));
      //   dispatch({
      //     type: ERROR_FRIEND
      //   });
      // }
      
    } catch (err) {
      console.log('Error in sending friend request',err);
      // dispatch({
      //   type: ERROR_FRIEND
      // });
    }
  };

  // Accept Friend request
export const acceptFriendRequest = (id) => async dispatch => {
  //console.log(localStorage.token);
    const config = {
      headers : {
          'Authorization': `Bearer ${localStorage.token}`,
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
      }
    };
    try {
      //console.log('Calling SendFriendRq', id);
      //console.log(config);
      const res = await instance.get(`${API}/friendReqAccept/${id}`, config);
      console.log('Accept Friend response = ',res.data);
      // if(res.data.result.isError === 'false') {
      //   dispatch({
      //     type: ADD_FRIEND,
      //     payload: JSON.parse(res.data.data)
      //   });
      // }
      // else {
      //   // dispatch(setAlert(res.data.result.message, 'danger'));
      //   dispatch({
      //     type: ERROR_FRIEND
      //   });
      // }
      
    } catch (err) {
      console.log('Error in sending friend request',err);
      // dispatch({
      //   type: ERROR_FRIEND
      // });
    }
  };

// Delete Friend request
export const deleteFriendRequest = (id) => async dispatch => {
  //console.log(localStorage.token);
    const config = {
      headers : {
          'Authorization': `Bearer ${localStorage.token}`,
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
      }
    };
    try {
      //console.log('Calling SendFriendRq', id);
      //console.log(config);
      const res = await instance.get(`${API}/friendReqDel/${id}`, config);
      console.log('Delete Friend response = ',res.data);
      // if(res.data.result.isError === 'false') {
      //   dispatch({
      //     type: ADD_FRIEND,
      //     payload: JSON.parse(res.data.data)
      //   });
      // }
      // else {
      //   // dispatch(setAlert(res.data.result.message, 'danger'));
      //   dispatch({
      //     type: ERROR_FRIEND
      //   });
      // }
      
    } catch (err) {
      console.log('Error in sending friend request',err);
      // dispatch({
      //   type: ERROR_FRIEND
      // });
    }
  };
// Delete Friend request
export const removeFriendFromFrList = (id) => async dispatch => {
  //console.log(localStorage.token);
    const config = {
      headers : {
          'Authorization': `Bearer ${localStorage.token}`,
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
      }
    };
    try {
      //console.log('Calling SendFriendRq', id);
      //console.log(config);
      const res = await instance.get(`${API}/rmFriend/${id}`, config);
      console.log('Delete Friend response = ',res.data);
      // if(res.data.result.isError === 'false') {
      //   dispatch({
      //     type: ADD_FRIEND,
      //     payload: JSON.parse(res.data.data)
      //   });
      // }
      // else {
      //   // dispatch(setAlert(res.data.result.message, 'danger'));
      //   dispatch({
      //     type: ERROR_FRIEND
      //   });
      // }
      
    } catch (err) {
      console.log('Error in sending friend request',err);
      // dispatch({
      //   type: ERROR_FRIEND
      // });
    }
  };
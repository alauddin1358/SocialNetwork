import {
    ADD_POST,
    POST_ERROR,
    GET_POST,
    GET_POSTS,
    DELETE_POST
  } from './types';
  //import setAuthToken from '../utils/setAuthToken';
import { Alert } from 'reactstrap';
import axios from 'axios';
const API = process.env.REACT_APP_API;

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get(`${API}/posts/new`);

    dispatch({
      type: GET_POSTS,
      payload: JSON.parse(res.data.data.users)
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response
    });
  }
};
// Add post
export const addPost = ({postData}) => async dispatch => {
    const config = {
        headers : {
            'Content-Type':'application/json'
        },
        credentials: 'include'
    };
    try {

      const res = await axios.post(`${API}/posts/new`, postData, config);
      console.log('Post Response', res.data);
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
      dispatch(getPosts());
      //dispatch(setAlert('Post Created', 'success'));
    } catch (err) {
        console.log(err);
        console.log(err.response);
        <Alert>{err.response}</Alert>
      /*dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });*/
    }
  };

  // Get post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`${API}/get_post/${id}`);
    console.log("Getting Post = ", res.data);
    dispatch({
      type: GET_POST,
      payload: JSON.parse(res.data.data)
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response }
    });
  }
};
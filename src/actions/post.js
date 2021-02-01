import {
    ADD_POST,
    POST_ERROR,
    GET_POST,
    GET_POSTS,
    DELETE_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
  } from './types';
  //import setAuthToken from '../utils/setAuthToken';
import { Alert } from 'reactstrap';
import axios from 'axios';
import {instance} from './instance';
//import {config} from './config';
const API = process.env.REACT_APP_API;


export const getPosts = () => async dispatch => {
  console.log("Calling getPosts ");
  const config = {
    headers : {
        'Authorization': `Bearer ${localStorage.token}`,
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    }
  };
  try {
    const res = await instance.get(`${API}/posts/new`,config);
    console.log('All posts = ',res.data);
    dispatch({
      type: GET_POSTS,
      payload: JSON.parse(res.data.data)
    });
  } catch (err) {
    console.log("Error = ", err);
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
            'Authorization': `Bearer ${localStorage.token}`,
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        }
    };
    try {
      const res = await instance.post(`${API}/posts/new`, postData,config);
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
  console.log("Calling GetPost = ", id);
  const config = {
    headers : {
        'Authorization': `Bearer ${localStorage.token}`,
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    }
  };
  try {
    const res = await instance.get(`${API}/get_post/${id}`,config);
    console.log("Getting Post = ", res.data);
    dispatch({
      type: GET_POST,
      payload: JSON.parse(res.data.data.post)
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response }
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers : {
        'Authorization': `Bearer ${localStorage.token}`,
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    }
  };
  try {
    const res = await instance.post(`${API}/comments/${postId}`, formData,config);
    console.log(res.data);
    dispatch({
      type: ADD_COMMENT,
      payload: JSON.parse(res.data.data)
    });

    //dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response }
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  const config = {
    headers : {
        'Authorization': `Bearer ${localStorage.token}`,
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    }
  };
  try {
    await instance.delete(`/api/posts/comment/${postId}/${commentId}`,config);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    //dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response }
    });
  }
}

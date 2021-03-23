import {
    GET_FILE,
    ADD_FILE,
    DELETE_FILE,
    FILE_ERROR
  } from './types';
import {instance} from './instance';
import { setAlert } from './alert';
const API = process.env.REACT_APP_API;

const config = {
    headers : {
        'Authorization': `Bearer ${localStorage.token}`,
        'Content-Type':'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    }
};
//Get FILE 
export const getFile = (id) => async dispatch => {
    try {
        const {data} = await instance.get(`${API}/getAllFiles/${id}`, config);
        if(data.result.isError === 'true') {
            dispatch(setAlert(data.result.message, 'danger'));
          }
        else {
            dispatch({
              type: GET_FILE,
              payload: JSON.parse(data.data)
            });
        }
    } catch (error) {
        //const errors = error.response;
        dispatch(setAlert('Server Error', 'danger'));
        dispatch({
            type: FILE_ERROR
        });
    }
    
}

//Add File
export const addFile = (formData) => async dispatch => {
      try {
        console.log(API);
        console.log(localStorage.token);
        const res = await instance.post(`${API}/file_upload`, formData, config);
        if(res.data.result.isError === 'true') {
            dispatch(setAlert(res.data.result.message, 'danger'));
          }
          else {
            dispatch({
              type: ADD_FILE,
              payload: res.data
            });
            //dispatch(getFile());
            dispatch(setAlert('File Added', 'success'));
          }
      } catch (error) {
        console.log(error);
        console.log(error.response);
        dispatch(setAlert('Server Error', 'danger'));
        // dispatch({
        //     type: POST_ERROR,
        //     payload: { msg: err.response, status: err.response }
        // });
      }
      
  }
  export const deleteFile = (id) => async dispatch => {
    try {
        const res = await instance.delete(`${API}/fileDelete/${id}`);
        if(res.data.result.isError === 'true') {
            dispatch(setAlert(res.data.result.message, 'danger'));
          }
        else {
            dispatch({
              type: DELETE_FILE,
              payload: id
            });
            //dispatch(getFile());
            dispatch(setAlert('File Deleted', 'success'));
        } 
      } catch (error) {
        console.log(error.response);
        dispatch(setAlert('Server Error', 'danger'));
      }
  }
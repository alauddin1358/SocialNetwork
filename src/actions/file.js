import {
    GET_FILE,
    ADD_FILE,
    DELETE_FILE,
    FILE_ERROR,
    ADD_ADV,
    GET_ADV,
    ADV_ERROR,
    DELETE_ADV
  } from './types';
import {instance} from './instance';
import { setAlert } from './alert';
const API = process.env.REACT_APP_API;


//Get FILE 
export const getFile = (id) => async dispatch => {
    const config = {
      headers : {
        'Authorization': `Bearer ${localStorage.token}`,
        'Content-Type':'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    };
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
  const config = {
    headers : {
      'Authorization': `Bearer ${localStorage.token}`,
      'Content-Type':'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  };
      try {
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
    const config = {
      headers : {
        'Authorization': `Bearer ${localStorage.token}`,
        'Content-Type':'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    };
    try {
        const res = await instance.delete(`${API}/fileDelete/${id}`, config);
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

  //Add Advertise 
  export const uploadAdvertise = (formData) => async dispatch => {
    const config = {
      headers : {
        'Authorization': `Bearer ${localStorage.token}`,
        'Content-Type':'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    };
    try {
      //console.log(localStorage.token);
      const res = await instance.post(`${API}/upload_advertise`, formData, config);
      //console.log('Advertise = ',res)
      if(res.data.result.isError === 'true') {
          dispatch(setAlert(res.data.result.message, 'danger'));
        }
        else {
          dispatch({
            type: ADD_ADV,
            payload: res.data
          });
          dispatch(getAdvertise());
          dispatch(setAlert('Advertisement Added', 'success'));
        }
    } catch (error) {
      console.log(error);
      console.log(error.response);
      dispatch(setAlert('Server Error', 'danger'));
    }
    
}

//Get All advertise
//Get FILE 
export const getAdvertise = () => async dispatch => {
  const config = {
    headers : {
      'Authorization': `Bearer ${localStorage.token}`,
      'Content-Type':'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  };
  try {
      const {data} = await instance.get(`${API}/get_Advertise`, config);
      //console.log('Get Adv', data);
      if(data.result.isError === 'true') {
          dispatch(setAlert(data.result.message, 'danger'));
        }
      else {
          dispatch({
            type: GET_ADV,
            payload: JSON.parse(data.data)
          });
      }
  } catch (error) {
      //const errors = error.response;
      dispatch(setAlert('Server Error', 'danger'));
      dispatch({
          type: ADV_ERROR
      });
  }
  
}

export const deleteAdvertise = (id) => async dispatch => {
  const config = {
    headers : {
      'Authorization': `Bearer ${localStorage.token}`,
      'Content-Type':'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  };
  try {
      const res = await instance.delete(`${API}/delete_advertise/${id}`, config);
      if(res.data.result.isError === 'true') {
          dispatch(setAlert(res.data.result.message, 'danger'));
        }
      else {
          dispatch({
            type: DELETE_ADV,
            payload: id
          });
          dispatch(getAdvertise());
          dispatch(setAlert('Advertise Deleted', 'success'));
      } 
    } catch (error) {
      console.log(error.response);
      dispatch(setAlert('Server Error', 'danger'));
    }
}
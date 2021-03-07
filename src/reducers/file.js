import {
    GET_FILE,
    FILE_ERROR,
    DELETE_FILE,
    ADD_FILE
  } from '../actions/types';
  
  const initialState = {
    files: [],
    loading: true,
    isSuccess: false,
    error: {}
  };
  
  function fileReducer(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
      case GET_FILE:
        return {
          ...state,
          files: payload,
          loading: false,
          isSuccess: false
        };
      case ADD_FILE:
        return {
          ...state,
          loading: false,
          isSuccess: true
        };
      case DELETE_FILE:
        return {
          ...state,
          posts: state.files.filter((file) => file._id.$oid !== payload),
          loading: false
        };
      case FILE_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
          isSuccess: false
        };
      default:
        return state;
    }
  }
  export default fileReducer;
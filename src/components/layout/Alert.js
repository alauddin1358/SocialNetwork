import React from 'react';
//import PropTypes from 'prop-types';
import { useSelector  } from 'react-redux';
import '../../css/style.css';

const Alert = () => {
  const alert = useSelector((state) => state.alert.alert);
  //console.log('Alerts ', alert);
 
  return (
    <>
      {
        alert && (
      <div className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
      )}
    </>
   )
  
};

export default Alert;
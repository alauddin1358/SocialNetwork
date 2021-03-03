import React, { Fragment, useState } from 'react';
//import {Alert} from 'reactstrap';
//import axios from 'axios';
//import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
//import { Link, Redirect} from 'react-router-dom';
//import { setAlert } from '../../actions/alert';
// import { login } from '../../actions/auth';
// import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
//import { Alert as AlertStrap } from 'reactstrap';
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const onSubmit = async (e) => {
    
        e.preventDefault();
        if(email === '') alert('Email is required')
        else alert(`Email = ${email}`)
        //console.log('IsAuthenticated = ', isAuthenticated);
        
    };
    return (
        <Fragment>
            <div className="form-wrapper auth">
		        <form onSubmit={onSubmit}>
                    <h2>
                        <i className="fa fa-lock"></i>
                        <span>Forgot Password</span>
                    </h2>
                    <input type="text" 
                            name="email" 
                            placeholder="Enter Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)} required/>
                    <button>Send</button>
                    <Alert />
		        </form>
	        </div>
        </Fragment>
    )
}
// Login.propTypes = {
//     //setAlert: PropTypes.func.isRequired,
//     login: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired
//   };
  
// const mapStateToProps = (state) => ({
//     auth: state.auth
// });

//export default connect(mapStateToProps, { login })(Login);
export default ForgotPassword;

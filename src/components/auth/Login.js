import React, { Fragment, useState } from 'react';
//import {Alert} from 'reactstrap';
//import axios from 'axios';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { Link, Redirect} from 'react-router-dom';
//import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
import { Alert as AlertStrap } from 'reactstrap';
const Login = ({auth:{isAuthenticated, token}, login}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
    
    const { email, password } = formData;
    
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = async (e) => {
    
        e.preventDefault();
        if(email === '' || password ==='') <AlertStrap color="danger">Email and Password is required</AlertStrap>
        else login(email, password);
        //console.log('IsAuthenticated = ', isAuthenticated);
        
    };
    if (isAuthenticated && token !== null) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <Fragment>
            <div className="form-wrapper auth">
		        <form onSubmit={onSubmit}>
                    {/* <div id="brand-image">	
                        <img src="../../img/fish-logo.png" alt="logo" />
                    </div> */}
                    <h2>
                        <span>Log in to Agriculturist</span>
                    </h2>
                   
                    <input type="text" 
                            name="email" 
                            placeholder="Enter Email"
                            value={email}
                            onChange={onChange} required/>
                    <input type="password" 
                            name="password" 
                            placeholder="Enter Password"
                            value={password}
                            onChange={onChange} />
                    <button>Login</button>
                    <span>Not a user? <Link to="/register">Register Here</Link></span>
                    <span><Link to="/forgotpassword">Forgot Password?</Link></span>
                    <Alert />
		        </form>
	        </div>
        </Fragment>
    )
}
Login.propTypes = {
    //setAlert: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { login })(Login);

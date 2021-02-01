import React, { Fragment, useState } from 'react';
//import {Alert} from 'reactstrap';
//import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Redirect} from 'react-router-dom';
//import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import '../../css/login.css';
import '../../css/responsive.css';
//import { LOGOUT } from '../../actions/types';
//import { setAlert } from '../../actions/alert';
import Alert from '../layout/Alert';

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
        login(email, password);
        //console.log('IsAuthenticated = ', isAuthenticated);
        
    };
    if (isAuthenticated && token !== null) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <Fragment>
            <div className="form-wrapper">
		        <form onSubmit={onSubmit}>
                    <h2>
                        <i className="fa fa-user"></i>
                        <span>Login</span>
                    </h2>
                    <input type="text" 
                            name="email" 
                            placeholder="Enter Username or Email"
                            value={email}
                            onChange={onChange} />
                    <input type="password" 
                            name="password" 
                            placeholder="Enter Password"
                            value={password}
                            onChange={onChange} />
                    <button>Login</button>
                    <span>Not a user? <Link to="/register">Register Here</Link></span>
                    <span><a href="#">Forgot Password?</a></span>
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

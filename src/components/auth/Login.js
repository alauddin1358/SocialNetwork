import React, { Fragment, useState } from "react";
//import {Alert} from 'reactstrap';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
//import { bindActionCreators } from 'redux';
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { loadUser } from "../../actions/auth";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "../../actions/types";
//import PropTypes from "prop-types";
import Alert from "../layout/Alert";
import { useForm } from "react-hook-form";
const API = process.env.REACT_APP_API;

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const { email, password } = "";
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors, getValues } = useForm({
    mode: "onTouched",
  });

  const registerOptions = {
    password: {
      required: "Password is required",
    },
    email: {
      required: "Email is required",
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:!*&$#\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/,
        message: "Enter a valid e-mail address",
      },
    },
  };
  const onSubmit = async () => {
    const { email, password } = getValues();
    setIsLoading(true);
    console.log("Email ", email);
    // console.log('pass', password );
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      const body = { email, password };
      const res = await axios.post(`${API}/login`, body, config);
      console.log("Login response", res.data);
      if (res.data.result.isError === "true") {
        dispatch(setAlert(res.data.result.message, "danger"));
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.data,
        });
        dispatch(loadUser());
      }
    } catch (err) {
      //const errors = err.response;
      dispatch(setAlert("Server Error", "danger"));
      console.log("Error in login = ", err);
      dispatch({
        type: LOGIN_FAIL,
      });
    }
    setIsLoading(false);
    //login(email, password);
    //reset();
    //console.log('IsAuthenticated = ', isAuthenticated);
  };
  if (isAuthenticated && token !== null) {
    return (
      <Redirect
        to={{
          pathname: "/dashboard",
          state: {
            showMyPost: false,
          },
        }}
      />
    );
  }
  return (
    <Fragment>
      <div className="form-wrapper auth">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center">
            <img
              src={
                process.env.PUBLIC_URL + "/img/Agriculturist-logo_150x191.png"
              }
              alt="logo"
            />
            <h2>
              <span>Login to Agriculturist</span>
            </h2>
          </div>
          {/* <h2>
                        <span>Log in to Agriculturist</span>
                    </h2> */}

          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            ref={register(registerOptions.email)}
          />
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            ref={register(registerOptions.password)}
          />
          {errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}
          <button disabled={isLoading}>
            {isLoading ? "Login...." : "Login"}
          </button>
          <span>
            Not a user? <Link to="/register">Register Here</Link>
          </span>
          <span>
            <Link to="/forgotpassword">Forgot Password?</Link>
          </span>
          <Alert />
        </form>
      </div>
    </Fragment>
  );
};
// Login.propTypes = {
//     auth: PropTypes.object.isRequired
//   };

// const mapStateToProps = (state) => ({
//     auth: state.auth
// });

export default Login;

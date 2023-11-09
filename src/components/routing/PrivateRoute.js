import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import Spinner from '../layout/Spinner';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => {
  console.log('isAuthenticated', isAuthenticated);
  console.log('Loadin in PR', loading);
  return (
    <>
    <Route {...rest}
      render={props =>
        !isAuthenticated ? (<Redirect to="/" />) :
          (<Component {...props} />)
      }
      />
    </>
  );
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
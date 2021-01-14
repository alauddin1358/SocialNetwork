import './App.css';
import React, { Fragment } from 'react';
//import {Registration} from './components/Registration';
import { Register } from './components/auth/Register';
import {Login} from './components/Login';
import {OTP} from './components/OTP';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navabr from './components/Navbar';

function App() {
  return (
    <Router>
        <Fragment>
          <Navabr />
          <section className="container">
            <Switch>
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={Login} />
              <Route exact path="/otp" component={OTP} />
            </Switch>
          </section>
      </Fragment>
    </Router>
  );
}

export default App;

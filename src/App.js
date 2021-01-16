//import './App.css';
import React, { Fragment, useEffect } from 'react';
//import {Registration} from './components/Registration';
import Register from './components/auth/Register';
//import {Login} from './components/Login';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navabr from './components/Navbar';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

const App = () => {
  useEffect(() => {
    console.log('calling useEffect');
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          
          <section>
            <Switch>
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;

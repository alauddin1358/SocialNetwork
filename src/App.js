//import './App.css';
import React, { Fragment, useEffect } from 'react';
//import {Registration} from './components/Registration';
import Register from './components/auth/Register';
//import {Login} from './components/Login';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PostDetail from './components/posts/PostDetail';
import Posts from './components/posts/Posts';
import AddPost from './components/posts/AddPost';
import PrivateRoute from './components/routing/PrivateRoute';
import ImageUpload from './components/ImageUpload';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import Navabr from './components/Navbar';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import UploadImage from './components/UploadImage';


const App = () => {
  useEffect(() => {
    console.log('calling useEffect');
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={ Login } />
            <Switch>
              <Route exact path="/register" component={ Register } />
              <Route exact path="/dashboard" component={ Dashboard } />
              <Route exact path="/login" component={ Login } />
              
              <PrivateRoute exact path="/postdetail" component={ PostDetail } />
              <PrivateRoute exact path="/post/:id" component={ Posts } />
              <PrivateRoute exact path="/addpost" component={ AddPost } />
              <Route exact path="/image" component={ ImageUpload } />
              <Route exact path="/upload" component={ UploadImage } />
            </Switch>
          
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;

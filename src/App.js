import React, { Fragment, useEffect } from 'react';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PostDetail from './components/posts/PostDetail';
import Posts from './components/posts/Posts';
import AddPost from './components/posts/AddPost';
import PrivateRoute from './components/routing/PrivateRoute';
import FileHome from './components/file/FileHome';
import Upload from './components/file/Upload';
import FilesList from './components/file/FilesList';
import FileView from './components/file/FileView';
import Profile from './components/profile/Profile';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

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
          <Route exact path="/" component={ Login } />
            <Switch>
              <Route exact path="/register" component={ Register } />
              <Route exact path="/dashboard" component={ Dashboard } />
              <Route exact path="/login" component={ Login } />
              
              <PrivateRoute exact path="/postdetail" component={ PostDetail } />
              <PrivateRoute exact path="/post/:id" component={ Posts } />
              <PrivateRoute exact path="/addpost" component={ AddPost } />
              <Route exact path="/file" component={ FileHome } />
              <Route exact path="/upload" component={Upload}  />
              <Route exact path="/list" component={FilesList}  />
              <Route exact path="/view/:filename" component={FileView}  />
              <Route exact path="/profile" component={Profile}  />
            </Switch>
          
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;

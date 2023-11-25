import React, { Fragment, useEffect } from 'react';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import HomePage from './components/dashboard/HomePage';
import PostDetail from './components/posts/PostDetail';
import Posts from './components/posts/Posts';
import AddPost from './components/posts/AddPost';
import PrivateRoute from './components/routing/PrivateRoute';
import FileHome from './components/file/FileHome';
import AddFile from './components/file/AddFile';
import FilesListContainer from './components/file/FilesListContainer';
import FileViewContainer from './components/file/FileViewContainer';
import Profile from './components/profile/Profile';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import ProfileSearchView from './components/profile/ProfileSearchView';
import ShowAdvertise from './components/dashboard/ShowAdvertise';
import UserListContainer from './components/auth/UserListContainer';
import AddFriend from './components/Friends/AddFriend';
import FriendListContainer from './components/Friends/FriendListContainer';
import SearchUserListContainer from './components/profile/SearchUserListContainer';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from './actions/auth';
import SharePage from './components/Share/SharePage';
import PrivacyPolicy from './components/Share/PrivacyPolicy';
import { removeAlert} from './actions/alert';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  // console.log('isAuthenticated app', isAuthenticated);
  // console.log('Loadin in app', loading);
  useEffect(() => {
    console.log('calling useEffect in app');
    store.dispatch(loadUser());
    //store.dispatch(getPendingFrUser);
  }, []);
  useEffect(() => {
    // Dispatch removeAlert action when the app initializes or upon page reload
    dispatch(removeAlert());
  }, [dispatch]);
  
  return (
    
      <Router>
        <Fragment>
          <Route exact path="/" component={ Login } />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgotpassword" component={ ForgotPassword } />
              <Route exact path="/resetpassword" component={ ResetPassword } />
              
              <PrivateRoute exact path="/dashboard" component={HomePage} />
              <PrivateRoute exact path="/postdetail" component={ PostDetail } />
              <PrivateRoute exact path="/post/:id" component={ Posts } />
              <PrivateRoute exact path="/addpost" component={ AddPost } />
              <PrivateRoute exact path="/file" component={ FileHome } />
              <PrivateRoute exact path="/addfile" component={AddFile}  />
              <PrivateRoute exact path="/list" component={FilesListContainer}  />
              <PrivateRoute exact path="/view/:filename" component={FileViewContainer}  />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/searchuser" component= {SearchUserListContainer} />
              <PrivateRoute exact path="/search" component={ProfileSearchView}  />
              <PrivateRoute exact path="/showadvertise" component={ShowAdvertise}  />
              <PrivateRoute exact path="/userlist" component={UserListContainer}  />
              <PrivateRoute exact path="/friends" component = {AddFriend} />
              <PrivateRoute exact path="/friendlist" component = {FriendListContainer} />
              <Route exact path="/sharepost/:id" component={SharePage} />
              <Route exact path="/privacypolicy" component={PrivacyPolicy} />
              {/* <PrivateRoute exact path="/profile" render={(props) => <Profile {...props}/>}  />
              <PrivateRoute exact path="/searchuser" render={(props) => <SearchUserListContainer {...props}/>} /> */}
              
            </Switch> 
          
        </Fragment>

      </Router>
  
  );
}

export default App;

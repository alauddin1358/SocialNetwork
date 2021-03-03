import React, { Fragment} from 'react';
import { Link, Redirect } from 'react-router-dom';
//import { connect } from 'react-redux';
//import { getAllUsers } from '../../actions/auth'
import Topbar from './Topbar';

import Sidebar from './Sidebar';
import Footer from './Footer';

import Alert from '../layout/Alert';

const ProfileSearchView = () => {
  return (
    <Fragment>
      <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar />
                        <Alert />
                        
                    </div>
                    <Footer />
                </div> 
            </div>
    </Fragment>
  )
}

export default ProfileSearchView

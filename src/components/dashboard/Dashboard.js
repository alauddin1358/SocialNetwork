import React, { Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { getAllUsers } from '../../actions/auth'
import Topbar from './Topbar';
import Pages from './Pages';
import Sidebar from './Sidebar';
import Footer from './Footer';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';


const Dashboard = ({logout, getAllUsers, auth: {isAuthenticated}}) => {
    // const clickLogout = () => {
    //     logout();
    // };
    useEffect(() => {
        console.log('calling useEffect in Dashboard');
        getAllUsers();
      }, [getAllUsers]);
    console.log('IsAuthenticated', isAuthenticated);
    if(!isAuthenticated) {
        return <Redirect to="/login" />
    }
    return (
        <Fragment>
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar />
                        <Alert />
                        <Pages />
                    </div>
                    <Footer />
                </div>
                
            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

            <div className="modal fade" id="logoutModal" tabIndex="-1" 
                role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select "Logout" below if you are ready to end your current session.
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <Link to="/" className="btn btn-primary" onClick={logout} >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
Dashboard.propTypes = {
    //setAlert: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, { logout, getAllUsers })(Dashboard);
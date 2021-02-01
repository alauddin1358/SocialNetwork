import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import Topbar from './Topbar';
import Pages from './Pages';
import Sidebar from './Sidebar';
import Footer from './Footer';
import PropTypes from 'prop-types';
import '../../css/style.css';
//import '../../css/sb-admin-2.min.css';

const Dashboard = ({logout, auth: {isAuthenticated}}) => {
    // const clickLogout = () => {
    //     logout();
    // };
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
                            <a className="btn btn-primary" onClick={logout} >
                                Logout
                            </a>
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
export default connect(mapStateToProps, { logout })(Dashboard);
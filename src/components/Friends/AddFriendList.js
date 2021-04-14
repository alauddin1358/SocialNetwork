import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Advertisement from '../dashboard/Advertisement';
import { getAllUsers } from '../../actions/auth';
import { sendFriendRequest, acceptFriendRequest, deleteFriendRequest } from '../../actions/friends';
import PropTypes from 'prop-types';
const AddFriendList = ({
  auth: { allUsers },
  getAllUsers,
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriendRequest
}) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);
  return (
    <Fragment>
      <div className='container-fluid'>
        <div
          className='d-sm-flex align-items-center 
                            justify-content-between mb-4'
        >
          <h1 className='h3 mb-0 text-gray-800'>Friends</h1>
        </div>
        <div className='row'>
          <div className='col-sm-12 col-md-6 col-lg-9'>
            <div className='card shadow mb-4'>
              <div className='card-header py-3'>
                <h6 className='m-0 font-weight-bold text-primary'>
                  Friend Requests
                </h6>
              </div>
              {allUsers.length > 0
                ? allUsers.map((user) => (
                    <div
                      key={user._id.$oid}
                      id='posts-list'
                      className='card-body friendCard'
                    >
                      <div className='post-card card'>
                        <Link
                          to={{
                            pathname: '/profile',
                            state: {
                              id: user._id.$oid,
                            },
                          }}
                        >
                          <div className='row'>
                            <div className='col-sm-4 col-md-4 col-lg-4'>
                              <img
                                src={user.image}
                                alt='User'
                                className='friendImageProfile'
                              />
                            </div>
                            <div className='col-sm-8 col-md-8 col-lg-8'>
                              <h3>{user.name}</h3>
                              <Link
                                to='/friends'
                                onClick={() => acceptFriendRequest(user._id.$oid)}
                                className='btn btn-primary'
                              >
                                Accept Request
                              </Link>
                              <Link 
                                to='/friends'
                                onClick={() => deleteFriendRequest(user._id.$oid)}
                                className='btn btn-secondary'>
                                Delete Request
                              </Link>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))
                : null}
            </div>
         
            <hr/>
         
            <div className='card shadow mb-4'>
              <div className='card-header py-3'>
                <h6 className='m-0 font-weight-bold text-primary'>
                  People You May Know
                </h6>
              </div>
              {allUsers.length > 0
                ? allUsers.map((user) => (
                    <div
                      key={user._id.$oid}
                      id='posts-list'
                      className='card-body friendCard'
                    >
                      <div className='post-card card'>
                        <Link
                          to={{
                            pathname: '/profile',
                            state: {
                              id: user._id.$oid,
                            },
                          }}
                        >
                          <div className='row'>
                            <div className='col-sm-4 col-md-4 col-lg-4'>
                              <img
                                src={user.image}
                                alt='User'
                                className='friendImageProfile'
                              />
                            </div>
                            <div className='col-sm-8 col-md-8 col-lg-8'>
                              <h3>{user.name}</h3>
                              <Link
                                to='/friends'
                                onClick={() => sendFriendRequest(user._id.$oid)}
                                className='btn btn-primary'
                              >
                                Add Friend
                              </Link>
                              <Link to='/friends' className='btn btn-secondary'>
                                Remove
                              </Link>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>

          <Advertisement />
        </div>
      </div>
    </Fragment>
  );
};
AddFriendList.propTypes = {
  //setAlert: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  sendFriendRequest: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { getAllUsers, sendFriendRequest, acceptFriendRequest, deleteFriendRequest })(
  AddFriendList
);

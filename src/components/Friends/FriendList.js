import React, { Fragment, useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Advertisement from '../dashboard/Advertisement';
import { getAllUsers, loadUser } from '../../actions/auth';
import { removeFriendFromFrList } from '../../actions/friends';
import PropTypes from 'prop-types';
const FriendList = ({
  auth: { allUsers, user },
  getAllUsers,
  loadUser,
  removeFriendFromFrList,
}) => {
  const [isSendRequest, setIsSendRequest] = useState(false);
  useEffect(() => {
    console.log('calling useEffect of FriendList');
    loadUser();
    getAllUsers();
    setIsSendRequest(isSendRequest);
  }, [getAllUsers, loadUser, isSendRequest]);
  //if(user !== null) console.log('User Friends', user.friends);
  //   var friendUser = [];
  //   friendUser = allUsers.filter(us => us._id.$oid === user.friends.map(friend => friend.$id.$oid));
  var friendUser = allUsers.reduce(function (filtered, option) {
    //console.log('Single option', option);
    var matchFriend = [];
    if (user !== null) {
      matchFriend = user.friends.filter(
        (friend) => friend.$id.$oid === option._id.$oid
      );
    }
    //console.log('Match Friend',matchFriend);
    if (matchFriend.length > 0) {
      filtered.push(option);
    }
    return filtered;
  }, []);
  //console.log('FriendUser ', friendUser);
  const unFriend = (id) => {
    removeFriendFromFrList(id);
    setIsSendRequest(!isSendRequest);
    window.location.replace('/friendlist');
  };
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
                <h6 className='m-0 font-weight-bold text-primary'>My Friend</h6>
              </div>
              {friendUser.length > 0 ? (
                friendUser.map((userFr) => (
                  <Fragment>
                    <div
                      id='posts-list'
                      className='card-body friendCard'
                      key={userFr._id.$oid}
                    >
                      <div className='post-card card'>
                        <div className='row'>
                          <div className='col-sm-12 col-md-4 col-lg-4'>
                            <img
                              src={userFr.image}
                              alt='User'
                              className='friendImageProfile'
                            />
                          </div>
                          <div className='col-sm-12 col-md-8 col-lg-8'>
                            <Link
                              to={{
                                pathname: '/profile',
                                state: {
                                  id: userFr._id.$oid,
                                },
                              }}
                            >
                              <h4>{userFr.name}</h4>
                            </Link>

                            <Link
                              to='/friendlist'
                              className='btn btn-primary'
                              data-toggle='modal'
                              data-target='#unFriendModal'
                            >
                              Unfriend
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className='modal fade'
                      id='unFriendModal'
                      tabIndex='-1'
                      role='dialog'
                      aria-labelledby='exampleModalLabel'
                      aria-hidden='true'
                    >
                      <div className='modal-dialog' role='document'>
                        <div className='modal-content'>
                          <div className='modal-header'>
                            <h5 className='modal-title' id='exampleModalLabel'>
                              Unfriend user
                            </h5>
                            <button
                              className='close'
                              type='button'
                              data-dismiss='modal'
                              aria-label='Close'
                            >
                              <span aria-hidden='true'>×</span>
                            </button>
                          </div>
                          <div className='modal-body'>
                            Select "Remove" below if you want to remove{' '}
                            {user !== null ? (
                              <span
                                style={{
                                  fontSize: 20,
                                  fontWeight: 'bold',
                                  fontFamily: 'cursive',
                                }}
                              >
                                {user.name}
                              </span>
                            ) : null}{' '}
                            from your friend list.
                          </div>
                          <div className='modal-footer'>
                            <button
                              className='btn btn-secondary'
                              type='button'
                              data-dismiss='modal'
                            >
                              Cancel
                            </button>
                            <Link
                              to='/friendlist'
                              className='btn btn-primary'
                              onClick={() => unFriend(userFr._id.$oid)}
                            >
                              Remove
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))
              ) : (
                <p
                  style={{
                    paddingLeft: 20,
                    paddingTop: 10,
                    fontWeight: 'bold',
                  }}
                >
                  No friends yet. Send friend request to add your friend in your
                  friend list
                </p>
              )}
            </div>
          </div>
          <Advertisement />
        </div>
      </div>
    </Fragment>
  );
};
FriendList.propTypes = {
  //setAlert: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getAllUsers,
  loadUser,
  removeFriendFromFrList,
})(FriendList);

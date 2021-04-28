import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Advertisement from '../dashboard/Advertisement';
import { getAllUsers, loadUser } from '../../actions/auth';
import {
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriendRequest,
  cancelFriendRequest,
} from '../../actions/friends';
import PropTypes from 'prop-types';
const AddFriendList = ({
  auth: { allUsers, user },
  getAllUsers,
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriendRequest,
  cancelFriendRequest,
  loadUser,
}) => {
  const [isSendRequest, setIsSendRequest] = useState(false);
  useEffect(() => {
    console.log('calling useEffect of AddFriendList');
    loadUser();
    getAllUsers();
    setIsSendRequest(isSendRequest);
    //console.log('calling addfriend  useeffect');
    //console.log('IsRequest',isSendRequest);
  }, [getAllUsers, loadUser, isSendRequest]);
  // const [pendinFriend, setPendinFriend] = useState([]);
  // const [friendSuggestion, setFriendSuggestion] = useState([]);
  // const [isSetPenFr, setIsSetPenFr] = useState(true);
  // const [isSetFrsug, setIsSetFrsug] = useState(true);
  var pendingFriend = [];
  if (allUsers.length > 0) {
    pendingFriend = allUsers.reduce(function (filtered, option) {
      var matchFriend = [];
      if (user !== null) {
        if (user.hasOwnProperty('friend_pending')) {
          matchFriend = user.friend_pending.filter(
            (friend) => friend.$id.$oid === option._id.$oid
          );
        }
      }
      if (matchFriend.length > 0) {
        filtered.push(option);
      }
      return filtered;
    }, []);
  }

  // if(isSetPenFr) {
  //   setPendinFriend(pendFriend);
  //   setIsSetPenFr(false);
  // }
  var friendSuggestion = [];
  var suggestedFriend = [];
  if (user !== null) {
    friendSuggestion = allUsers.filter(
      (allu) => allu._id.$oid !== user._id.$oid
    );
    suggestedFriend = user.friends.reduce(function (filtered, option) {
      filtered.push(option.$id.$oid);
      return filtered;
    }, []);
  }

  var end = 0;
  for (var i = 0; i < friendSuggestion.length; i++) {
    var obj = friendSuggestion[i];
    //console.log('Friend Obj', obj._id.$oid);
    if (suggestedFriend.indexOf(obj._id.$oid) === -1) {
      //console.log('True');
      friendSuggestion[end++] = obj;
    }
  }
  friendSuggestion.length = end;
  // if(isSetFrsug) {
  //   setFriendSuggestion(frndSuggestion);
  //   setIsSetFrsug(false);
  // }
  const addFriendRequest = (id) => {
    sendFriendRequest(id);
    setIsSendRequest(!isSendRequest);
  };
  const cancelFrRequest = (id) => {
    cancelFriendRequest(id);
    setIsSendRequest(!isSendRequest);
  };
  const deleteFrRequest = (id) => {
    deleteFriendRequest(id);
    setIsSendRequest(!isSendRequest);
  };
  const acceptFrRequest = (id) => {
    acceptFriendRequest(id);
    setIsSendRequest(!isSendRequest);
  };
  //console.log('user friends', user.friends);
  //console.log('Suggestion Friend', friendSuggestion);
  //console.log(suggestedFriend);

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
              {pendingFriend.length > 0
                ? pendingFriend.map((pendingFr) => (
                    <div
                      key={pendingFr._id.$oid}
                      id='posts-list'
                      className='card-body friendCard'
                    >
                      <div className='post-card card'>
                        <div className='row'>
                          <div className='col-sm-12 col-md-12 col-lg-4'>
                            <img
                              src={pendingFr.image}
                              alt={pendingFr.name}
                              className='friendImageProfile'
                            />
                          </div>
                          <div className='col-sm-12 col-md-12 col-lg-8'>
                            <Link
                              to={{
                                pathname: '/profile',
                                state: {
                                  id: pendingFr._id.$oid,
                                },
                              }}
                            >
                              <h4>{pendingFr.name}</h4>
                            </Link>

                            <Link
                              to='/friends'
                              onClick={() =>
                                acceptFrRequest(pendingFr._id.$oid)
                              }
                              className='btn btn-primary'
                              style={{ marginRight: 5 }}
                            >
                              Accept Request
                            </Link>
                            <Link
                              to='/friends'
                              onClick={() =>
                                deleteFrRequest(pendingFr._id.$oid)
                              }
                              className='btn btn-secondary'
                            >
                              Delete Request
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>

            <hr />

            <div className='card shadow mb-4'>
              <div className='card-header py-3'>
                <h6 className='m-0 font-weight-bold text-primary'>
                  People You May Know
                </h6>
              </div>
              {friendSuggestion.length > 0
                ? friendSuggestion.map((frUser) => (
                    <div
                      key={frUser._id.$oid}
                      id='posts-list'
                      className='card-body friendCard'
                    >
                      <div className='post-card card'>
                        <div className='row'>
                          <div className='col-sm-12 col-md-12 col-lg-4'>
                            <img
                              src={frUser.image}
                              alt='User'
                              className='friendImageProfile'
                            />
                          </div>
                          <div className='col-sm-12 col-md-12 col-lg-8'>
                            <Link
                              to={{
                                pathname: '/profile',
                                state: {
                                  id: frUser._id.$oid,
                                },
                              }}
                            >
                              <h4>{frUser.name}</h4>
                            </Link>
                            {frUser.hasOwnProperty('friend_pending') ? (
                              frUser.friend_pending.filter(
                                (fr) => fr.$id.$oid === user._id.$oid
                              ).length > 0 ? (
                                <>
                                  <Link
                                    to='/friends'
                                    onClick={() =>
                                      cancelFrRequest(frUser._id.$oid)
                                    }
                                    className='btn btn-secondary'
                                  >
                                    Cancel Request
                                  </Link>
                                </>
                              ) : (
                                <>
                                  <Link
                                    to='/friends'
                                    onClick={() =>
                                      addFriendRequest(frUser._id.$oid)
                                    }
                                    className='btn btn-primary'
                                  >
                                    Add Friend
                                  </Link>
                                </>
                              )
                            ) : (
                              <>
                                <Link
                                  to='/friends'
                                  onClick={() =>
                                    sendFriendRequest(frUser._id.$oid)
                                  }
                                  className='btn btn-primary'
                                >
                                  Add Friend
                                </Link>
                              </>
                            )}
                          </div>
                        </div>
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
export default connect(mapStateToProps, {
  getAllUsers,
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriendRequest,
  cancelFriendRequest,
  loadUser,
})(AddFriendList);

import React, { Fragment, useEffect } from 'react';
import Sidebar from '../dashboard/Sidebar';
import Footer from '../dashboard/Footer';
import Topbar from '../dashboard/Topbar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Advertisement from '../dashboard/Advertisement';
import { getAllUsers, loadUser } from '../../actions/auth';
import {
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriendRequest,
} from '../../actions/friends';
import PropTypes from 'prop-types';
const FriendList = ({ auth: { allUsers, user }, getAllUsers, loadUser }) => {
  useEffect(() => {
      loadUser();
    getAllUsers();
  }, [getAllUsers, loadUser]);
  if(user !== null) console.log('User Friends', user.friends);
//   var friendUser = [];
//   friendUser = allUsers.filter(us => us._id.$oid === user.friends.map(friend => friend.$id.$oid));
  var friendUser = allUsers.reduce(function(filtered, option) {
    //console.log('Single option', option);
    var matchFriend = [];
    if(user !== null) {
        matchFriend = user.friends.filter(friend => friend.$id.$oid === option._id.$oid)
    }
    //console.log('Match Friend',matchFriend);
    if (matchFriend.length > 0) {
       filtered.push(option);
    }
    return filtered;
  }, []);
console.log('FriendUser ', friendUser);
  return (
    <Fragment>
      <div id='wrapper'>
        <Sidebar />
        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Topbar />
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
                        My Friend
                      </h6>
                    </div>
                    { friendUser.length > 0
                      ? friendUser.map((userFr) => (
                          <div
                            key={userFr._id.$oid}
                            id='posts-list'
                            className='card-body friendCard'
                          >
                            <div className='post-card card'>
                              <Link
                                to={{
                                  pathname: '/profile',
                                  state: {
                                    id: userFr._id.$oid,
                                  },
                                }}
                              >
                                <div className='row'>
                                  <div className='col-sm-4 col-md-4 col-lg-4'>
                                    <img
                                      src={userFr.image}
                                      alt='User'
                                      className='friendImageProfile'
                                    />
                                  </div>
                                  <div className='col-sm-8 col-md-8 col-lg-8'>
                                    <h3>{userFr.name}</h3>
                                    <Link
                                      to='/friends'
                                      onClick={() =>
                                        sendFriendRequest(userFr._id.$oid)
                                      }
                                      className='btn btn-primary'
                                    >
                                      Unfriend
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
          </div>
          <Footer />
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
export default connect(mapStateToProps, { getAllUsers, loadUser })(FriendList);

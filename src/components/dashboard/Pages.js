import React, { Fragment, useEffect } from 'react'
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import Advertisement from './Advertisement';
const Pages = ({ getPosts, post: {posts, loading}}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center 
                            justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                </div>
                
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-9">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">
                                    Posts</h6>
                            </div>
                            <div id="posts-list" className="card-body">
                                <div className="post-card card">
                                        {loading || posts === null ? (<Spinner />) : (posts.map((post) => (
                                            <PostItem key={post._id.$oid} post={post} />
                                        )))}
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <Advertisement />
                </div>
                <img src="../../img/Ad matter FSCTT Project-Mujib Borsho.jpg" alt="Agriculture"/>
            </div>
        </Fragment>
    )
}
Pages.propTypes = {
    //setAlert: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    isSuccess: PropTypes.bool
  };
  
const mapStateToProps = (state) => ({
    post : state.post
});
export default connect(mapStateToProps, { getPosts })(Pages); 

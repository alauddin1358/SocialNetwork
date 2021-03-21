import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import formatDate from '../../utils/formatDate';
import PropTypes from 'prop-types';
import Advertisement from '../dashboard/Advertisement';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
const PostDetail = ({getPost, post:{post, loading}, match, auth:{user}}) => {
    useEffect(() => {
        console.log("Calling Getpost in useeffect");
        getPost(match.params.id);
    }, [getPost, match.params.id]);
    console.log("postDetail = ", post);
    //console.log("postDetail postId = ",post._id.$oid);
    return loading || post === null ? (
        <Spinner />
      ) : (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-8 col-lg-9">
                        <div className="card-body shadow mb-4">
                            <h3>{post.title}</h3>
                            <div className="post-info">
                                <small><i className="fa fa-calendar"></i>Publish Date: {formatDate(post.date.$date)}</small>
                                <small><i className="fa fa-user"></i>Author: {post.user.status}</small>
                            </div>
                            <div id="post-details">
                                <p>
                                {post.body}
                                </p>
                            </div>
                        </div>
                        <div className="card-body shadow mb-4">
                            <h3>Comments</h3>
                            <CommentForm postId={post._id.$oid}/>
                            <Alert />
                            <div id="comments">
                                {post.comments !== null ? (post.comments.map((comment) => (
                                    <CommentItem key={comment._id.$oid} user={user} comment={comment} postId={post._id.$oid} />
                                ))): null }
                            
                            </div>
                        </div>
                    </div>
                    <Advertisement />
                </div>
            </div>
           
        </Fragment>
    )
}
PostDetail.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  };
  
const mapStateToProps = (state) => ({
    post : state.post,
    auth: state.auth
});
export default connect(mapStateToProps, { getPost })(PostDetail);


import React, { Fragment } from 'react'
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import formatDate from '../../utils/formatDate';
import { deleteComment } from '../../actions/post';

const CommentItem = ({postId, comment}) => {
    console.log("Comment List = ", comment);
    return (
        <Fragment>
            <div className="comment">
                <img src={comment.user.image} alt="user" />
                <span>
                    {comment.cmntBody}
                </span>
            </div>
        </Fragment>
    )
}
CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
    auth: state.auth
});
  
export default connect(mapStateToProps, { deleteComment })(CommentItem);
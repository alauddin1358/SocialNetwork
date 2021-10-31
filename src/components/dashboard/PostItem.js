import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
const ADMIN = process.env.REACT_APP_ADMIN;
const PostItem = ({deletePost, postOwner, post:{_id, title, body, date,user}}) => {
    //console.log('Id in postItem', _id);
    const [deleteId, setDeleteId] = useState(null);
    //Set ID for delete
    const postDeleteId = (id) => {
        console.log('Dellete id ',id);
        setDeleteId(id);
    }
    return (
    <>
        <div className="card-body">
            <h5><Link to={`/post/${_id.$oid}`}>
               {title} </Link>
            </h5>
            <p>
                {body}
            </p>
            <div>
                <small><i className="fa fa-calendar"></i>
                    Publish Date: {formatDate(date.$date)}
                </small>
                <small><i className="fa fa-user"></i>
                    Author: {user.status}
                </small>
                <small><i className="fa fa-comments"></i>
                    <Link to={`/post/${_id.$oid}`}>
                        comment
                    </Link>
                </small>
                {postOwner._id.$oid === user.userId.$oid || postOwner.email === ADMIN ? (<small>
                    <i className="fas fa-pen"></i>
                    <Link to={{
                        pathname: '/addpost',
                        state: {
                            id: _id.$oid,
                            edit: true
                        }
                    }}>
                        edit
                    </Link>
                </small>):null }
                { postOwner._id.$oid === user.userId.$oid || postOwner.email === ADMIN ?
                (<small>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                    <Link to="/dashboard" data-toggle='modal'
                          data-target='#postDeleteModal'
                          onClick={()=>postDeleteId(_id.$oid)}>
                        delete
                    </Link>
                </small> ): null}
            </div>
        </div>
        <div className="modal fade" id="postDeleteModal" tabIndex="-1" 
                role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Delete Post</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">Do you really want to delete the Post?</div>
                    <div className="modal-footer">
                    <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <Link to="/dashboard" className="btn btn-primary" 
                          onClick={() => deletePost(deleteId)} data-dismiss="modal"
                    >
                        Delete
                    </Link>
                    </div>
                </div>
                </div>
        </div>
    </>
    )
}
export default PostItem;
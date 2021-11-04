import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { FacebookShareButton, LinkedinShareButton } from "react-share";
import { FacebookIcon, LinkedinIcon} from "react-share";
import ShareModal from './ShareModal';
import PostDeleteModal from './PostDeleteModal';
const ADMIN = process.env.REACT_APP_ADMIN;
const PostItem = ({deletePost, postOwner, post:{_id, title, body, date,user}}) => {
    //console.log('Id in postItem', _id);
    const [deleteId, setDeleteId] = useState(null);
    const [postBody, setPostBody] = useState({
        id: null,
        body: "",
        title: ""
    });
    const [show, setshow] = useState(false);
    const [deletemodalshow, setDeletemodalshow] = useState(false); 
    //Set ID for delete
    const postDeleteId = (id) => {
        console.log('Dellete id ',id);
        setDeleteId(id);
        setDeletemodalshow(true);
        console.log('deletemodalshow', deletemodalshow);
    }
    const postBodyFunc = (id, body, title) => {
        setPostBody({
            id: id,
            body:body,
            title:title
        });
        setshow(true);
    }
    const handleClose = () => {
   
        setshow(false);
        setDeletemodalshow(false);
        
      };
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
                <small><i className="fas fa-share"></i>
                    <Link to="/dashboard" 
                          onClick={()=>postBodyFunc(_id.$oid, body, title)}
                    >
                        share
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
                    <Link to="/dashboard"
                          onClick={()=>postDeleteId(_id.$oid)}>
                        delete
                    </Link>
                </small> ): null}
            </div>
        </div>
        {/* <div className="modal fade" id="postDeleteModal" tabIndex="-1" 
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
        </div> */}
        <ShareModal
          show={show}
          data={postBody}
          onClick={handleClose}
          onHide={handleClose} />
        
        <PostDeleteModal
          show={deletemodalshow}
          deleteId={deleteId}
          onClick={handleClose}
          onHide={handleClose}
          deletePost = {deletePost} />
        
                           
    </>
    )
}
export default PostItem;
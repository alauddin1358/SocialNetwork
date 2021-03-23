import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

const PostItem = ({deletePost, postOwner, post:{_id, title, body, date,user}}) => {
    console.log('Id in postItem', _id);
    return (
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
                {postOwner._id.$oid === user.userId.$oid ? (<small>
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
                { postOwner._id.$oid === user.userId.$oid ?
                (<small>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                    <Link to="/dashboard" onClick={()=>deletePost(_id.$oid)}>
                        delete
                    </Link>
                </small> ): null}
            </div>
        </div>
    )
}
export default PostItem;
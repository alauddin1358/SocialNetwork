import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
const PostItem = ({post:{_id, title, body, date,user}}) => {
    console.log("PostItem = ", _id.$oid);
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
            </div>
        </div>
    )
}
export default PostItem;
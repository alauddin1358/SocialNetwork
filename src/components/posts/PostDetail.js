import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getPost } from '../../actions/post';
import formatDate from '../../utils/formatDate';
import PropTypes from 'prop-types';
import '../../css/style.css';

const PostDetail = ({getPost, post: { post }, match}) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match.params.id]);
    return (
        
        <Fragment>
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
                        <p>
                            <img src="../../img/user-profile.png" alt="UserPictures" width="600" />
                        </p>
                    </div>
                </div>
                <div className="card-body shadow mb-4">
                    <h3>Comments</h3>
                    <form action="#" className="comment-form">
                        <div className="form-group">
                            <textarea name="" id="" rows="3" placeholder="Enter your comment"></textarea>
                        </div>
                        <div className="form-group text-right">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                    <div id="comments">
                        <div className="comment">
                            <img src="../../img/user-profile.png" alt="user" />
                            <span>
                                Lorem ipsum, dolor sit amet consectetur, adipisicing elit. Reprehenderit harum ipsum corrupti cupiditate corporis, animi itaque aliquam nostrum dolores? Aliquid accusantium necessitatibus laudantium fuga. Eius asperiores at placeat nostrum cum, dolore eum vitae nam ut unde quo. Modi placeat fuga at accusantium tempore maxime non sint. In facilis, doloribus ab?
                            </span>
                            <div className="comment">
                                <img src="../../img/user-profile.png" alt="user" />
                                <span>
                                    Lorem ipsum, dolor sit amet consectetur, adipisicing elit. Delectus in non blanditiis velit natus ex veritatis aut dolorum consequuntur a pariatur asperiores, magnam, laudantium explicabo doloribus earum veniam possimus. Ipsam corporis, voluptate molestiae delectus consequuntur nemo odio sint eum sunt.
                                </span>
                            </div>                                        
                            <div className="comment">
                                <img src="../../img/user-profile.png" alt="user" />
                                <span>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti ipsum iure earum similique voluptatem quaerat eos. Perspiciatis aliquam nobis beatae officiis dolorum eos reprehenderit libero asperiores. Cumque sint fugiat ut.
                                </span>
                            </div>
                        </div>
                        <div className="comment">
                            <img src="../../img/user-profile.png" alt="user" />
                            <span>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque esse voluptatem cumque ratione fugit excepturi id deserunt nihil veritatis, mollitia reiciendis minus, molestiae ea tempore, rerum, quae inventore facere aspernatur sint saepe cum blanditiis distinctio dignissimos non. Itaque quisquam odio temporibus, modi laudantium reiciendis iusto sint, eius quis dolorem quam!
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
PostDetail.propTypes = {
    getPost: PropTypes.func.isRequired
  };
  
const mapStateToProps = (state) => ({
    post : state.post
});
export default connect(mapStateToProps, { getPost })(PostDetail);

import React, { Fragment, useState, useEffect } from 'react';
//import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { addPost, getPost } from '../../actions/post';
import Advertisement from '../dashboard/Advertisement';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
import '../../css/style.css';
const initialState = {
    title : '',
    body : ''
}
const NewPost = ({propsFromLink, addPost, post:{posts, loading}}) => {
    const [postData, setPostData] = useState(initialState)
    const [isSubmit, setIsSubmit] = useState(false);
    let {id, edit} = propsFromLink;
    useEffect(() => {
        
        let post;
        if (edit) {
            //getPost(id);
            post = posts.filter((post) => post._id.$oid === id)
            post = Object.assign({}, post[0]);
        } 
        console.log('Loading in newPost = ', loading);
        if (!loading && post) {
          const postData = { ...initialState };
          for (const key in post) {
            if (key in postData) {
                postData[key] = post[key];
            }
          }
          setPostData(postData);
        }
      },[loading,posts, propsFromLink]);
    const { title, body } = postData;
    const onChange = (e) =>
        setPostData({ ...postData, [e.target.name]: e.target.value });

    const onPostSubmit = async (e) => {
        e.preventDefault();
        addPost(postData,  propsFromLink.id, propsFromLink.edit);
        setIsSubmit(true);
    };
    
    if(isSubmit) {
        // console.log('IsSubmit  ',isSubmit);
        // setIsSubmit(false);
        return <Redirect to = "/dashboard" />;
    }
    return (
        <Fragment>
            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-9">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Add Post</h6>
                        </div>
                        <div id="posts-list" className="card-body">                 
                            <form onSubmit={onPostSubmit}>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" 
                                            className="form-control" 
                                            id="title" 
                                            placeholder="Enter Title" 
                                            name="title"
                                            value={title}
                                            onChange={onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="body">Body</label>
                                    <textarea className="form-control" id="body" 
                                            placeholder="Enter Body" rows="5" 
                                            name="body"  value={body}
                                            onChange={onChange} >
                                    </textarea>
                                </div>
                                {/* <div className="form-group">
                                    <label htmlFor="category">Category</label>
                                        <select className="form-control" id="category" 
                                                name="category"  value={category}
                                            onChange={onChange}>
                                            <option value="">Select Category</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tags">Tags</label>
                                        <input type="email" 
                                                className="form-control" id="tags" 
                                                placeholder="Enter Tags"
                                                name="tags" value={tags}
                                                onChange={onChange} />
                                </div> */}
                                {
                                    edit ? (
                                        <div className='update-file-btn'>
                                            <button type="submit" className="btn btn-primary">Update Post</button>
                                            <Link to='/dashboard'
                                                className='btn btn-danger'
                                            >
                                                Cancel
                                            </Link>
                                        </div>
                                    ):(
                                        <button type="submit" className="btn btn-primary">Add Post</button>
                                    )
                                    
                                }
                                
                                <Alert />
                            </form>      
                        </div>
                    </div>
                </div>
                <Advertisement />
            </div>
        </Fragment>
    )
}
NewPost.propTypes = {
    //setAlert: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    getPost: PropTypes.func.isRequired,
    isSuccess: PropTypes.bool
  };
  
const mapStateToProps = (state) => ({
    isSuccess: state.post.isSuccess,
    post:state.post
});
export default connect(mapStateToProps, { addPost, getPost })(NewPost);    

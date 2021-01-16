import React, { Fragment } from 'react'

const Pages = () => {
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
                                    <div className="card-body">
                                        <h5><a href="post-details.html">
                                            Title of the Post</a>
                                        </h5>
                                        <p>
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, molestiae adipisci. 
                                            Error inventore harum tempora libero natus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, molestiae adipisci. 
                                            Error inventore harum tempora libero natus, repudiandae ipsum facere?
                                        </p>
                                        <div>
                                            <small><i className="fa fa-calendar"></i>
                                                Publish Date: 24th February, 2020
                                            </small>
                                            <small><i className="fa fa-user"></i>
                                                Author: Admin
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-card card">
                                    <div className="card-body">
                                        <h5><a href="post-details.html">
                                            Title of the Post</a>
                                        </h5>
                                        <p>
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, molestiae adipisci. 
                                            Error inventore harum tempora libero natus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, molestiae adipisci. 
                                            Error inventore harum tempora libero natus, repudiandae ipsum facere?
                                        </p>
                                        <div>
                                            <small><i className="fa fa-calendar"></i>
                                                Publish Date: 24th February, 2020
                                            </small>
                                            <small><i className="fa fa-user"></i>
                                                Author: Admin
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-card card">
                                    <div className="card-body">
                                        <h5><a href="post-details.html">
                                            Title of the Post</a>
                                        </h5>
                                        <p>
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, molestiae adipisci. 
                                            Error inventore harum tempora libero natus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, molestiae adipisci. 
                                            Error inventore harum tempora libero natus, repudiandae ipsum facere?
                                        </p>
                                        <div>
                                            <small><i className="fa fa-calendar"></i>
                                                    Publish Date: 24th February, 2020</small>
                                            <small><i className="fa fa-user"></i>Author: Admin</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-card card">
                                    <div className="card-body">
                                        <h5><a href="post-details.html">
                                            Title of the Post</a></h5>
                                        <p>
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, molestiae adipisci. 
                                            Error inventore harum tempora libero natus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, molestiae adipisci. 
                                            Error inventore harum tempora libero natus, repudiandae ipsum facere?
                                        </p>
                                        <div>
                                            <small><i className="fa fa-calendar"></i>Publish Date: 24th February, 2020</small>
                                            <small><i className="fa fa-user"></i>Author: Admin</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-card card">
                                    <div className="card-body">
                                        <h5><a href="post-details.html">Title of the Post</a></h5>
                                        <p>
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, molestiae adipisci. 
                                            Error inventore harum tempora libero natus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, molestiae adipisci. 
                                            Error inventore harum tempora libero natus, repudiandae ipsum facere?
                                        </p>
                                        <div>
                                            <small><i className="fa fa-calendar"></i>Publish Date: 24th February, 2020</small>
                                            <small><i className="fa fa-user"></i>Author: Admin</small>
                                        </div>
                                    </div>
                                </div>
                                <div id="pagination">
                                    <a href="#" className="inactive">Previous</a>
                                    <a href="#">1</a>
                                    <a href="#">2</a>
                                    <a href="#" className="active">3</a>
                                    <a href="#">4</a>
                                    <a href="#">5</a>
                                    <a href="#">Next</a>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Advertisements</h6>
                            </div>
                            <div id="advertisements" className="card-body">
                                <div className="advertisement"></div>
                                <div className="advertisement"></div>
                                <div className="advertisement"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Pages;
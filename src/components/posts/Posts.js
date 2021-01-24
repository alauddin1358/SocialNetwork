import React, { Fragment } from 'react';
import PostDetail from './PostDetail';
import Sidebar from '../dashboard/Sidebar';
import Footer from '../dashboard/Footer';
import Topbar from '../dashboard/Topbar';
const Posts = ({match}) => {
    return (
        <Fragment>
            <div id="wrapper">
            <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar />
                        <PostDetail match={match}/>
                    </div>
                    <Footer />
                </div>
            </div>
        </Fragment>
    )
}
export default Posts;
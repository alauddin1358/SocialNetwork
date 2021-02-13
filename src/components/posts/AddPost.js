import React, { Fragment } from 'react';
import NewPost from './NewPost';
import Sidebar from '../dashboard/Sidebar';
import Footer from '../dashboard/Footer';
import Topbar from '../dashboard/Topbar';
//import '../../css/style.css';
//import '../../css/sb-admin-2.min.css';

const Posts = () => {
    return (
        <Fragment>
            <div id="wrapper">
            <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar />
                        <NewPost />
                    </div>
                    <Footer />
                </div>
            </div>
        </Fragment>
    )
}
export default Posts;
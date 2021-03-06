import React, { Fragment } from 'react';
import NewPost from './NewPost';
import Sidebar from '../dashboard/Sidebar';
import Footer from '../dashboard/Footer';
import Topbar from '../dashboard/Topbar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//import '../../css/style.css';
//import '../../css/sb-admin-2.min.css';

const AddPost = (props) => {
    const propsFromLink = props.location.state;
    console.log('Props From Link = ', propsFromLink);
    return (
        <Fragment>
            <div id="wrapper">
            <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar />
                        <NewPost propsFromLink={propsFromLink}/>
                    </div>
                    <Footer />
                </div>
            </div>
        </Fragment>
    )
}
export default withRouter(connect()(AddPost));
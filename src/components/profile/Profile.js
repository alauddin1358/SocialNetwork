import React, { Fragment } from 'react'
import Topbar from '../dashboard/Topbar';
import Sidebar from '../dashboard/Sidebar';
import Footer from '../dashboard/Footer';
import ProfilePage from './ProfilePage';
const profile = () => {
    return (
        <Fragment>
            <div id="wrapper">
            <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar />
                        <ProfilePage />
                    </div>
                    <Footer />
                </div>
            </div>
        </Fragment>
    )
}

export default profile

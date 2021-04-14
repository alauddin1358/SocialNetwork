import React, { Fragment } from 'react';
import AddFriendList from './AddFriendList';
import Sidebar from '../dashboard/Sidebar';
import Footer from '../dashboard/Footer';
import Topbar from '../dashboard/Topbar';

const AddFriend = () => {
    return (
        <Fragment>
           <div id="wrapper">
            <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar />
                        <AddFriendList />
                    </div>
                    <Footer />
                </div>
            </div> 
        </Fragment>
    )
}

export default AddFriend

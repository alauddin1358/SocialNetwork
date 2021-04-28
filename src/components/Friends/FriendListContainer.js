import React, {Fragment} from 'react'
import Sidebar from '../dashboard/Sidebar';
import Footer from '../dashboard/Footer';
import Topbar from '../dashboard/Topbar';
import Alert from '../layout/Alert';
import FriendList from './FriendList';
const FriendListContainer = () => {
    return (
        <Fragment>
            <div id="wrapper">
            <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar />
                        <Alert />
                        <FriendList />
                    </div>
                    <Footer />
                </div>
            </div> 
        </Fragment>
    )
}

export default FriendListContainer

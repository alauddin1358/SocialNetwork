import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
const Sidebar = () => {
    return (
        <Fragment>
            <ul className="navbar-nav bgGradientPrimary sidebar sidebar-dark accordion" 
                    id="accordionSidebar">
                    {/* <Link to="/dashboard" className="sidebar-brand d-flex align-items-center justify-content-center" >
                        <div className="sidebar-brand-text mx-3">
                            World Intelligentsia Network
                        </div>
                    </Link> */}
                    <Link to="/dashboard" id="brand-image">
                        <img src="img/Social_Fish2.png" alt="Agriculturist Logo"/>
                        <span>Agriculturist</span>
                    </Link>
                    <hr className="sidebar-divider my-0" />
                    <li className="nav-item active">
                        <Link className="nav-link" to="/dashboard">
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <hr className="sidebar-divider" />
                    <div className="sidebar-heading">
                        Interface
                    </div>

                    <li className="nav-item">
                        <Link className="nav-link" to={{
                                    pathname: '/addpost',
                                    state: {
                                        id: null,
                                        edit: false
                                    }
                            }}>Add Post</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePosts"
                            aria-expanded="true" aria-controls="collapsePosts">
                            <i className="fas fa-fw fa-folder"></i>
                            <span>Files</span> 
                        </a>
                        <div id="collapsePosts" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <Link className="collapse-item" to="/upload">Add File</Link>
                                <Link className="collapse-item" to="/list">Show Files</Link>
                            </div>
                        </div>
                    </li>

                    <hr className="sidebar-divider" />

                    <hr className="sidebar-divider d-none d-md-block" />

                    <div className="text-center d-none d-md-inline">
                        <button className="rounded-circle border-0" id="sidebarToggle"></button>
                    </div>

                </ul>
        </Fragment>
    )
}
export default Sidebar;

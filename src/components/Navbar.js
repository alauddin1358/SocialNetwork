import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Navabr = () => {
  useEffect(() => {
    console.log('Calling UseEffect');
  return () => {
    console.log('Return UseEffect');
    }
  }, []);
    const authLinks = (
        <ul>
          <li>
            <Link to="/profiles">Profiles</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/dashboard">
              <i className="fas fa-user" />{' '}
              <span className="hide-sm">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <i className="fas fa-sign-out-alt" />{' '}
              <span className="hide-sm">Logout</span>
            </Link>
          </li>
        </ul>
      );
    
      const guestLinks = (
        <ul>
          <li>
            <Link to="/profiles">Profiles</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code" /> Alauddin
                </Link>
            </h1>
            <Fragment>{guestLinks}</Fragment>
        </nav>
    )
}

  
export default Navabr;

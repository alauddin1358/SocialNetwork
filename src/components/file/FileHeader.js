import React from 'react';
import { NavLink } from 'react-router-dom';

const FileHeader = () => {
  return (
    <div className="header">
      <h1>File Upload And Download</h1>
      <nav>
        <NavLink activeClassName="active" to="/upload">
          Home
        </NavLink>
        <NavLink activeClassName="active" to="/list">
          Files List
        </NavLink>
      </nav>
    </div>
  );
};

export default FileHeader;
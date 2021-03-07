import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
//import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import {Link} from 'react-router-dom';
import { logout } from '../../actions/auth';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';

const Topbar = ({auth:{user, allUsers}, logout}) => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    
    
    function escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
      
    function getSuggestions(value) {
        const escapedValue = escapeRegexCharacters(value.trim());
        
        if (escapedValue === '') {
          return [];
        }
      
        const regex = new RegExp('\\b' + escapedValue, 'i');
        
        return allUsers.filter(user => regex.test(getSuggestionValue(user)));
      }
      
      function getSuggestionValue(suggestion) {
        console.log(suggestion);
        return `${suggestion.firstname} ${suggestion.middlename} ${suggestion.lastname}`;
      }
      
      function renderSuggestion(suggestion, { query }) {
        const suggestionText = `${suggestion.firstname} ${suggestion.middlename} ${suggestion.lastname}`;
        const matches = AutosuggestHighlightMatch(suggestionText, query);
        const parts = AutosuggestHighlightParse(suggestionText, matches);
      
        return (
          <span className={'suggestion-content ' + suggestion.twitter}>
            <span className="name">
              {
                parts.map((part, index) => {
                  const className = part.highlight ? 'highlight' : null;
      
                  return (
                    <span className={className} key={index}>{part.text}</span>
                  );
                })
              }
            </span>
          </span>
        );
      }
     const onChange = (event, { newValue, method }) => {
        setValue(newValue)
      };
      
    const onSuggestionsFetchRequested = ({ value }) => {
        console.log('SuggestionFetchRequest = ', value);
        setSuggestions(getSuggestions(value))
      };
    
    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
      };
    const inputProps = {
        placeholder: "Search for...",
        value,
        onChange: onChange
      };
    return (
        <Fragment>
            <nav className="navbar navbar-expand navbar-light 
                        bg-white topbar mb-4 static-top shadow">
                <button id="sidebarToggleTop" 
                        className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>

                <div className="dropdown">
                    <a className="btn dropdown-toggle" href="#" role="button" 
                       id="dropdownMenuLink" data-toggle="dropdown" 
                       aria-haspopup="true" aria-expanded="false">
                            Applications
                    </a>
                    <div className="dropdown-menu dropdown-menu-left shadow animated--fade-in"
                         aria-labelledby="dropdownMenuLink">
                        <a className="dropdown-item" href="#">Pages</a>
                        <a className="dropdown-item" href="#">Groups</a>
                    </div>
                </div>
                
                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"
                        onSubmit={e => {
                            e.preventDefault();
                        }}
                >
                    <div className="input-group">
                        <Autosuggest 
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps} />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="submit">
                                    <i className="fas fa-search fa-sm"></i>
                            </button>
                        </div>
                    </div>  
                </form>
                    
                <ul className="navbar-nav ml-auto">  
                    <li className="nav-item dropdown no-arrow d-sm-none">
                        <a className="nav-link dropdown-toggle" href="#" 
                            id="searchDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" 
                            aria-expanded="false">
                                <i className="fas fa-search fa-fw"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right p-3 
                                    shadow animated--grow-in"
                              aria-labelledby="searchDropdown">
                            <form className="form-inline mr-auto w-100 navbar-search">
                                <div className="input-group">
                                    <input type="text" 
                                           className="form-control bg-light border-0 small"
                                           placeholder="Search for..." aria-label="Search"
                                           aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>

                    <li className="nav-item dropdown no-arrow mx-1">
                        <a className="nav-link dropdown-toggle" href="" 
                           id="alertsDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" 
                           aria-expanded="false">
                                <i className="fas fa-bell fa-fw"></i>
                                <span className="badge badge-danger badge-counter"></span>
                        </a>
                    </li>

                    <li className="nav-item dropdown no-arrow mx-1">
                        <a  className="nav-link dropdown-toggle" href="" 
                            id="messagesDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" 
                            aria-expanded="false">
                                <i className="fas fa-envelope fa-fw"></i>
                                <span className="badge badge-danger badge-counter">
                                </span>
                        </a>
                    </li>

                    <div className="topbar-divider d-none d-sm-block">

                    </div>

                    <li className="nav-item dropdown no-arrow">
                        <a href="#" className="nav-link dropdown-toggle" 
                            id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" 
                            aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                                    {user !== null ? user.name : 'UserName'} </span>
                                <img className="img-profile rounded-circle"
                                    src={user !== null ? user.image : null}
                                    alt="userName"
                                />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right 
                                    shadow animated--grow-in"
                             aria-labelledby="userDropdown">
                            <Link  className="dropdown-item" to="/profile">
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Profile
                            </Link>
                            <div className="dropdown-divider">

                            </div>
                            <a href="" className="dropdown-item" 
                                data-toggle="modal" data-target="#logoutModal">
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                            </a>
                        </div>
                    </li>
                </ul>
                
            </nav>
            {/* {searchUser.length > 0 ? 
                        <ListGroup className="list-group">
                            {searchUser.map(user=>(<ListGroupItem key={user.key}><Link to="/profile">{user.name}</Link></ListGroupItem>))}
                        </ListGroup> : null
                    } */}
            <div className="modal fade" id="logoutModal" tabIndex="-1" 
                role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select "Logout" below if you are ready to end your current session.
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <Link to="/" className="btn btn-primary" onClick={logout} >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>
                <Modal isOpen={display} toggle={toggle} className="suggestion-container">
                    <ModalHeader toggle={toggle}>Users List</ModalHeader>
                    <ModalBody>
                        hello
                    </ModalBody>
                </Modal>
            </div>  */}
        </Fragment>
    )
}
const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, {logout})(Topbar);

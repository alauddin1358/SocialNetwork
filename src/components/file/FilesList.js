import React, { useState, Fragment, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import Sidebar from '../dashboard/Sidebar';
import Topbar from '../dashboard/Topbar';
import Footer from '../dashboard/Footer';
import Spinner from '../layout/Spinner';
import { Container } from 'reactstrap';
import FileHeader from './FileHeader';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteFile, getFile } from '../../actions/file';
import Alert from '../layout/Alert';
import Advertisement from '../dashboard/Advertisement';
const API = process.env.REACT_APP_API;
const ADMIN = process.env.REACT_APP_ADMIN;

const FilesList = ({getFile, deleteFile, auth, file:{files, loading}}) => {
  //const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [fileLoading, setFileLoading] = useState(true);
  useEffect(() => {
    console.log('calling filelist useEffect');
    if(auth.user !== null) {
      if(!auth.loading){
        if (fileLoading && auth.user.email !== ADMIN) {
          //console.log('Calling User getFile');
          getFile(auth.user._id.$oid);
          setFileLoading(false)
        }
        else if(fileLoading && auth.user.email === ADMIN){
          //console.log('Calling ADMIN getFile');
          getFile(null);
          setFileLoading(false)
        }
      }
    }
  }, [getFile, auth]);
  //console.log('Loading file',fileLoading);
  // if(auth.user !== null) {
  //   if(!auth.loading){
  //     if (fileLoading && auth.user.email !== ADMIN) {
  //       //console.log('Calling User getFile');
  //       getFile(auth.user._id.$oid);
  //       setFileLoading(false)
  //     }
  //     else if(fileLoading && auth.user.email === ADMIN){
  //       //console.log('Calling ADMIN getFile');
  //       getFile(null);
  //       setFileLoading(false)
  //     }
  //   }
  // }
  const downloadFile = async (filename, mimetype) => {
    try {
      const result = await axios.get(`${API}/file/${filename}`, {
        responseType: 'blob'
      });
      //console.log("File Return Data = ", result.data);
      // const split = path.split('/');
      // const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };

  
  return (
    <Fragment>
        
      <Container>
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-9">
            <FileHeader />
            <div className="files-container">
              {errorMsg && <p className="errorMsg">{errorMsg}</p>}
              {
                loading ? <Spinner /> : (
                  <table className="files-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Edit File</th>
                        <th>View File</th>
                        <th>Download File</th>
                        <th>Delete File</th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.length > 0 ? (
                        files.map(
                          ({ _id, title, desc, filename, user, file_mimetype }, index) => (
                            <tr key={index}>
                              <td className="file-title">{title}</td>
                              <td className="file-description">{desc}</td>
                              <td>
                                { auth.user._id.$oid === user.userId.$oid || auth.user.email === ADMIN ?
                                  (<Link to={{
                                        pathname: '/addfile',
                                        state: {
                                                    id: _id.$oid,
                                                    edit:true
                                                },
                                      }}
                                  >
                                    Edit
                                  </Link>) : null
                                }
                              </td>
                              <td>
                                <Link to={`/view/${filename}`} >
                                  View
                                </Link>
                              </td>
                              <td>
                                <Link to="/list" onClick={() =>
                                    downloadFile(filename, file_mimetype)
                                  }>
                                  Download
                                </Link>
                              </td>
                              <td>
                              { auth.user._id.$oid === user.userId.$oid || auth.user.email === ADMIN ?
                                (<Link to="/list" onClick={() =>
                                    deleteFile(_id.$oid)
                                  }>
                                  Delete
                                </Link>) : null
                              }
                              </td>
                            </tr>
                          )
                        )
                      ) : (
                        <tr>
                          <td colSpan={3} style={{ fontWeight: '300' }}>
                            No files found. Please add some.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )
              }
            
            </div>       
          </div>
          <Advertisement />
        </div>
          
      </Container>
                
      </Fragment>
    
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  file: state.file
});
export default connect(mapStateToProps, {getFile, deleteFile})(FilesList);
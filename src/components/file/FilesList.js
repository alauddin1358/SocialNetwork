import React, { useState, useEffect, Fragment } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import Sidebar from '../dashboard/Sidebar';
import Topbar from '../dashboard/Topbar';
import Footer from '../dashboard/Footer';
import { Container } from 'reactstrap';
import FileHeader from './FileHeader';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteFile, getFile } from '../../actions/file';
import Alert from '../layout/Alert';
const API = process.env.REACT_APP_API;

const FilesList = ({getFile, deleteFile, auth, file:{files}}) => {
  //const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  
  useEffect(() => {
    getFile();
  }, [getFile]);

  // const getFilesList = async () => {
  //   try {
  //     const {data} = await axios.get(`${API}/getAllFiles`);
  //     setErrorMsg('');
  //     setFilesList(JSON.parse(data.data));
  //   } catch (error) {
  //     error.response && setErrorMsg(error.response.data);
  //   }
  // };
  
  const downloadFile = async (filename, mimetype) => {
    try {
      const result = await axios.get(`${API}/file/${filename}`, {
        responseType: 'blob'
      });
      console.log("File Return Data = ", result.data);
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

  // const deleteFile = async (id) => {
  //   try {
  //     const res = await axios.delete(`${API}/fileDelete/${id}`);
  //     if(res.data.result.isError === 'false') {
  //       getFilesList();
  //       setErrorMsg('');
  //     }
  //     else setErrorMsg('Error in deleting file');
     
  //   } catch (error) {
  //     error.response && setErrorMsg(error.response.data);
  //   }
  // };

  return (
    <Fragment>
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar />
                    <Alert />
                    <Container>
                        <FileHeader />
                          <div className="files-container">
                            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                            <table className="files-table">
                              <thead>
                                <tr>
                                  <th>Title</th>
                                  <th>Description</th>
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
                                        { auth.user._id.$oid === user.userId.$oid ?
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
                        </div>       
                    </Container>
                </div>
                <Footer />
            </div>
            
        </div>
      </Fragment>
    
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  file: state.file
});
export default connect(mapStateToProps, {getFile, deleteFile})(FilesList);
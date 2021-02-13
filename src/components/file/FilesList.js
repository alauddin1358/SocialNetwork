import React, { useState, useEffect, Fragment } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import Sidebar from '../dashboard/Sidebar';
import Topbar from '../dashboard/Topbar';
import Footer from '../dashboard/Footer';
import { Container } from 'reactstrap';
import FileHeader from './FileHeader';
import { Link } from 'react-router-dom';
const API = process.env.REACT_APP_API;

const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  
  useEffect(() => {
    const getFilesList = async () => {
      try {
        const {data} = await axios.get(`${API}/getAllFiles`);
        setErrorMsg('');
        setFilesList(JSON.parse(data.data));
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };
    getFilesList();
  }, []);

  
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

  return (
    <Fragment>
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar />
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
                                </tr>
                              </thead>
                              <tbody>
                                {filesList.length > 0 ? (
                                  filesList.map(
                                    ({ _id, title, desc, filename, file_mimetype }) => (
                                      <tr key={_id}>
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

export default FilesList;
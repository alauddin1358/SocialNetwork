import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../dashboard/Sidebar';
import Topbar from '../dashboard/Topbar';
import Footer from '../dashboard/Footer';
import { Container } from 'reactstrap';
import FileHeader from './FileHeader';
import { Document, Page, pdfjs } from 'react-pdf';
const API = process.env.REACT_APP_API;
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FileView = ({match}) => {
    useEffect(() => {
        viewFile(match.params.filename);
    }, [match.params.filename])
    
    console.log("Match Params = ", match.params);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [errorMsg, setErrorMsg] = useState('');
    const [fileURL, setFileURL] = useState(null);

    const viewFile = async (filename) => {
        try {
          const result = await axios.get(`${API}/file/${filename}`, {
            responseType: 'blob'
          });
          console.log("File Return Data = ", result.data);
          const fileURL = URL.createObjectURL(result.data)
          setFileURL(fileURL);
          setErrorMsg('');
        } catch (error) {
          if (error.response && error.response.status === 400) {
            setErrorMsg('Error while Viewing file. Try again later');
          }
        }
    };
    //viewFile(match.params.filename);
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }
    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
      }
    
      function previousPage() {
        changePage(-1);
      }
    
      function nextPage() {
        changePage(1);
      }
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
                                <Document
                                    file={fileURL}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                >
                                    <Page pageNumber={pageNumber} />
                                </Document>
                                <div>
                                    <p>
                                    Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                                    </p>
                                    <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
                                    Previous
                                    </button>
                                    <button
                                    type="button"
                                    disabled={pageNumber >= numPages}
                                    onClick={nextPage}
                                    >
                                    Next
                                    </button>
                                </div>
                           </div>       
                    </Container>
                </div>
                <Footer />
            </div>
            
        </div>
      </Fragment>
    )
}

export default FileView

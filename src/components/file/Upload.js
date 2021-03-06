import React, { useState, useRef, Fragment } from 'react';
import Dropzone from 'react-dropzone';
import Sidebar from '../dashboard/Sidebar';
import Topbar from '../dashboard/Topbar';
import Footer from '../dashboard/Footer';
import FileHeader from './FileHeader';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { addFile } from '../../actions/file';
import Alert from '../layout/Alert';
const Upload = ({props, addFile, file: {isSuccess}}) => {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [state, setState] = useState({
    title: '',
    description: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  //const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  console.log('====================================');
  console.log('IsSuccess',isSuccess);
  console.log('====================================');
  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    //setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = '2px dashed #e9ebeb';
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const { title, description } = state;
      if (title.trim() !== '' && description.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('title', title);
          formData.append('description', description);
          formData.append('filedata', previewSrc);
          setErrorMsg('');
          addFile(formData);
          props.history.push('/list');
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
    
  };
  if(isSuccess) {
    return <Redirect to = "/list" />;
  } 
  return (
    <Fragment>
      <div id="wrapper" className="file">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                  <Topbar />
                  <Alert />
                  <Container>
                      <FileHeader />
                      <Form className="search-form" onSubmit={handleOnSubmit}>
                      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                      <Row>
                        <Col>
                          <Form.Group controlId="title">
                            <Form.Control
                              type="text"
                              name="title"
                              value={state.title || ''}
                              placeholder="Enter title"
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group controlId="description">
                            <Form.Control
                              type="text"
                              name="description"
                              value={state.description || ''}
                              placeholder="Enter description"
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <div className="upload-section">
                        <Dropzone
                          onDrop={onDrop}
                          onDragEnter={() => updateBorder('over')}
                          onDragLeave={() => updateBorder('leave')}
                          accept="application/pdf"
                          maxFiles={1}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                              <input {...getInputProps()} />
                              <p>Drag and drop a pdf file OR click here to select a pdf file</p>
                              {file && (
                                <div>
                                  <strong>Selected file:</strong> {file.name}
                                </div>
                              )}
                            </div>
                          )}
                        </Dropzone>
                        {/* {previewSrc ? (
                          isPreviewAvailable ? (
                            <div className="image-preview">
                              <img className="preview-image" src={previewSrc} alt="Preview" />
                            </div>
                          ) : (
                            <div className="preview-message">
                              <p>No preview available for this file</p>
                            </div>
                          )
                        ) : (
                          <div className="preview-message">
                            <p>Image preview will be shown here after selection</p>
                          </div>
                        )} */}
                      </div>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </Container>
              </div>
              <Footer />
          </div>
          
      </div>
  </Fragment>
    
  )
}
const mapStateToProps = (state) => ({
  file: state.file
});
export default connect(mapStateToProps, {addFile})(Upload);

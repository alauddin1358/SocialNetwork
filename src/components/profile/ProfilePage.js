import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import Advertisement from '../dashboard/Advertisement';
import { loadUser, updateProfile, getAllUsers } from '../../actions/auth';
//import { setAlert } from '../../actions/alert';
import Alert from '../layout/Alert';
import Compress from 'browser-image-compression';
import {Image} from 'cloudinary-react';
const ADMIN = process.env.REACT_APP_ADMIN;
const IMAGEURL = process.env.REACT_APP_CLOUDINARY;
const initialState = {
  firstname: '',
  middlename: '',
  lastname: '',
  user_category: '',
  student_type: '',
  job_type: '',
  specialization_type: '',
  email: '',
  phone: '',
  password: '',
  passwordconfirm: '',
  address: '',
  country: '',
  image: '',
  referrer_name: '',
  referrer_email: '',
};
const ProfilePage = ({
  auth: { user, loading, allUsers },
  loadUser,
  updateProfile,
  getAllUsers,
  props,
}) => {
  const [file, setFile] = useState('');
  const [viewImage, setViewImage] = useState('../../img/user-profile.png');
  const [showImageFlag, setShowImageFlag] = useState(false);
  const [formData, setFormData] = useState(initialState);
  useEffect(() => {
    console.log('Calling profilePage useEffect');
    if (user === null){
        //console.log('Loading = ', loading);
        loadUser();
        getAllUsers();
    } 
    
    if (!loading && user) {
      const profileData = { ...initialState };
      for (const key in user) {
        if (key in profileData) profileData[key] = user[key];
      }
      //console.log("Profile Data = ", profileData);
      setFormData(profileData);
    }
  }, [loading, user, loadUser, getAllUsers]);
  // console.log('Loading in Profilepage', loading);
  //console.log('User in ProfilePage', user);
  
  let isSearch = false,
    userEmail = null;
  if (props.location.state) {
    
    if (user !== null) {
      userEmail = user.email;
      if (user._id.$oid !== props.location.state.id) {
        //console.log('Search in profile ', allUsers);
        let userSearch = [];
        userSearch = allUsers.filter(
          (user) => user._id.$oid === props.location.state.id
        );
        //console.log('Search in profile ', userSearch);
        if(userSearch.length > 0){
            user = Object.assign({}, userSearch[0]);
            isSearch = true;
        }
      }
    }
  }

  const {
    firstname,
    middlename,
    lastname,
    student_type,
    job_type,
    specialization_type,
    email,
    phone,
    address,
    country,
    image,
    referrer_name,
    referrer_email,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  
  const imageHandler = async (e) => {
    setFile(e.target.files[0]);
    var fileUpload = e.target.files[0];
    if(fileUpload) setViewImage(URL.createObjectURL(e.target.files[0]));
    //var convertedBlobFile;
    //console.log('Calling image handlaer');
    const options = {
      //maxSizeMB: 5,
      maxWidth: 300, // the max width of the output image, defaults to 1920px
      maxHeight: 300, // the max height of the output image, defaults to 1920px
      resize: true,
      useWebWorker: true,
    };

    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        try {
          const compressedFile = await Compress(fileUpload, options);
          //setFile(compressedFile);
          //processfile(compressedFile, options);
          
        } catch (e) {
          // Show the user a toast message or notification that something went wrong while compressing file
          alert('File size must be less than 20MB');
          console.log('Error in compress = ', e);
        }
        setShowImageFlag(true);
        // console.log('Image flag ', showImageFlag);
        // console.log('View Image ', viewImage);
      }
    };
    if (fileUpload) reader.readAsDataURL(fileUpload);
  };

  const getFormData = (object) =>
    Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key]);
      return formData;
    }, new FormData());
  const onSubmit = async (e) => {
    e.preventDefault();
    const form_data = getFormData(formData);
    form_data.append('file', file);
    if (showImageFlag) form_data.append('viewImage', viewImage);
    else form_data.append('viewImage', image);
    form_data.append('student_type', student_type);
    form_data.append('job_type', job_type);
    form_data.append('specialization_type', specialization_type);
    console.log('Form Data = ', form_data);
    updateProfile(user._id.$oid, { form_data });
    //console.log('Return Value = ', returnValue);
  };
  
  return (
    <Fragment>
      {user !== null ? (
        <Fragment>
          <div className='container-fluid'>
            <div className='d-sm-flex align-items-center justify-content-between mb-4'>
              <h1 className='h3 mb-0 text-gray-800'>Profile</h1>
            </div>
            <div id='profile-view' className='row'>
              <div className='col-sm-12 col-md-6 col-lg-9'>
                <div id='profile-image-card' className='common-card'>
                  {userEmail === ADMIN || !isSearch ? (
                    <Link
                      to={{
                        pathname: '/profile',
                        state: {
                                    id: user._id.$oid,
                                  },
                      }}
                      className='pen picture-pen'
                      data-toggle='modal'
                      data-target='#myModal'
                    >
                      <i className='fas fa-camera'></i>
                    </Link>
                  ) : null}
                  <div id='profile-image'>
                    <div id='profile-image-container'> 
                    <Image cloudName="daf1cgy1c" publicId={IMAGEURL+image}/>
                    {/* <img src={window.location.origin+'../api/image/HM0010701-F.jpg'} alt='profile' /> */}
                      {/* <img src={'F:/Coursera/React_Flask/SocialNetwork/frontend/api/image/garden-festival.jpg'} alt='profile' /> 
                      <img src={' http://127.0.0.1:8080/image/garden-festival.jpg'} alt='profile' />  */}
                      <h6>{user.name}</h6>
                    </div>
                    {!isSearch ? (
                      <Link to='/profile' className='profile-add-link'>
                        Add Contact
                      </Link>
                    ) : (
                      <Link
                        to='/profile'
                        className='profile-add-link'
                        style={{ cursor: 'default' }}
                        onClick={(event) => event.preventDefault()}
                      >
                        Add Contact
                      </Link>
                    )}
                    {!isSearch ? (
                      <Link to='/profile' className='profile-message-link'>
                        Message
                      </Link>
                    ) : (
                      <Link
                        to='/profile'
                        className='profile-message-link'
                        style={{ cursor: 'default' }}
                        onClick={(event) => event.preventDefault()}
                      >
                        Message
                      </Link>
                    )}
                  </div>
                </div>
                <div className='common-card'>
                  <h5>Personal Info</h5>
                  {!isSearch ? (
                    <Link
                      to='/profile'
                      className='pen'
                      data-toggle='modal'
                      data-target='#myModal'
                    >
                      <i className='fas fa-pen'></i>
                    </Link>
                  ) : null}
                  <p>
                    <label>Name</label> {user.name}
                  </p>
                  <p>
                    <label>Email</label> {user.email}
                  </p>
                  <p>
                    <label>Phone</label> {user.phone}
                  </p>
                </div>
                <div className='common-card'>
                  <h5>User Type</h5>
                  {!isSearch ? (
                    <Link
                      to='/profile'
                      className='pen'
                      data-toggle='modal'
                      data-target='#myModal'
                    >
                      <i className='fas fa-pen'></i>
                    </Link>
                  ) : null}
                  <p>
                    <label>User Category</label>
                    {user.user_category}
                  </p>
                  <p>
                    <label>Job</label>
                    {user.job_type}
                  </p>
                  <p>
                    <label>Specialization</label>
                    {user.specialization_type}
                  </p>
                </div>
                <div className='common-card'>
                  <h5>Other Info</h5>
                  {!isSearch ? (
                    <Link
                      to='/profile'
                      className='pen'
                      data-toggle='modal'
                      data-target='#myModal'
                    >
                      <i className='fas fa-pen'></i>
                    </Link>
                  ) : null}
                  <p>
                    <label>Address</label>
                    {user.address}
                  </p>
                  <p>
                    <label>Country</label>
                    {user.country}
                  </p>
                </div>

                <div className='modal fade' id='myModal'>
                  <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                      <form onSubmit={onSubmit}>
                        <div className='modal-header'>
                          <h4 className='modal-title'>Edit Profile</h4>
                          <button
                            type='button'
                            className='close'
                            data-dismiss='modal'
                          >
                            &times;
                          </button>
                        </div>

                        <div className='modal-body'>
                          <fieldset>
                            <legend>Name *</legend>
                            <div className='form-group'>
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Enter First Name'
                                id='firstname'
                                name='firstname'
                                value={firstname}
                                onChange={onChange}
                              />
                            </div>
                            <div className='form-group'>
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Middle Name'
                                id='middlename'
                                name='middlename'
                                value={middlename}
                                onChange={onChange}
                              />
                            </div>
                            <div className='form-group'>
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Last Name'
                                id='lastname'
                                name='lastname'
                                value={lastname}
                                onChange={onChange}
                              />
                            </div>
                          </fieldset>
                          <fieldset>
                            <legend>User Type *</legend>
                            <div className='form-group'>
                              <select
                                name='student_type'
                                className='form-control'
                                value={student_type}
                                onChange={onChange}
                              >
                                <option value=''>Select Student</option>
                                <option value='bsc'>BSc.</option>
                                <option value='msc'>MSc</option>
                                <option value='phd'>PhD</option>
                              </select>
                            </div>
                            <div className='form-group'>
                              <select
                                name='job_type'
                                className='form-control'
                                value={job_type}
                                onChange={onChange}
                              >
                                <option value=''>Select Job</option>
                                <option value='job1'>Job 1</option>
                                <option value='job2'>Job 2</option>
                                <option value='job3'>Job 3</option>
                              </select>
                            </div>
                            {/* <div className='form-group'>
                              <select
                                name='specialization_type'
                                className='form-control'
                                value={specialization_type}
                                onChange={onChange}
                              >
                                <option value=''>Select Specialization</option>
                                <option value='1'>Option1</option>
                                <option value='2'>Option2</option>
                                <option value='3'>Option3</option>
                              </select>
                            </div> */}
                          </fieldset>
                          <div className='form-group'>
                            <label htmlFor='email'>Email Address *</label>
                            <input
                              type='email'
                              className='form-control'
                              placeholder='Enter email'
                              id='email'
                              name='email'
                              value={email}
                              onChange={onChange}
                            />
                          </div>
                          <div className='form-group'>
                            <label htmlFor='name'>Phone</label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Enter Phone'
                              id='phone'
                              name='phone'
                              value={phone}
                              onChange={onChange}
                            />
                          </div>
                          <div className='form-group'>
                            <label htmlFor='name'>Address</label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Enter Address'
                              id='address'
                              name='address'
                              value={address}
                              onChange={onChange}
                            />
                          </div>
                          {/* <div className='form-group'>
                            <label htmlFor='name'>Country:</label>
                            <select
                              id='country'
                              name='country'
                              className='form-control'
                              value={country}
                              onChange={onChange}
                            >
                              <option value=''>Select Country</option>
                              <option value='Afghanistan'>Afghanistan</option>
                              <option value='Åland Islands'>
                                Åland Islands
                              </option>
                              <option value='Albania'>Albania</option>
                              <option value='Algeria'>Algeria</option>
                              <option value='American Samoa'>
                                American Samoa
                              </option>
                              <option value='Andorra'>Andorra</option>
                              <option value='Angola'>Angola</option>
                              <option value='Anguilla'>Anguilla</option>
                              <option value='Antarctica'>Antarctica</option>
                              <option value='Antigua and Barbuda'>
                                Antigua and Barbuda
                              </option>
                              <option value='Argentina'>Argentina</option>
                              <option value='Armenia'>Armenia</option>
                              <option value='Aruba'>Aruba</option>
                              <option value='Australia'>Australia</option>
                              <option value='Austria'>Austria</option>
                              <option value='Azerbaijan'>Azerbaijan</option>
                              <option value='Bahamas'>Bahamas</option>
                              <option value='Bahrain'>Bahrain</option>
                              <option value='Bangladesh'>Bangladesh</option>
                              <option value='Barbados'>Barbados</option>
                              <option value='Belarus'>Belarus</option>
                              <option value='Belgium'>Belgium</option>
                              <option value='Belize'>Belize</option>
                              <option value='Benin'>Benin</option>
                              <option value='Bermuda'>Bermuda</option>
                              <option value='Bhutan'>Bhutan</option>
                              <option value='Bolivia'>Bolivia</option>
                              <option value='Bosnia and Herzegovina'>
                                Bosnia and Herzegovina
                              </option>
                              <option value='Botswana'>Botswana</option>
                              <option value='Bouvet Island'>
                                Bouvet Island
                              </option>
                              <option value='Brazil'>Brazil</option>
                              <option value='British Indian Ocean Territory'>
                                British Indian Ocean Territory
                              </option>
                              <option value='Brunei Darussalam'>
                                Brunei Darussalam
                              </option>
                              <option value='Bulgaria'>Bulgaria</option>
                              <option value='Burkina Faso'>Burkina Faso</option>
                              <option value='Burundi'>Burundi</option>
                              <option value='Cambodia'>Cambodia</option>
                              <option value='Cameroon'>Cameroon</option>
                              <option value='Canada'>Canada</option>
                              <option value='Cape Verde'>Cape Verde</option>
                              <option value='Cayman Islands'>
                                Cayman Islands
                              </option>
                              <option value='Central African Republic'>
                                Central African Republic
                              </option>
                              <option value='Chad'>Chad</option>
                              <option value='Chile'>Chile</option>
                              <option value='China'>China</option>
                              <option value='Christmas Island'>
                                Christmas Island
                              </option>
                              <option value='Cocos (Keeling) Islands'>
                                Cocos (Keeling) Islands
                              </option>
                              <option value='Colombia'>Colombia</option>
                              <option value='Comoros'>Comoros</option>
                              <option value='Congo'>Congo</option>
                              <option value='Congo, The Democratic Republic of The'>
                                Congo, The Democratic Republic of The
                              </option>
                              <option value='Cook Islands'>Cook Islands</option>
                              <option value='Costa Rica'>Costa Rica</option>
                              <option value="Cote D'ivoire">
                                Cote D'ivoire
                              </option>
                              <option value='Croatia'>Croatia</option>
                              <option value='Cuba'>Cuba</option>
                              <option value='Cyprus'>Cyprus</option>
                              <option value='Czech Republic'>
                                Czech Republic
                              </option>
                              <option value='Denmark'>Denmark</option>
                              <option value='Djibouti'>Djibouti</option>
                              <option value='Dominica'>Dominica</option>
                              <option value='Dominican Republic'>
                                Dominican Republic
                              </option>
                              <option value='Ecuador'>Ecuador</option>
                              <option value='Egypt'>Egypt</option>
                              <option value='El Salvador'>El Salvador</option>
                              <option value='Equatorial Guinea'>
                                Equatorial Guinea
                              </option>
                              <option value='Eritrea'>Eritrea</option>
                              <option value='Estonia'>Estonia</option>
                              <option value='Ethiopia'>Ethiopia</option>
                              <option value='Falkland Islands (Malvinas)'>
                                Falkland Islands (Malvinas)
                              </option>
                              <option value='Faroe Islands'>
                                Faroe Islands
                              </option>
                              <option value='Fiji'>Fiji</option>
                              <option value='Finland'>Finland</option>
                              <option value='France'>France</option>
                              <option value='French Guiana'>
                                French Guiana
                              </option>
                              <option value='French Polynesia'>
                                French Polynesia
                              </option>
                              <option value='French Southern Territories'>
                                French Southern Territories
                              </option>
                              <option value='Gabon'>Gabon</option>
                              <option value='Gambia'>Gambia</option>
                              <option value='Georgia'>Georgia</option>
                              <option value='Germany'>Germany</option>
                              <option value='Ghana'>Ghana</option>
                              <option value='Gibraltar'>Gibraltar</option>
                              <option value='Greece'>Greece</option>
                              <option value='Greenland'>Greenland</option>
                              <option value='Grenada'>Grenada</option>
                              <option value='Guadeloupe'>Guadeloupe</option>
                              <option value='Guam'>Guam</option>
                              <option value='Guatemala'>Guatemala</option>
                              <option value='Guernsey'>Guernsey</option>
                              <option value='Guinea'>Guinea</option>
                              <option value='Guinea-bissau'>
                                Guinea-bissau
                              </option>
                              <option value='Guyana'>Guyana</option>
                              <option value='Haiti'>Haiti</option>
                              <option value='Heard Island and Mcdonald Islands'>
                                Heard Island and Mcdonald Islands
                              </option>
                              <option value='Holy See (Vatican City State)'>
                                Holy See (Vatican City State)
                              </option>
                              <option value='Honduras'>Honduras</option>
                              <option value='Hong Kong'>Hong Kong</option>
                              <option value='Hungary'>Hungary</option>
                              <option value='Iceland'>Iceland</option>
                              <option value='India'>India</option>
                              <option value='Indonesia'>Indonesia</option>
                              <option value='Iran, Islamic Republic of'>
                                Iran, Islamic Republic of
                              </option>
                              <option value='Iraq'>Iraq</option>
                              <option value='Ireland'>Ireland</option>
                              <option value='Isle of Man'>Isle of Man</option>
                              <option value='Israel'>Israel</option>
                              <option value='Italy'>Italy</option>
                              <option value='Jamaica'>Jamaica</option>
                              <option value='Japan'>Japan</option>
                              <option value='Jersey'>Jersey</option>
                              <option value='Jordan'>Jordan</option>
                              <option value='Kazakhstan'>Kazakhstan</option>
                              <option value='Kenya'>Kenya</option>
                              <option value='Kiribati'>Kiribati</option>
                              <option value="Korea, Democratic People's Republic of">
                                Korea, Democratic People's Republic of
                              </option>
                              <option value='Korea, Republic of'>
                                Korea, Republic of
                              </option>
                              <option value='Kuwait'>Kuwait</option>
                              <option value='Kyrgyzstan'>Kyrgyzstan</option>
                              <option value="Lao People's Democratic Republic">
                                Lao People's Democratic Republic
                              </option>
                              <option value='Latvia'>Latvia</option>
                              <option value='Lebanon'>Lebanon</option>
                              <option value='Lesotho'>Lesotho</option>
                              <option value='Liberia'>Liberia</option>
                              <option value='Libyan Arab Jamahiriya'>
                                Libyan Arab Jamahiriya
                              </option>
                              <option value='Liechtenstein'>
                                Liechtenstein
                              </option>
                              <option value='Lithuania'>Lithuania</option>
                              <option value='Luxembourg'>Luxembourg</option>
                              <option value='Macao'>Macao</option>
                              <option value='Macedonia, The Former Yugoslav Republic of'>
                                Macedonia, The Former Yugoslav Republic of
                              </option>
                              <option value='Madagascar'>Madagascar</option>
                              <option value='Malawi'>Malawi</option>
                              <option value='Malaysia'>Malaysia</option>
                              <option value='Maldives'>Maldives</option>
                              <option value='Mali'>Mali</option>
                              <option value='Malta'>Malta</option>
                              <option value='Marshall Islands'>
                                Marshall Islands
                              </option>
                              <option value='Martinique'>Martinique</option>
                              <option value='Mauritania'>Mauritania</option>
                              <option value='Mauritius'>Mauritius</option>
                              <option value='Mayotte'>Mayotte</option>
                              <option value='Mexico'>Mexico</option>
                              <option value='Micronesia, Federated States of'>
                                Micronesia, Federated States of
                              </option>
                              <option value='Moldova, Republic of'>
                                Moldova, Republic of
                              </option>
                              <option value='Monaco'>Monaco</option>
                              <option value='Mongolia'>Mongolia</option>
                              <option value='Montenegro'>Montenegro</option>
                              <option value='Montserrat'>Montserrat</option>
                              <option value='Morocco'>Morocco</option>
                              <option value='Mozambique'>Mozambique</option>
                              <option value='Myanmar'>Myanmar</option>
                              <option value='Namibia'>Namibia</option>
                              <option value='Nauru'>Nauru</option>
                              <option value='Nepal'>Nepal</option>
                              <option value='Netherlands'>Netherlands</option>
                              <option value='Netherlands Antilles'>
                                Netherlands Antilles
                              </option>
                              <option value='New Caledonia'>
                                New Caledonia
                              </option>
                              <option value='New Zealand'>New Zealand</option>
                              <option value='Nicaragua'>Nicaragua</option>
                              <option value='Niger'>Niger</option>
                              <option value='Nigeria'>Nigeria</option>
                              <option value='Niue'>Niue</option>
                              <option value='Norfolk Island'>
                                Norfolk Island
                              </option>
                              <option value='Northern Mariana Islands'>
                                Northern Mariana Islands
                              </option>
                              <option value='Norway'>Norway</option>
                              <option value='Oman'>Oman</option>
                              <option value='Pakistan'>Pakistan</option>
                              <option value='Palau'>Palau</option>
                              <option value='Palestinian Territory, Occupied'>
                                Palestinian Territory, Occupied
                              </option>
                              <option value='Panama'>Panama</option>
                              <option value='Papua New Guinea'>
                                Papua New Guinea
                              </option>
                              <option value='Paraguay'>Paraguay</option>
                              <option value='Peru'>Peru</option>
                              <option value='Philippines'>Philippines</option>
                              <option value='Pitcairn'>Pitcairn</option>
                              <option value='Poland'>Poland</option>
                              <option value='Portugal'>Portugal</option>
                              <option value='Puerto Rico'>Puerto Rico</option>
                              <option value='Qatar'>Qatar</option>
                              <option value='Reunion'>Reunion</option>
                              <option value='Romania'>Romania</option>
                              <option value='Russian Federation'>
                                Russian Federation
                              </option>
                              <option value='Rwanda'>Rwanda</option>
                              <option value='Saint Helena'>Saint Helena</option>
                              <option value='Saint Kitts and Nevis'>
                                Saint Kitts and Nevis
                              </option>
                              <option value='Saint Lucia'>Saint Lucia</option>
                              <option value='Saint Pierre and Miquelon'>
                                Saint Pierre and Miquelon
                              </option>
                              <option value='Saint Vincent and The Grenadines'>
                                Saint Vincent and The Grenadines
                              </option>
                              <option value='Samoa'>Samoa</option>
                              <option value='San Marino'>San Marino</option>
                              <option value='Sao Tome and Principe'>
                                Sao Tome and Principe
                              </option>
                              <option value='Saudi Arabia'>Saudi Arabia</option>
                              <option value='Senegal'>Senegal</option>
                              <option value='Serbia'>Serbia</option>
                              <option value='Seychelles'>Seychelles</option>
                              <option value='Sierra Leone'>Sierra Leone</option>
                              <option value='Singapore'>Singapore</option>
                              <option value='Slovakia'>Slovakia</option>
                              <option value='Slovenia'>Slovenia</option>
                              <option value='Solomon Islands'>
                                Solomon Islands
                              </option>
                              <option value='Somalia'>Somalia</option>
                              <option value='South Africa'>South Africa</option>
                              <option value='South Georgia and The South Sandwich Islands'>
                                South Georgia and The South Sandwich Islands
                              </option>
                              <option value='Spain'>Spain</option>
                              <option value='Sri Lanka'>Sri Lanka</option>
                              <option value='Sudan'>Sudan</option>
                              <option value='Suriname'>Suriname</option>
                              <option value='Svalbard and Jan Mayen'>
                                Svalbard and Jan Mayen
                              </option>
                              <option value='Swaziland'>Swaziland</option>
                              <option value='Sweden'>Sweden</option>
                              <option value='Switzerland'>Switzerland</option>
                              <option value='Syrian Arab Republic'>
                                Syrian Arab Republic
                              </option>
                              <option value='Taiwan, Province of China'>
                                Taiwan, Province of China
                              </option>
                              <option value='Tajikistan'>Tajikistan</option>
                              <option value='Tanzania, United Republic of'>
                                Tanzania, United Republic of
                              </option>
                              <option value='Thailand'>Thailand</option>
                              <option value='Timor-leste'>Timor-leste</option>
                              <option value='Togo'>Togo</option>
                              <option value='Tokelau'>Tokelau</option>
                              <option value='Tonga'>Tonga</option>
                              <option value='Trinidad and Tobago'>
                                Trinidad and Tobago
                              </option>
                              <option value='Tunisia'>Tunisia</option>
                              <option value='Turkey'>Turkey</option>
                              <option value='Turkmenistan'>Turkmenistan</option>
                              <option value='Turks and Caicos Islands'>
                                Turks and Caicos Islands
                              </option>
                              <option value='Tuvalu'>Tuvalu</option>
                              <option value='Uganda'>Uganda</option>
                              <option value='Ukraine'>Ukraine</option>
                              <option value='United Arab Emirates'>
                                United Arab Emirates
                              </option>
                              <option value='United Kingdom'>
                                United Kingdom
                              </option>
                              <option value='United States'>
                                United States
                              </option>
                              <option value='United States Minor Outlying Islands'>
                                United States Minor Outlying Islands
                              </option>
                              <option value='Uruguay'>Uruguay</option>
                              <option value='Uzbekistan'>Uzbekistan</option>
                              <option value='Vanuatu'>Vanuatu</option>
                              <option value='Venezuela'>Venezuela</option>
                              <option value='Viet Nam'>Viet Nam</option>
                              <option value='Virgin Islands, British'>
                                Virgin Islands, British
                              </option>
                              <option value='Virgin Islands, U.S.'>
                                Virgin Islands, U.S.
                              </option>
                              <option value='Wallis and Futuna'>
                                Wallis and Futuna
                              </option>
                              <option value='Western Sahara'>
                                Western Sahara
                              </option>
                              <option value='Yemen'>Yemen</option>
                              <option value='Zambia'>Zambia</option>
                              <option value='Zimbabwe'>Zimbabwe</option>
                            </select>
                          </div> */}
                          <div className='form-group'>
                            <label htmlFor='name'>Profile Picture:</label>
                            <input
                              type='file'
                              className='custom-select-input'
                              id='exampleFormControlFile1'
                              accept='image/*'
                              onChange={imageHandler}
                            />
                            <div
                              id='modal-profile-picture'
                              className='text-center'
                            >
                              <img
                                src={showImageFlag === true ? viewImage :  IMAGEURL+image}
                                alt='profile'
                              />
                            </div>
                          </div>
                          <fieldset>
                            <legend>Referred By *</legend>
                            <div className='form-group'>
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Name'
                                name='referrer_name'
                                value={referrer_name}
                                onChange={onChange}
                              />
                            </div>
                            <div className='form-group'>
                              <input
                                type='email'
                                className='form-control'
                                placeholder='Enter Email'
                                name='referrer_email'
                                value={referrer_email}
                                onChange={onChange}
                              />
                            </div>
                          </fieldset>
                          <Alert />
                        </div>

                        <div className='modal-footer'>
                          <button
                            className='btn btn-danger'
                            type='button'
                            data-dismiss='modal'
                          >
                            Close
                          </button>
                          <button type='submit' className='btn btn-secondary'>
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <Advertisement />
            </div>
          </div>
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};
ProfilePage.propTypes = {
  auth: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { loadUser, updateProfile,getAllUsers })(
  ProfilePage
);

import React, { useState } from 'react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
//import { setAlert } from '../../actions/alert';
import Alert from '../layout/Alert';
import { Alert as AlertStrap } from 'reactstrap';
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
    referrer_name: '',
    referrer_email: '',
    emailconfirm: false
  }
const Register = ({register, isAuthenticated}) => {
    
    const [file, setFile] = useState('');
    const [image, setImage] = useState('../../img/user-profile.png');
    const [formData, setFormData] = useState(initialState);
    
      const { firstname, middlename, lastname, user_category, email, phone,
      password, passwordconfirm, address, country,
       referrer_name, referrer_email } = formData;
    
    const onChange = (e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value });
    const imageHandler = (e) => {
        setFile(e.target.files[0]);
        var fileUpload = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () =>{
            if(reader.readyState === 2){
            setImage(reader.result)
            }
        }
        if(fileUpload) reader.readAsDataURL(e.target.files[0])
    
    };
    
    const getFormData = object => Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key]);
        return formData;
    }, new FormData());
    const onSubmit = async (e) => {
        e.preventDefault();
        
        if(email === '' || referrer_email===''){
            <AlertStrap color="danger">Email is required</AlertStrap>
            //dispatch(setAlert('Email is required', 'danger'));
        } 
        else if(password === '' || passwordconfirm ==='') <AlertStrap color="danger">Password is required</AlertStrap>
        else if (password !== passwordconfirm) {
            <AlertStrap color="danger">Passwords do not match</AlertStrap>
        }
        // else if(email === referrer_email){
        //     <AlertStrap color="danger">User email and referrer email must be different</AlertStrap>
        // } 
        else {
            console.log(formData);
            const form_data = getFormData(formData);
            form_data.append('file', file);
            form_data.append('image', image);
            register({ form_data });  
            setFormData(initialState); 
        }    
    };
    // if(isAuthenticated) {
    //     return <Redirect to="/login" />
    // }
    return (
        <div>
            <div className="form-wrapper auth">
		        <form onSubmit={onSubmit} id="registration-form">
                    {/* <div id="brand-image">	
                        <img src="../../img/fish-logo.png" alt="logo" />
                    </div> */}
                    <h2>
                        <span>Registration</span>
                    </h2>
                    <div className="flex-inline items-3 ">		
                        <label>Name: *</label>	
                        <div className="flex-inline ">
                            <input type="text" 
                                    name="firstname" 
                                    placeholder="Enter First Name"
                                    value={firstname}
                                    onChange={onChange}  />
                            <input type="text"
                                   name="middlename" 
                                   placeholder="Enter Middle Name"
                                   value={middlename}
                                   onChange={onChange} />
                            <input type="text" 
                                   name="lastname" 
                                   placeholder="Enter Last Name"
                                   value={lastname}
                                   onChange={onChange} />
                        </div>
                    </div>
                    <div className="flex-inline items-3">
                        <label>User Category: *</label>
                        <div className="flex-inline">
                            <div className="select-wrapper">
                                <select name="user_category"
                                        value={user_category}
                                        onChange={onChange}
                                >
                                    <option value="">Select User Category</option>
                                    <option value="agriculture">Agriculture</option>  
                                    <option value="veterinary-science">Veterinary Science</option>  
                                    <option value="animal-husbandry">Animal Husbandry</option>  
                                    <option value="agricultural-economics-rural-sociology">Agricultural Economics & Rural Sociology</option>  
                                    <option value="agricultural-engineering-technology">Agricultural Engineering & Technology</option>  
                                    <option value="fisheries">Fisheries</option>  
                                    <option value="agri-business">Agri-business</option>  
                                    <option value="agro-information-technology">Agro-information Technology</option>  
                                    <option value="agriculture-related-job">Agriculture Related Job</option>  
                                    <option value="student">Student</option>  
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex-inline ">
                        <label>Email: *</label>
                        <input type="email" 
                               name="email" 
                               placeholder="Enter Email"
                               value={email}
                               onChange={onChange} />
                    </div>
                    <div className="flex-inline ">
                        <label>Phone: </label>
                        <input type="text" 
                               name="phone" 
                               placeholder="Enter Phone"
                               value={phone}
                               onChange={onChange} />
                    </div>
                    <div className="flex-inline ">
                        <label htmlFor="password">Password: *</label>
                        <input type="password" 
                               name="password" 
                               placeholder="Enter Password"
                               value={password}
                               onChange={onChange} />
                    </div>
                    <div className="flex-inline ">
                        <label>Confirm Password: *</label>
                        <input type="password" 
                               name="passwordconfirm" 
                               placeholder="Enter Password Again"
                               value={passwordconfirm}
                               onChange={onChange} />
                    </div>
                    <div className="flex-inline ">
                        <label>Address:</label>
                        <input type="text" 
                                name="address" 
                                placeholder="Enter Address"
                                value={address}
                                onChange={onChange} />
                    </div>
                    <div className="flex-inline ">
                        <label>Country:</label>
                        <div className="select-wrapper">
                            <select id="country" 
                                    name="country" 
                                    className="form-control"
                                    value={country}
                                    onChange={onChange}>
                                <option value="">Select Country</option>
                                <option value="Afghanistan">Afghanistan</option>
                                <option value="Åland Islands">Åland Islands</option>
                                <option value="Albania">Albania</option>
                                <option value="Algeria">Algeria</option>
                                <option value="American Samoa">American Samoa</option>
                                <option value="Andorra">Andorra</option>
                                <option value="Angola">Angola</option>
                                <option value="Anguilla">Anguilla</option>
                                <option value="Antarctica">Antarctica</option>
                                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Armenia">Armenia</option>
                                <option value="Aruba">Aruba</option>
                                <option value="Australia">Australia</option>
                                <option value="Austria">Austria</option>
                                <option value="Azerbaijan">Azerbaijan</option>
                                <option value="Bahamas">Bahamas</option>
                                <option value="Bahrain">Bahrain</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Barbados">Barbados</option>
                                <option value="Belarus">Belarus</option>
                                <option value="Belgium">Belgium</option>
                                <option value="Belize">Belize</option>
                                <option value="Benin">Benin</option>
                                <option value="Bermuda">Bermuda</option>
                                <option value="Bhutan">Bhutan</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                <option value="Botswana">Botswana</option>
                                <option value="Bouvet Island">Bouvet Island</option>
                                <option value="Brazil">Brazil</option>
                                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                <option value="Brunei Darussalam">Brunei Darussalam</option>
                                <option value="Bulgaria">Bulgaria</option>
                                <option value="Burkina Faso">Burkina Faso</option>
                                <option value="Burundi">Burundi</option>
                                <option value="Cambodia">Cambodia</option>
                                <option value="Cameroon">Cameroon</option>
                                <option value="Canada">Canada</option>
                                <option value="Cape Verde">Cape Verde</option>
                                <option value="Cayman Islands">Cayman Islands</option>
                                <option value="Central African Republic">Central African Republic</option>
                                <option value="Chad">Chad</option>
                                <option value="Chile">Chile</option>
                                <option value="China">China</option>
                                <option value="Christmas Island">Christmas Island</option>
                                <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Comoros">Comoros</option>
                                <option value="Congo">Congo</option>
                                <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                                <option value="Cook Islands">Cook Islands</option>
                                <option value="Costa Rica">Costa Rica</option>
                                <option value="Cote D'ivoire">Cote D'ivoire</option>
                                <option value="Croatia">Croatia</option>
                                <option value="Cuba">Cuba</option>
                                <option value="Cyprus">Cyprus</option>
                                <option value="Czech Republic">Czech Republic</option>
                                <option value="Denmark">Denmark</option>
                                <option value="Djibouti">Djibouti</option>
                                <option value="Dominica">Dominica</option>
                                <option value="Dominican Republic">Dominican Republic</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Egypt">Egypt</option>
                                <option value="El Salvador">El Salvador</option>
                                <option value="Equatorial Guinea">Equatorial Guinea</option>
                                <option value="Eritrea">Eritrea</option>
                                <option value="Estonia">Estonia</option>
                                <option value="Ethiopia">Ethiopia</option>
                                <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                                <option value="Faroe Islands">Faroe Islands</option>
                                <option value="Fiji">Fiji</option>
                                <option value="Finland">Finland</option>
                                <option value="France">France</option>
                                <option value="French Guiana">French Guiana</option>
                                <option value="French Polynesia">French Polynesia</option>
                                <option value="French Southern Territories">French Southern Territories</option>
                                <option value="Gabon">Gabon</option>
                                <option value="Gambia">Gambia</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Germany">Germany</option>
                                <option value="Ghana">Ghana</option>
                                <option value="Gibraltar">Gibraltar</option>
                                <option value="Greece">Greece</option>
                                <option value="Greenland">Greenland</option>
                                <option value="Grenada">Grenada</option>
                                <option value="Guadeloupe">Guadeloupe</option>
                                <option value="Guam">Guam</option>
                                <option value="Guatemala">Guatemala</option>
                                <option value="Guernsey">Guernsey</option>
                                <option value="Guinea">Guinea</option>
                                <option value="Guinea-bissau">Guinea-bissau</option>
                                <option value="Guyana">Guyana</option>
                                <option value="Haiti">Haiti</option>
                                <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                                <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                                <option value="Honduras">Honduras</option>
                                <option value="Hong Kong">Hong Kong</option>
                                <option value="Hungary">Hungary</option>
                                <option value="Iceland">Iceland</option>
                                <option value="India">India</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                                <option value="Iraq">Iraq</option>
                                <option value="Ireland">Ireland</option>
                                <option value="Isle of Man">Isle of Man</option>
                                <option value="Israel">Israel</option>
                                <option value="Italy">Italy</option>
                                <option value="Jamaica">Jamaica</option>
                                <option value="Japan">Japan</option>
                                <option value="Jersey">Jersey</option>
                                <option value="Jordan">Jordan</option>
                                <option value="Kazakhstan">Kazakhstan</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Kiribati">Kiribati</option>
                                <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                                <option value="Korea, Republic of">Korea, Republic of</option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                <option value="Latvia">Latvia</option>
                                <option value="Lebanon">Lebanon</option>
                                <option value="Lesotho">Lesotho</option>
                                <option value="Liberia">Liberia</option>
                                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                <option value="Liechtenstein">Liechtenstein</option>
                                <option value="Lithuania">Lithuania</option>
                                <option value="Luxembourg">Luxembourg</option>
                                <option value="Macao">Macao</option>
                                <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                                <option value="Madagascar">Madagascar</option>
                                <option value="Malawi">Malawi</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Maldives">Maldives</option>
                                <option value="Mali">Mali</option>
                                <option value="Malta">Malta</option>
                                <option value="Marshall Islands">Marshall Islands</option>
                                <option value="Martinique">Martinique</option>
                                <option value="Mauritania">Mauritania</option>
                                <option value="Mauritius">Mauritius</option>
                                <option value="Mayotte">Mayotte</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                                <option value="Moldova, Republic of">Moldova, Republic of</option>
                                <option value="Monaco">Monaco</option>
                                <option value="Mongolia">Mongolia</option>
                                <option value="Montenegro">Montenegro</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Morocco">Morocco</option>
                                <option value="Mozambique">Mozambique</option>
                                <option value="Myanmar">Myanmar</option>
                                <option value="Namibia">Namibia</option>
                                <option value="Nauru">Nauru</option>
                                <option value="Nepal">Nepal</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="Netherlands Antilles">Netherlands Antilles</option>
                                <option value="New Caledonia">New Caledonia</option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="Nicaragua">Nicaragua</option>
                                <option value="Niger">Niger</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Niue">Niue</option>
                                <option value="Norfolk Island">Norfolk Island</option>
                                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                <option value="Norway">Norway</option>
                                <option value="Oman">Oman</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Palau">Palau</option>
                                <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                <option value="Panama">Panama</option>
                                <option value="Papua New Guinea">Papua New Guinea</option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Peru">Peru</option>
                                <option value="Philippines">Philippines</option>
                                <option value="Pitcairn">Pitcairn</option>
                                <option value="Poland">Poland</option>
                                <option value="Portugal">Portugal</option>
                                <option value="Puerto Rico">Puerto Rico</option>
                                <option value="Qatar">Qatar</option>
                                <option value="Reunion">Reunion</option>
                                <option value="Romania">Romania</option>
                                <option value="Russian Federation">Russian Federation</option>
                                <option value="Rwanda">Rwanda</option>
                                <option value="Saint Helena">Saint Helena</option>
                                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                <option value="Saint Lucia">Saint Lucia</option>
                                <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                                <option value="Samoa">Samoa</option>
                                <option value="San Marino">San Marino</option>
                                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                <option value="Saudi Arabia">Saudi Arabia</option>
                                <option value="Senegal">Senegal</option>
                                <option value="Serbia">Serbia</option>
                                <option value="Seychelles">Seychelles</option>
                                <option value="Sierra Leone">Sierra Leone</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Slovakia">Slovakia</option>
                                <option value="Slovenia">Slovenia</option>
                                <option value="Solomon Islands">Solomon Islands</option>
                                <option value="Somalia">Somalia</option>
                                <option value="South Africa">South Africa</option>
                                <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                                <option value="Spain">Spain</option>
                                <option value="Sri Lanka">Sri Lanka</option>
                                <option value="Sudan">Sudan</option>
                                <option value="Suriname">Suriname</option>
                                <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                                <option value="Swaziland">Swaziland</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                                <option value="Tajikistan">Tajikistan</option>
                                <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Timor-leste">Timor-leste</option>
                                <option value="Togo">Togo</option>
                                <option value="Tokelau">Tokelau</option>
                                <option value="Tonga">Tonga</option>
                                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                <option value="Tunisia">Tunisia</option>
                                <option value="Turkey">Turkey</option>
                                <option value="Turkmenistan">Turkmenistan</option>
                                <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                <option value="Tuvalu">Tuvalu</option>
                                <option value="Uganda">Uganda</option>
                                <option value="Ukraine">Ukraine</option>
                                <option value="United Arab Emirates">United Arab Emirates</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="United States">United States</option>
                                <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                <option value="Uruguay">Uruguay</option>
                                <option value="Uzbekistan">Uzbekistan</option>
                                <option value="Vanuatu">Vanuatu</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Viet Nam">Viet Nam</option>
                                <option value="Virgin Islands, British">Virgin Islands, British</option>
                                <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                <option value="Wallis and Futuna">Wallis and Futuna</option>
                                <option value="Western Sahara">Western Sahara</option>
                                <option value="Yemen">Yemen</option>
                                <option value="Zambia">Zambia</option>
                                <option value="Zimbabwe">Zimbabwe</option>
                            </select>
                        </div>
                    </div>	
                    <div className="flex-inline">
                        <label>Profile Picture:</label>
                        <div id="registration-image">
                            <div id="registration-image-container">
                                <div className="full-row">
                                    <img src={image} alt="profile" />
                                </div>
                                <div className="full-row">
                                    <input type="file" 
                                        name="profile_picture" 
                                        className="custom-select-input"
                                        onChange={imageHandler} />
                                </div>
                                <div className="full-row">
                                    <Link to="/register" onClick={() => {setImage('../../img/user-profile.png')}}>Remove Image</Link>
                                </div>
                            </div>
                        </div>
                    </div>     
                    <h3>Referred By: </h3>   
                    <div className="flex-inline ">
                        <label>Name: * </label>
                        <input type="text" 
                                name="referrer_name" 
                                placeholder="Enter Name"
                                value={referrer_name}
                                onChange={onChange} />
                    </div> 
                    <div className="flex-inline ">
                        <label>Email: *</label>
                        <input type="email" 
                                name="referrer_email" 
                                placeholder="Enter Email"
                                value={referrer_email}
                                onChange={onChange} />
                    </div>
                
                    <button>Registration</button>
                    <Alert />
                    <p text-align="center">* Marked fields are required. Please fill up these fields <br/><br/>
                        Already have an account? <Link to="/login">Login Here</Link>
                    </p>
		        </form>
	        </div>
        </div>
        
    )
};
Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});
// const mapDispatchToProps = (dispatch) => {
//     return {
//         actions: bindActionCreators({
//             setAlert,
//             register
//         }, dispatch)
//     }
// }
export default connect(mapStateToProps, {register})(Register);

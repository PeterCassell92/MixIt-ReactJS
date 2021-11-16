import { useEffect, useState, } from "react"
import { useHistory } from "react-router"
import getFromLocalStorage from "../../common/storage"
import styled from "styled-components"
import localforage from "localforage"
import Swal from "sweetalert2"
import SwalConfig from "../../common/lib_extensions/swal_config"
import { personal as PERSONAL } from "../../common/constants"
import {
    validateFirstName,
    validateSurname,
    validateMobileNumber,
    validateEmail    
} from "../../common/validators"
import { selectedTheme as theme } from "../../common/themes/theme"
import Header from "../../components/Header"
import { Input, InputGroup } from "../../components/Inputs/Inputs"
import Button from "../../components/Button/Button"
import { Row } from "../../components/Flex"
import PageWrapper from "../../components/PageWrapper"
import SectionHeader from "../../components/SectionHeader"
import { ProfileImageUploader } from "../../components/Image/Image"

const ProfileImageWrapper = styled(Row)`
  margin: 24px 0;
`;

function Profile() {
    const history = useHistory();
    const [ready, setReady] = useState(false);
    const [registered, setRegistered] = useState(false);
    //field handling
    const [firstName, setFirstName] = useState('');
    const [firstNameAttempted, setFirstNameAttempted] = useState(false);
    const [firstNameValid, setFirstNameValid] = useState(false);
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
        if(!firstNameAttempted){setFirstNameAttempted(true)};
        setFirstNameValid(validateFirstName(event.target.value).length === 0);
    }

    const [surname, setSurname] = useState('');
    const [surnameAttempted, setSurnameAttempted] = useState(false);
    const [surnameValid, setSurnameValid] = useState(false);
    const handleSurnameChange = (event) => {
        setSurname(event.target.value);
        if(!surnameAttempted){setSurnameAttempted(true)};
        setSurnameValid(validateSurname(event.target.value).length === 0);
    } 

    const [mobileNumber, setMobileNumber] = useState('');
    const [mobileNumberAttempted, setMobileNumberAttempted] = useState(false);
    const [mobileNumberValid, setMobileNumberValid] = useState(false);
    
    const handleMobileNumberChange = (event) => {
        setMobileNumber(event.target.value);
        if(!mobileNumberAttempted){setMobileNumberAttempted(true)};
        setMobileNumberValid(validateMobileNumber(event.target.value).length === 0);
    }
    
    const [email, setEmail] = useState('');
    const [emailAttempted, setEmailAttempted] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        if(!emailAttempted){setEmailAttempted(true)};
        setEmailValid(validateEmail(event.target.value).length === 0); 
    }

    const [profileImageSrc, setProfileImageSrc] = useState('');
    const handleProfileImageSrcChange = (event) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImageSrc(reader.result);
            localforage.setItem(PERSONAL.keys.profileImage, reader.result);
        };

        if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
        }
    };

    useEffect(() => {
        getFromLocalStorage(PERSONAL.keys.registered, setRegistered)
        .then((isRegistered) => {
            //if user is already registered then the profile information
            //will need to be retrieved
            //validity / attempted state will need to be set.
            if(isRegistered){
                Promise.all([
                    getFromLocalStorage(PERSONAL.keys.firstName, setFirstName),
                    getFromLocalStorage(PERSONAL.keys.surname, setSurname),
                    getFromLocalStorage(PERSONAL.keys.mobileNumber, setMobileNumber),
                    getFromLocalStorage(PERSONAL.keys.email, setEmail),
                    getFromLocalStorage(PERSONAL.keys.profileImage, setProfileImageSrc)
                ]).then((arr)=>{
                    //set attempted / valid state for each field
                    if(arr[0] != ''){
                        setFirstNameAttempted(true);
                        setFirstNameValid(validateFirstName(arr[0]).length === 0);
                    }
                    if(arr[1] != ''){
                        setSurnameAttempted(true);
                        setSurnameValid(validateSurname(arr[1]).length === 0);
                    }
                   
                    if(arr[2] != ''){
                        setMobileNumberAttempted(true);
                        setMobileNumberValid(
                            validateMobileNumber(arr[2]).length === 0
                        );
                    }
                    if(arr[3] != ''){
                        setEmailAttempted(true);
                        setEmailValid(validateEmail(arr[3]).length === 0);
                    }
                      
                });              
            }
            setReady(true);
        });
      }, []);   

    

    const handleRegisterOnClick = (e) => {
        e.preventDefault();
        //re-validate data prior to submission.
        const validationErrors = [
            ...validateFirstName(firstName),
            ...validateSurname(surname),
            ...validateMobileNumber(mobileNumber),
            ...validateEmail(email)];
        if(validationErrors.length > 0){
            const content = (validationErrors.length > 1) ?
            `<ul><li>${validationErrors.join("</li><li>")}</li></ul>`:
            validationErrors[0];

            Swal.fire(new SwalConfig({
                error: true,
                text: content,
                isHtml: true,
            }))
        }
        else if (validationErrors.length === 0){
            //set in local storage
            localforage.setItem(PERSONAL.keys.firstName, firstName).then();
            localforage.setItem(PERSONAL.keys.surname, surname).then();
            localforage.setItem(PERSONAL.keys.email, email).then();
            localforage.setItem(PERSONAL.keys.mobileNumber, mobileNumber).then();
            localforage.setItem(PERSONAL.keys.registered, true).then();
            
            Swal.fire(new SwalConfig({
                success: true,
                text: !registered ? "Registration Successful": "Profile Updated",
                large: true,
                preventOutsideClick: true
            }))
            .then((result) =>{
                if(result.isConfirmed){
                    //navigate to next page
                    history.push("/dashboard");
                }
            });
        }
        else{
            Swal.fire(new SwalConfig({
                error: true,
                isHtml: true,
            }))
        }
    }

    return (
        <>
        {ready && 
        <PageWrapper>
            <Header/>
            <Row as="main" justify='center'>
                <form className = "col-12 col-lg-7"
                name="Profile Details"
                aria-label="Profile Details"
                onSubmit ={(e) => handleRegisterOnClick(e)}>
                    <SectionHeader
                    title={!registered? "Register" : "Profile"}
                    textcolor = {theme.main.color.textheading}
                    className="mt-4"/>
                    <ProfileImageWrapper justify="center">
                        <ProfileImageUploader
                        src={profileImageSrc}
                        height='200px'
                        id="profile-image"
                        name="profile-image"
                        label="Profile Image"
                        onChange={handleProfileImageSrcChange} />
                    </ProfileImageWrapper>
                    <InputGroup className="py-2">
                        <Input
                        id="firstname"
                        label="First Name"
                        type="text"
                        placeholder="First Name"
                        value={firstName? firstName : ''}
                        onChange={handleFirstNameChange}
                        attempted={firstNameAttempted}
                        valid={firstNameValid}/>
                        <Input
                        id="surname"
                        label="Surname"
                        type="text"
                        placeholder="Last Name"
                        value={surname? surname: ''}
                        onChange={handleSurnameChange}
                        attempted={surnameAttempted}
                        valid={surnameValid}/>
                    </InputGroup>
                    <InputGroup className="py-2">  
                        <Input
                        id="mobilenumber"
                        label="Mobile Number"
                        type="text"
                        placeholder="Mobile Number"
                        value={mobileNumber? mobileNumber:''}
                        onChange={handleMobileNumberChange}
                        attempted={mobileNumberAttempted}
                        valid={mobileNumberValid}/>
                        <Input
                        id="email"
                        label="Email"
                        type="text"
                        placeholder="Email Address"
                        value={email? email: ''}
                        onChange={handleEmailChange}
                        attempted={emailAttempted}
                        valid={emailValid}/>
                    </InputGroup>
                    <Row className= "pt-2 pb-4 justify-content-end">
                        <Button
                        id="update-profile-details-btn"
                        name="Update Profile Details"
                        aria-label="Update Profile Details"
                        className="btn-secondary float-right"
                        text={!registered? "Register" : "Update"}
                        >
                        </Button>
                    </Row>
                </form>
            </Row>
        </PageWrapper>}
        </>
    )
}

export default Profile;

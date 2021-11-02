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
import { Input, InputGroup } from "../../components/Inputs"
import Button from "../../components/Button"
import { Row ,Column } from "../../components/Flex"
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
        .then(() => {
            console.log("Registered " + String(registered));
            if(registered){
                Promise.all([
                    getFromLocalStorage(PERSONAL.keys.firstName, setFirstName),
                    getFromLocalStorage(PERSONAL.keys.surname, setSurname),
                    getFromLocalStorage(PERSONAL.keys.mobileNumber, setMobileNumber),
                    getFromLocalStorage(PERSONAL.keys.email, setEmail),
                    getFromLocalStorage(PERSONAL.keys.profileImage, setProfileImageSrc)
                ]);              
            }
            setReady(true);
        });
      }, []);   

    

    const handleRegisterOnClick = (e) => {
        e.preventDefault();
        //re-validate data prior to submission.

        const fn = validateFirstName(firstName);
        const sn = validateSurname(surname);
        const mbn = validateMobileNumber(mobileNumber);
        const em = validateEmail(email);

        const validationErrors = [...fn, ...sn, ...mbn, ...em];
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
                large: true
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
            <Row justify='center'>
                <form className = "col-12 col-lg-7">
                    <SectionHeader
                    title={!registered? "Register" : "Profile"}
                    textcolor = 'var(--off-white)'
                    className="mt-4"/>
                    <ProfileImageWrapper justify="center">
                        <ProfileImageUploader
                        src={profileImageSrc}
                        height='200px'
                        onChange={handleProfileImageSrcChange} />
                    </ProfileImageWrapper>
                    <InputGroup className="py-2">
                        <Input
                        type="text"
                        placeholder="First Name"
                        value={firstName? firstName : ''}
                        onChange={handleFirstNameChange}
                        complete={firstNameAttempted && firstNameValid}
                        warning={firstNameAttempted && !firstNameValid}/>
                        <Input
                        type="text"
                        placeholder="Last Name"
                        value={surname? surname: ''}
                        onChange={handleSurnameChange}
                        complete={surnameAttempted && surnameValid}
                        warning={surnameAttempted && !surnameValid}/>
                    </InputGroup>
                    <InputGroup className="py-2">  
                        <Input
                        type="text"
                        placeholder="Mobile Number"
                        value={mobileNumber? mobileNumber:''}
                        onChange={handleMobileNumberChange}
                        complete={mobileNumberAttempted && mobileNumberValid}
                        warning={mobileNumberAttempted && !mobileNumberValid}/>
                        <Input
                        type="text"
                        placeholder="Email Address"
                        value={email? email: ''}
                        onChange={handleEmailChange}
                        complete={emailAttempted && emailValid}
                        warning={emailAttempted && emailValid}/>
                    </InputGroup>
                    <Row className= "pt-2 pb-4">
                        <Button
                        color='var(--secondary)'
                        text={!registered? "Register" : "Update"}
                        onClick={(e) => handleRegisterOnClick(e)}>
                        </Button>
                    </Row>
                </form>
            </Row>
        </PageWrapper>}
        </>
    )
}

export default Profile;

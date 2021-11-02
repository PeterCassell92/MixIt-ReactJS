import { useEffect, useState} from "react";
import styled from "styled-components"
import localforage from "localforage";
import { Link } from "react-router-dom";
import SVG, {Props as SVGProps} from 'react-inlinesvg';
import {FaEdit} from 'react-icons/fa'
import { getFromLocalStorage}  from "../common/storage";
import { personal as PERSONAL } from "../common/constants";

import { Row, Column } from "./Flex";
import { ProfileImageUploader } from "./Image/Image";
import DisplayField from "./DisplayField";



const ProfileImageWrapper = styled(Row)`
  margin: 24px 0;
`;

const StyledHeader = styled.h1`
    font-weight: bold;
    color: var(--off-white);
    text-align: center;
`

const StyledDivider = styled.hr`
    margin-left: 20%;
    margin-right: 20%;
    background-color: var(--off-white);
    height: 5px !important;
    opacity: 1 !important;
`
const FloatingLink = styled(Link)`
    position: relative;
    text-align: center;
`

function CondensedProfile() {
    
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [profileImageSrc, setProfileImageSrc] = useState('');
    const [ready, setReady] = useState(false);

    useEffect(() => {
        Promise.all([
            getFromLocalStorage(PERSONAL.keys.firstName, setFirstName),
            getFromLocalStorage(PERSONAL.keys.surname, setSurname),
            getFromLocalStorage(PERSONAL.keys.mobileNumber, setMobileNumber),
            getFromLocalStorage(PERSONAL.keys.email, setEmail),
            getFromLocalStorage(PERSONAL.keys.profileImage, setProfileImageSrc),
        ])
        .then(() => {
            setReady(true);
        });
      }, []);
    
      // Event handlers
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
    return (
        <>
          { ready &&
          <section>
            <Row className = "p-2" wrap="wrap-reverse">
                    <Column className="col-12 col-lg-7">
                        {/* editicon {FaEdit} Todo */}
                        <FloatingLink to='profile'>Edit
                        </FloatingLink>
                        <FaEdit />
                        <StyledHeader>{firstName} {surname}</StyledHeader>
                        <StyledDivider/>
                        <DisplayField label="Email" value={email}/>
                        <DisplayField label="Mobile" value={mobileNumber}/>
                    </Column>

                    <ProfileImageWrapper justify="center" className="col-12 col-lg-5">
                        <ProfileImageUploader src={profileImageSrc} height='200px'
                        onChange={handleProfileImageSrcChange} label="profileImageUploader" />
                    </ProfileImageWrapper>
                </Row>
            </section>}
        </>
    )
}

export default CondensedProfile

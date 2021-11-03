import { useEffect, useState} from "react";
import styled from "styled-components"
import localforage from "localforage";
import { Link } from "react-router-dom";
import SVG, {Props as SVGProps} from 'react-inlinesvg';
import { selectedTheme as theme } from "../common/themes/theme";
import { FaEdit } from 'react-icons/fa'
import { StyledFaIconLink } from "./Links";
import { getFromLocalStorage}  from "../common/storage";
import { personal as PERSONAL } from "../common/constants";

import { Row, Column } from "./Flex";
import { ProfileImageUploader } from "./Image/Image";
import DisplayField from "./DisplayField";

const ProfileImageWrapper = styled(Row)`
  margin: 0 0 24px 0;
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
const EditIconLink = styled(StyledFaIconLink)`
    position: absolute;
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
          <aside>
            <Row className = "p-2" wrap="wrap-reverse">
                    <Column className="col-12 col-lg-7">
                        <EditIconLink to='/profile' faicon={FaEdit}/>
                        <StyledHeader>{firstName} {surname}</StyledHeader>
                        <StyledDivider/>
                        <DisplayField label="Email" value={email}/>
                        <DisplayField label="Mobile" value={mobileNumber}/>
                    </Column>

                    <ProfileImageWrapper
                    justify="center"
                    className="col-12 col-lg-5">
                        <ProfileImageUploader
                        src={profileImageSrc}
                        height="150px"
                        onChange={handleProfileImageSrcChange}
                        id="profile-image"
                        name="Profile Image"
                        label="Profile Image"/>
                    </ProfileImageWrapper>
                </Row>
            </aside>}
        </>
    )
}

export default CondensedProfile

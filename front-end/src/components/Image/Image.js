import React, {useState, Fragment} from 'react';
import _uniqueId from 'lodash/uniqueId';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import { selectedTheme as theme } from '../../common/themes/theme';

import { InputInvisible } from '../Inputs';

import ProfileIcon from './svg/profile_outline.svg';

const StyledSVG = styled(SVG)`
  height: 60%;
  width: 60%;
  padding-bottom: 16px;

  & path {
    fill: ${props => props.fill|| theme.main.color.svgfill};
  }
`;

const Image = styled.div`
  border-radius: 100%;
  height: 100%;
  width: 100%;
  background-color: transparent;
  background-size: cover;
  background-repeat: no-repeat;

  background-image: ${props => `url("${props.src}")`};
`;

const LabelWrapper = styled.label`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  -webkit-tap-highlight-color: transparent;
  -webkit-hightlight: none;

  &:hover {
    text-decoration: underline;
  }

  height: ${props => props.height ? props.height : '100%'};
  width: ${props => props.height ? props.height : '100%'};

  background-color: ${theme.input.color.background};
`;

const LinkText = styled.span`
  cursor: pointer;
  position: relative;
  bottom: 16px;
  

  color: ${props => props.color || theme.main.color.svgfill};
`;

function ProfilePlaceholder({link, ...props}) {
  return (
    <Fragment>
      <StyledSVG src={ProfileIcon} {...props} />
      {link &&
        <LinkText>{link}</LinkText>
      }
    </Fragment>
  );
}

function FileUploader({children, onChange, onClick, label, ...props}) {
  const [id] = useState(_uniqueId('file-uploader-'));

  return (
    <Fragment>
      {children &&
        <LabelWrapper htmlFor={id} {...props}>
          {children}
        </LabelWrapper>
      }
     <InputInvisible id={id} type='file' onChange={onChange} onClick={onClick} label={label} />
    </Fragment>
  );
}

function ProfileImage({src, ...props}) {
  return (
    <LabelWrapper {...props}>
      {src
        ? <Image src={src} />
        : <ProfilePlaceholder />
      }
    </LabelWrapper>
  );
}

function ProfileImageUploader({src, ...props}) {
  return (
    <FileUploader {...props}>
      {src
        ? <Image src={src} />
        : <ProfilePlaceholder link='Add photo' />
      }
    </FileUploader>
  );
}

export { Image, ProfileImage, ProfileImageUploader };
export default Image;

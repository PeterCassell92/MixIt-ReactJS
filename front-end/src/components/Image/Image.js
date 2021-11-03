import React, { Fragment } from 'react';
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
    fill: ${props => props.fill|| theme.container.color.svgfill};
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
  position: relative;
  bottom: 16px;
  color: ${props => props.color || theme.container.color.svgfill};
`;

function ProfilePlaceholder({placeholder, ...props}) {
  return (
    <Fragment>
      <StyledSVG src={ProfileIcon} {...props} />
      {placeholder &&
        <LinkText>{placeholder}</LinkText>
      }
    </Fragment>
  );
}

function FileUploader({children, onChange, onClick, id, label, name, ...props}) {
  return (
    <Fragment>
      {children &&
        <LabelWrapper htmlFor={id} {...props}>
          {children}
        </LabelWrapper>
      }
     <InputInvisible
     id={id}
     name={name}
     type='file'
     onChange={onChange}
     onClick={onClick}
     aria-label={label}/>
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
        : <ProfilePlaceholder placeholder='Add photo' />
      }
    </FileUploader>
  );
}

export { Image, ProfileImage, ProfileImageUploader };
export default Image;

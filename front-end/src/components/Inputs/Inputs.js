import React, { Fragment, useState, useRef } from 'react';
import styled, { css } from 'styled-components';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { selectedTheme as theme} from '../../common/themes/theme';
//import _uniqueId from 'lodash/uniqueId';

import { Row, Column } from '../Flex';
import InputIcon from './InputIcon';


function withPlaceholderText(component) {
  return styled(component)`
    & ::placeholder {
      opacity: 1;
      color: ${props => props.color || theme.input.color.placeholder} !important;
    }

    & ::-webkit-input-placeholder {
      opacity: 1;
      color: ${props => props.color || theme.input.color.placeholder} !important;
    }

    /* Microsoft Edge, IE */
    & :-ms-input-placeholder {
      opacity: 1;
      color: ${props => props.color || theme.input.color.placeholder} !important;
    }

    & ::-ms-input-placeholder {
      opacity: 1;
      color: ${props => props.color || theme.input.color.placeholder} !important;
    }

    /* Firefox 19+ */
    & :-moz-placeholder {
      opacity: 1;
      color: ${props => props.color || theme.input.color.placeholder} !important;
    }

    /* older Firefox*/
    & ::-moz-placeholder {
      opacity: 1;
      color: ${props => props.color || theme.input.color.placeholder} !important;
    }
  `;
}

function backgroundColor(props) {
  if (props.tinted) {
    return theme.input.color.tinted;
  }

  if (props.naked) {
    return 'transparent';
  }

  if (props.bgalt) {
    return theme.input.color.backgroundalt;
  }

  return theme.input.color.background;
}

function InputInvisible(props){
  return <input {...props} className="visually-hidden"></input>
}

// const InputInvisible = withPlaceholderText(styled.input`
//   /* If an input is shrunk or has font-size < 16, iOS insists on zooming in on focus */
//   font-size: 16px;

//   /* Fix type="file" for Chrome, which still displayed a button */
//   position: absolute;
//   z-index: -1;

//   background: transparent;
//   color: transparent;
//   border: 0;
//   outline-style: none;
//   outline: none;
//   box-shadow: none;
//   border-color: transparent;
//   caret-color: transparent;
//   appearance: none;

//   /* Position at top to stop iOS scrolling */
//   position: absolute;
//   top: 0;

//   /* iOS only */
//   @supports (-webkit-overflow-scrolling: touch) {
//     font-size: 16px;
//   }

//   &:focus {
//     outline: none;
//     text-indent: -9999em;
//   }
// `, 'transparent');

const StyledInput = withPlaceholderText(styled.input`
  font-size: 17px;
  letter-spacing: -0.41px;
  line-height: 22px;
  font-weight: 400;
  border: none;
  border-radius: 10px;
  padding: 11px 16px;
  flex-grow: 1;
  width: 100%;

  &:disabled {
    /* counter to safari styling of disabled inputs */
    opacity: 1;
  }

  &[type=date], &[type=select]{
    /* stops iOS from styling date inputs */
    -webkit-appearance: none;
  }

  &:focus, &:active, &.has-focus {
    outline: none;
  }

  /* iOS only */
  @supports (-webkit-overflow-scrolling: touch) {
    font-size: 16px;
  }

  color: ${props => props.color || theme.input.color.text} !important;
  background-color: ${props=> backgroundColor(props)}!important;

  &:visited, &:active {
    color: ${props => props.color || theme.input.color.text} !important;
    background-color: ${props => props.background || theme.input.color.background} !important;
  }

  ${props => props.includesIcon && css`
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;

    &:focus {
      outline: none;
      cursor: none;
    }
  `}
`);

//Todo resolve input background color
const _InputIconWrapper = styled.div`
  border-radius: 0 10px 10px 0;
  background-color:  ${theme.input.color.backgroundalt};
  display: flex;
  align-items: center;
  border-bottom: 1px ${theme.input.color.innerSeparator}
`;
const InputIconWrapper = withPlaceholderText(_InputIconWrapper);

function InputWrapper({className, id, label, visibleLabel, onChange, readOnly, valid, attempted, ...props}) {
  //setup icons
  const complete= valid && attempted;
  const warning = !valid && attempted;
  const link = props.link;
  const chevron = props.icon;
  const includesIcon = (complete||warning||link||chevron);
  return (
    <Column id={`field-${id}`} data-testid={`field-${id}`}>
      <FieldLabel htmlFor={id} className={visibleLabel? "":"visually-hidden"}>
        {label}:
      </FieldLabel>
      <Row grow wrap='no-wrap'>
        <StyledInput
        id={id}
        name={id}
        className={className}
        autoComplete='off'
        spellCheck='false'
        onChange={onChange}
        includesIcon={includesIcon}
        {...props} />
        {includesIcon &&
          <InputIconWrapper name="Icon Wrapper"
            naked={props.naked}
            tinted={props.tinted}
            bgalt={props.bgalt}>
            <InputIcon complete={complete} warning={warning} link={link} icon={chevron}/>
          </InputIconWrapper>}
      </Row>
    </Column>
  );
}

InputWrapper.defaultProps= {
  readOnly: false,
  visibleLabel: false,
}

InputWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  visibleLabel: PropTypes.bool,
  readOnly: PropTypes.bool
}


const Input = styled(InputWrapper)`
  display: auto;
  /* explicit height counters weird safari behaviour with icons at the end of inputs */
  height: ${props => props.size? props.size : theme.input.height.standard};
`;

const InputGroupItem = styled.div`
  & ${StyledInput}, & ${InputIconWrapper}  {
    border-radius: unset;
    margin-top: 0;

    &:focus{
      z-index: 1;
    }
  }

  ${props => props.first && css`
    & ${StyledInput},  & ${StyledInputSelect} {
      border-top-left-radius: 10px;
      border-top-right-radius: ${props=> props.includesIcon ? '0px' : '10px'}
    }

    & ${InputIconWrapper} {
      border-top-right-radius: 10px;
    }
  `};

  ${props => props.last && css`
    & ${StyledInput}, & ${StyledInputSelect} {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: ${props=> props.includesIcon ? '0px' : '10px'}
    }

    & ${InputIconWrapper} {
      border-bottom-right-radius: 10px;
    }
  `};

  ${props => !props.last && css`
    & ${Input}, ${InputIconWrapper} {
      border-bottom: 1px solid grey;
      margin-bottom: 0;
    }
  `};
`;

const InputGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function InputGroup(props) {
  return (
    <InputGroupWrapper {...props}>
      {Array.isArray(props.children)
      ? props.children.map((x, i) =>
         <InputGroupItem key={`${props.key}-ig-item-${i}`}
          first={i === 0}
          last={i === props.children.length - 1}>
            {x}
          </InputGroupItem>)
      : <InputGroupItem first last>{props.children}</InputGroupItem>
      }
    </InputGroupWrapper>
  );
}

const InputLinkInner = styled(Input)`
  cursor: pointer;
  caret-color: transparent;
`;

const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`;

function InputLink({to, ...props}) {
  const dummy = () => {};

  return (
    <StyledLink to={to}>
      <InputLinkInner onClick={dummy} onChange={dummy} link {...props} />
    </StyledLink>
  );
}

const StyledExternalLink = styled.a`
  cursor: pointer;
  text-decoration: none;
`;

function InputExternalLink({to, target, ...props}) {
  const dummy = () => {};

  return (
    <StyledExternalLink href={to} target={target || '_blank'}>
      <InputLinkInner onClick={dummy} onChange={dummy} external-link {...props} />
    </StyledExternalLink>
  );
}

const InputLabel = styled.div`
  font-size: 17px;
  letter-spacing: -0.41px;
  line-height: 22px;
  font-weight: 400;
  border: none;
  border-radius: 10px;
  padding: 11px 16px;
  flex-grow: 1;
  text-align: left;

  cursor: ${props => props.disabled ? 'normal' : 'pointer'};

  color: ${props => theme.input.color};
  background-color: ${props => backgroundColor(props)};

  &:visited, &:active {
    color: ${props => theme.input.color};
    background-color: ${props => backgroundColor(props)};
  }

  ${props => propsIncludesIcon(props) && css`
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  `}
`;

const ToggleOuter = styled.div`
  width: 51px;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  padding: 1px 2px;
  border-radius: 15px;

  justify-content: ${props => (props.value === true) ? 'flex-end' : 'flex-start'};

  background-color: ${props => (props.value === true)
    ? theme.main.success
    : theme.main.warning
  };
`;

const ToggleInner = styled.div`
  width: 27px;
  height: 27px;
  border-radius: 50%;

  background-color: ${props => (props.value === true)
    ? props.theme.toggle.inner
    : props.theme.toggle.innerFalse
  };
  box-shadow: ${props => props.theme.toggle.shadow};
`;

function Toggle({value, ...props}) {
  return (
    <ToggleOuter value={value} {...props}>
      <ToggleInner value={value} />
    </ToggleOuter>
  );
}

const ToggleWrapper = styled(InputIconWrapper)`
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const ToggleInputWrapper = styled(Row)`
  cursor: ${props => props.disabled ? 'normal' : 'pointer'};
`;

function InputToggle({className, disabled, ...props}) {
  return (
    <ToggleInputWrapper grow disabled={disabled ? 1 : 0}>
      <InputLabel className={className} toggle naked={props.naked} tinted={props.tinted}>
        {props.children}
      </InputLabel>
      <ToggleWrapper naked={props.naked} tinted={props.tinted}>
        <Toggle {...props} />
      </ToggleWrapper>
    </ToggleInputWrapper>
  );
}

const TextArea = styled.textarea`
  font-size: 17px;
  letter-spacing: -0.41px;
  line-height: 22px;
  font-weight: 400;
  border: none;
  border-radius: 10px;
  padding: 11px 16px;
  flex-grow: 1;
  width: 100%;
  box-sizing: border-box;
  resize: none;



  color: ${props => theme.input.color.text};
  background-color: ${props => backgroundColor(props)};
`;

const FieldLabel = styled.label`
  font-size: 13px;
  letter-spacing: -0.08px;
  line-height: 18px;
  font-weight: 400;
  padding-bottom: 6px;

  color: ${props => theme.input.color.label};
`;

//select styled to be like the other inputs
const StyledInputSelect = styled(Select)`
  font-size: 17px;
  letter-spacing: -0.41px;
  line-height: 22px;
  font-weight: 400;
  border: none;
  padding: 11px 16px;
  flex-grow: 1;

  /* stops iOS from styling dropdowns */
  -webkit-appearance: none;

  /* stops iOS giving it a 2px margin */
  margin: 0;

  color: ${props => (props.value === props.placeholder || props.value === '')
    ? props.theme.text.color.placeholder
    : props.theme.input.color
  };
  background-color: ${props => backgroundColor(props)};

  &:focus, &:active, &.has-focus {
    outline: none;
  }

  ${props => propsIncludesIcon(props) && css`
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;

    &:focus {
      outline: none;
      cursor: none;
    }
  `}
`;

function Select({options = [],value, onChange, selectid, placeholder, className, ...props}) {
  const [id] = useState(_uniqueId('select-option-'));

  return (
    <select id={selectid} value={value ? value : placeholder} onChange={onChange} className={className}>
      {placeholder && <option disabled hidden name={placeholder}>{placeholder}</option>}
      {options.map((x,i) => <option name={x} key={`${id}-${i}`} >{x}</option>)}
    </select>
  );
}

function InputSelect({className, selectid, ...props}) {
  return (
    <Row grow>
      <StyledInputSelect className={className} selectid={selectid} icon='Chevron' {...props}  />
    </Row>
  );
}

const InputDateWithPlaceholder = styled(Input)`
  &[type="date"][value=""] {
    position: relative;
    color: transparent;
    padding: 11px 16px;
  }

  &[type="date"]:focus {
    color: ${props => theme.input.color.text};
  }

  &[type="date"][value=""]:before {
    content: attr(placeholder);
    position: absolute;
    width: calc(100% - 20px);
    padding: 11px 16px 11px 0;

    background-color: transparent;
    color: ${props => theme.input.color.placeholder};
  }

  &[type="date"]:focus:before {
    content: none;
  }
`;

function InputDate(props) {
  return <InputDateWithPlaceholder type='date' {...props} />;
}

// HOC to associate a label with a child component
function withLabel(WrappedComponent) {
  return ({className, label, ...props}) => {
    const [inputId] = useState(_uniqueId('labelledcomponent-'));

    return (
      <Column left className={className}>
        {label && <FieldLabel htmlFor={inputId}>{label}:</FieldLabel>}
        <WrappedComponent id={inputId} {...props} />
      </Column>
    );
  };
}

function withoutScroll(WrappedComponent)  {
  return (({value = '', ...props}) =>  {
    const proxyInput = useRef();
    const [proxyValue, setProxyValue] = useState(value);

    const handleChange = e => setProxyValue(e.target.value);
    const handleFocus = () => {
      if (proxyInput.current) {
        proxyInput.current.focus();
      }
    }

    // Create props for the proxy input
    // Below is a list of props names to explicitly exclude
    const propsToExclude = [
      'className',
      'ref'
    ];

    const proxyProps = Object.keys(props)
      .filter(x => !propsToExclude.includes(x))
      .reduce((obj, x) => {
        obj[x] = props[x];
        return obj;
      }, {});

    return (
      <Fragment>
        <InputInvisible {...proxyProps} ref={proxyInput} onChange={handleChange} value={proxyValue}  />
        <WrappedComponent onFocus={handleFocus} defaultValue={proxyValue} {...props} />
      </Fragment>
    );
  });
}


export {
  Input,
  InputGroup,
  InputLink,
  InputExternalLink,
  InputToggle,
  InputLabel,
  InputInvisible,
  InputSelect,
  InputDate,
  TextArea,
  FieldLabel,
  withoutScroll
};
export default Input;

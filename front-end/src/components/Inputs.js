import React, { Fragment, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import SVG from 'react-inlinesvg';
import { Link } from 'react-router-dom';
import { selectedTheme as theme} from '../common/themes/theme';
//import _uniqueId from 'lodash/uniqueId';

import { Row, Column } from './Flex';

import ExclamationIconSrc from '../common/svg/icon-exclamation.svg';
import CheckmarkIconSrc from '../common/svg/icon-checkmark.svg';
import LinkIconSrc from '../common/svg/icon-link.svg';
import ChevronIconSrc from '../common/svg/icon-chevron.svg';

const IconProps = [
  'complete',
  'link',
  'external-link',
  'toggle'
];

function withPlaceholderText(component, color) {
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

function propsIncludesIcon(props) {
  return Object.keys(props).some(key => !!props[key] && IconProps.includes(key));
}

function backgroundColor(props) {
  if (props.tinted) {
    return theme.input.tinted;
  }

  if (props.naked) {
    return 'transparent';
  }

  return theme.input.background;
}

const InputInvisible = withPlaceholderText(styled.input`
  /* If an input is shrunk or has font-size < 16, iOS insists on zooming in on focus */
  font-size: 16px;

  /* Fix type="file" for Chrome, which still displayed a button */
  position: absolute;
  z-index: -1;

  background: transparent;
  color: transparent;
  border: 0;
  outline-style: none;
  outline: none;
  box-shadow: none;
  border-color: transparent;
  caret-color: transparent;
  appearance: none;

  /* Position at top to stop iOS scrolling */
  position: absolute;
  top: 0;

  /* iOS only */
  @supports (-webkit-overflow-scrolling: touch) {
    font-size: 16px;
  }

  &:focus {
    outline: none;
    text-indent: -9999em;
  }
`, 'transparent');

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
  background-color: ${props => props.background || theme.input.color.background} !important;

  &:visited, &:active {
    color: ${props => props.color || theme.input.color.text} !important;
    background-color: ${props => props.background || theme.input.color.background} !important;
  }

  ${props => propsIncludesIcon(props) && css`
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;

    &:focus {
      outline: none;
      cursor: none;
    }
  `}
`);

const _InputIconWrapper = styled.div`
  border-radius: 0 10px 10px 0;
  background-color: ${theme.input.color.background};
  display: flex;
  align-items: center;
  border-bottom: 1px ${theme.input.color.innerSeparator}
`;
const InputIconWrapper = withPlaceholderText(_InputIconWrapper);

const InputSvg = styled(SVG)`
  height: ${props => props.size? props.size : theme.input.height.standard};
  padding: 0 4px;

  margin-right: ${props => props.margin || 0};

  ${props => props.success && css`
    & path {
      fill: ${props => theme.main.color.success};
    }
  `}

  ${props => props.info && css`
    & path {
      fill: ${props => theme.main.color.info};
    }
  `}
`;

// The chevron points to the left but we want it to point to the right
// in this context. Transform and resize it.
const ChevronIcon = styled(InputSvg)`
  transform: rotate(180deg);
  width: 17px;
`;

// The margins here allow for small differences in the SVG assets
// This isn't an ideal solution but it save reformatting a lot of SVGs
function InputIcon(props) {
  if (props.complete) {
    return <InputSvg margin='0px' src={CheckmarkIconSrc} success={1} />;
  }
  console.log(`what is it?  ${props.warning}`)

  if (props.warning){
    console.log("making icon happen")
    return <InputSvg margin='0px' src={ExclamationIconSrc}/>;
  }

  if (props.link) {
    return <ChevronIcon margin='9px' src={ChevronIconSrc} info={1} />;
  }

  if (props['external-link']) {
    return <InputSvg margin='6px' src={LinkIconSrc} info={1} />;
  }

  if (props.icon === 'Chevron'){
    return <ChevronIcon margin='9px' src={ChevronIconSrc} info={1} />;
  }
  return null;
}

function InputWrapper({className, ...props}) {
  return (
    <Row grow wrap='no-wrap'>
      <StyledInput className={className} autoComplete='off' spellCheck='false' {...props} />
      {propsIncludesIcon(props) && <InputIconWrapper naked={props.naked} tinted={props.tinted}>
        <InputIcon {...props} />
      </InputIconWrapper>}
    </Row>
  );
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
      border-top-right-radius: 10px;
    }

    & ${InputIconWrapper} {
      border-top-right-radius: 10px;
    }
  `};

  ${props => props.last && css`
    & ${StyledInput}, & ${StyledInputSelect} {
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
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
    color: ${props => props.theme.input.color};
  }

  &[type="date"][value=""]:before {
    content: attr(placeholder);
    position: absolute;
    width: calc(100% - 20px);
    padding: 11px 16px 11px 0;

    background-color: transparent;
    color: ${props => props.theme.text.color.placeholder};
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

// Inputs with associated FieldLabels
// Pass label as props and the field will be automatically associated with it
const InputLabelled = withLabel(Input);
const InputDateLabelled = withLabel(InputDate);

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
  InputLabelled,
  InputDateLabelled,
  withLabel,
  withoutScroll
};
export default Input;

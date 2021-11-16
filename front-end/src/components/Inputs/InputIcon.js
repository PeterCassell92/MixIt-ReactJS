import styled , { css } from 'styled-components';
import SVG from 'react-inlinesvg';
import { selectedTheme as theme} from '../../common/themes/theme';
import ExclamationIconSrc from '../../common/svg/icon-exclamation.svg';
import CheckmarkIconSrc from '../../common/svg/icon-checkmark.svg';
import LinkIconSrc from '../../common/svg/icon-link.svg';
import ChevronIconSrc from '../../common/svg/icon-chevron.svg';


const InputSvg = styled(SVG)`
  height: ${props => props.size? props.size : theme.input.height.standard};
  padding: ${props=> props.ypadding} ${props=> props.xpadding};

  margin-right: ${props => props.rmargin || 0};

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
  
  ${props => props.warning && css`
    // & path {
    //   fill: ${props => theme.main.color.warning};
    // }
  `}
`;
// The chevron points to the left but we want it to point to the right
// in this context. Transform and resize it.
const ChevronIcon = styled(InputSvg)`
  transform: rotate(180deg);
  width: 17px;
`;

function InputIcon(props) {
  if (props.complete) {
    return <InputSvg
    name="Check Icon"
    data-testid="Check Icon"
    rmargin='0px'
    ypadding='0px'
    xpadding='2px'
    src={CheckmarkIconSrc}
    success={1} />;
  }
 
  if (props.warning){
    return <InputSvg
    name="Warning Icon"
    data-testid="Warning Icon"
    rmargin='10px'
    ypadding='4px'
    xpadding='4px'
    src={ExclamationIconSrc}
    warning = {1}/>;
  }

  if (props.link) {
    return <ChevronIcon
    name="Chevron Icon"
    data-testid="Chevron Icon"
    rmargin='9px'
    src={ChevronIconSrc}
    info={1} />;
  }

  if (props['external-link']) {
    return <InputSvg
    name="Link Icon"
    data-testid="Link Icon"
    rmargin='6px'
    src={LinkIconSrc}
    info={1} />;
  }

  if (props.icon === 'Chevron'){
    return <ChevronIcon
    name="Chevron Icon"
    data-testid="Chevron Icon"
    rmargin='9px'
    src={ChevronIconSrc}
    info={1} />;
  }
  return null;
}

export default InputIcon;
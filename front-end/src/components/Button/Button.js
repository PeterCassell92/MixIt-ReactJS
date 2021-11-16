import PropTypes from 'prop-types';
import styled from 'styled-components';
import './button.css';
import {selectedTheme as theme} from "../../common/themes/theme";

const StyledButton = styled.button`
    float: ${props => props.float? props.float: "none" };
`

function Button({color, text, onClick, ...props}) {
    const classes= "btn " + (props.className? props.className: ""); 
    return (<StyledButton 
        className={classes}  
        onClick = {onClick}
        {...props}
        >
        {text}
        </StyledButton>)
}

Button.defaultProps= {
    text: 'click',
    onClick: () => {
        //console.log('click');
    },
}

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button;

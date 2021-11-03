import PropTypes from 'prop-types'
import styled from 'styled-components'
import {selectedTheme as theme} from "../common/themes/theme"

const StyledButton = styled.button`
    background-color: ${props => props.color? props.color : theme.main.color.info}
`

function Button({color, text, onClick}) {

    return (<StyledButton 
        className='btn'  
        onClick = {onClick}
        color = {color}
        >
        {text}
        </StyledButton>)
}

Button.defaultProps= {
    text: 'click',
    onClick: () => {
        console.log('click');
    },
}

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button;

import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledButton = styled.button`
    background-color: ${props => props.color? props.color : 'var(--secondary)'}
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
    color: 'steelblue',
    onClick: () => {
        console.log('click')
    },
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button;

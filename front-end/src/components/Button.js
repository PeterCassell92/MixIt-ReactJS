import PropTypes from 'prop-types'

function Button({color, text, onClick}) {

    return (<button 
        className='btn' 
        style={{backgroundColor: color}} 
        onClick = {onClick}    
        >
        {text}
        </button>)
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

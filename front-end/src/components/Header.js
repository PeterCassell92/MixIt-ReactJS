import PropTypes from 'prop-types'

//components
import Button from './Button'

const Header = ({title, buttonOnClick, showButton, buttonColor, buttonText}) => {

    return (
        <header className = 'header'>
            <h1 >{title}</h1>
            { showButton && <Button
                color={buttonColor }
                text={buttonText}
                onClick = {buttonOnClick}/> }
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
    showButton: false
}

Header.propTypes = {
    title: PropTypes.string,
    showButton: PropTypes.bool
}

//css in JS
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black',
//c
// }

export default Header;

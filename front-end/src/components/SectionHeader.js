import PropTypes from 'prop-types'
import styled from 'styled-components'

//components
import Button from './Button'


const StyledHeader = styled.header`
    display: flex;
    justify-content: ${props => props.color? props.color: 'space-between'};
    align-items: center;
    margin-bottom: 20px;
    color: ${props => props.color? props.color :'inherit'};
  `

const SectionHeader = ({title, buttonOnClick, showButton, buttonColor, buttonText, textcolor}) => {
    return (
        <StyledHeader color={textcolor}>
            <h1 >{title}</h1>
            { showButton && <Button
                color={buttonColor }
                text={buttonText}
                onClick = {buttonOnClick}/> }
        </StyledHeader>
    )
}

SectionHeader.defaultProps = {
    title: 'Task Tracker',
    showButton: false
}

SectionHeader.propTypes = {
    title: PropTypes.string,
    showButton: PropTypes.bool
}

//css in JS
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black',
//c
// }

export default SectionHeader;

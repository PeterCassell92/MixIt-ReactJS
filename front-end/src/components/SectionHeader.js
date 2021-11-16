import PropTypes from 'prop-types'
import styled from 'styled-components'

//components
import Button from './Button/Button';
import { Row } from './Flex';

const StyledHeader = styled.header`
    margin-bottom: 20px;
    color: ${props => props.color? props.color :'inherit'};
  `

const SectionHeader = ({title, buttonOnClick, showButton,
    buttonColor, buttonText, textcolor}) => {
    return (
        <StyledHeader className="d-flex justify-content-between flex-wrap" color={textcolor}>
            <h1 >{title}</h1>
            { showButton &&
                <Row center>
                    <Button
                    className="align-self-start"
                    color={buttonColor }
                    text={buttonText}
                    onClick = {buttonOnClick}/> 
                </Row>}
        </StyledHeader>
    )
}

SectionHeader.defaultProps = {
    title: "Task Tracker",
    showButton: false
}

SectionHeader.propTypes = {
    title: PropTypes.string,
    showButton: PropTypes.bool
}

export default SectionHeader;

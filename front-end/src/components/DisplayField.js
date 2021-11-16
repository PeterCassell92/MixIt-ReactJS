
import styled from "styled-components"
import { Row } from "./Flex"
import { selectedTheme as theme } from "../common/themes/theme";


const Field = styled.p`
    color: ${props => props.color? props.color : theme.main.color.textbody }
`

function DisplayField({label, value}) {
    return (
        <Row justify="center" className="justify-content-lg-start">
            <Field className="mb-0 col-3">{label}</Field>
            <Field className="mb-0 col-5 align-right">{value}</Field>
        </Row>
    )
}

export default DisplayField



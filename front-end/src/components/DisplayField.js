
import styled from "styled-components"
import { Row } from "./Flex"

const Field = styled.p`
    color: var(--off-white);
`

function DisplayField({label, value}) {
    return (
        <Row justify="center">
            <Field className="col-2">{label}</Field>
            <Field className="col-4 align-right">{value}</Field>
        </Row>
    )
}

export default DisplayField



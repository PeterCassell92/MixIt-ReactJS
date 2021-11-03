import { Link } from "react-router-dom";
import styled from "styled-components";
import { selectedTheme as theme } from "../common/themes/theme";

const StyledFaIconLink = styled(FaIconLink)`
    color: ${props => props.color? props.color: theme.main.color.svgfill};
    cursor: pointer;

    &:hover{
        color: ${props => props.hovercolor? props.hovercolor: theme.main.color.linkhover};
    }
`

function FaIconLink( {to, faicon, ...props}) {
    const FAIcon = faicon;
    return (
        <Link to={to}>
            <FAIcon {...props}/>
        </Link>
    )
}

export {FaIconLink, StyledFaIconLink};

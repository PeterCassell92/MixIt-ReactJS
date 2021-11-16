import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import "../common/fonts/league-spartan-master/webfonts/stylesheet.css";

const TextLogo = styled.span`
    font-weight: 800;
    font-size: 3em;
    font-family: League Spartan;
    line-height: 60px;
`

function Header({includeMenu}) {
    return (
    <header>
        <nav className="navbar navbar-expand-lg navbar-dark">
            <Link className="navbar-brand text-secondary" to="/">
               <TextLogo>MixIt</TextLogo>
            </Link>
            {includeMenu && <>
                <button className="navbar-toggler" type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse"
                id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link active" to="#">
                            Home
                        </Link>
                        <Link className="nav-item nav-link" to="#">
                            Dashboard
                        </Link>
                        <Link className="nav-item nav-link" to="#">
                            Community
                        </Link>
                        <Link className="nav-item nav-link disabled"to="#">
                            Premium
                        </Link>
                    </div>
                </div>
            </>}
        </nav>
    </header>
    )
}

Header.defaultProps= {
    includeMenu: false
}
  
Header.propTypes = {
    includeMenu: PropTypes.bool
}

export default Header;



import { Link } from "react-router-dom";
import styled from "styled-components";

const TextLogo = styled.span`
    font-weight: 800;
    font-size: 3em;
`

function Header() {
    return (
    <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand text-secondary" to="/">
               <TextLogo> MixIt</TextLogo>
            </Link>
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
                        Features
                    </Link>
                    <Link className="nav-item nav-link" to="#">
                        Pricing
                    </Link>
                    <Link className="nav-item nav-link disabled"to="#">
                        Disabled
                    </Link>
                </div>
            </div>
        </nav>
    </header>
    )
}

export default Header;



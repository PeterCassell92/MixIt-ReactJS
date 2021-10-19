import { Link } from "react-router-dom"

import Header from "./Header"

function About() {
    return (
        
        <>
            <Header/>
            <h4>Version 1.0.0</h4>
            <Link to="/"> Go Back</Link>
        </>
    )
}

export default About

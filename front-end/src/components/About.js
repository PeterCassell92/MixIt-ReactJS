import { Link } from "react-router-dom"

import PageWrapper from "./PageWrapper"
import SectionHeader from "../components/SectionHeader"

function About() {
    return (
        <PageWrapper>
            <SectionHeader/>
            <h4>Version 1.0.0</h4>
            <Link to="/"> Go Back</Link>
        </PageWrapper>
    )
}

export default About

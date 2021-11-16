import React from 'react'
import styled from 'styled-components'

const FullSizeDiv = styled.div`
    min-height: 100vh;
`

function PageWrapper({children}) {
    return (
        <FullSizeDiv id="page-wrapper" className="container">
            {children}
        </FullSizeDiv>
    )
}

export default PageWrapper

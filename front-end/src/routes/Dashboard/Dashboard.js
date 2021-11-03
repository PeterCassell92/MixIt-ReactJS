import styled from 'styled-components'
import { useState, useEffect } from 'react'
import getFromLocalStorage from '../../common/storage'
import { personal as PERSONAL } from '../../common/constants'
import { selectedTheme as theme } from "../../common/themes/theme";

import PageWrapper from '../../components/PageWrapper'
import TaskList from "../../components/TaskList"
import CondensedProfile from '../../components/CondensedProfile'
import Header from '../../components/Header';
import Tracks from '../../components/Tracks'
import { Row, Column } from '../../components/Flex'
import { Redirect } from 'react-router'

const BorderContainer = styled.section`
    width: 100%;
    min-height: 300px;
    border: 1px solid ${theme.container.color.border};
    padding: 30px;
    border-radius: 5px;
    background-color: ${theme.container.color.background};
`
const InnerColumn = styled.div`
    padding: 30px;
`

function Dashboard() {
    const [ready, setReady] = useState(false);
    const [registered, setRegistered] = useState(false);

    useEffect(() => {
        getFromLocalStorage(PERSONAL.keys.registered, setRegistered).then(() => {
            setReady(true);
        });
      }, []);
    

    return (
    <>
    {ready && (!registered) ? (<Redirect to='/profile'/>) : 
        <PageWrapper>
            <Header/>
            <Row as="main">
                <Column as="section" className = "col-12 col-lg-7">
                    <InnerColumn className = "d-flex flex-column">
                        <aside>
                            <CondensedProfile/>
                        </aside>
                        {/* <BorderContainer
                        className= "flex-grow-1 ">
                            <Tracks/>
                        </BorderContainer> */}
                    </InnerColumn>
                </Column>
                <Column as="section" className = "col-12 col-lg-5">
                    <InnerColumn>
                        <BorderContainer>
                            <TaskList/>
                        </BorderContainer>
                    </InnerColumn>
                </Column>
            </Row>
        </PageWrapper>}
    </>
    )
}

export default Dashboard

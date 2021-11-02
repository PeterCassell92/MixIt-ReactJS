import styled from 'styled-components'
import { useState, useEffect } from 'react'
import getFromLocalStorage from '../../common/storage'
import { personal as PERSONAL } from '../../common/constants'

import PageWrapper from '../../components/PageWrapper'
import TaskList from "../../components/TaskList"
import CondensedProfile from '../../components/CondensedProfile'
import Tracks from '../../components/Tracks'
import { Row, Column } from '../../components/Flex'
import { Redirect } from 'react-router'

const BorderContainer = styled.section`
    width: 100%;
    min-height: 300px;
    border: 1px solid steelblue;
    padding: 30px;
    border-radius: 5px;
    background-color: var(--off-white);
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
            <Row>
                <Column className = "col-12 col-lg-7">
                    <InnerColumn className = "d-flex flex-column">
                        <CondensedProfile/>
                        {/* <BorderContainer
                        className= "flex-grow-1 ">
                            <Tracks/>
                        </BorderContainer> */}
                    </InnerColumn>
                </Column>
                <Column className = "col-12 col-lg-5">
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

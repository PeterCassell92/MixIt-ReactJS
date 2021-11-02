import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react"
import { BrowserRouter as Router}	from 'react-router-dom';
import styled from 'styled-components';

//components
import { GenericRouter } from './components/Routes';
import Footer from './components/Footer'

//Routes
import {
  routes as mainRoutes,
} from './common/routes.js';

const StyledWrapper = styled.div`
  background-color: var(--primary);
`

function Wrapper({children}) {
    return (
    <StyledWrapper id="app-wrapper">
          {children}
    </StyledWrapper>
  );
}

function App() {
  //app state goes here

  function getRoutes() {
   	return mainRoutes
  }

  const routes = getRoutes();
  //Presently all app state has been neatly consolidated in routes and components.
  return (
    <Router>
        <Wrapper>         
          <GenericRouter routes={routes}/>
        </Wrapper>
        {/* <Footer/> */}
    </Router>
  );
}

export default App;

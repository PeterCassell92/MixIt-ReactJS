// import './App.css';
import { BrowserRouter as Router}	from 'react-router-dom';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import {selectedTheme as theme} from './common/themes/theme';
import BackgroundShapesTRSrc from  './common/svg/bg-topright.svg';
import BackgroundShapesBLSrc from './common/svg/bg-bottomleft.svg';
import PositionableElement from './components/Positionable';

//components
import { GenericRouter } from './components/Routes';
import Footer from './components/Footer'

//Routes
import {
  routes as mainRoutes,
} from './common/routes.js';

const StyledWrapper = styled.div`
  background-color: ${theme.main.color.background} ;
  z-index: -2;
`
const SVGBackgroundWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  overflow:hidden;
`

const ViewWrapper = styled.div`
  z-index: 0;
  position:relative;
`


function SVGBackgroundElements(props){
  return(
    <SVGBackgroundWrapper>
      <PositionableElement
        width="50%"
        left="70%"
        top="-10%"
        rotation="110"
        scaleX="-1.2"
        scaleY="1.2">
        <SVG src={BackgroundShapesTRSrc}/>
      </PositionableElement>
      <PositionableElement
        width="50%"
        left="10%"
        top="90%"
        rotation="0"
        scaleX="1.2"
        scaleY="1.2">
        <SVG width="80%" src={BackgroundShapesBLSrc}/>
      </PositionableElement>
    </SVGBackgroundWrapper>
  );
}

function Wrapper({children}) {
    return (
    <StyledWrapper id="app-bg-wrapper">
      <SVGBackgroundElements id="svg-container"/>
      <ViewWrapper id="app-view-wrapper">
          {children}
      </ViewWrapper>
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
    </Router>
  );
}

export default App;

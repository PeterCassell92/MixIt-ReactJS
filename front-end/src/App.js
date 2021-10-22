import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react"
import { BrowserRouter as Router,
		Route,
		useLocation,
		useHistory
	}	from 'react-router-dom';

//components
import { GenericRouter } from './components/Routes';
import Header from './components/Header'
import Footer from './components/Footer'

//Routes
import {
  routes as mainRoutes,
} from './common/routes.js';

//Constants
import {
	a
} from './common/constants';


function Wrapper({ routes, children, ...props }) {
    return (
    <div className ="container">
          {children}
    </div>
  );
}

function Content() {
  // const history = useHistory();
  // const location = useLocation();

  function getRoutes() {
   	return mainRoutes
  }

  const routes = getRoutes();

  return (
    <Wrapper routes={routes}>         
      <GenericRouter routes={routes}/>
    </Wrapper>
  );
}

function App() {
  //app state goes here. Presently all app state has been neatly consolidated in routes.

  return (
    <Router>
        <Content/>
        {/* <Route path='/about' component={About}/> */}
        <Footer/>
    </Router>
  );
}

export default App;

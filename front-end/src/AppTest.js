import React, { Suspense, Fragment, useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import moment from 'moment';
import localforage from 'localforage';
import {
  BrowserRouter as Router,
  useLocation,
  useHistory,
  matchPath
} from 'react-router-dom';

import themes from './Common/theme';
import { getFromLocalStorage } from './Common/storage';
import { isStandaloneMode } from './Common/platform';
import {
    signInTimeout,
    onboarding as ONBOARDING,
    personal as PERSONAL,
    theme as THEME,
    installation as INSTALLATION,
    app as APP
} from './common/constants.js';
import {
  routes as mainRoutes,
  onboarding as onboardingRoutes,
  installation as installationRoutes
} from './common/routes.js';

import { GenericRouter } from './Components/Routes';
import Spinner from './Components/Spinner';
const Menu = React.lazy(() => import('./Components/Menu/Menu'));

const Authentication = React.lazy(() => import('./Routes/Authentication/Authentication'));

const AppOuterWrapper = styled.div`
  height: 100vh;
  min-width: 100vw;

  background-color: ${props => props.tinted
    ? props.theme.onboarding.background
    : props.theme.background};
`;

const AppInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  box-sizing: border-box;
  user-select: none;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;

  height: 100%;
`;

const AppBody = styled.main`
  flex-grow: 1;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  justify-content: center;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  background-color: ${props => props.tinted
    ? props.theme.onboarding.background
    : props.theme.background};
`;

const AppFooter = styled.footer`
  flex-shrink: 0;
  display: flex;
  overflow: hidden;
`;

function activeSignIn(ts) {
  if (!ts) {
    return false;
  }

  const timeout = moment(ts);
  timeout.add(signInTimeout, 'minutes');

  return moment().isBefore(timeout);
}

function getRouteParam(location, param, tree) {
  const parent = tree.find(x => matchPath(location.pathname, x)) || {};
  if (parent.routes) {
    return getRouteParam(location, param, parent.routes);
  }
  return parent[param];
}

function Body({ routes, ...props }) {
  const location = useLocation();
  const tinted = getRouteParam(location, 'tinted', routes);

  return <AppBody tinted={tinted ? 1 : 0} {...props} />
}

function Wrapper({ routes, children, ...props }) {
  const location = useLocation();

  const tinted = getRouteParam(location, 'tinted', routes);

  return (
    <AppOuterWrapper tinted={tinted ? 1 : 0} {...props}>
      <AppInnerWrapper>
        {children}
      </AppInnerWrapper>
    </AppOuterWrapper>
  );
}

// Display a footer with a menu for routes that require it
function FooterMenu({authenticated, routes, ...props}) {
  const location = useLocation();
  const hasMenu = getRouteParam(location, 'menu', routes);

  if (authenticated && hasMenu) {
    return (
      <AppFooter {...props}>
        <Menu />
      </AppFooter>
    )
  }

  return null;
}

function Content() {
  const [ready, setReady] = useState(false);
  const [passcode, setPasscode] = useState();
  const [installed, setInstalled] = useState();
  const [installationSkipped, setInstallationSkipped] = useState();
  const [onboarded, setOnboarded] = useState();
  const [timestamp, setTimestamp] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // Load user data to determine authentication, onboarding, etc.
    Promise.all([
      getFromLocalStorage(INSTALLATION.keys.skipped, setInstallationSkipped),
      getFromLocalStorage(PERSONAL.keys.passcode, setPasscode),
      getFromLocalStorage(ONBOARDING.keys.complete, setOnboarded),
      getFromLocalStorage(PERSONAL.keys.timestamp, setTimestamp),
    ])
    .then(() => {
      // If we are in standalone mode, this is a PWA
      // and we know that we have been installed
      if (isStandaloneMode()) {
        setInstalled(true);
        localforage.setItem(INSTALLATION.keys.complete, true);
      }

      setReady(true);
    });
  },  []);

  useEffect(() => {
    const { pathname, search } = location;

    // The start page for the PWA should be replaced by a known route
    if (pathname === `/${APP.startPage}` && search === '?splash=true') {
      history.replace('/splash')
    }
  }, [location, history]);

  // Update authentication timestamp
  // This will continue to occur every 30s as a 'keep-alive'
  // Unfortunately this causes a refresh of the component due to state update.
  // TODO: use lifecycles for better background handling
  // see https://developers.google.com/web/updates/2018/07/page-lifecycle-api
  useEffect(() => {
    if (activeSignIn(timestamp) || authenticated) {
      const timestampTimeout = setTimeout(() => {
        const now = new Date();
        setTimestamp(now);
        localforage.setItem(PERSONAL.keys.timestamp, now);
      }, 30000);

      return () => clearTimeout(timestampTimeout);
    }
  }, [authenticated, timestamp]);

  // If the route is pointing to the splash, don't show authentication page
  const showingSplash = location.pathname === '/splash';

  // New users, or those have not yet onboarded, also do not need to authenticate
  // Neither do users who have already done so.
  const userMustAuth =
    (installed || installationSkipped) && passcode && onboarded &&
    !activeSignIn(timestamp) && !authenticated && !showingSplash;

  // Which routes to use?
  function getRoutes() {
    if (!installed && !installationSkipped) {
      return installationRoutes;
    }

    return (passcode && onboarded) ? mainRoutes : onboardingRoutes;
  }

  const routes = getRoutes();

  return (
    <Wrapper routes={routes}>
      {ready &&
        <Suspense fallback={<Spinner />}>
          <Body routes={routes}>
            <Suspense fallback={<Spinner />}>
              {userMustAuth
                ? <Authentication onChange={setAuthenticated} />
                : <GenericRouter routes={routes} />
              }
            </Suspense>
          </Body>
          <FooterMenu authenticated={!userMustAuth} routes={routes} />
        </Suspense>
      }
    </Wrapper>
  );
}

// Root app component
// This controls the data flow for the rest of the app
function App() {
  const [themeReady, setThemeReady] = useState(false);
  const [theme, setTheme] = useState();

  useEffect(() => {
    // Lock screen orientation to portrait
    // Note that this is still a Working Draft API and may not be supported.
    // See https://w3c.github.io/screen-orientation/#lock-method-lock-screen-to-a-specific-orientation
    try {
      window.screen.orientation.lock('portrait')
      .catch(err => console.log('Unable to lock screen orientation.', err));
    }
    catch (e) {
      console.log('Locking screen orientation is not supported.');
    }

    // Load app theme, falling back to the dark theme as default
    getFromLocalStorage(THEME.keys.theme, setTheme)
    .then(theme => {
      if (!theme) {
        setTheme(THEME.types.dark);
        localforage.setItem(THEME.keys.theme, THEME.types.dark);
      }
      setThemeReady(true);
    });
  }, []);

  return (
    <Fragment>
      {themeReady &&
        <ThemeProvider theme={themes[theme]}>
          <Router basename={APP.path}>
            <Content />
          </Router>
        </ThemeProvider>
      }
    </Fragment>
  );
}

export default App;

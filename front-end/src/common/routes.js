import { Redirect } from 'react-router-dom'
import { GenericRouter} from '../components/Routes'

//Route Components
import Dashboard from '../routes/Dashboard/Dashboard';
import About from '../components/About';
import Profile from '../routes/Profile/Profile';
import Admin from '../routes/Admin/Admin';
import Error from '../routes/Error';

const routes = [
    {
      path: '/index.html',
      exact: true,
      component: () => <Redirect to='/' />,
    },
    {
      path: '/dashboard',
      component: Dashboard,
      default: true
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/profile',
      component: GenericRouter,
      menu: true,
      routes: [
        {
          path: '/profile/view',
          component: Profile,
          menu: true,
          default: true
        },
      ]
    },
    {
      path:'/admin',
      component: Admin
    }
    ,
    {
      path: '/error',
      component: Error
    }
  ];
export {routes}
export default routes;
import { Redirect } from 'react-router-dom'
import { GenericRouter} from '../components/Routes'

//Route Components
import TaskList from '../routes/TaskList/TaskList'
import About from '../components/About';
import Profile from '../routes/Profile/Profile';
import Error from '../routes/Error';

const routes = [
    {
      path: '/index.html',
      exact: true,
      component: () => <Redirect to='/' />,
    },
    {
      path: '/tasklist',
      component: TaskList,
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
      path: '/error',
      component: Error
    }
  ];
export {routes}
export default routes;
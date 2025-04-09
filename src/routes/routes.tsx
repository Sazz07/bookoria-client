import { createBrowserRouter } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import { publicRoutes } from './public.routes';
import { dashboardRoutes } from './dashboard.routes';

const router = createBrowserRouter([
  publicRoutes,
  dashboardRoutes,
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;

import { RouteObject } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import UnauthenticatedOnlyRoute from '../components/layout/UnauthenticatedOnlyRoute';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import { ROLES } from '../constants/global';

// Public Pages
import Home from '../pages/home/Home';
import About from '../pages/About';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import AllBooks from '../pages/books/AllBooks';
import BookDetails from '../pages/books/BookDetails';
import Checkout from '../pages/Checkout';

export const publicRoutes: RouteObject = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: 'books',
      element: <AllBooks />,
    },
    {
      path: 'books/:bookId',
      element: <BookDetails />,
    },
    {
      path: 'about',
      element: <About />,
    },
    {
      path: 'login',
      element: (
        <UnauthenticatedOnlyRoute>
          <Login />
        </UnauthenticatedOnlyRoute>
      ),
    },
    {
      path: 'register',
      element: (
        <UnauthenticatedOnlyRoute>
          <Register />
        </UnauthenticatedOnlyRoute>
      ),
    },
    {
      path: 'checkout',
      element: (
        <ProtectedRoute allowedRoles={[ROLES.USER, ROLES.ADMIN]}>
          <Checkout />
        </ProtectedRoute>
      ),
    },
    {
      path: 'payment-verification',
      element: <Checkout />,
    },
  ],
};

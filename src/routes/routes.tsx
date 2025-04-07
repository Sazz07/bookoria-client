import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import DashboardLayout from '../components/layout/DashboardLayout';
import UnauthenticatedOnlyRoute from '../components/layout/UnauthenticatedOnlyRoute';

// Public Pages
import Home from '../pages/home/Home';
import About from '../pages/About';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

import Checkout from '../pages/Checkout';
import UserDashboard from '../pages/dashboard/UserDashboard';

import MyOrders from '../pages/dashboard/user/MyOrders';
import ProfileSettings from '../pages/dashboard/user/ProfileSettings';

// Admin Dashboard Routes
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import ManageUsers from '../pages/dashboard/admin/ManageUsers';
import ManageProducts from '../pages/dashboard/admin/ManageProducts';
import ManageOrders from '../pages/dashboard/admin/ManageOrders';

// Error Page
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import AllBooks from '../pages/books/AllBooks';
import BookDetails from '../pages/books/BookDetails';

const router = createBrowserRouter([
  {
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
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: 'payment-verification',
        element: <Checkout />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },

      {
        path: 'my-orders',
        element: (
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <MyOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <ProfileSettings />
          </ProtectedRoute>
        ),
      },
      // Admin Dashboard Routes
      {
        path: 'admin',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/manage-users',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <ManageUsers />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/manage-products',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <ManageProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/manage-orders',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <ManageOrders />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;

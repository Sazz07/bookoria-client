import { RouteObject } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import { ROLES } from '../constants/global';

// Dashboard Pages
import DashboardRouter from '../pages/dashboard/DashboardRouter';
import ProfileSettings from '../pages/dashboard/user/ProfileSettings';
import MyOrders from '../pages/dashboard/MyOrders';
import OrderDetails from '../pages/dashboard/OrderDetails';

// Admin Dashboard Routes
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import ManageUsers from '../pages/dashboard/admin/ManageUsers';
import ManageBooks from '../pages/dashboard/admin/ManageBooks';
import ManageOrders from '../pages/dashboard/admin/ManageOrders';

export const dashboardRoutes: RouteObject = {
  path: '/dashboard',
  element: (
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <DashboardRouter />,
    },
    {
      path: 'my-orders',
      element: (
        <ProtectedRoute allowedRoles={[ROLES.USER]}>
          <MyOrders />
        </ProtectedRoute>
      ),
    },
    {
      path: 'profile',
      element: (
        <ProtectedRoute allowedRoles={[ROLES.USER, ROLES.ADMIN]}>
          <ProfileSettings />
        </ProtectedRoute>
      ),
    },
    // Admin Dashboard Routes
    {
      path: 'admin',
      element: (
        <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
          <AdminDashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: 'admin/manage-users',
      element: (
        <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
          <ManageUsers />
        </ProtectedRoute>
      ),
    },
    {
      path: 'admin/manage-books',
      element: (
        <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
          <ManageBooks />
        </ProtectedRoute>
      ),
    },
    {
      path: 'admin/manage-orders',
      element: (
        <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
          <ManageOrders />
        </ProtectedRoute>
      ),
    },
    {
      path: 'my-orders/:id',
      element: <OrderDetails />,
    },
  ],
};

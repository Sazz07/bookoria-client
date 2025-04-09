import { Link } from 'react-router-dom';
import {
  ShoppingOutlined,
  UserOutlined,
  DashboardOutlined,
  TeamOutlined,
  BookOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

const userMenuItems = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: <Link to='/dashboard'>Dashboard</Link>,
  },
  {
    key: '/dashboard/my-orders',
    icon: <ShoppingOutlined />,
    label: <Link to='/dashboard/my-orders'>My Orders</Link>,
  },
  {
    key: '/dashboard/profile',
    icon: <UserOutlined />,
    label: <Link to='/dashboard/profile'>Profile Settings</Link>,
  },
];

const adminMenuItems = [
  {
    key: '/dashboard/admin',
    icon: <DashboardOutlined />,
    label: <Link to='/dashboard/admin'>Admin Dashboard</Link>,
  },
  {
    key: '/dashboard/admin/manage-users',
    icon: <TeamOutlined />,
    label: <Link to='/dashboard/admin/manage-users'>Manage Users</Link>,
  },
  {
    key: '/dashboard/admin/manage-books',
    icon: <BookOutlined />,
    label: <Link to='/dashboard/admin/manage-books'>Manage Books</Link>,
  },
  {
    key: '/dashboard/admin/manage-orders',
    icon: <ShoppingCartOutlined />,
    label: <Link to='/dashboard/admin/manage-orders'>Manage Orders</Link>,
  },
];

export const useMenuItems = (isAdmin: boolean) =>
  isAdmin
    ? [...adminMenuItems, { type: 'divider' as const }, ...userMenuItems]
    : userMenuItems;

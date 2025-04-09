import {
  DashboardOutlined,
  ShoppingOutlined,
  UserOutlined,
  BookOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const useMenuItems = (isAdmin: boolean) => {
  const commonMenuItems = [
    {
      key: '/dashboard/profile',
      icon: <SettingOutlined />,
      label: <Link to='/dashboard/profile'>Profile Settings</Link>,
    },
  ];

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
  ];

  const adminMenuItems = [
    {
      key: '/dashboard/admin',
      icon: <DashboardOutlined />,
      label: <Link to='/dashboard/admin'>Admin Dashboard</Link>,
    },
    {
      key: '/dashboard/admin/manage-users',
      icon: <UserOutlined />,
      label: <Link to='/dashboard/admin/manage-users'>Manage Users</Link>,
    },
    {
      key: '/dashboard/admin/manage-books',
      icon: <BookOutlined />,
      label: <Link to='/dashboard/admin/manage-books'>Manage Books</Link>,
    },
    {
      key: '/dashboard/admin/manage-orders',
      icon: <ShoppingOutlined />,
      label: <Link to='/dashboard/admin/manage-orders'>Manage Orders</Link>,
    },
  ];

  if (isAdmin) {
    return [...adminMenuItems, ...commonMenuItems];
  } else {
    return [...userMenuItems, ...commonMenuItems];
  }
};

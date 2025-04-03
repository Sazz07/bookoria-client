import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div>
      <div>Dashboard Sidebar</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <div>Header</div>
      <main>
        <Outlet />
      </main>
      <div>Footer</div>
    </div>
  );
};

export default MainLayout;

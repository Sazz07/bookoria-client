import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from '../ui/Navbar';
import Sidebar from '../dashboard/Sidebar';

const { Content } = Layout;

const DashboardLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Navbar />
        <Content className='p-6 bg-accent-50 min-h-[calc(100vh-64px)]'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import { useAppSelector } from '../../redux/hook';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import { useMenuItems } from '../../hooks/useMenuItems';

const { Sider } = Layout;
const { Title } = Typography;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const user = useAppSelector(selectCurrentUser);
  const isAdmin = user?.role === 'admin';
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = useMenuItems(isAdmin);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint='lg'
      collapsedWidth={isMobile ? 0 : 80}
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        height: '100vh',
        zIndex: 999,
        background: 'white',
        borderRight: `1px solid #f0f0f0`,
      }}
      theme='light'
      width={250}
      className='sidebar-with-border'
    >
      <div className='flex justify-center items-center p-3.5'>
        {!collapsed && (
          <Title level={4} className='!text-primary'>
            {isAdmin ? 'Admin Panel' : 'Dashboard'}
          </Title>
        )}
      </div>
      <Menu
        mode='inline'
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ borderRight: 0 }}
      />
      <div className='p-4 mt-auto'></div>
    </Sider>
  );
};

export default Sidebar;

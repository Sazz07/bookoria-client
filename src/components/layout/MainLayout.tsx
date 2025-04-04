import { Outlet } from 'react-router-dom';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className='h-screen'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;

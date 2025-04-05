import { Outlet } from 'react-router-dom';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-grow bg-accent-50'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

import { useAppSelector } from '../../redux/hook';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import { ROLES } from '../../constants/global';

const DashboardRouter = () => {
  const user = useAppSelector(selectCurrentUser);
  
  return user?.role === ROLES.ADMIN ? <AdminDashboard /> : <UserDashboard />;
};

export default DashboardRouter;
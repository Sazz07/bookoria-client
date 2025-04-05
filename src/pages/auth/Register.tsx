import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import AppForm from '../../components/form/AppForm';
import AppInput from '../../components/form/AppInput';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { registerSchema } from '../../schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../redux/hook';
import { useRegisterMutation } from '../../redux/features/auth/authApi';
import { toast } from 'sonner';
import { verifyToken } from '../../utils/verifyToken';
import { TUser } from '../../types';
import { setUser } from '../../redux/features/auth/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [register] = useRegisterMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Registering...');

    try {
      const userInfo = {
        name: {
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
        },
        email: data.email,
        password: data.password,
      };
      const res = await register(userInfo).unwrap();
      const user = verifyToken(res.data?.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data?.accessToken }));
      toast.success(res.message, { id: toastId, duration: 2000 });
      navigate('/');
    } catch {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };
  return (
    <div className='flex justify-center items-center px-4 py-12 min-h-screen sm:px-6 lg:px-8'>
      <div className='space-y-8 w-full max-w-md'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-primary'>Bookoria</h1>
          <h2 className='mt-6 text-2xl font-bold text-gray-900'>
            Create your account
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            Or{' '}
            <Link
              to='/login'
              className='font-medium text-accent hover:underline'
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        <div className='px-4 py-8 mt-8 bg-white shadow-lg sm:rounded-lg sm:px-10'>
          <AppForm
            onSubmit={handleSubmit}
            resolver={zodResolver(registerSchema)}
          >
            <AppInput
              type='text'
              name='firstName'
              label='First Name'
              placeholder='Enter your first name'
            />
            <AppInput
              type='text'
              name='middleName'
              label='Middle Name'
              placeholder='Enter your middle name'
            />
            <AppInput
              type='text'
              name='lastName'
              label='Last Name'
              placeholder='Enter your last name'
            />

            <AppInput
              type='email'
              name='email'
              label='Email Address'
              placeholder='Enter your email address'
            />

            <AppInput
              type='password'
              name='password'
              label='Password'
              placeholder='Enter your password'
            />

            <Button
              className='w-full'
              size='large'
              type='primary'
              htmlType='submit'
            >
              Create Account
            </Button>
          </AppForm>
        </div>
      </div>
    </div>
  );
};

export default Register;

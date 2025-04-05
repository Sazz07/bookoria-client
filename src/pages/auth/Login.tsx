import { Link, useNavigate } from 'react-router-dom';
import AppForm from '../../components/form/AppForm';
import AppInput from '../../components/form/AppInput';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { Button } from 'antd';
import { useLoginMutation } from '../../redux/features/auth/auth.api';
import { verifyToken } from '../../utils/verifyToken';
import { TUser } from '../../types';
import { useAppDispatch } from '../../redux/hook';
import { setUser } from '../../redux/features/auth/authSlice';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../schemas/auth.schema';
import { isApiError } from '../../utils/errorHandlers';

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Logging in...');

    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.data?.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data?.accessToken }));
      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
      navigate('/');
    } catch (error) {
      if (!isApiError(error)) {
        toast.error('Something went wrong', {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.dismiss(toastId);
      }
    }
  };

  return (
    <div className='flex justify-center items-center px-4 py-12 min-h-screen sm:px-6 lg:px-8'>
      <div className='space-y-8 w-full max-w-md'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-[#8C5E58]'>Bookoria</h1>
          <h2 className='mt-6 text-2xl font-bold text-gray-900'>
            Sign in to your account
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            Or{' '}
            <Link
              to='/register'
              className='font-medium text-[#2D4B73] hover:underline'
            >
              create a new account
            </Link>
          </p>
        </div>
        <div className='px-4 py-8 mt-8 bg-white shadow-lg sm:rounded-lg sm:px-10'>
          <AppForm onSubmit={handleSubmit} resolver={zodResolver(loginSchema)}>
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
              Sign in
            </Button>
          </AppForm>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { Link } from 'react-router-dom';
import AppForm from '../../components/form/AppForm';
import AppInput from '../../components/form/AppInput';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const Login = () => {
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log('Form data:', data);
  };

  return (
    <div className='flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
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
          <AppForm onSubmit={handleSubmit}>
            <AppInput type='text' name='firstName' label='First Name' />
          </AppForm>
        </div>
      </div>
    </div>
  );
};

export default Login;

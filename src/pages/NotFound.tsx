import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, BookOutlined, SearchOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const NotFound = () => {
  return (
    <div className='flex justify-center items-center px-4 py-12 min-h-screen bg-accent-50'>
      <div className='w-full max-w-4xl text-center'>
        <div className='relative mb-12'>
          <div className='text-[180px] md:text-[220px] font-bold opacity-15 select-none text-primary'>
            404
          </div>
          <div className='flex absolute inset-0 justify-center items-center'>
            <div className='relative'>
              <BookOutlined className='!text-7xl md:!text-8xl !text-primary transform -rotate-12 inline-block' />
              <div className='absolute -top-4 -right-4 animate-ping'>
                <SearchOutlined className='!text-2xl !text-accent' />
              </div>
            </div>
          </div>
        </div>

        <Title
          level={1}
          className='!text-4xl md:!text-5xl !mb-6 !text-gray-800'
        >
          Page Not Found
        </Title>

        <Text className='!block !mx-auto !mb-10 !max-w-xl !text-lg !text-gray-600'>
          Oops! It seems like the page you're looking for has been lost between
          the pages of our books. Let's help you find your way back.
        </Text>

        <div className='flex flex-col gap-4 justify-center sm:flex-row'>
          <Link to='/'>
            <Button
              type='primary'
              size='large'
              icon={<HomeOutlined />}
              className='!min-w-[180px] !h-14 !text-base !font-medium !shadow-md hover:!shadow-lg !transition-all'
            >
              Back to Home
            </Button>
          </Link>

          <Link to='/books'>
            <Button
              size='large'
              icon={<BookOutlined />}
              className='!min-w-[180px] !h-14 !text-base !font-medium !shadow-md hover:!shadow-lg !transition-all'
            >
              Browse Books
            </Button>
          </Link>
        </div>

        <div className='relative mt-20'>
          <div className='pt-8 border-t border-gray-200'>
            <div className='flex flex-col gap-2 justify-center items-center md:flex-row md:gap-8'>
              <Text type='secondary' className='!text-base'>
                Need help?{' '}
                <Link to='/about' className='!text-accent hover:!underline'>
                  Contact our support team
                </Link>
              </Text>
              <Text type='secondary' className='!text-base'>
                Looking for recommendations?{' '}
                <Link to='/books' className='!text-accent hover:!underline'>
                  Check our bestsellers
                </Link>
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

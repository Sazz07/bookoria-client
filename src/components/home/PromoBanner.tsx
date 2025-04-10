import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const PromoBanner = () => {
  return (
    <section className='py-16'>
      <div className='container px-4 mx-auto'>
        <div className='overflow-hidden relative bg-gradient-to-r rounded-2xl from-accent to-primary'>
          <div className='grid relative z-10 grid-cols-1 gap-8 items-center p-8 md:grid-cols-2 md:p-12'>
            <div className='space-y-6 text-white'>
              <span className='inline-block px-3 py-1 text-sm font-medium text-white rounded-full bg-white/20'>
                Limited Time Offer
              </span>
              <Title
                level={2}
                className='!text-3xl md:!text-4xl !font-bold !text-white !m-0'
              >
                Join Our Book Club & Save 15%
              </Title>
              <Text className='!text-white/80 !text-base md:!text-lg block'>
                Get exclusive access to new releases, author interviews, and
                special discounts. Plus, receive a free book when you sign up!
              </Text>
              <div className='flex flex-wrap gap-4'>
                <Link to='/register'>
                  <Button
                    type='primary'
                    size='large'
                    className='!bg-white !text-accent !border-white !font-medium !min-w-[120px]'
                  >
                    Join Now
                  </Button>
                </Link>
                <Link to='/about'>
                  <Button
                    ghost
                    size='large'
                    className='!text-white !border-white !font-medium !min-w-[120px] hover:!bg-white/10'
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <div className='hidden relative h-80 md:block'>
              <div className='absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl bg-white/10' />
              <div className='absolute bottom-0 left-0 w-40 h-40 rounded-full blur-2xl bg-white/10' />

              <div className='flex relative justify-center items-center w-full h-full'>
                <div className='relative w-48 h-64 bg-white rounded-lg shadow-xl transform rotate-[-5deg] overflow-hidden'>
                  <img
                    src='/images/book-club-featured.jpg'
                    alt='Book club featured book'
                    className='object-cover w-full h-full'
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg?height=300&width=200';
                    }}
                  />
                </div>
                <div className='flex absolute top-10 right-10 justify-center items-center w-16 h-16 rounded-full shadow-lg bg-secondary'>
                  <span className='font-bold text-primary'>FREE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;

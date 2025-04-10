import { useState } from 'react';
import { Typography, Button } from 'antd';
import {
  MailOutlined,
  BookOutlined,
  GiftOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AppForm from '../form/AppForm';
import AppInput from '../form/AppInput';
import { toast } from 'sonner';

const { Title, Text } = Typography;

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const NewsletterSection = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit: SubmitHandler<FieldValues> = () => {
    setLoading(true);

    setTimeout(() => {
      toast.success('Thank you for subscribing to our newsletter!');
      setLoading(false);
    }, 1000);
  };

  const benefits = [
    {
      icon: <BookOutlined className='text-xl' />,
      text: 'Early access to new releases',
    },
    {
      icon: <GiftOutlined className='text-xl' />,
      text: 'Exclusive discounts & offers',
    },
    {
      icon: <BellOutlined className='text-xl' />,
      text: 'Event notifications',
    },
  ];

  return (
    <section className='py-20 bg-accent'>
      <div className='container mx-auto'>
        <div className='grid gap-8 items-center md:grid-cols-5'>
          <div className='text-white md:col-span-2'>
            <div className='inline-flex justify-center items-center mb-6 w-16 h-16 rounded-full bg-white/20'>
              <MailOutlined className='!text-3xl !text-white' />
            </div>

            <Title
              level={2}
              className='!text-2xl md:!text-3xl !font-bold !mb-4 !text-white'
            >
              Join Our Reading Community
            </Title>

            <Text className='!block !text-white/90 !mb-6 !text-base'>
              Subscribe to our newsletter and be the first to know about new
              books, author events, and exclusive promotions.
            </Text>

            <div className='mb-8 space-y-3'>
              {benefits.map((benefit, index) => (
                <div key={index} className='flex items-center'>
                  <div className='flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-full bg-white/20'>
                    {benefit.icon}
                  </div>
                  <Text className='!ml-3 !text-white/90'>{benefit.text}</Text>
                </div>
              ))}
            </div>
          </div>

          <div className='md:col-span-3'>
            <div className='!p-8 !bg-white !rounded-xl !shadow-lg'>
              <Title
                level={4}
                className='!mb-6 !text-primary-dark !font-medium'
              >
                Subscribe to Our Newsletter
              </Title>

              <AppForm
                onSubmit={handleSubmit}
                resolver={zodResolver(newsletterSchema)}
              >
                <AppInput
                  name='email'
                  type='email'
                  label='Email Address'
                  placeholder='Your email address'
                />

                <Button
                  type='primary'
                  htmlType='submit'
                  size='large'
                  loading={loading}
                  className='!bg-primary !border-primary hover:!bg-primary-dark !rounded-md !w-full !py-3 !h-auto !font-medium mt-4'
                >
                  Subscribe Now
                </Button>
              </AppForm>

              <Text className='!block !mt-4 !text-sm !text-center !text-gray-500'>
                We respect your privacy. Unsubscribe at any time.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;

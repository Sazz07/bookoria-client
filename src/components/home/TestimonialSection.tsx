import { Typography, Avatar, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: '/images/testimonials/avatar1.jpg',
    rating: 5,
    text: 'I have been a loyal customer for over a year now. The selection is amazing, and the delivery is always prompt. Their personalized recommendations have introduced me to some of my favorite authors!',
    role: 'Book Club Organizer',
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: '/images/testimonials/avatar2.jpg',
    rating: 5,
    text: 'As a teacher, I appreciate the educational section of this bookshop. The staff is incredibly knowledgeable and helped me find perfect books for my classroom. The discounts for educators are a wonderful bonus!',
    role: 'High School Teacher',
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    avatar: '/images/testimonials/avatar3.jpg',
    rating: 4,
    text: 'The rare book collection here is outstanding. I was able to find a first edition that I would been searching for years. The condition was exactly as described, and the packaging for shipping was secure and thoughtful.',
    role: 'Rare Book Collector',
  },
  {
    id: 4,
    name: 'David Thompson',
    avatar: '/images/testimonials/avatar4.jpg',
    rating: 5,
    text: "The monthly subscription box has been a game-changer for me. Each selection is thoughtfully curated, and I've discovered so many great reads that I wouldn't have picked up otherwise.",
    role: 'Avid Reader',
  },
];

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) => {
  return (
    <div className='relative p-6 bg-white rounded-lg shadow-md'>
      <div className='absolute top-6 left-6 font-serif text-4xl opacity-20 text-primary'>
        "
      </div>
      <div className='mb-4'>
        <Rate
          disabled
          defaultValue={testimonial.rating}
          className='text-amber-400'
        />
      </div>
      <Paragraph className='relative z-10 mb-6 text-gray-700'>
        {testimonial.text}
      </Paragraph>
      <div className='flex items-center mt-auto'>
        <Avatar
          size={48}
          icon={<UserOutlined />}
          src={testimonial.avatar}
          onError={() => {
            return true; // Prevent default fallback behavior
          }}
          alt={testimonial.name}
        />
        <div className='ml-3'>
          <Text strong className='block'>
            {testimonial.name}
          </Text>
          <Text type='secondary' className='text-sm'>
            {testimonial.role}
          </Text>
        </div>
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  return (
    <section className='py-16 bg-secondary-light/30'>
      <div className='container mx-auto'>
        <div className='mb-10 text-center'>
          <Title
            level={2}
            className='!text-2xl md:!text-3xl !font-bold !mb-3 !text-primary-dark'
          >
            What Our Customers Say
          </Title>
          <Text className='block mx-auto max-w-2xl text-gray-600'>
            Don't just take our word for it — hear from our community of book
            lovers
          </Text>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

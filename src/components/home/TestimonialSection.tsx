import { Typography, Rate, Carousel } from 'antd';
import { avatar1, avatar2, avatar3, avatar4 } from '../../assets/images';
import { QuoteIcon } from '../icons/QuoteIcon';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import { CarouselRef } from 'antd/es/carousel';

const { Title, Text } = Typography;

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: avatar1,
    rating: 5,
    text: 'I have been a loyal customer for over a year now. The selection is amazing, and the delivery is always prompt. Their personalized recommendations have introduced me to some of my favorite authors!',
    role: 'Book Club Organizer',
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: avatar2,
    rating: 5,
    text: 'As a teacher, I appreciate the educational section of this bookshop. The staff is incredibly knowledgeable and helped me find perfect books for my classroom. The discounts for educators are a wonderful bonus!',
    role: 'High School Teacher',
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    avatar: avatar3,
    rating: 4,
    text: 'The rare book collection here is outstanding. I was able to find a first edition that I had been searching for years. The condition was exactly as described, and the packaging for shipping was secure and thoughtful.',
    role: 'Rare Book Collector',
  },
  {
    id: 4,
    name: 'David Thompson',
    avatar: avatar4,
    rating: 5,
    text: "The monthly subscription box has been a game-changer for me. Each selection is thoughtfully curated, and I've discovered so many great reads that I wouldn't have picked up otherwise.",
    role: 'Avid Reader',
  },
];

const TestimonialSection = () => {
  const carouselRef = useRef<CarouselRef>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const nextSlide = () => {
    carouselRef.current?.next();
  };

  const prevSlide = () => {
    carouselRef.current?.prev();
  };

  return (
    <section className='py-16'>
      <div className='container px-4 mx-auto'>
        <div className='mb-16 text-center'>
          <div className='inline-block px-4 py-1 mb-4 rounded-full bg-primary-light/20'>
            <Text className='!text-sm !font-medium !text-primary-dark'>
              Customer Testimonials
            </Text>
          </div>
          <Title
            level={2}
            className='!text-3xl md:!text-4xl !font-bold !mb-3 !text-primary-dark'
          >
            What Our Readers Say
          </Title>
          <Text className='!block !mx-auto !max-w-2xl !text-gray-600'>
            Join thousands of satisfied customers who have discovered their next
            favorite read with us
          </Text>
        </div>

        <div className='mx-auto max-w-4xl'>
          <div className='relative'>
            {/* Decorative elements */}
            <div className='hidden absolute -top-6 -left-6 w-12 h-12 text-primary-light/30 md:block'>
              <QuoteIcon />
            </div>
            <div className='hidden absolute -right-6 -bottom-6 w-12 h-12 transform rotate-180 text-primary-light/30 md:block'>
              <QuoteIcon />
            </div>

            {/* Testimonial cards */}
            <div className='relative bg-white rounded-xl shadow-lg'>
              <Carousel
                ref={carouselRef}
                {...settings}
                className='!pb-10'
                dots={{ className: '!bottom-2' }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id}>
                    <div className='p-8 md:p-12'>
                      <div className='flex flex-col gap-6 items-center md:flex-row md:items-start'>
                        <div className='flex-shrink-0'>
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className='object-cover w-20 h-20 rounded-full border-4 md:w-24 md:h-24 border-primary-light/20'
                          />
                        </div>
                        <div className='flex-1'>
                          <div className='mb-4'>
                            <Rate
                              disabled
                              defaultValue={testimonial.rating}
                              className='!text-lg !text-amber-400'
                            />
                          </div>
                          <p className='mb-6 text-lg italic text-gray-700 md:text-xl'>
                            "{testimonial.text}"
                          </p>
                          <div className='flex items-center'>
                            <div>
                              <h4 className='text-lg font-bold text-primary-dark'>
                                {testimonial.name}
                              </h4>
                              <p className='text-gray-500'>
                                {testimonial.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>

              {/* Custom navigation arrows */}
              <button
                className='flex absolute left-4 top-1/2 z-10 justify-center items-center w-10 h-10 bg-white rounded-full shadow-md transition-colors -translate-y-1/2 text-primary-dark hover:bg-primary-light/10'
                onClick={prevSlide}
                aria-label='Previous testimonial'
              >
                <LeftOutlined />
              </button>
              <button
                className='flex absolute right-4 top-1/2 z-10 justify-center items-center w-10 h-10 bg-white rounded-full shadow-md transition-colors -translate-y-1/2 text-primary-dark hover:bg-primary-light/10'
                onClick={nextSlide}
                aria-label='Next testimonial'
              >
                <RightOutlined />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

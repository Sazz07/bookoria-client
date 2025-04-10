import { useState, useEffect } from 'react';
import { Button, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { TBookCarouselSlide } from '../../types/bookCarousel.type';
import {
  book_carousel1,
  book_carousel2,
  book_carousel3,
} from '../../assets/images';
import { cn } from '../../utils/cn';

const { Title, Text } = Typography;

export default function BookCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: TBookCarouselSlide[] = [
    {
      id: 1,
      image: book_carousel1,
      title: 'Discover Your Next Literary Adventure',
      subtitle: 'Spring Sale: 30% Off Bestsellers',
      description:
        'Explore our handpicked collection of bestsellers, classics, and hidden gems that will transport you to new worlds.',
      buttonText: 'Explore Collection',
      buttonLink: '/books',
      secondaryButtonText: 'View Offers',
      secondaryButtonLink: '/books?discount=true',
    },
    {
      id: 2,
      image: book_carousel2,
      title: 'Join Our Book Club',
      subtitle: 'Connect with Fellow Readers',
      description:
        'Engage in thoughtful discussions, get exclusive access to author interviews, and enjoy member-only discounts.',
      buttonText: 'Join Now',
      buttonLink: '/about',
      secondaryButtonText: 'Learn More',
      secondaryButtonLink: '/about',
    },
    {
      id: 3,
      image: book_carousel3,
      title: 'New Arrivals Every Week',
      subtitle: 'Stay Ahead of the Curve',
      description:
        'Be the first to discover emerging authors and trending titles across all genres.',
      buttonText: 'See New Arrivals',
      buttonLink: '/books?sort=newest',
      secondaryButtonText: 'Get Notified',
      secondaryButtonLink: '/register',
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <div
      className='overflow-hidden relative mt-4 rounded-xl border border-gray-100 shadow-xl'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='relative w-full h-[350px] sm:h-[400px] md:h-[500px] overflow-hidden'>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'absolute inset-0 w-full h-full transition-opacity duration-1000',
              index === currentSlide
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'
            )}
          >
            <div className='absolute inset-0 z-10 bg-gradient-to-r from-accent/80 to-accent/60' />
            <img
              src={slide.image}
              alt={slide.title}
              className='object-cover absolute inset-0 w-full h-full transition-transform ease-out transform scale-105 duration-10000 animate-subtle-zoom'
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg?height=500&width=1200';
              }}
            />
            <div className='absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t to-transparent from-black/30' />

            <div
              className={cn(
                'flex relative z-20 flex-col justify-center px-4 h-full sm:px-6 md:px-12 lg:px-20',
                index === 0
                  ? 'items-start'
                  : index === 1
                  ? 'items-center'
                  : 'items-end'
              )}
            >
              <div
                className={cn(
                  'max-w-xl animate-fade-in-up',
                  index === 1
                    ? 'text-center'
                    : index === 2
                    ? 'text-right'
                    : 'text-left'
                )}
              >
                <span className='inline-block mb-2 sm:mb-4 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-white bg-white/20 backdrop-blur-sm rounded-full shadow-sm'>
                  {slide.subtitle}
                </span>
                <Title
                  level={1}
                  className='!mb-2 sm:!mb-4 !text-2xl sm:!text-3xl md:!text-4xl lg:!text-5xl !text-white !leading-tight !font-bold !drop-shadow-md'
                >
                  {slide.title.split(' ').map((word, i, arr) =>
                    i === arr.length - 2 ? (
                      <span
                        key={i}
                        className='text-secondary-dark !font-bold relative'
                      >
                        {word}{' '}
                      </span>
                    ) : (
                      `${word} `
                    )
                  )}
                </Title>
                <Text className='!block !mb-4 sm:!mb-8 !max-w-md !text-sm sm:!text-base md:!text-lg lg:!text-xl !text-white/90 !drop-shadow-sm'>
                  {slide.description}
                </Text>
                <div
                  className={cn(
                    'flex flex-col gap-2 sm:flex-row sm:gap-4',
                    index === 1
                      ? 'justify-center'
                      : index === 2
                      ? 'justify-end'
                      : 'justify-start'
                  )}
                >
                  <Link to={slide.buttonLink}>
                    <Button
                      type='primary'
                      size='large'
                      className='!bg-white !text-primary hover:!bg-white/90 !font-medium !text-sm sm:!text-base !px-6 sm:!px-8 !py-1 sm:!py-2 !shadow-md hover:!shadow-lg !transition-all !duration-300 !border-0'
                    >
                      {slide.buttonText}
                    </Button>
                  </Link>
                  {slide.secondaryButtonText && (
                    <Link to={slide.secondaryButtonLink || '#'}>
                      <Button
                        ghost
                        size='large'
                        className='!text-white !border-white hover:!bg-white/10 !text-sm sm:!text-base !transition-all !duration-300 !backdrop-blur-sm'
                      >
                        {slide.secondaryButtonText}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        <Button
          onClick={goToPrevSlide}
          icon={<LeftOutlined className='!text-xs sm:!text-sm' />}
          className='!absolute !left-2 !top-1/2 !z-30 !flex !justify-center !items-center !size-8 !text-white !rounded-full !-translate-y-1/2 sm:!left-6 sm:!size-10 !bg-black/40 hover:!bg-accent !min-w-0 !border-0 !shadow-md !transition-all !duration-300 !opacity-80 hover:!opacity-100 backdrop-blur-sm'
          aria-label='Previous slide'
        />

        <Button
          onClick={goToNextSlide}
          icon={<RightOutlined className='!text-xs sm:!text-sm' />}
          className='!absolute !right-2 !top-1/2 !z-30 !flex !justify-center !items-center !size-8 !text-white !rounded-full !-translate-y-1/2 sm:!right-6 sm:!size-10 !bg-black/40 hover:!bg-accent !min-w-0 !border-0 !shadow-md !transition-all !duration-300 !opacity-80 hover:!opacity-100 backdrop-blur-sm'
          aria-label='Next slide'
        />

        {/* Carousel Navigation Dots */}
        <div className='flex absolute right-0 left-0 bottom-6 z-30 justify-center space-x-2 sm:bottom-8 sm:space-x-3'>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'transition-all duration-300 rounded-full',
                index === currentSlide
                  ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-white shadow-md'
                  : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/70'
              )}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

import BookCarousel from '../../components/home/BookCarousel';
import FeaturedBooks from '../../components/home/FeaturedBooks';
import CategoryShowcase from '../../components/home/CategoryShowcase';

import PromoBanner from '../../components/home/PromoBanner';
import NewsletterSection from '../../components/home/NewsletterSection';
import RecentlyAddedBooks from '../../components/home/RecentlyAddedBooks';
import AboutSection from '../../components/home/AboutSection';
import TestimonialSection from '../../components/home/TestimonialSection';

const Home = () => {
  return (
    <div className='flex flex-col gap-12 min-h-screen md:gap-20'>
      <div className='container px-4 mx-auto md:px-0'>
        <BookCarousel />
        <FeaturedBooks />
        <CategoryShowcase />
        <PromoBanner />
        <RecentlyAddedBooks />
      </div>

      <AboutSection />

      <div className='container px-4 mx-auto md:px-0'>
        <TestimonialSection />
      </div>

      <NewsletterSection />
    </div>
  );
};

export default Home;

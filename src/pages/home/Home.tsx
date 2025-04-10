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
      {/* Hero Carousel */}
      <BookCarousel />

      {/* Featured Books Section */}
      <div className='container px-4 mx-auto md:px-6'>
        <FeaturedBooks />
      </div>

      {/* Category Showcase */}
      <div className='container px-4 mx-auto md:px-6'>
        <CategoryShowcase />
      </div>

      {/* Promo Banner */}
      <PromoBanner />

      {/* Recently Added Books */}
      <div className='container px-4 mx-auto md:px-6'>
        <RecentlyAddedBooks />
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Testimonials */}
      <div className='container px-4 mx-auto md:px-6'>
        <TestimonialSection />
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};

export default Home;

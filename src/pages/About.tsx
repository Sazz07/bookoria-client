import { Link } from 'react-router-dom';
import { Button } from 'antd';
import {
  BookOpen,
  Users,
  Award,
  MapPin,
  Mail,
  Phone,
  Clock,
} from 'lucide-react';
import { member1, member2, member3, member4 } from '../assets/images';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      bio: 'Book enthusiast with 15+ years in publishing. Sarah founded BookShop with a vision to connect readers with their next favorite book.',
      image: member1,
    },
    {
      name: 'Michael Chen',
      role: 'Chief Curator',
      bio: 'Former literature professor with a passion for discovering hidden literary gems and bringing them to our readers.',
      image: member2,
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Customer Experience',
      bio: 'With a background in UX design and a love for books, Priya ensures every customer has a seamless experience.',
      image: member3,
    },
    {
      name: 'James Wilson',
      role: 'Technology Director',
      bio: 'Tech innovator who believes in using technology to make literature more accessible to everyone around the world.',
      image: member4,
    },
  ];

  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-[#F0EAD6] py-20'>
        <div className='container px-4 mx-auto'>
          <div className='mx-auto max-w-3xl text-center'>
            <h1 className='text-4xl md:text-5xl font-bold text-[#333333] mb-6'>
              Our Story
            </h1>
            <p className='mb-8 text-lg text-gray-700 md:text-xl'>
              We're on a mission to connect readers with the perfect books and
              create a community where literature thrives.
            </p>
            <div className='flex justify-center space-x-4'>
              <Button type='primary' size='large'>
                <Link to='/books'>Explore Our Collection</Link>
              </Button>
              <Button size='large'>
                <Link to='#contact'>Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
        <div
          className='absolute bottom-0 left-0 w-full h-16 bg-white'
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
        ></div>
      </section>

      {/* Our Mission Section */}
      <section className='py-20 bg-white'>
        <div className='container px-4 mx-auto'>
          <div className='grid grid-cols-1 gap-12 items-center md:grid-cols-2'>
            <div>
              <h2 className='text-3xl font-bold text-[#333333] mb-6'>
                Our Mission
              </h2>
              <p className='mb-6 text-gray-700'>
                Founded in 2015, BookShop began with a simple idea: to create a
                space where book lovers could discover new reads, connect with
                fellow readers, and support authors from around the world.
              </p>
              <p className='mb-6 text-gray-700'>
                What started as a small online bookstore has grown into a
                thriving community of readers, writers, and literary
                enthusiasts. We believe that books have the power to transform
                lives, spark imagination, and foster empathy.
              </p>
              <div className='grid grid-cols-2 gap-4 mt-8'>
                <div className='flex items-start'>
                  <div className='mt-1 mr-4'>
                    <div className='p-2 bg-[#F0EAD6] rounded-full'>
                      <BookOpen className='h-5 w-5 text-[#8C5E58]' />
                    </div>
                  </div>
                  <div>
                    <h3 className='font-semibold text-[#333333]'>10,000+</h3>
                    <p className='text-sm text-gray-600'>Books Available</p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <div className='mt-1 mr-4'>
                    <div className='p-2 bg-[#F0EAD6] rounded-full'>
                      <Users className='h-5 w-5 text-[#8C5E58]' />
                    </div>
                  </div>
                  <div>
                    <h3 className='font-semibold text-[#333333]'>50,000+</h3>
                    <p className='text-sm text-gray-600'>Happy Customers</p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <div className='mt-1 mr-4'>
                    <div className='p-2 bg-[#F0EAD6] rounded-full'>
                      <Award className='h-5 w-5 text-[#8C5E58]' />
                    </div>
                  </div>
                  <div>
                    <h3 className='font-semibold text-[#333333]'>15+</h3>
                    <p className='text-sm text-gray-600'>Industry Awards</p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <div className='mt-1 mr-4'>
                    <div className='p-2 bg-[#F0EAD6] rounded-full'>
                      <MapPin className='h-5 w-5 text-[#8C5E58]' />
                    </div>
                  </div>
                  <div>
                    <h3 className='font-semibold text-[#333333]'>Global</h3>
                    <p className='text-sm text-gray-600'>Shipping Worldwide</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative'>
              <div className='overflow-hidden relative z-10 rounded-lg shadow-xl'>
                <img
                  src='https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
                  alt='Bookshop interior with stacked books'
                  className='object-cover w-full h-auto'
                />
              </div>
              <div className='absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-[#F0EAD6] rounded-lg -z-10'></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='py-20 bg-[#F0EAD6]/20'>
        <div className='container px-4 mx-auto'>
          <div className='mx-auto mb-16 max-w-3xl text-center'>
            <h2 className='text-3xl font-bold text-[#333333] mb-6'>
              Our Values
            </h2>
            <p className='text-gray-700'>
              At BookShop, we're guided by a set of core values that shape
              everything we do, from curating our collection to serving our
              customers.
            </p>
          </div>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            <div className='p-8 bg-white rounded-lg shadow-md'>
              <div className='w-12 h-12 bg-[#8C5E58] rounded-full flex items-center justify-center mb-6'>
                <BookOpen className='w-6 h-6 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-[#333333] mb-4'>
                Literary Excellence
              </h3>
              <p className='text-gray-700'>
                We believe in the power of exceptional writing and carefully
                curate our collection to include works that inspire, challenge,
                and delight.
              </p>
            </div>
            <div className='p-8 bg-white rounded-lg shadow-md'>
              <div className='w-12 h-12 bg-[#8C5E58] rounded-full flex items-center justify-center mb-6'>
                <Users className='w-6 h-6 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-[#333333] mb-4'>
                Community Focus
              </h3>
              <p className='text-gray-700'>
                We foster a vibrant community of readers and writers, creating
                spaces for meaningful connections and conversations around
                literature.
              </p>
            </div>
            <div className='p-8 bg-white rounded-lg shadow-md'>
              <div className='w-12 h-12 bg-[#8C5E58] rounded-full flex items-center justify-center mb-6'>
                <Award className='w-6 h-6 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-[#333333] mb-4'>
                Accessibility
              </h3>
              <p className='text-gray-700'>
                We're committed to making literature accessible to all, through
                fair pricing, diverse representation, and innovative digital
                solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-20 bg-white'>
        <div className='container px-4 mx-auto'>
          <div className='mx-auto mb-16 max-w-3xl text-center'>
            <h2 className='text-3xl font-bold text-[#333333] mb-6'>
              Meet Our Team
            </h2>
            <p className='text-gray-700'>
              The passionate book lovers behind BookShop who work tirelessly to
              bring you the best literary experience.
            </p>
          </div>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className='overflow-hidden bg-white rounded-lg shadow-md transition-transform hover:scale-105'
              >
                <div className='relative h-64'>
                  <img
                    src={member.image}
                    alt={member.name}
                    className='object-cover w-full h-full'
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg?height=300&width=300';
                    }}
                  />
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-semibold text-[#333333] mb-1'>
                    {member.name}
                  </h3>
                  <p className='text-[#8C5E58] mb-4'>{member.role}</p>
                  <p className='text-sm text-gray-700'>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id='contact' className='py-20 bg-[#F0EAD6]'>
        <div className='container px-4 mx-auto'>
          <div className='mx-auto max-w-5xl'>
            <div className='grid grid-cols-1 gap-12 md:grid-cols-2'>
              <div>
                <h2 className='text-3xl font-bold text-[#333333] mb-6'>
                  Get In Touch
                </h2>
                <p className='mb-8 text-gray-700'>
                  Have questions, suggestions, or just want to chat about books?
                  We'd love to hear from you!
                </p>
                <div className='space-y-6'>
                  <div className='flex items-start'>
                    <div className='mt-1 mr-4'>
                      <div className='p-2 bg-white rounded-full'>
                        <MapPin className='h-5 w-5 text-[#8C5E58]' />
                      </div>
                    </div>
                    <div>
                      <h3 className='font-semibold text-[#333333]'>
                        Our Location
                      </h3>
                      <p className='text-gray-700'>
                        123 Book Lane, Literary District, NY 10001
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start'>
                    <div className='mt-1 mr-4'>
                      <div className='p-2 bg-white rounded-full'>
                        <Mail className='h-5 w-5 text-[#8C5E58]' />
                      </div>
                    </div>
                    <div>
                      <h3 className='font-semibold text-[#333333]'>Email Us</h3>
                      <p className='text-gray-700'>hello@bookshop.com</p>
                    </div>
                  </div>
                  <div className='flex items-start'>
                    <div className='mt-1 mr-4'>
                      <div className='p-2 bg-white rounded-full'>
                        <Phone className='h-5 w-5 text-[#8C5E58]' />
                      </div>
                    </div>
                    <div>
                      <h3 className='font-semibold text-[#333333]'>Call Us</h3>
                      <p className='text-gray-700'>(555) 123-4567</p>
                    </div>
                  </div>
                  <div className='flex items-start'>
                    <div className='mt-1 mr-4'>
                      <div className='p-2 bg-white rounded-full'>
                        <Clock className='h-5 w-5 text-[#8C5E58]' />
                      </div>
                    </div>
                    <div>
                      <h3 className='font-semibold text-[#333333]'>Hours</h3>
                      <p className='text-gray-700'>
                        Monday - Friday: 9am - 6pm
                      </p>
                      <p className='text-gray-700'>Saturday: 10am - 4pm</p>
                      <p className='text-gray-700'>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='p-8 bg-white rounded-lg shadow-lg'>
                <h3 className='text-xl font-semibold text-[#333333] mb-6'>
                  Send Us a Message
                </h3>
                <form className='space-y-4'>
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <div>
                      <label
                        htmlFor='name'
                        className='block mb-1 text-sm font-medium text-gray-700'
                      >
                        Name
                      </label>
                      <input
                        type='text'
                        id='name'
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#8C5E58] focus:border-[#8C5E58]'
                        placeholder='Your name'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='email'
                        className='block mb-1 text-sm font-medium text-gray-700'
                      >
                        Email
                      </label>
                      <input
                        type='email'
                        id='email'
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#8C5E58] focus:border-[#8C5E58]'
                        placeholder='Your email'
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor='subject'
                      className='block mb-1 text-sm font-medium text-gray-700'
                    >
                      Subject
                    </label>
                    <input
                      type='text'
                      id='subject'
                      className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#8C5E58] focus:border-[#8C5E58]'
                      placeholder='Subject'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='message'
                      className='block mb-1 text-sm font-medium text-gray-700'
                    >
                      Message
                    </label>
                    <textarea
                      id='message'
                      rows={4}
                      className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#8C5E58] focus:border-[#8C5E58]'
                      placeholder='Your message'
                    ></textarea>
                  </div>
                  <Button
                    type='primary'
                    className='w-full bg-[#8C5E58] hover:bg-[#7a4f49]'
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-20 bg-white'>
        <div className='container px-4 mx-auto'>
          <div className='mx-auto max-w-3xl'>
            <div className='mb-12 text-center'>
              <h2 className='text-3xl font-bold text-[#333333] mb-6'>
                Frequently Asked Questions
              </h2>
              <p className='text-gray-700'>
                Find answers to common questions about BookShop, our services,
                and policies.
              </p>
            </div>
            <div className='space-y-6'>
              <div className='bg-[#F0EAD6]/30 p-6 rounded-lg'>
                <h3 className='text-lg font-semibold text-[#333333] mb-2'>
                  How long does shipping take?
                </h3>
                <p className='text-gray-700'>
                  Domestic orders typically arrive within 3-5 business days.
                  International shipping can take 7-14 business days, depending
                  on the destination.
                </p>
              </div>
              <div className='bg-[#F0EAD6]/30 p-6 rounded-lg'>
                <h3 className='text-lg font-semibold text-[#333333] mb-2'>
                  What is your return policy?
                </h3>
                <p className='text-gray-700'>
                  We accept returns within 30 days of delivery. Books must be in
                  original condition. Please contact our customer service team
                  to initiate a return.
                </p>
              </div>
              <div className='bg-[#F0EAD6]/30 p-6 rounded-lg'>
                <h3 className='text-lg font-semibold text-[#333333] mb-2'>
                  Do you offer gift wrapping?
                </h3>
                <p className='text-gray-700'>
                  Yes! We offer premium gift wrapping services for an additional
                  $5 per book. You can select this option during checkout.
                </p>
              </div>
              <div className='bg-[#F0EAD6]/30 p-6 rounded-lg'>
                <h3 className='text-lg font-semibold text-[#333333] mb-2'>
                  How can I track my order?
                </h3>
                <p className='text-gray-700'>
                  Once your order ships, you'll receive a confirmation email
                  with tracking information. You can also check your order
                  status in your account dashboard.
                </p>
              </div>
              {/* <div className='mt-8 text-center'>
                <Link
                  to='/faq'
                  className='inline-flex items-center text-[#8C5E58] hover:underline'
                >
                  View all FAQs <ChevronRight className='ml-1 w-4 h-4' />
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;

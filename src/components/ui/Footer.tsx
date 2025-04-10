import { Button, Input } from 'antd';
import {
  Heart,
  Gift,
  Truck,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../shared/Logo';

const Footer = () => {
  return (
    <footer className='text-white bg-accent'>
      <div className='container py-12 mx-auto'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          <div className='space-y-4'>
            <Link to='/' className='inline-block'>
              <Logo />
            </Link>
            <p className='text-gray-300'>
              Discover your next favorite book with our curated collection of
              bestsellers, classics, and hidden gems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link to='/books' className='text-gray-300 hover:text-white'>
                  All Books
                </Link>
              </li>
              <li>
                <Link
                  to='/books?category=bestsellers'
                  className='text-gray-300 hover:text-white'
                >
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link
                  to='/books?category=new-releases'
                  className='text-gray-300 hover:text-white'
                >
                  New Releases
                </Link>
              </li>
              <li>
                <Link to='/about' className='text-gray-300 hover:text-white'>
                  About Us
                </Link>
              </li>
              <li>
                <Link to='/contact' className='text-gray-300 hover:text-white'>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to='/blog' className='text-gray-300 hover:text-white'>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Customer Service</h3>
            <ul className='space-y-2'>
              <li>
                <Link to='/faq' className='text-gray-300 hover:text-white'>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to='/shipping' className='text-gray-300 hover:text-white'>
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to='/terms' className='text-gray-300 hover:text-white'>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to='/privacy' className='text-gray-300 hover:text-white'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to='/track-order'
                  className='text-gray-300 hover:text-white'
                >
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Stay Updated</h3>
            <p className='mb-4 text-gray-300'>
              Subscribe to our newsletter for the latest book releases and
              exclusive offers.
            </p>
            <div className='flex flex-col gap-4'>
              <Input
                size='large'
                placeholder='Your email address'
                className='text-white bg-white/10 border-white/20 placeholder:text-white/60'
              />
              <Button
                size='large'
                className='bg-white text-[#2D4B73] hover:bg-white/90'
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 pt-10 mt-16 border-t md:grid-cols-4 border-white/10'>
          <div className='flex items-center'>
            <div className='p-2 mr-3 rounded-full bg-white/10'>
              <Truck className='h-5 w-5 text-[#F0EAD6]' />
            </div>
            <div>
              <h4 className='font-medium'>Free Shipping</h4>
              <p className='text-xs text-gray-400'>On orders over $35</p>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='p-2 mr-3 rounded-full bg-white/10'>
              <ShieldCheck className='h-5 w-5 text-[#F0EAD6]' />
            </div>
            <div>
              <h4 className='font-medium'>Secure Payment</h4>
              <p className='text-xs text-gray-400'>100% secure checkout</p>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='p-2 mr-3 rounded-full bg-white/10'>
              <Gift className='h-5 w-5 text-[#F0EAD6]' />
            </div>
            <div>
              <h4 className='font-medium'>Gift Cards</h4>
              <p className='text-xs text-gray-400'>The perfect present</p>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='p-2 mr-3 rounded-full bg-white/10'>
              <Heart className='h-5 w-5 text-[#F0EAD6]' />
            </div>
            <div>
              <h4 className='font-medium'>Loyalty Rewards</h4>
              <p className='text-xs text-gray-400'>
                Earn points with every purchase
              </p>
            </div>
          </div>
        </div>

        <div className='pt-8 mt-12 border-t border-white/10'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='text-sm text-gray-300'>
              &copy; {new Date().getFullYear()} BookShop. All rights reserved.
            </div>
            <div className='flex flex-col space-y-2 text-sm text-gray-300 md:flex-row md:items-center md:justify-end md:space-y-0 md:space-x-6'>
              <div className='flex items-center'>
                <Mail className='mr-2 w-4 h-4' />
                <span>support@bookshop.com</span>
              </div>
              <div className='flex items-center'>
                <Phone className='mr-2 w-4 h-4' />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className='flex items-center'>
                <MapPin className='mr-2 w-4 h-4' />
                <span>New York, NY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

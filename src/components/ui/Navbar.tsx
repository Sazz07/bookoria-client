import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Dropdown, Popover, Row, Col, MenuProps, Badge } from 'antd';
import {
  ShoppingCartOutlined,
  CloseOutlined,
  MenuOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { cn } from '../../utils/cn';
import { bookGenre } from '../../constants/global';
import {
  logout,
  selectCurrentUser,
  selectUserProfile,
} from '../../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import CartDrawer from '../cart/CartDrawer';
import {
  selectCartItemsCount,
  toggleCart,
} from '../../redux/features/cart/cartSlice';
import { useLoginMutation } from '../../redux/features/auth/auth.api';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profile = useAppSelector(selectUserProfile);
  const user = useAppSelector(selectCurrentUser);
  const cartItemsCount = useAppSelector(selectCartItemsCount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutMutation] = useLoginMutation();

  const showCart = () => {
    dispatch(toggleCart(true));
  };

  const handleLogout = async () => {
    dispatch(logout());
    await logoutMutation(undefined).unwrap();
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const categories = bookGenre.map((genre) => ({
    name: genre,
    href: `/books?category=${genre.toLowerCase().replace(/ /g, '-')}`,
  }));

  const items: MenuProps['items'] = [
    { key: '/dashboard', label: <Link to=''>Dashboard</Link> },
    { key: '/orders', label: <Link to=''>My Orders</Link> },
    { key: '/settings', label: <Link to=''>Settings</Link> },
    {
      key: '/logout',
      label: (
        <Button
          type='primary'
          onClick={handleLogout}
          style={{ backgroundColor: '#8C5E58', width: '100%' }}
        >
          Logout
        </Button>
      ),
    },
  ];

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-300',
          scrolled ? 'shadow-sm backdrop-blur-md bg-white/95' : 'bg-white'
        )}
      >
        <div className='container px-4 mx-auto'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo */}
            <div className='flex items-center'>
              <Link to='/' className='flex items-center'>
                <span className='text-2xl font-bold text-primary'>
                  BookShop
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:flex md:items-center md:space-x-6'>
              <nav className='flex items-center space-x-4'>
                <Link
                  to='/'
                  className='px-4 py-2 text-sm font-medium hover:text-primary'
                >
                  Home
                </Link>

                <Popover
                  content={
                    <div style={{ width: '400px' }}>
                      <Row gutter={[16, 16]}>
                        {categories.map((category) => (
                          <Col span={8} key={category.name}>
                            <Link
                              to={category.href}
                              className='text-sm hover:text-[#8C5E58]'
                            >
                              {category.name}
                            </Link>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  }
                  trigger='hover'
                  placement='bottom'
                >
                  <span className='px-4 py-2 text-sm font-medium cursor-pointer hover:text-primary'>
                    Categories
                  </span>
                </Popover>

                <Link
                  to='/books'
                  className='px-4 py-2 text-sm font-medium hover:text-primary'
                >
                  All Books
                </Link>
                <Link
                  to='/about'
                  className='px-4 py-2 text-sm font-medium hover:text-primary'
                >
                  About
                </Link>
              </nav>
            </div>

            <div className='hidden md:flex md:items-center md:space-x-4'>
              {user && (
                <Badge count={cartItemsCount} size='small' offset={[0, 3]}>
                  <Button
                    type='text'
                    icon={<ShoppingCartOutlined />}
                    className='flex justify-center items-center rounded-full'
                    onClick={showCart}
                  />
                </Badge>
              )}
              {user && profile ? (
                <Dropdown arrow menu={{ items }} placement='bottomRight'>
                  <Button
                    type='text'
                    className='flex justify-center items-center rounded-full'
                    icon={<UserOutlined />}
                  >
                    <span className='hidden ml-2 lg:inline'>
                      {profile?.name?.firstName}
                    </span>
                  </Button>
                </Dropdown>
              ) : (
                <Link to='/login'>
                  <Button type='primary' style={{ backgroundColor: '#8C5E58' }}>
                    Sign In
                  </Button>
                </Link>
              )}
            </div>

            <div className='flex md:hidden'>
              <Button
                type='text'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
                className='relative z-50'
                icon={isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
              />
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-0 z-40 bg-white md:hidden transition-all duration-300 ease-in-out top-16 ${
            isMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-10 pointer-events-none'
          }`}
        >
          <div className='container overflow-y-auto px-6 py-6 mx-auto h-full'>
            <div className='flex flex-col h-full'>
              <div className='flex-1 space-y-6'>
                <div className='space-y-5'>
                  {['Home', 'All Books', 'About'].map((item, index) => (
                    <Link
                      key={item}
                      to={
                        item === 'Home'
                          ? '/'
                          : item === 'All Books'
                          ? '/books'
                          : '/about'
                      }
                      className={`block text-xl font-medium text-gray-800 hover:text-primary transition-all duration-300 ease-in-out ${
                        isMenuOpen
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-4'
                      }`}
                      style={{ transitionDelay: `${100 + index * 50}ms` }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  ))}

                  <button
                    className={`flex items-center text-xl font-medium text-gray-800 hover:text-primary transition-all duration-300 ease-in-out ${
                      isMenuOpen
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: '250ms' }}
                  >
                    <ShoppingCartOutlined className='mr-3' />
                    Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
                  </button>
                </div>

                <div
                  className={`py-5 mt-2 border-t border-gray-100 transition-all duration-300 ease-in-out ${
                    isMenuOpen
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: '300ms' }}
                >
                  <h3 className='mb-4 text-lg font-semibold text-gray-800'>
                    Browse Categories
                  </h3>
                  <div className='grid grid-cols-2 gap-y-3 gap-x-4'>
                    {categories.map((category, index) => (
                      <Link
                        key={category.name}
                        to={category.href}
                        className='text-base text-gray-600 transition-colors hover:text-primary'
                        style={{
                          transitionDelay: `${350 + index * 20}ms`,
                          animation: isMenuOpen
                            ? `fadeIn 0.3s ease-in-out ${
                                350 + index * 20
                              }ms both`
                            : 'none',
                        }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`py-5 mt-auto border-t border-gray-100 transition-all duration-300 ease-in-out ${
                  isMenuOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                {profile && user ? (
                  <div className='space-y-4'>
                    <div className='flex items-center'>
                      <div className='flex justify-center items-center mr-4 w-12 h-12 text-white rounded-full bg-primary'>
                        <UserOutlined style={{ fontSize: '18px' }} />
                      </div>
                      <div>
                        <p className='text-base font-medium text-gray-800'>
                          {profile?.fullName}
                        </p>
                        <p className='text-sm text-gray-500'>{user?.email}</p>
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-3 mt-4'>
                      <Link
                        to='/dashboard'
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Button
                          type='primary'
                          block
                          style={{
                            backgroundColor: '#8C5E58',
                            height: '40px',
                          }}
                        >
                          Dashboard
                        </Button>
                      </Link>
                      <Button type='default' block style={{ height: '40px' }}>
                        Logout
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className='grid grid-cols-2 gap-3'>
                    <Link to='/login' onClick={() => setIsMenuOpen(false)}>
                      <Button
                        type='primary'
                        block
                        style={{ backgroundColor: '#8C5E58', height: '40px' }}
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link to='/register' onClick={() => setIsMenuOpen(false)}>
                      <Button type='default' block style={{ height: '40px' }}>
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}

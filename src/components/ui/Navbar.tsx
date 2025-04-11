import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Dropdown,
  Popover,
  Row,
  Col,
  MenuProps,
  Badge,
  Drawer,
} from 'antd';
import {
  ShoppingCartOutlined,
  CloseOutlined,
  MenuOutlined,
  UserOutlined,
  HomeOutlined,
  BookOutlined,
  InfoCircleOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { cn } from '../../utils/cn';
import { bookGenre, ROLES } from '../../constants/global';
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
import { useLogoutMutation } from '../../redux/features/auth/auth.api';
import Logo from '../shared/Logo';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profile = useAppSelector(selectUserProfile);
  const user = useAppSelector(selectCurrentUser);
  const cartItemsCount = useAppSelector(selectCartItemsCount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();

  const showCart = () => {
    dispatch(toggleCart(true));
  };

  const handleLogout = async () => {
    try {
      await logoutMutation(undefined).unwrap();

      dispatch(logout());
      navigate('/login');
      setIsMenuOpen(false);
    } catch {
      dispatch(logout());
      navigate('/login');
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = bookGenre.map((genre) => ({
    name: genre,
    href: `/books?genre=${genre}`,
  }));

  const items: MenuProps['items'] = [
    { key: '/dashboard', label: <Link to='/dashboard'>Dashboard</Link> },
    {
      key: '/logout',
      label: (
        <Button
          type='primary'
          onClick={handleLogout}
          style={{ backgroundColor: '#8C5E58', width: '100%' }}
          loading={isLoggingOut}
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
            <div className='flex items-center'>
              <Link to='/' className='flex items-center'>
                <Logo />
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
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(
                                  `/books?genre=${encodeURIComponent(
                                    category.name
                                  )}`
                                );
                              }}
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
                    Genres
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
              {user && user.role === ROLES.USER && (
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
              {user && user.role === ROLES.USER && (
                <Badge
                  count={cartItemsCount}
                  size='small'
                  offset={[0, 3]}
                  className='mr-2'
                >
                  <Button
                    type='text'
                    icon={<ShoppingCartOutlined />}
                    className='flex justify-center items-center rounded-full'
                    onClick={showCart}
                  />
                </Badge>
              )}
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

        <Drawer
          placement='right'
          closable={false}
          onClose={() => setIsMenuOpen(false)}
          open={isMenuOpen}
          width='100%'
          styles={{
            body: { padding: 0 },
            wrapper: { maxWidth: '100vw' },
          }}
        >
          <div className='flex justify-between items-center p-4 border-b'>
            <Logo />
            <Button
              type='text'
              icon={<CloseOutlined />}
              onClick={() => setIsMenuOpen(false)}
              aria-label='Close Menu'
            />
          </div>

          <div
            className='overflow-y-auto p-6'
            style={{ height: 'calc(100vh - 64px)' }}
          >
            <div className='space-y-6'>
              <div className='space-y-4'>
                <Link
                  to='/'
                  className='flex items-center text-lg font-medium text-gray-800 hover:text-primary'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <HomeOutlined className='mr-3' />
                  Home
                </Link>
                <Link
                  to='/books'
                  className='flex items-center text-lg font-medium text-gray-800 hover:text-primary'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOutlined className='mr-3' />
                  All Books
                </Link>
                <Link
                  to='/about'
                  className='flex items-center text-lg font-medium text-gray-800 hover:text-primary'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <InfoCircleOutlined className='mr-3' />
                  About
                </Link>
                {user && user.role === ROLES.USER && (
                  <button
                    onClick={() => {
                      showCart();
                      setIsMenuOpen(false);
                    }}
                    className='flex items-center text-lg font-medium text-gray-800 hover:text-primary'
                  >
                    <ShoppingCartOutlined className='mr-3' />
                    Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
                  </button>
                )}
              </div>

              <div className='py-4 border-t border-gray-100'>
                <h3 className='flex items-center mb-4 text-lg font-semibold text-gray-800'>
                  <AppstoreOutlined className='mr-2' />
                  Browse Genres
                </h3>
                <div className='grid grid-cols-1 gap-y-3'>
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      className='pl-2 text-base text-gray-600 border-l-2 border-gray-200 transition-colors hover:text-primary'
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(
                          `/books?genre=${encodeURIComponent(category.name)}`
                        );
                        setIsMenuOpen(false);
                      }}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className='py-4 mt-auto border-t border-gray-100'>
                {profile && user ? (
                  <div className='space-y-4'>
                    <div className='flex items-center p-3 bg-gray-50 rounded-lg'>
                      <div className='flex justify-center items-center mr-4 w-12 h-12 text-white rounded-full bg-primary'>
                        <UserOutlined style={{ fontSize: '18px' }} />
                      </div>
                      <div>
                        <p className='text-base font-medium text-gray-800'>
                          {profile?.fullName ||
                            `${profile?.name?.firstName} ${profile?.name?.lastName}`}
                        </p>
                        <p className='text-sm text-gray-500'>{user?.email}</p>
                      </div>
                    </div>

                    <div className='grid grid-cols-1 gap-3'>
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
                      <Button
                        type='default'
                        block
                        style={{ height: '40px' }}
                        onClick={handleLogout}
                        loading={isLoggingOut}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className='grid grid-cols-1 gap-3'>
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
        </Drawer>
      </header>

      <CartDrawer />
    </>
  );
}

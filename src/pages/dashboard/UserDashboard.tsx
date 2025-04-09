import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Typography,
  Statistic,
  Button,
  List,
  Avatar,
  Tag,
  Empty,
} from 'antd';
import {
  ShoppingOutlined,
  UserOutlined,
  BookOutlined,
  ClockCircleOutlined,
  HomeOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { useGetMyOrdersQuery } from '../../redux/features/order/order.api';
import { useAppSelector } from '../../redux/hook';
import {
  selectCurrentUser,
  selectUserProfile,
} from '../../redux/features/auth/authSlice';
import PageBreadcrumb from '../../components/shared/PageBreadcrumb';
import Loading from '../../components/shared/Loading';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/dateUtils';

const { Title, Text } = Typography;

const UserDashboard = () => {
  const [orderLimit] = useState(5);
  const user = useAppSelector(selectCurrentUser);
  const profile = useAppSelector(selectUserProfile);

  const { data: ordersData, isLoading } = useGetMyOrdersQuery([
    { name: 'page', value: 1 },
    { name: 'limit', value: orderLimit },
  ]);

  console.log(ordersData);

  const breadcrumbItems = [
    {
      title: 'Home',
      href: '/',
      icon: <HomeOutlined />,
    },
    {
      title: 'Dashboard',
      icon: <DashboardOutlined />,
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  const totalOrders = ordersData?.meta?.total || 0;
  const totalSpent =
    ordersData?.data?.reduce((sum, order) => sum + order.total, 0) || 0;
  const pendingOrders =
    ordersData?.data?.filter((order) => order.status === 'Pending').length || 0;

  return (
    <div>
      <PageBreadcrumb items={breadcrumbItems} />

      <div className='mb-6 welcome-section'>
        <Title level={2} className='!text-accent !my-4'>
          Welcome back, {profile?.name.firstName}!
        </Title>
        <Text type='secondary'>
          Here's what's happening with your account today.
        </Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} className='!mb-8'>
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable className='!h-full'>
            <Statistic
              title='Total Orders'
              value={totalOrders}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <div className='!mt-4'>
              <Link to='/dashboard/my-orders'>
                <Button type='primary' ghost size='small'>
                  View All Orders
                </Button>
              </Link>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title='Total Spent'
              value={formatCurrency(totalSpent)}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <div className='mt-4'>
              <Text type='secondary'>Across all your purchases</Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title='Pending Orders'
              value={pendingOrders}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
            <div className='mt-4'>
              <Text type='secondary'>Orders awaiting processing</Text>
            </div>
          </Card>
        </Col>
      </Row>

      <Card
        title={<Title level={4}>Recent Orders</Title>}
        className='!mb-8'
        extra={<Link to='/dashboard/my-orders'>View All</Link>}
      >
        {ordersData?.data && ordersData.data.length > 0 ? (
          <div className='!overflow-x-auto'>
            <List
              itemLayout='horizontal'
              dataSource={ordersData.data}
              renderItem={(order) => (
                <List.Item
                  actions={[
                    <Link to={`/dashboard/my-orders/${order?._id}`} key='view' className='!mt-2 sm:!mt-0'>
                      <Button type='link'>View Details</Button>
                    </Link>,
                  ]}
                  className='!flex !flex-col sm:!flex-row !w-full'
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={<ShoppingOutlined />}
                        className='!bg-primary !hidden sm:!inline-flex'
                      />
                    }
                    title={
                      <div className='!flex !flex-col sm:!flex-row sm:!items-center !gap-2'>
                        <Text strong>Order #{order._id.slice(-8)}</Text>
                        <Tag
                          color={
                            order.status === 'Delivered'
                              ? 'success'
                              : order.status === 'Pending'
                              ? 'warning'
                              : 'processing'
                          }
                        >
                          {order.status}
                        </Tag>
                      </div>
                    }
                    description={
                      <div className='!mt-2 sm:!mt-0'>
                        <Text type='secondary' className='!block sm:!inline'>
                          {formatDate(order.createdAt)}
                        </Text>
                        <div className='!mt-2 sm:!mt-1'>
                          <Text strong>
                            {order.orderItems.length}{' '}
                            {order.orderItems.length > 1 ? 'items' : 'item'}
                          </Text>
                          <Text className='!mx-2'>•</Text>
                          <Text strong>{formatCurrency(order.total)}</Text>
                        </div>
                      </div>
                    }
                    className='!mb-4 sm:!mb-0 !w-full'
                  />
                </List.Item>
              )}
            />
          </div>
        ) : (
          <Empty
            description="You haven't placed any orders yet"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Link to='/books'>
              <Button type='primary'>Start Shopping</Button>
            </Link>
          </Empty>
        )}
      </Card>

      <Card title={<Title level={4}>Account Information</Title>}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <div className='mb-4'>
              <Text strong className='!text-lg'>
                Personal Details
              </Text>
            </div>
            <div className='mb-2'>
              <Text type='secondary'>Name:</Text>
              <div>
                <Text strong>{profile?.fullName}</Text>
              </div>
            </div>
            <div className='mb-2'>
              <Text type='secondary'>Email:</Text>
              <div>
                <Text strong>{user?.email}</Text>
              </div>
            </div>

            <Link to='/dashboard/profile'>
              <Button type='primary' icon={<UserOutlined />}>
                Edit Profile
              </Button>
            </Link>
          </Col>

          <Col xs={24} md={12}>
            <div className='mb-4'>
              <Text strong className='!text-lg'>
                Quick Links
              </Text>
            </div>
            <div className='space-y-3'>
              <div>
                <Link to='/books'>
                  <Button type='link' icon={<BookOutlined />} className='!p-0'>
                    Browse Books
                  </Button>
                </Link>
              </div>

              <div>
                <Link to='/dashboard/my-orders'>
                  <Button
                    type='link'
                    icon={<ShoppingOutlined />}
                    className='!p-0'
                  >
                    Order History
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UserDashboard;

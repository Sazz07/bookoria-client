import { useState } from 'react';
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
  Divider,
  Space,
} from 'antd';
import {
  ShoppingOutlined,
  UserOutlined,
  BookOutlined,
  DollarOutlined,
  HomeOutlined,
  DashboardOutlined,
  RiseOutlined,
  ShoppingCartOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { useGetAllUsersQuery } from '../../redux/features/admin/adminUserManagement.api';
import { useGetAllOrdersQuery } from '../../redux/features/order/order.api';
import PageBreadcrumb from '../../components/shared/PageBreadcrumb';
import Loading from '../../components/shared/Loading';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/dateUtils';
import { useGetBooksQuery } from '../../redux/features/book/book.api';

const { Title, Text } = Typography;

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

const AdminDashboard = () => {
  const [recentLimit] = useState(5);

  // Fetch data with limited items for dashboard overview
  const { data: booksData, isLoading: booksLoading } = useGetBooksQuery([
    { name: 'limit', value: 100 }, // Get enough books to calculate stats
  ]);

  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery([
    { name: 'limit', value: recentLimit },
  ]);

  const { data: ordersData, isLoading: ordersLoading } = useGetAllOrdersQuery([
    { name: 'limit', value: recentLimit },
  ]);

  // Calculate dashboard metrics
  const totalBooks = booksData?.meta?.total || 0;
  const totalUsers = usersData?.meta?.total || 0;
  const totalOrders = ordersData?.meta?.total || 0;

  const totalRevenue =
    ordersData?.data?.reduce((sum, order) => sum + order.total, 0) || 0;

  const lowStockBooks =
    booksData?.data?.filter((book) => book.stock < 10)?.length || 0;

  const pendingOrders =
    ordersData?.data?.filter((order) => order.status === 'Pending')?.length ||
    0;

  if (booksLoading || usersLoading || ordersLoading) {
    return <Loading />;
  }

  return (
    <div>
      <PageBreadcrumb items={breadcrumbItems} />

      <div className='!mb-6'>
        <Title level={2} className='!text-primary !my-4'>
          Admin Dashboard
        </Title>
        <Text type='secondary'>
          Welcome to your admin dashboard. Here's an overview of your store.
        </Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} className='!mb-8'>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable className='!h-full !border-l-4 !border-l-blue-500'>
            <Statistic
              title='Total Books'
              value={totalBooks}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <div className='!mt-4'>
              <Link to='/dashboard/admin/manage-books'>
                <Button type='primary' ghost size='small'>
                  Manage Books
                </Button>
              </Link>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card hoverable className='!h-full !border-l-4 !border-l-green-500'>
            <Statistic
              title='Total Users'
              value={totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <div className='!mt-4'>
              <Link to='/dashboard/admin/manage-users'>
                <Button type='primary' ghost size='small'>
                  Manage Users
                </Button>
              </Link>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card hoverable className='!h-full !border-l-4 !border-l-amber-500'>
            <Statistic
              title='Total Orders'
              value={totalOrders}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
            <div className='!mt-4'>
              <Link to='/dashboard/admin/manage-orders'>
                <Button type='primary' ghost size='small'>
                  Manage Orders
                </Button>
              </Link>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className='!h-full !border-l-4 !border-l-purple-500'>
            <Statistic
              title='Total Revenue'
              value={formatCurrency(totalRevenue)}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
            <div className='!mt-4'>
              <Text type='secondary'>From all orders</Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Alert Cards */}
      <Row gutter={[16, 16]} className='!mb-8'>
        <Col xs={24} md={12}>
          <Card className='!bg-amber-50 !border-amber-200'>
            <div className='!flex !items-center !gap-4'>
              <div className='!bg-amber-100 !p-3 !rounded-full'>
                <ShoppingCartOutlined
                  style={{ fontSize: 24, color: '#d48806' }}
                />
              </div>
              <div>
                <Title level={4} className='!m-0'>
                  {pendingOrders} Pending Orders
                </Title>
                <Text type='secondary'>Orders waiting to be processed</Text>
              </div>
              <div className='!ml-auto'>
                <Link to='/dashboard/admin/manage-orders'>
                  <Button
                    type='primary'
                    className='!bg-amber-500 !border-amber-500'
                  >
                    View Orders
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card className='!bg-red-50 !border-red-200'>
            <div className='!flex !items-center !gap-4'>
              <div className='!bg-red-100 !p-3 !rounded-full'>
                <RiseOutlined style={{ fontSize: 24, color: '#cf1322' }} />
              </div>
              <div>
                <Title level={4} className='!m-0'>
                  {lowStockBooks} Low Stock Items
                </Title>
                <Text type='secondary'>Books with less than 10 in stock</Text>
              </div>
              <div className='!ml-auto'>
                <Link to='/dashboard/admin/manage-books'>
                  <Button danger>Check Inventory</Button>
                </Link>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity Section */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <div className='!flex !justify-between !items-center'>
                <span>Recent Orders</span>
                <Link to='/dashboard/admin/manage-orders'>
                  <Button type='link' icon={<EyeOutlined />}>
                    View All
                  </Button>
                </Link>
              </div>
            }
            className='!h-full'
          >
            {ordersData?.data && ordersData.data.length > 0 ? (
              <List
                itemLayout='horizontal'
                dataSource={ordersData.data}
                renderItem={(order) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <div className='!flex !justify-between'>
                          <Link to={`/dashboard/manage-orders?id=${order._id}`}>
                            Order #{order._id.slice(-8)}
                          </Link>
                          <Text strong>{formatCurrency(order.total)}</Text>
                        </div>
                      }
                      description={
                        <div className='!flex !justify-between !items-center'>
                          <Space>
                            <Text type='secondary'>
                              {formatDate(order.createdAt)}
                            </Text>
                            <Text type='secondary'>•</Text>
                            <Text type='secondary'>{order.user.fullName}</Text>
                          </Space>
                          <Tag
                            color={
                              order.status === 'Delivered'
                                ? 'green'
                                : order.status === 'Cancelled'
                                ? 'red'
                                : order.status === 'Processing'
                                ? 'blue'
                                : 'orange'
                            }
                          >
                            {order.status}
                          </Tag>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <div className='!text-center !py-8'>
                <Text type='secondary'>No recent orders</Text>
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <div className='!flex !justify-between !items-center'>
                <span>Recent Users</span>
                <Link to='/dashboard/admin/manage-users'>
                  <Button type='link' icon={<EyeOutlined />}>
                    View All
                  </Button>
                </Link>
              </div>
            }
            className='!h-full'
          >
            {usersData?.data && usersData.data.length > 0 ? (
              <List
                itemLayout='horizontal'
                dataSource={usersData.data}
                renderItem={(user) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={user?.image}
                          icon={!user?.image && <UserOutlined />}
                        />
                      }
                      title={
                        <Link to={`/dashboard/manage-users?id=${user._id}`}>
                          {user?.fullName}
                        </Link>
                      }
                      description={
                        <div className='!flex !items-center !gap-2'>
                          <Text type='secondary'>{user.email}</Text>
                          <Divider type='vertical' />
                          <Tag
                            color={user.role === 'admin' ? 'purple' : 'blue'}
                          >
                            {user.role}
                          </Tag>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <div className='!text-center !py-8'>
                <Text type='secondary'>No recent users</Text>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;

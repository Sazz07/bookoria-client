import { useState } from 'react';
import { useGetMyOrdersQuery } from '../../redux/features/order/order.api';
import {
  Empty,
  Pagination,
  Badge,
  Tag,
  Collapse,
  Divider,
  Typography,
  Image,
  Button,
} from 'antd';
import {
  ShoppingOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  HomeOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { formatCurrency } from '../../utils/formatCurrency';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateUtils';
import Loading from '../../components/shared/Loading';
import { getPaymentStatusColor } from '../../utils/getPaymentStatusColor';
import { getStatusColor } from '../../utils/getStatusColor';
import PageBreadcrumb from '../../components/shared/PageBreadcrumb';

const { Title, Text } = Typography;

const breadcrumbItems = [
  {
    title: 'Home',
    href: '/',
    icon: <HomeOutlined />,
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardOutlined />,
  },
  {
    title: 'My Orders',
    href: '/dashboard/my-orders',
    icon: <ShoppingOutlined />,
  },
];

const MyOrders = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data: ordersData, isLoading } = useGetMyOrdersQuery([
    { name: 'page', value: page },
    { name: 'limit', value: limit },
  ]);

  if (isLoading) {
    return <Loading fullScreen />;
  }

  if (!ordersData || ordersData?.data?.length === 0) {
    return (
      <div className='min-h-[60vh] flex flex-col justify-center items-center'>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="You haven't placed any orders yet"
        />
        <Link to='/books'>
          <Button type='primary' className='mt-4'>
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='container py-4 mx-auto'>
      <PageBreadcrumb items={breadcrumbItems} />
      <Title level={3} className='!my-4 !text-accent'>
        My Orders
      </Title>

      <div className='space-y-6'>
        {ordersData?.data?.map((order) => (
          <div
            key={order._id}
            className='overflow-hidden bg-white rounded-lg shadow-md transition-all hover:shadow-lg'
          >
            <div className='p-6 bg-gradient-to-r to-white border-b from-primary-50'>
              <div className='flex flex-col gap-4 md:flex-row md:justify-between md:items-center'>
                <div>
                  <div className='flex gap-2 items-center mb-2'>
                    <ClockCircleOutlined className='text-gray-500' />
                    <Text type='secondary'>{formatDate(order?.createdAt)}</Text>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <Text strong>Order ID:</Text>
                    <Text copyable>{order._id}</Text>
                  </div>
                </div>

                <div className='flex flex-wrap gap-3 items-center'>
                  <Badge>
                    <Tag
                      color={getStatusColor(order.status)}
                      className='px-3 py-1 text-sm font-medium'
                    >
                      {order.status}
                    </Tag>
                  </Badge>
                  <Badge>
                    <Tag
                      color={getPaymentStatusColor(order.paymentInfo?.status)}
                      className='px-3 py-1 text-sm font-medium'
                    >
                      {order.paymentInfo?.status}
                    </Tag>
                  </Badge>
                  <Link to={`/dashboard/my-orders/${order._id}`}>
                    <Button type='primary' size='small'>
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <Collapse
              bordered={false}
              className='bg-white'
              expandIconPosition='end'
              items={[
                {
                  key: '1',
                  label: (
                    <div className='flex justify-between items-center py-2'>
                      <div className='flex gap-2 items-center'>
                        <ShoppingOutlined className='!text-primary' />
                        <Text strong>
                          {order?.orderItems.length}{' '}
                          {order?.orderItems.length > 1 ? 'items' : 'item'}
                        </Text>
                      </div>
                      <Text strong className='!text-primary'>
                        {formatCurrency(order.total)}
                      </Text>
                    </div>
                  ),
                  children: (
                    <div className='space-y-4'>
                      {order.orderItems.map((item) => (
                        <div
                          key={item._id}
                          className='flex gap-4 p-2 rounded-md hover:bg-gray-50'
                        >
                          <div className='flex-shrink-0 w-16 h-20'>
                            <Image
                              src={item.book.coverImage}
                              alt={item.book.title}
                              className='object-cover rounded'
                              preview={false}
                            />
                          </div>
                          <div className='flex-grow'>
                            <Link to={`/books/${item.book._id}`}>
                              <Text
                                strong
                                className='text-lg transition-colors hover:text-primary'
                              >
                                {item.book.title}
                              </Text>
                            </Link>
                            <Text type='secondary' className='block'>
                              by {item.book.author}
                            </Text>
                            <div className='flex justify-between mt-2'>
                              <Text>
                                {formatCurrency(item.price)} × {item.quantity}
                              </Text>
                              <Text strong>
                                {formatCurrency(item.price * item.quantity)}
                              </Text>
                            </div>
                          </div>
                        </div>
                      ))}

                      <Divider />

                      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <div>
                          <div className='flex gap-2 items-center mb-2'>
                            <EnvironmentOutlined className='text-primary' />
                            <Text strong>Shipping Address</Text>
                          </div>
                          <div className='p-3 bg-gray-50 rounded'>
                            <Text strong className='block'>
                              {order.shippingAddress.name}
                            </Text>
                            <Text>{order.shippingAddress.address}</Text>
                            <Text className='block'>
                              {order.shippingAddress.city},{' '}
                              {order.shippingAddress.postalCode}
                            </Text>
                            <Text className='block'>
                              {order.shippingAddress.country}
                            </Text>
                            <Text className='block'>
                              {order.shippingAddress.phone}
                            </Text>
                          </div>
                        </div>

                        <div>
                          <div className='flex gap-2 items-center mb-2'>
                            <CreditCardOutlined className='text-primary' />
                            <Text strong>Payment Information</Text>
                          </div>
                          <div className='p-3 bg-gray-50 rounded'>
                            <div className='flex justify-between mb-1'>
                              <Text>Method:</Text>
                              <Text strong>{order.paymentInfo.method}</Text>
                            </div>
                            {order.transaction && (
                              <div className='flex justify-between'>
                                <Text>Transaction ID:</Text>
                                <Text copyable>{order.transaction.id}</Text>
                              </div>
                            )}
                          </div>

                          <div className='mt-4'>
                            <div className='flex gap-2 items-center mb-2'>
                              <FileTextOutlined className='text-primary' />
                              <Text strong>Order Summary</Text>
                            </div>
                            <div className='p-3 bg-gray-50 rounded'>
                              <div className='flex justify-between mb-1'>
                                <Text>Subtotal:</Text>
                                <Text>{formatCurrency(order.subtotal)}</Text>
                              </div>
                              <div className='flex justify-between mb-1'>
                                <Text>Shipping:</Text>
                                <Text>
                                  {formatCurrency(order.shippingCost)}
                                </Text>
                              </div>
                              <div className='flex justify-between mb-1'>
                                <Text>Tax:</Text>
                                <Text>{formatCurrency(order.tax)}</Text>
                              </div>
                              <Divider className='my-2' />
                              <div className='flex justify-between'>
                                <Text strong>Total:</Text>
                                <Text strong className='text-lg text-primary'>
                                  {formatCurrency(order.total)}
                                </Text>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {order.notes && (
                        <div className='mt-4'>
                          <Text strong>Notes:</Text>
                          <div className='p-3 mt-1 bg-gray-50 rounded'>
                            <Text>{order.notes}</Text>
                          </div>
                        </div>
                      )}
                    </div>
                  ),
                },
              ]}
            />
          </div>
        ))}
      </div>

      {ordersData.meta && ordersData.meta.total > limit && (
        <div className='flex justify-center mt-8'>
          <Pagination
            current={page}
            pageSize={limit}
            total={ordersData.meta.total}
            onChange={(page) => setPage(page)}
            onShowSizeChange={(_, size) => {
              setLimit(size);
              setPage(1);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MyOrders;

import { useParams } from 'react-router-dom';
import {
  Card,
  Typography,
  Descriptions,
  Table,
  Tag,
  Divider,
  Row,
  Col,
  Statistic,
  Empty,
  Button,
} from 'antd';
import {
  HomeOutlined,
  DashboardOutlined,
  ShoppingOutlined,
  FileSearchOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../redux/features/order/order.api';
import PageBreadcrumb from '../../components/shared/PageBreadcrumb';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/dateUtils';
import Loading from '../../components/shared/Loading';
import { getStatusColor } from '../../utils/getStatusColor';
import { getPaymentStatusColor } from '../../utils/getPaymentStatusColor';

const { Title, Text } = Typography;

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading } = useGetOrderByIdQuery(id);

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
    {
      title: `Order #${id?.slice(-8)}`,
      icon: <FileSearchOutlined />,
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  if (!order) {
    return (
      <div className='p-8 text-center'>
        <Empty
          description={
            <span>
              The order you're looking for doesn't exist or you don't have
              permission to view it.
            </span>
          }
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Link to='/dashboard/my-orders'>
            <Button type='primary'>Back to Orders</Button>
          </Link>
        </Empty>
      </div>
    );
  }

  const columns = [
    {
      title: 'Book ID',
      dataIndex: 'book',
      key: 'book',
      render: (text: string) => <Text copyable>{text}</Text>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => formatCurrency(price),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      render: (discount: number) => `${discount}%`,
    },
    {
      title: 'Subtotal',
      key: 'subtotal',
      render: (_: unknown, record: { price: number; quantity: number }) =>
        formatCurrency(record.price * record.quantity),
    },
  ];

  return (
    <div className='order-details-container'>
      <PageBreadcrumb items={breadcrumbItems} />

      <Title level={3} className='!my-4 !text-accent'>
        Order Details{' '}
        <Tag color={getStatusColor(order.status)}>{order.status}</Tag>
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card title='Order Summary' className='!mb-6'>
            <Descriptions bordered column={{ xs: 1, sm: 2 }}>
              <Descriptions.Item label='Order ID'>
                {order._id}
              </Descriptions.Item>
              <Descriptions.Item label='Date Placed'>
                {formatDate(order.createdAt)}
              </Descriptions.Item>
              <Descriptions.Item label='Customer'>
                {order.user.fullName}
              </Descriptions.Item>
              <Descriptions.Item label='Email'>
                {order.user.email}
              </Descriptions.Item>
              <Descriptions.Item label='Status'>
                <Tag color={getStatusColor(order.status)}>{order.status}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label='Payment Status'>
                <Tag color={getPaymentStatusColor(order.paymentInfo.status)}>
                  {order.paymentInfo.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label='Payment Method'>
                {order.paymentInfo.method}
              </Descriptions.Item>
              {order.transaction && (
                <Descriptions.Item label='Transaction ID'>
                  {order.transaction.id}
                </Descriptions.Item>
              )}
              {order.notes && (
                <Descriptions.Item label='Notes' span={2}>
                  {order.notes}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>

          <Card title='Order Items' className='!mb-6'>
            <div className='overflow-x-auto'>
              <Table
                dataSource={order.orderItems}
                columns={columns}
                pagination={false}
                rowKey='_id'
                scroll={{ x: 'max-content' }}
                summary={() => (
                  <Table.Summary>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={4}>
                        <Text strong>Subtotal</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        <Text strong>{formatCurrency(order.subtotal)}</Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={4}>
                        <Text>Shipping</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        {formatCurrency(order.shippingCost)}
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={4}>
                        <Text>Tax</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        {formatCurrency(order.tax)}
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={4}>
                        <Text strong>Total</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        <Text strong>{formatCurrency(order.total)}</Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </Table.Summary>
                )}
              />
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title='Shipping Information' className='!mb-6'>
            <Descriptions column={1} bordered>
              <Descriptions.Item label='Name'>
                {order.shippingAddress.name}
              </Descriptions.Item>
              <Descriptions.Item label='Address'>
                {order.shippingAddress.address}
              </Descriptions.Item>
              <Descriptions.Item label='City'>
                {order.shippingAddress.city}
              </Descriptions.Item>
              <Descriptions.Item label='Postal Code'>
                {order.shippingAddress.postalCode}
              </Descriptions.Item>
              <Descriptions.Item label='Country'>
                {order.shippingAddress.country}
              </Descriptions.Item>
              <Descriptions.Item label='Phone'>
                {order.shippingAddress.phone}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title='Payment Information'>
            <Statistic
              title='Total Amount'
              value={formatCurrency(order.total)}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              className='!mb-4'
            />
            <Divider />
            <Descriptions column={1}>
              <Descriptions.Item label='Payment Method'>
                {order.paymentInfo.method}
              </Descriptions.Item>
              <Descriptions.Item label='Payment Status'>
                <Tag color={getPaymentStatusColor(order.paymentInfo.status)}>
                  {order.paymentInfo.status}
                </Tag>
              </Descriptions.Item>
              {order.transaction && (
                <>
                  <Descriptions.Item label='Transaction ID'>
                    {order.transaction.id}
                  </Descriptions.Item>
                  {order.transaction.transactionStatus && (
                    <Descriptions.Item label='Transaction Status'>
                      <Tag
                        color={
                          order.transaction.transactionStatus === 'Completed'
                            ? 'success'
                            : 'processing'
                        }
                      >
                        {order.transaction.transactionStatus}
                      </Tag>
                    </Descriptions.Item>
                  )}
                </>
              )}
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetails;

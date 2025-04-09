import {
  Drawer,
  Descriptions,
  Typography,
  Tag,
  List,
  Avatar,
} from 'antd';
import { TOrder } from '../../../../types';
import { formatDate } from '../../../../utils/dateUtils';

const { Title, Text } = Typography;

type OrderDetailsDrawerProps = {
  isOpen: boolean;
  order: TOrder | null;
  onClose: () => void;
};

const OrderDetailsDrawer = ({
  isOpen,
  order,
  onClose,
}: OrderDetailsDrawerProps) => {
  if (!order) return null;

  return (
    <Drawer
      title="Order Details"
      placement="right"
      onClose={onClose}
      open={isOpen}
      width={600}
    >
      <div>
        <Descriptions title="Order Information" bordered column={1}>
          <Descriptions.Item label="Order ID">{order._id}</Descriptions.Item>
          <Descriptions.Item label="Date">
            {formatDate(order.createdAt)}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag
              color={
                order.status === 'Delivered'
                  ? 'green'
                  : order.status === 'Cancelled'
                  ? 'red'
                  : 'blue'
              }
            >
              {order.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Payment Method">
            {order.paymentInfo.method}
          </Descriptions.Item>
          <Descriptions.Item label="Payment Status">
            <Tag
              color={
                order.paymentInfo.status === 'Completed'
                  ? 'green'
                  : 'orange'
              }
            >
              {order.paymentInfo.status}
            </Tag>
          </Descriptions.Item>
        </Descriptions>

        <Descriptions
          title="Customer Information"
          bordered
          column={1}
          className="!mt-4"
        >
          <Descriptions.Item label="Name">
            {order.user.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {order.user.email}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions
          title="Shipping Information"
          bordered
          column={1}
          className="!mt-4"
        >
          <Descriptions.Item label="Name">
            {order.shippingAddress.name}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {order.shippingAddress.address}
          </Descriptions.Item>
          <Descriptions.Item label="City">
            {order.shippingAddress.city}
          </Descriptions.Item>
          <Descriptions.Item label="Postal Code">
            {order.shippingAddress.postalCode}
          </Descriptions.Item>
          <Descriptions.Item label="Country">
            {order.shippingAddress.country}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {order.shippingAddress.phone}
          </Descriptions.Item>
        </Descriptions>

        <div className="mt-4">
          <Title level={5}>Order Items</Title>
          <List
            itemLayout="horizontal"
            dataSource={order.orderItems}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={64}
                      src={
                        item.book.coverImage ||
                        'https://placehold.co/60x90?text=Book'
                      }
                    />
                  }
                  title={<span>{item.book.title}</span>}
                  description={
                    <div>
                      <div>Author: {item.book.author}</div>
                      <div>Price: ${item.price.toFixed(2)}</div>
                      <div>Quantity: {item.quantity}</div>
                      {item.discount > 0 && (
                        <div>Discount: {item.discount}%</div>
                      )}
                    </div>
                  }
                />
                <div>${(item.price * item.quantity).toFixed(2)}</div>
              </List.Item>
            )}
          />
        </div>

        <Descriptions bordered column={1} className="mt-4">
          <Descriptions.Item label="Subtotal">
            ${order.subtotal.toFixed(2)}
          </Descriptions.Item>
          <Descriptions.Item label="Shipping Cost">
            ${order.shippingCost.toFixed(2)}
          </Descriptions.Item>
          <Descriptions.Item label="Tax">
            ${order.tax.toFixed(2)}
          </Descriptions.Item>
          <Descriptions.Item label="Total">
            <Text strong>${order.total.toFixed(2)}</Text>
          </Descriptions.Item>
        </Descriptions>

        {order.notes && (
          <div className="mt-4">
            <Title level={5}>Notes</Title>
            <Text>{order.notes}</Text>
          </div>
        )}

        {order.transaction && (
          <Descriptions
            title="Transaction Information"
            bordered
            column={1}
            className="!mt-4"
          >
            <Descriptions.Item label="Transaction ID">
              {order.transaction.id}
            </Descriptions.Item>
            <Descriptions.Item label="Method">
              {order.transaction.method}
            </Descriptions.Item>
            <Descriptions.Item label="Date">
              {order.transaction.date_time}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag
                color={
                  order.transaction.bank_status === 'Success'
                    ? 'green'
                    : 'red'
                }
              >
                {order.transaction.bank_status}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        )}
      </div>
    </Drawer>
  );
};

export default OrderDetailsDrawer;
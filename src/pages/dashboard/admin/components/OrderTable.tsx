import {
  Table,
  Space,
  Button,
  Popconfirm,
  Tooltip,
  Typography,
  Tag,
} from 'antd';
import {
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { TOrder } from '../../../../types';
import { formatDate } from '../../../../utils/dateUtils';
import OrderStatusSelector from './OrderStatusSelector';

const { Text } = Typography;

type OrderTableProps = {
  data: TOrder[] | undefined;
  loading: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  onStatusChange: (newStatus: string, orderId: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onViewDetails: (order: TOrder) => void;
};

const OrderTable = ({
  data,
  loading,
  isDeleting,
  isUpdating,
  onStatusChange,
  onDelete,
  onViewDetails,
}: OrderTableProps) => {
  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
      render: (id: string) => <Text copyable>{id.slice(-8)}</Text>,
    },
    {
      title: 'Customer',
      key: 'user',
      render: (item: TOrder) => (
        <div className="flex items-center">
          <div>
            <div className="font-medium">{item.user.fullName}</div>
            <div className="text-sm text-gray-500">{item.user.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Items',
      key: 'items',
      render: (item: TOrder) => <span>{item.orderItems.length}</span>,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total: number) => <span>${total.toFixed(2)}</span>,
      sorter: (a: TOrder, b: TOrder) => a.total - b.total,
    },
    {
      title: 'Payment',
      key: 'payment',
      render: (item: TOrder) => (
        <Tag
          color={item.paymentInfo.status === 'Completed' ? 'green' : 'orange'}
        >
          {item.paymentInfo.status}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, item: TOrder) => (
        <OrderStatusSelector
          status={status}
          orderId={item._id}
          isLoading={isUpdating}
          onStatusChange={onStatusChange}
        />
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (item: TOrder) => (
        <Space size="middle">
          <Tooltip title="View Details">
            <Button
              icon={<EyeOutlined />}
              onClick={() => onViewDetails(item)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete this order?"
            description="This action cannot be undone."
            onConfirm={() => onDelete(item._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} loading={isDeleting} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={false}
      scroll={{ x: 'max-content' }}
      rowKey="_id"
    />
  );
};

export default OrderTable;
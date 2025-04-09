import { Select, Tag } from 'antd';
import { orderStatusOptions } from '../../../../constants/global';

const { Option } = Select;

type OrderStatusSelectorProps = {
  status: string;
  orderId: string;
  isLoading: boolean;
  onStatusChange: (newStatus: string, orderId: string) => Promise<void>;
};

const OrderStatusSelector = ({
  status,
  orderId,
  isLoading,
  onStatusChange,
}: OrderStatusSelectorProps) => {
  return (
    <Select
      value={status}
      style={{ width: 120 }}
      onChange={(value) => onStatusChange(value, orderId)}
      disabled={isLoading}
    >
      {orderStatusOptions.map((option) => (
        <Option key={option.value} value={option.value}>
          <Tag color={option.color}>{option.value}</Tag>
        </Option>
      ))}
    </Select>
  );
};

export default OrderStatusSelector;
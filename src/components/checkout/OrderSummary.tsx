import { Card, List, Typography } from 'antd';
import { formatCurrency } from '../../utils/formatCurrency';

const { Text } = Typography;

type OrderSummaryProps = {
  cartTotal: number;
  shippingCost: number;
};

const OrderSummary = ({ cartTotal, shippingCost }: OrderSummaryProps) => {
  return (
    <div className='lg:sticky lg:top-24'>
      <Card title='Order Summary' className='mb-8 shadow-sm'>
        <List
          itemLayout='horizontal'
          dataSource={[
            { label: 'Subtotal', value: formatCurrency(cartTotal) },
            { label: 'Shipping', value: formatCurrency(shippingCost) },
            {
              label: 'Tax',
              value: formatCurrency(Math.round(cartTotal * 0.1)),
            },
          ]}
          renderItem={(item) => (
            <List.Item className='flex justify-between py-2 border-0'>
              <Text>{item.label}</Text>
              <Text>{item.value}</Text>
            </List.Item>
          )}
          footer={
            <div className='flex justify-between pt-4 border-t'>
              <Text strong className='text-lg'>
                Total
              </Text>
              <Text strong className='text-lg text-primary'>
                {formatCurrency(
                  cartTotal + shippingCost + Math.round(cartTotal * 0.1)
                )}
              </Text>
            </div>
          }
          className='!border-0'
        />
      </Card>
    </div>
  );
};

export default OrderSummary;

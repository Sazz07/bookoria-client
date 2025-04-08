import { Button, Radio, Space, Typography } from 'antd';

const { Text, Title } = Typography;

const paymentMethods = [
  { value: 'Credit Card', label: 'Credit Card' },
  { value: 'Debit Card', label: 'Debit Card' },
  { value: 'Mobile Banking', label: 'Mobile Banking' },
  { value: 'Cash On Delivery', label: 'Cash On Delivery' },
];

type PaymentMethodProps = {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
};

const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
  notes,
  setNotes,
  onBack,
  onSubmit,
  isLoading,
}: PaymentMethodProps) => {
  return (
    <div>
      <Title level={4}>Payment Method</Title>
      <div className='mb-6'>
        <Text strong>Select Payment Method</Text>
        <Radio.Group
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className='mt-2 w-full'
        >
          <Space direction='vertical'>
            {paymentMethods.map((method) => (
              <Radio key={method.value} value={method.value}>
                {method.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>

      <div className='mb-6'>
        <Text strong>Order Notes (Optional)</Text>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder='Special instructions for your order'
          className='p-3 mt-2 w-full rounded-md border border-gray-300'
          rows={4}
        />
      </div>

      <div className='flex flex-col justify-between mt-6 space-y-4 sm:flex-row sm:space-y-0'>
        <Button size='large' onClick={onBack}>
          Back to Shipping
        </Button>
        <Button
          type='primary'
          size='large'
          onClick={onSubmit}
          loading={isLoading}
        >
          {paymentMethod === 'Cash On Delivery'
            ? 'Place Order'
            : 'Proceed to Payment'}
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethod;

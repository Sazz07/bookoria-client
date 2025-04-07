import { Button, Space, Typography, Spin, Descriptions } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { TPaymentVerificationResponse } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';

const { Text, Title } = Typography;

type OrderConfirmationProps = {
  paymentVerificationData: TPaymentVerificationResponse | null;
  paymentMethod: string;
  orderId: string | null;
  onContinueShopping: () => void;
  onViewOrder: () => void;
  onTryAgain: () => void;
};

const OrderConfirmation = ({
  paymentVerificationData,
  paymentMethod,
  orderId,
  onContinueShopping,
  onViewOrder,
  onTryAgain,
}: OrderConfirmationProps) => {
  const isLoading =
    !paymentVerificationData && paymentMethod !== 'Cash On Delivery';

  const isPaymentFailed =
    paymentMethod !== 'Cash On Delivery' &&
    paymentVerificationData?.data[0]?.bank_status === 'Failed';

  const actualPaymentMethod = paymentVerificationData?.data[0]?.method;

  return (
    <div className='py-8 text-center'>
      {isLoading ? (
        <>
          <Spin size='large' className='mb-6' />
          <Title level={3}>Verifying Payment...</Title>
          <Text className='block mb-4'>
            Please wait while we verify your payment status.
          </Text>
        </>
      ) : isPaymentFailed ? (
        <>
          <CloseCircleOutlined className='mb-4 text-6xl !text-red-500' />
          <Title level={3}>Payment Failed</Title>
          <Text className='block mb-4'>
            Your payment could not be processed. Please try again or choose a
            different payment method.
          </Text>
          <Text type='secondary' className='block mb-6'>
            Error:{' '}
            {paymentVerificationData?.data[0]?.sp_message || 'Unknown error'}
          </Text>
        </>
      ) : (
        <>
          <CheckCircleOutlined className='mb-4 text-6xl !text-green-500' />
          <Title level={3}>Thank You for Your Order!</Title>
          <Text className='block mb-4'>
            {paymentMethod === 'Cash On Delivery'
              ? "Your order has been placed successfully. We'll process it soon."
              : "Your payment has been processed. We'll send you a confirmation email shortly."}
          </Text>

          {paymentMethod !== 'Cash On Delivery' && actualPaymentMethod && (
            <div className='flex justify-center items-center mt-4 mb-6'>
              <Descriptions
                bordered
                size='small'
                column={1}
                className='mx-auto max-w-md text-left'
              >
                <Descriptions.Item label='Payment Method'>
                  {actualPaymentMethod}
                </Descriptions.Item>
                {paymentVerificationData?.data[0]?.card_number && (
                  <Descriptions.Item label='Card'>
                    {paymentVerificationData.data[0].card_number}
                  </Descriptions.Item>
                )}
                {paymentVerificationData?.data[0]?.date_time && (
                  <Descriptions.Item label='Date'>
                    {paymentVerificationData.data[0].date_time}
                  </Descriptions.Item>
                )}
                {paymentVerificationData?.data[0]?.received_amount && (
                  <Descriptions.Item label='Amount'>
                    {formatCurrency(
                      +paymentVerificationData.data[0].received_amount
                    )}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </div>
          )}
        </>
      )}

      <Text strong className='block mb-6'>
        Order ID: {orderId}
      </Text>

      <Space direction='vertical' className='w-full sm:flex-row sm:w-auto'>
        <Button size='large' onClick={onContinueShopping}>
          Continue Shopping
        </Button>

        {!isLoading && !isPaymentFailed && (
          <Button type='primary' size='large' onClick={onViewOrder}>
            View My Orders
          </Button>
        )}

        {isPaymentFailed && (
          <Button type='primary' size='large' onClick={onTryAgain}>
            Try Again
          </Button>
        )}
      </Space>
    </div>
  );
};

export default OrderConfirmation;

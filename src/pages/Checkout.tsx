import { useState, useEffect } from 'react';
import { Button, Steps, Card, Empty } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingCartOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from '../redux/features/cart/cartSlice';
import {
  useCreateOrderMutation,
  useVerifyPaymentQuery,
} from '../redux/features/order/order.api';
import { toast } from 'sonner';
import { TShippingAddress } from '../types';
import PageBreadcrumb from '../components/shared/PageBreadcrumb';
import { selectUserProfile } from '../redux/features/auth/authSlice';
import CartReview from '../components/checkout/CartReview';
import ShippingForm from '../components/checkout/ShippingForm';
import PaymentMethod from '../components/checkout/PaymentMethod';
import OrderConfirmation from '../components/checkout/OrderConfirmation';
import OrderSummary from '../components/checkout/OrderSummary';
import { cn } from '../utils/cn';

const SHIPPING_COST = 80;

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingData, setShippingData] = useState<Omit<
    TShippingAddress,
    '_id'
  > | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [notes, setNotes] = useState('');
  const [orderId, setOrderId] = useState<string | null>(null);

  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const profile = useAppSelector(selectUserProfile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  // Check if we're returning from payment gateway
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const orderIdFromUrl = queryParams.get('order_id');

    if (orderIdFromUrl && location.pathname === '/payment-verification') {
      setOrderId(orderIdFromUrl);
      setCurrentStep(3);
      dispatch(clearCart());
      toast.success('Payment completed! Verifying your order...');
    }
  }, [location, dispatch]);

  const { data: paymentVerificationData } = useVerifyPaymentQuery(
    orderId as string,
    {
      skip: !orderId || currentStep !== 3,
    }
  );

  useEffect(() => {
    if (paymentVerificationData) {
      if (paymentVerificationData.data[0]?.bank_status === 'Success') {
        toast.success('Payment verified successfully!');
      } else if (paymentVerificationData.data[0]?.bank_status === 'Failed') {
        toast.error('Payment failed. Please try again.');
      }
    }
  }, [paymentVerificationData]);

  const steps = [
    {
      title: 'Cart',
      icon: <ShoppingCartOutlined />,
      content: 'Review your items',
    },
    {
      title: 'Shipping',
      icon: <EnvironmentOutlined />,
      content: 'Shipping information',
    },
    {
      title: 'Payment',
      icon: <CreditCardOutlined />,
      content: 'Payment method',
    },
    {
      title: 'Confirmation',
      icon: <CheckCircleOutlined />,
      content: 'Order complete',
    },
  ];

  const handleShippingSubmit = (data: Omit<TShippingAddress, '_id'>) => {
    setShippingData(data);
    setCurrentStep(2);
  };

  const handlePaymentSubmit = async () => {
    if (!shippingData) return;

    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          book: item.book._id,
          quantity: item.quantity,
        })),
        shippingAddress: {
          name: shippingData?.name,
          address: shippingData.address,
          city: shippingData.city,
          postalCode: shippingData.postalCode,
          country: shippingData.country,
          phone: shippingData.phone,
        },
        paymentInfo: {
          method: paymentMethod,
        },
        shippingCost: SHIPPING_COST,
        notes: notes.trim(),
      };

      const response = await createOrder(orderData).unwrap();

      if (paymentMethod === 'Cash On Delivery') {
        setOrderId(response.data.order._id);
        dispatch(clearCart());
        setCurrentStep(3);
        toast.success('Order placed successfully!');
      } else {
        setOrderId(response.data.order._id);

        if (response.data.paymentUrl) {
          window.location.href = response.data.paymentUrl;
        } else {
          toast.error('Payment URL not received. Please try again.');
        }
      }
    } catch {
      toast.error('Failed to place order. Please try again.');
    }
  };

  const handleContinueShopping = () => {
    navigate('/books');
  };

  const handleViewOrder = () => {
    navigate(`/dashboard/my-orders`);
  };

  if (cartItems.length === 0 && currentStep !== 3) {
    return (
      <div className='container px-4 py-8 mx-auto'>
        <PageBreadcrumb
          items={[
            { title: 'Home', href: '/', icon: <HomeOutlined /> },
            { title: 'Checkout' },
          ]}
        />
        <div className='flex flex-col justify-center items-center py-12'>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description='Your cart is empty'
          />
          <Button
            type='primary'
            size='large'
            onClick={handleContinueShopping}
            className='mt-4'
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='container px-4 py-8 mx-auto'>
      <PageBreadcrumb
        items={[
          { title: 'Home', href: '/', icon: <HomeOutlined /> },
          { title: 'Checkout' },
        ]}
      />

      <div className='mb-8'>
        <h1 className='my-4 text-3xl font-bold text-primary'>Checkout</h1>
        <Steps
          current={currentStep}
          items={steps.map((item) => ({
            title: item.title,
            icon: item.icon,
            description: item.content,
          }))}
          className='my-8'
          responsive={true}
        />
      </div>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        <div
          className={cn('lg:col-span-2', currentStep === 3 && 'lg:col-span-3')}
        >
          <Card className='shadow-sm'>
            {currentStep === 0 && (
              <CartReview
                cartItems={cartItems}
                onProceed={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 1 && (
              <ShippingForm
                profile={profile}
                onBack={() => setCurrentStep(0)}
                onSubmit={handleShippingSubmit}
              />
            )}

            {currentStep === 2 && (
              <PaymentMethod
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                notes={notes}
                setNotes={setNotes}
                onBack={() => setCurrentStep(1)}
                onSubmit={handlePaymentSubmit}
                isLoading={isLoading}
              />
            )}

            {currentStep === 3 && (
              <OrderConfirmation
                paymentVerificationData={paymentVerificationData}
                paymentMethod={paymentMethod}
                orderId={orderId}
                onContinueShopping={handleContinueShopping}
                onViewOrder={handleViewOrder}
                onTryAgain={() => navigate('/checkout')}
              />
            )}
          </Card>
        </div>

        {currentStep < 3 && (
          <div className=''>
            <OrderSummary cartTotal={cartTotal} shippingCost={SHIPPING_COST} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;

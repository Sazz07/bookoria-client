import {
  Drawer,
  Button,
  Empty,
  List,
  InputNumber,
  Typography,
  Divider,
} from 'antd';
import { DeleteOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import {
  selectCartItems,
  selectCartTotal,
  selectIsCartOpen,
  toggleCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../../redux/features/cart/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';

const { Title, Text } = Typography;

const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const isOpen = useAppSelector(selectIsCartOpen);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/books');
    dispatch(toggleCart(false));
  };

  const handleQuantityChange = (bookId: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ bookId, quantity }));
  };

  const handleRemoveItem = (bookId: string) => {
    dispatch(removeFromCart(bookId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Drawer
      title={
        <div className='flex items-center'>
          <ShoppingOutlined className='mr-2' />
          <span>Your Cart ({cartItems.length} items)</span>
        </div>
      }
      placement='right'
      onClose={handleClose}
      open={isOpen}
      width={400}
      footer={
        cartItems.length > 0 && (
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <Title level={5}>Total:</Title>
              <Title level={5}>{formatCurrency(cartTotal)}</Title>
            </div>
            <div className='flex gap-2'>
              <Button onClick={handleClearCart} danger>
                Clear Cart
              </Button>
              <Button
                onClick={() => {
                  handleClose();
                  navigate('/checkout');
                }}
                type='primary'
                block
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )
      }
    >
      {cartItems.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description='Your cart is empty'
        >
          <Button type='primary' onClick={handleClose}>
            Continue Shopping
          </Button>
        </Empty>
      ) : (
        <List
          dataSource={cartItems}
          renderItem={(item) => (
            <List.Item
              key={item?.book._id}
              className='flex flex-col items-start'
            >
              <div className='flex mb-2 w-full'>
                <div className='mr-4'>
                  <img
                    src={item.book.coverImage || 'https://placehold.co/80x120'}
                    alt={item.book.title}
                    className='object-cover w-20 h-auto rounded'
                  />
                </div>
                <div className='flex-1'>
                  <Link
                    to={`/books/${item?.book._id}`}
                    className='text-base font-medium hover:text-primary'
                    onClick={handleClose}
                  >
                    {item.book.title}
                  </Link>
                  <Text type='secondary' className='block'>
                    by {item.book.author}
                  </Text>
                  <div className='mt-1'>
                    {item.book.discount > 0 ? (
                      <div className='flex items-center'>
                        <Text className='font-medium text-primary'>
                          {formatCurrency(item.book.discountedPrice)}
                        </Text>
                        <Text delete type='secondary' className='ml-2'>
                          {formatCurrency(item.book.price)}
                        </Text>
                      </div>
                    ) : (
                      <Text className='font-medium text-primary'>
                        {formatCurrency(item.book.price)}
                      </Text>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex justify-between items-center mt-2 w-full'>
                <div className='flex items-center'>
                  <Text className='mr-2'>Qty:</Text>
                  <InputNumber
                    min={1}
                    max={item.book.stock}
                    value={item.quantity}
                    onChange={(value) =>
                      handleQuantityChange(item.book._id, value as number)
                    }
                    className='w-16'
                  />
                </div>
                <Button
                  type='text'
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveItem(item.book._id)}
                />
              </div>
              <Divider className='my-2' />
            </List.Item>
          )}
        />
      )}
    </Drawer>
  );
};

export default CartDrawer;

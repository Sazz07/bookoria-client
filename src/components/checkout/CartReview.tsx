import { Button, List, Typography, Badge } from 'antd';
import { formatCurrency } from '../../utils/formatCurrency';
import { TCartItem } from '../../types';

const { Text, Title } = Typography;

type CartReviewProps = {
  cartItems: TCartItem[];
  onProceed: () => void;
};

const CartReview = ({ cartItems, onProceed }: CartReviewProps) => {
  return (
    <div>
      <Title level={4}>Review Your Cart</Title>
      <List
        itemLayout='horizontal'
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item>
            <div className='flex w-full'>
              <div className='mr-4'>
                <img
                  src={item.book.coverImage || 'https://placehold.co/80x120'}
                  alt={item.book.title}
                  className='object-cover w-20 h-auto rounded'
                />
              </div>
              <div className='flex-1'>
                <div className='flex flex-col justify-between sm:flex-row'>
                  <div>
                    <Text strong className='!text-lg'>
                      {item.book.title}
                    </Text>
                    <Text type='secondary' className='!block'>
                      by {item.book.author}
                    </Text>
                    <Badge
                      count={item.quantity}
                      color='blue'
                      className='!mt-2'
                    />
                  </div>
                  <div className='mt-2 text-left sm:text-right sm:mt-0'>
                    {item.book.discount > 0 ? (
                      <div>
                        <Text strong className='text-lg text-primary'>
                          {formatCurrency(
                            item.book.discountedPrice * item.quantity
                          )}
                        </Text>
                        <Text delete type='secondary' className='!block'>
                          {formatCurrency(item.book.price * item.quantity)}
                        </Text>
                      </div>
                    ) : (
                      <Text strong className='!text-lg !text-primary'>
                        {formatCurrency(item.book.price * item.quantity)}
                      </Text>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
      <div className='flex justify-end mt-4'>
        <Button type='primary' size='large' onClick={onProceed}>
          Proceed to Shipping
        </Button>
      </div>
    </div>
  );
};

export default CartReview;

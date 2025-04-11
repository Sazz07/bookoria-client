import { Card, Rate, Tag, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { TBook } from '../../types';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { formatCurrency } from '../../utils/formatCurrency';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import { ROLES } from '../../constants/global';
import { toast } from 'sonner';

const { Text, Title } = Typography;

type BookCardProps = {
  book: TBook;
};

const BookCard = ({ book }: BookCardProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const isAdmin = user?.role === ROLES.ADMIN;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAdmin) {
      const userId = user?.userId || null;
      dispatch(addToCart({ book, userId }));
    } else {
      e.preventDefault();
      toast.info(
        'Admins cannot place orders. Please use a regular user account for shopping.'
      );
    }
  };

  const getStockStatusColor = (stock: number) => {
    if (stock === 0) return 'red';
    if (stock <= 5) return 'orange';
    return 'green';
  };

  const getStockStatusText = (stock: number) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <= 5) return `Low Stock: ${stock}`;
    return `In Stock: ${stock}`;
  };

  return (
    <Link to={`/books/${book._id}`} className='block h-full'>
      <Card
        hoverable
        className='!flex !flex-col !h-full !overflow-hidden !border !border-gray-200 !rounded-lg !shadow-sm hover:!shadow-md !transition-shadow !duration-300'
        styles={{
          body: {
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          },
        }}
        cover={
          <div className='relative pt-[120%] overflow-hidden bg-gray-100'>
            <img
              alt={book.title}
              src={
                book.coverImage || 'https://placehold.co/300x450?text=No+Image'
              }
              className='!object-cover !absolute !inset-0 !w-full !h-full !transition-transform !duration-300 hover:!scale-105'
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/300x450?text=No+Image';
              }}
            />
            <div className='flex absolute top-0 right-0 left-0 justify-between p-2'>
              {book.featured && (
                <span className='!px-2 !py-1 !text-xs !font-bold !text-white !bg-amber-500 !rounded-md'>
                  Featured
                </span>
              )}
              {book.discount > 0 && (
                <span className='!px-2 !py-1 !text-xs !font-bold !text-white !bg-red-500 !rounded-md !ml-auto'>
                  {book.discount}% OFF
                </span>
              )}
            </div>
          </div>
        }
      >
        <div className='!flex !flex-col !h-full'>
          <Title
            level={5}
            ellipsis={{ rows: 2 }}
            className='!mb-1 !h-12 !overflow-hidden'
          >
            {book.title}
          </Title>

          <Text className='!text-gray-500 !mb-2 !text-sm !overflow-hidden !text-ellipsis !whitespace-nowrap'>
            {book.author}
          </Text>

          <div className='!flex !items-center !mb-2'>
            <Rate
              disabled
              defaultValue={book.rating || 0}
              allowHalf
              className='!text-xs'
            />
            <Text className='!ml-1 !text-xs !text-gray-500'>
              {book.rating ? book.rating.toFixed(1) : 'No ratings'}
            </Text>
          </div>

          <div className='!mb-3'>
            <Tag color='blue' className='!mr-1'>
              {book.genre}
            </Tag>
            <Tag color={getStockStatusColor(book.stock)} className='!mr-1'>
              {getStockStatusText(book.stock)}
            </Tag>
          </div>

          <div className='!mt-auto !mb-4'>
            {book.discount > 0 ? (
              <div className='!flex !items-center'>
                <Text className='!text-lg !font-bold !text-primary'>
                  {formatCurrency(book.discountedPrice)}
                </Text>
                <Text className='!ml-2 !text-sm !text-gray-500 !line-through'>
                  {formatCurrency(book.price)}
                </Text>
              </div>
            ) : (
              <Text className='!text-lg !font-bold !text-primary'>
                {formatCurrency(book.price)}
              </Text>
            )}
          </div>

          <Button
            type='primary'
            icon={<ShoppingCartOutlined />}
            disabled={book.stock === 0}
            onClick={handleAddToCart}
            className='!w-full !font-medium !flex !items-center !justify-center'
            size='middle'
          >
            {book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </Card>
    </Link>
  );
};

export default BookCard;

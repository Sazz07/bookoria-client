import { Card, Rate, Tag, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { TBook } from '../../types';
import { useAppDispatch } from '../../redux/hook';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { formatCurrency } from '../../utils/formatCurrency';

const { Meta } = Card;

type BookCardProps = {
  book: TBook;
};

const BookCard = ({ book }: BookCardProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(book));
  };

  return (
    <Link to={`/books/${book._id}`}>
      <Card
        hoverable
        cover={
          <div className='relative pt-[150%] overflow-hidden'>
            <img
              alt={book.title}
              src={
                book.coverImage || 'https://placehold.co/300x450?text=No+Image'
              }
              className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105'
            />
            {book.discount > 0 && (
              <div className='absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-bold'>
                {book.discount}% OFF
              </div>
            )}
            {book.featured && (
              <div className='absolute top-0 left-0 bg-amber-500 text-white px-2 py-1 text-xs font-bold'>
                Featured
              </div>
            )}
          </div>
        }
        className='h-full flex flex-col'
        bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        actions={[
          <Button
            type='primary'
            icon={<ShoppingCartOutlined />}
            disabled={book.stock === 0}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>,
        ]}
      >
        <Meta
          title={book.title}
          description={
            <div className='flex flex-col h-full'>
              <p className='text-gray-500 mb-2'>{book.author}</p>
              <div className='flex items-center mb-2'>
                <Rate
                  disabled
                  defaultValue={book.rating || 0}
                  allowHalf
                  className='text-xs'
                />
                <span className='ml-1 text-xs text-gray-500'>
                  {book.rating ? book.rating.toFixed(1) : 'No ratings'}
                </span>
              </div>
              <div className='mb-2'>
                <Tag color='blue' className='mr-1'>
                  {book.genre}
                </Tag>
              </div>
              <div className='mt-auto'>
                {book.discount > 0 ? (
                  <div className='flex items-center'>
                    <span className='text-lg font-bold text-primary'>
                      {formatCurrency(book.discountedPrice)}
                    </span>
                    <span className='ml-2 text-sm text-gray-500 line-through'>
                      {formatCurrency(book.price)}
                    </span>
                  </div>
                ) : (
                  <span className='text-lg font-bold text-primary'>
                    {formatCurrency(book.price)}
                  </span>
                )}
              </div>
            </div>
          }
        />
      </Card>
    </Link>
  );
};

export default BookCard;

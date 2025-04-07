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
              className='object-cover absolute inset-0 w-full h-full transition-transform duration-300 hover:scale-105'
            />
            {book.discount > 0 && (
              <div className='absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white bg-red-500'>
                {book.discount}% OFF
              </div>
            )}
            {book.featured && (
              <div className='absolute top-0 left-0 px-2 py-1 text-xs font-bold text-white bg-amber-500'>
                Featured
              </div>
            )}
          </div>
        }
        className='flex flex-col h-full'
        actions={[
          <Button
            type='primary'
            icon={<ShoppingCartOutlined />}
            disabled={book.stock === 0}
            onClick={handleAddToCart}
            className='flex items-center justify-center mx-auto w-[90%] font-medium'
            size='middle'
          >
            {book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>,
        ]}
      >
        <Meta
          title={book.title}
          description={
            <div className='flex flex-col h-full'>
              <p className='mb-2 text-gray-500'>{book.author}</p>
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

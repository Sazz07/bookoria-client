import { Link } from 'react-router-dom';
import { Card, Button, Rate, Tag } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { TBook } from '../../types';

type BookCardProps = {
  book: TBook;
  onAddToCart: (book: TBook) => void;
};

const BookCard = ({ book, onAddToCart }: BookCardProps) => {
  // Calculate discount percentage
  const calculateDiscountPercentage = (
    price: number,
    discountedPrice: number
  ) => {
    if (!price || !discountedPrice || price <= discountedPrice) return null;
    return Math.round(((price - discountedPrice) / price) * 100);
  };

  return (
    <Card
      hoverable
      className='flex overflow-hidden flex-col h-full transition-all duration-300 hover:shadow-md'
      styles={{
        body: {
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        },
      }}
      cover={
        <Link to={`/books/${book._id}`}>
          <div className='relative pt-[130%] bg-gray-50'>
            <img
              alt={book.title}
              src={
                book.coverImage ||
                'https://placehold.co/200x300/e2e8f0/1e293b?text=No+Image'
              }
              className='object-cover absolute inset-0 p-1 w-full h-full'
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  'https://placehold.co/200x300/e2e8f0/1e293b?text=No+Image';
              }}
            />
            {book.discount > 0 && (
              <div className='absolute top-0 right-0'>
                <div className='px-1 py-0.5 text-[10px] font-bold text-white bg-red-500 rounded-bl-lg'>
                  {calculateDiscountPercentage(
                    book.price,
                    book.discountedPrice
                  )}
                  % OFF
                </div>
              </div>
            )}
            {book.featured && (
              <div className='absolute top-0 left-0'>
                <div className='px-1 py-0.5 text-[10px] font-bold text-white bg-amber-500 rounded-br-lg'>
                  Featured
                </div>
              </div>
            )}
          </div>
        </Link>
      }
    >
      <div className='flex flex-col flex-grow'>
        <Link to={`/books/${book._id}`} className='flex-grow'>
          <div className='flex flex-col h-full'>
            <h3 className='mb-0.5 text-xs font-semibold line-clamp-1'>
              {book.title}
            </h3>
            <p className='mb-0.5 text-[10px] text-gray-600 line-clamp-1'>
              {book.author}
            </p>

            <Tag color='blue' className='mb-1 text-[10px] w-fit'>
              {book.genre}
            </Tag>

            <div className='mb-1 min-h-[20px]'>
              {book.rating !== undefined ? (
                <>
                  <Rate
                    disabled
                    defaultValue={book.rating}
                    allowHalf
                    style={{ fontSize: '12px' }}
                  />
                  <span className='ml-1 text-[10px] text-gray-600'>
                    {book.rating.toFixed(1)}
                  </span>
                </>
              ) : null}
            </div>

            <div className='mt-auto'>
              <div className='flex items-baseline'>
                {book.discount > 0 ? (
                  <>
                    <span className='text-sm font-bold text-primary'>
                      ${book.discountedPrice.toFixed(2)}
                    </span>
                    <span className='ml-1 text-[10px] text-gray-500 line-through'>
                      ${book.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className='text-sm font-bold text-primary'>
                    ${book.price.toFixed(2)}
                  </span>
                )}
              </div>

              <div className='min-h-[16px]'>
                {book.stock <= 5 && book.stock > 0 && (
                  <p className='mt-0.5 text-[10px] text-orange-500'>
                    Only {book.stock} left
                  </p>
                )}
                {book.stock === 0 && (
                  <p className='mt-0.5 text-[10px] text-red-500'>
                    Out of stock
                  </p>
                )}
              </div>
            </div>
          </div>
        </Link>

        <Button
          type='primary'
          size='small'
          icon={<ShoppingCartOutlined />}
          className='mt-2 w-full'
          disabled={book.stock === 0}
          onClick={() => onAddToCart(book)}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default BookCard;

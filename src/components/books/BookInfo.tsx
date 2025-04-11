import { Button, Divider, Rate, Tag } from 'antd';
import {
  BookOutlined,
  CalendarOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { TBook } from '../../types';
import { formatDate } from '../../utils/dateUtils';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { formatCurrency } from '../../utils/formatCurrency';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import { ROLES } from '../../constants/global';
import { toast } from 'sonner';

type BookInfoProps = {
  book: TBook;
};

const BookInfo = ({ book }: BookInfoProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const isAdmin = user?.role === ROLES.ADMIN;

  const handleAddToCart = () => {
    if (!isAdmin) {
      const userId = user?.userId || null;
      dispatch(addToCart({ book, userId }));
    } else {
      toast.info(
        'Admins cannot place orders. Please use a regular user account for shopping.'
      );
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <div>
        <h1 className='mb-2 text-2xl font-bold text-gray-800 md:text-3xl'>
          {book.title}
        </h1>
        <h2 className='mb-4 text-xl text-gray-600'>by {book.author}</h2>

        <div className='flex flex-wrap gap-2 items-center mb-4'>
          <Tag color='blue' className='text-sm'>
            {book.genre}
          </Tag>
          <Tag color='green' className='text-sm'>
            {book.language}
          </Tag>
          <Tag color='orange' className='text-sm'>
            {book.format}
          </Tag>
        </div>

        <div className='flex items-center mb-4'>
          <Rate disabled defaultValue={book.rating || 0} allowHalf />
          <span className='ml-2 text-gray-600'>
            {book.rating ? book.rating.toFixed(1) : 'No ratings yet'}
          </span>
        </div>

        <Divider className='my-4' />

        <div className='grid grid-cols-1 gap-4 mb-6 md:grid-cols-2'>
          <div className='flex items-center'>
            <BookOutlined className='mr-2 text-primary' />
            <span className='text-gray-700'>Publisher: </span>
            <span className='ml-1 font-medium'>{book.publisher}</span>
          </div>
          <div className='flex items-center'>
            <CalendarOutlined className='mr-2 text-primary' />
            <span className='text-gray-700'>Published: </span>
            <span className='ml-1 font-medium'>
              {formatDate(book.publicationDate)}
            </span>
          </div>
          <div className='flex items-center'>
            <TagOutlined className='mr-2 text-primary' />
            <span className='text-gray-700'>ISBN: </span>
            <span className='ml-1 font-medium'>{book.isbn}</span>
          </div>
          <div className='flex items-center'>
            <FileTextOutlined className='mr-2 text-primary' />
            <span className='text-gray-700'>Pages: </span>
            <span className='ml-1 font-medium'>{book.pageCount}</span>
          </div>
        </div>

        <p className='mb-6 text-gray-700'>{book.description}</p>
      </div>

      <div className='mt-auto'>
        <Divider className='my-4' />

        <div className='flex items-center mb-4'>
          <div className='mr-4'>
            {book.discount > 0 ? (
              <div>
                <span className='text-2xl font-bold text-primary'>
                  {formatCurrency(book.discountedPrice)}
                </span>
                <span className='ml-2 text-gray-500 line-through'>
                  {formatCurrency(book.price)}
                </span>
              </div>
            ) : (
              <span className='text-2xl font-bold text-primary'>
                {formatCurrency(book.price)}
              </span>
            )}
          </div>

          <div className='text-sm'>
            {book.stock > 0 ? (
              book.stock <= 5 ? (
                <span className='text-orange-500'>
                  Only {book.stock} left in stock
                </span>
              ) : (
                <span className='text-green-600'>In Stock</span>
              )
            ) : (
              <span className='text-red-500'>Out of Stock</span>
            )}
          </div>
        </div>

        <div className='flex flex-wrap gap-3'>
          <Button
            type='primary'
            size='large'
            icon={<ShoppingCartOutlined />}
            disabled={book.stock === 0}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;

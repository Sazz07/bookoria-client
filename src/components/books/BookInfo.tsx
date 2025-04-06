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

type BookInfoProps = {
  book: TBook;
};

const BookInfo = ({ book }: BookInfoProps) => {
  return (
    <div className='flex flex-col h-full'>
      <div>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>
          {book.title}
        </h1>
        <h2 className='text-xl text-gray-600 mb-4'>by {book.author}</h2>

        <div className='flex flex-wrap items-center gap-2 mb-4'>
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

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
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

        <p className='text-gray-700 mb-6'>{book.description}</p>
      </div>

      <div className='mt-auto'>
        <Divider className='my-4' />

        <div className='flex items-center mb-4'>
          <div className='mr-4'>
            {book.discount > 0 ? (
              <div>
                <span className='text-2xl font-bold text-primary'>
                  ${book.discountedPrice.toFixed(2)}
                </span>
                <span className='ml-2 text-gray-500 line-through'>
                  ${book.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className='text-2xl font-bold text-primary'>
                ${book.price.toFixed(2)}
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
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
import { Typography, Row, Col, Spin, Empty } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useGetBooksQuery } from '../../redux/features/book/book.api';
import BookCard from '../books/BookCard';

const { Title, Text } = Typography;

const FeaturedBooks = () => {
  const { data: booksData, isLoading } = useGetBooksQuery([
    { name: 'featured', value: true },
    { name: 'limit', value: 6 },
  ]);

  return (
    <section>
      <div className='flex flex-col justify-between items-start mb-8 md:flex-row md:items-center'>
        <div className='mb-4 md:mb-0'>
          <Title
            level={2}
            className='!text-2xl md:!text-3xl !font-bold !m-0 !text-primary-dark'
          >
            Featured Books
          </Title>
          <Text className='text-gray-600'>
            Handpicked favorites from our collection
          </Text>
        </div>
        <Link
          to='/books?featured=true'
          className='flex items-center transition-colors text-accent hover:text-accent-dark'
        >
          View All <ArrowRightOutlined className='ml-2' />
        </Link>
      </div>

      {isLoading ? (
        <div className='flex justify-center py-12'>
          <Spin size='large' />
        </div>
      ) : booksData?.data?.length === 0 ? (
        <Empty description='No featured books available' />
      ) : (
        <Row gutter={[24, 24]}>
          {booksData?.data?.map((book) => (
            <Col key={book._id} xs={12} sm={8} md={8} lg={8} xl={4}>
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
      )}
    </section>
  );
};

export default FeaturedBooks;

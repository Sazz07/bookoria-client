import { Typography, Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const showcaseGenres = [
  {
    name: 'Fiction',
    image: '/images/categories/fiction.jpg',
    color: 'bg-blue-500',
  },
  {
    name: 'Mystery',
    image: '/images/categories/mystery.jpg',
    color: 'bg-purple-500',
  },
  {
    name: 'Romance',
    image: '/images/categories/romance.jpg',
    color: 'bg-pink-500',
  },
  {
    name: 'Science Fiction',
    image: '/images/categories/sci-fi.jpg',
    color: 'bg-teal-500',
  },
  {
    name: 'Self-Help',
    image: '/images/categories/self-help.jpg',
    color: 'bg-amber-500',
  },
  {
    name: 'Biography',
    image: '/images/categories/biography.jpg',
    color: 'bg-green-500',
  },
];

const CategoryShowcase = () => {
  return (
    <section>
      <div className='mb-10 text-center'>
        <Title
          level={2}
          className='!text-2xl md:!text-3xl !font-bold !mb-3 !text-primary-dark'
        >
          Browse by Category
        </Title>
        <Text className='block mx-auto max-w-2xl text-gray-600'>
          Discover books in your favorite genres, from thrilling mysteries to
          heartwarming romances
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        {showcaseGenres.map((genre) => (
          <Col key={genre.name} xs={12} sm={8} md={8} lg={4}>
            <Link to={`/books?genre=${encodeURIComponent(genre.name)}`}>
              <Card
                hoverable
                className='text-center h-full overflow-hidden border-0 shadow-md hover:shadow-lg transition-all !p-4'
                cover={
                  <div className={`relative pt-[70%] ${genre.color}`}>
                    <div className='flex absolute inset-0 justify-center items-center'>
                      <img
                        src={genre.image}
                        alt={genre.name}
                        className='object-contain w-16 h-16 opacity-80'
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://placehold.co/100x100/ffffff/000000?text=${genre.name.charAt(
                            0
                          )}`;
                        }}
                      />
                    </div>
                  </div>
                }
              >
                <Title level={5} className='!m-0 !text-sm !font-medium'>
                  {genre.name}
                </Title>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default CategoryShowcase;

import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useGetBooksQuery } from '../../redux/features/book/book.api';
import { TQueryParam } from '../../types';
import {
  biographyCover,
  fictionCover,
  mysteryCover,
  romanceCover,
  scienceFictionCover,
  selfHelpCover,
} from '../../assets/images';

const { Title, Text } = Typography;

const showcaseGenres = [
  {
    name: 'Fiction',
    image: fictionCover,
    color: '#3b82f6',
    count: 0,
  },
  {
    name: 'Mystery',
    image: mysteryCover,
    color: '#8b5cf6',
    count: 0,
  },
  {
    name: 'Romance',
    image: romanceCover,
    color: '#ec4899',
    count: 0,
  },
  {
    name: 'Science Fiction',
    image: scienceFictionCover,
    color: '#14b8a6',
    count: 0,
  },
  {
    name: 'Self-Help',
    image: selfHelpCover,
    color: '#f59e0b',
    count: 0,
  },
  {
    name: 'Biography',
    image: biographyCover,
    color: '#22c55e',
    count: 0,
  },
];

const CategoryShowcase = () => {
  const [genresWithCounts, setGenresWithCounts] = useState(showcaseGenres);
  const [isLoading, setIsLoading] = useState(true);

  const queryParams: TQueryParam[] = [{ name: 'limit', value: 100 }];

  const { data: booksData, isLoading: isBooksLoading } =
    useGetBooksQuery(queryParams);

  useEffect(() => {
    if (!isBooksLoading && booksData?.data) {
      const genreCounts: Record<string, number> = {};

      showcaseGenres.forEach((genre) => {
        genreCounts[genre.name] = 0;
      });

      booksData.data.forEach((book) => {
        if (book.genre && genreCounts[book.genre] !== undefined) {
          genreCounts[book.genre]++;
        }
      });

      const updatedGenres = showcaseGenres.map((genre) => ({
        ...genre,
        count: genreCounts[genre.name] || 0,
      }));

      setGenresWithCounts(updatedGenres);
      setIsLoading(false);
    }
  }, [booksData, isBooksLoading]);

  return (
    <section className='py-8 md:py-16'>
      <div>
        <div className='flex flex-col justify-between mb-10 md:flex-row md:items-end'>
          <div>
            <Title
              level={2}
              className='!text-3xl md:!text-4xl !font-bold !text-primary-dark !mb-3'
            >
              Browse by Category
            </Title>
            <Text className='!block !text-gray-600 !max-w-2xl'>
              Discover books in your favorite genres, from thrilling mysteries
              to heartwarming romances
            </Text>
          </div>
          <Link
            to='/books'
            className='flex items-center mt-4 transition-colors group text-primary md:mt-0 hover:text-secondary'
          >
            <span>View all categories</span>
            <RightOutlined className='ml-1 text-xs transition-transform duration-300 group-hover:translate-x-1' />
          </Link>
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
          {genresWithCounts.map((genre) => (
            <Link
              key={genre.name}
              to={`/books?genre=${encodeURIComponent(genre.name)}`}
              className='overflow-hidden relative bg-white rounded-xl shadow-lg transition-all duration-300 group hover:shadow-xl'
            >
              <div className='aspect-[4/3] relative overflow-hidden'>
                <img
                  src={genre.image}
                  alt={genre.name}
                  className='object-cover absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-110'
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://placehold.co/800x600/ffffff/000000?text=${genre.name}`;
                  }}
                />
                <div className='absolute inset-0 bg-gradient-to-t to-transparent from-black/70' />
              </div>

              <div className='absolute right-0 bottom-0 left-0 p-4 text-white'>
                <h3 className='text-lg font-bold'>{genre.name}</h3>
                <p className='text-sm text-white/80'>
                  {isLoading ? 'Loading...' : `${genre.count} Books`}
                </p>
              </div>

              <div
                className='absolute top-3 right-3 w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-[8] opacity-70'
                style={{ backgroundColor: genre.color }}
              ></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;

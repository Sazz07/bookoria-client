import { useState, useEffect } from 'react';
import { Select, Button, Pagination, Empty, Row, Col, Drawer } from 'antd';
import { FilterOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { useGetBooksQuery } from '../../redux/features/book/book.api';
import { TBook, TQueryParam } from '../../types';
import { bookGenre, sortOptions } from '../../constants/global';
import BookCard from '../../components/books/BookCard';
import FilterSidebar from '../../components/books/FilterSidebar';
import { useSearchParams, useLocation } from 'react-router-dom';
import Loading from '../../components/shared/Loading';

const { Option } = Select;

const AllBooks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('searchTerm') || ''
  );
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    searchParams.get('genre') ? [searchParams.get('genre')!] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get('minPrice')) || 0,
    Number(searchParams.get('maxPrice')) || 10000,
  ]);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || '');
  const [showFeatured, setShowFeatured] = useState(
    searchParams.get('featured') === 'true'
  );
  const [showDiscount, setShowDiscount] = useState(
    searchParams.get('discount') === 'true'
  );
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [limit, setLimit] = useState(Number(searchParams.get('limit')) || 10);

  useEffect(() => {
    const genre = searchParams.get('genre');
    if (genre) {
      if (genre.includes(',')) {
        setSelectedGenres(genre.split(','));
      } else {
        setSelectedGenres([genre]);
      }
    } else {
      setSelectedGenres([]);
    }
  }, [location.search, searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (page > 1) params.set('page', page.toString());
    if (limit !== 10) params.set('limit', limit.toString());
    if (searchTerm) params.set('searchTerm', searchTerm);
    if (sortBy) params.set('sort', sortBy);
    if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString());
    if (priceRange[1] < 10000) params.set('maxPrice', priceRange[1].toString());
    if (selectedGenres.length > 0)
      params.set('genre', selectedGenres.join(','));
    if (showFeatured) params.set('featured', 'true');
    if (showDiscount) params.set('discount', 'true');

    setSearchParams(params);
  }, [
    searchTerm,
    selectedGenres,
    priceRange,
    sortBy,
    showFeatured,
    showDiscount,
    page,
    limit,
    setSearchParams,
  ]);

  const createQueryParams = (): TQueryParam[] => {
    const params: TQueryParam[] = [
      { name: 'page', value: page },
      { name: 'limit', value: limit },
    ];

    if (searchTerm) {
      params.push({ name: 'searchTerm', value: searchTerm });
    }

    if (sortBy) {
      params.push({ name: 'sort', value: sortBy });
    }

    if (priceRange[0] > 0) {
      params.push({ name: 'minPrice', value: priceRange[0] });
    }

    if (priceRange[1] < 10000) {
      params.push({ name: 'maxPrice', value: priceRange[1] });
    }

    if (selectedGenres.length > 0) {
      params.push({ name: 'genre', value: selectedGenres.join(',') });
    }

    if (showFeatured) {
      params.push({ name: 'featured', value: true });
    }

    if (showDiscount) {
      params.push({ name: 'discount', value: true });
    }

    return params;
  };

  const {
    data: booksData,
    isLoading,
    isFetching,
  } = useGetBooksQuery(createQueryParams());

  useEffect(() => {
    setPage(1);
  }, [
    searchTerm,
    selectedGenres,
    priceRange,
    sortBy,
    showFeatured,
    showDiscount,
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (checkedValues: string[]) => {
    setSelectedGenres(checkedValues);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
  };

  const handleMinPriceInput = (value: string) => {
    const numValue = Number(value) || 0;
    setPriceRange([numValue, priceRange[1]]);
  };

  const handleMaxPriceInput = (value: string) => {
    const numValue = Number(value) || 0;
    setPriceRange([priceRange[0], numValue]);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setPage(page);
    if (pageSize) setLimit(pageSize);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedGenres([]);
    setPriceRange([0, 10000]);
    setSortBy('');
    setShowFeatured(false);
    setShowDiscount(false);
    setPage(1);

    setSearchParams(new URLSearchParams());
  };

  return (
    <div className='container px-4 py-8 mx-auto'>
      <h1 className='mb-8 text-3xl font-bold text-primary'>
        Explore Our Books
      </h1>

      <div className='mb-4 lg:hidden'>
        <Button
          type='primary'
          icon={<FilterOutlined />}
          onClick={() => setDrawerVisible(true)}
          className='!w-full'
        >
          Filters
        </Button>
      </div>

      <Drawer
        title='Filter Books'
        placement='left'
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={300}
      >
        <FilterSidebar
          searchTerm={searchTerm}
          priceRange={priceRange}
          selectedGenres={selectedGenres}
          showFeatured={showFeatured}
          showDiscount={showDiscount}
          bookGenre={bookGenre}
          onSearch={handleSearch}
          onPriceChange={handlePriceChange}
          onMinPriceInput={handleMinPriceInput}
          onMaxPriceInput={handleMaxPriceInput}
          onGenreChange={handleGenreChange}
          onFeaturedChange={setShowFeatured}
          onDiscountChange={setShowDiscount}
          onReset={resetFilters}
        />
      </Drawer>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
        <div className='hidden lg:block lg:col-span-1'>
          <div className='sticky top-4 p-6 bg-white rounded-lg shadow-sm'>
            <FilterSidebar
              searchTerm={searchTerm}
              priceRange={priceRange}
              selectedGenres={selectedGenres}
              showFeatured={showFeatured}
              showDiscount={showDiscount}
              bookGenre={bookGenre}
              onSearch={handleSearch}
              onPriceChange={handlePriceChange}
              onMinPriceInput={handleMinPriceInput}
              onMaxPriceInput={handleMaxPriceInput}
              onGenreChange={handleGenreChange}
              onFeaturedChange={setShowFeatured}
              onDiscountChange={setShowDiscount}
              onReset={resetFilters}
            />
          </div>
        </div>

        <div className='lg:col-span-3'>
          <div className='flex flex-col justify-between items-start p-4 mb-6 bg-white rounded-lg shadow-sm sm:flex-row sm:items-center'>
            <div className='flex items-center mb-4 sm:mb-0'>
              <SortAscendingOutlined className='!mr-2' />
              <span className='mr-2 font-medium'>Sort By:</span>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                style={{ width: 180 }}
                placeholder='Select option'
                allowClear
                className='!mr-2'
              >
                {sortOptions.map((item) => (
                  <Option value={item.value}>{item.label}</Option>
                ))}
              </Select>
            </div>

            <div className='text-sm text-gray-600'>
              {booksData?.meta?.total
                ? `Showing ${(page - 1) * limit + 1}-${Math.min(
                    page * limit,
                    booksData.meta.total
                  )} of ${booksData.meta.total} books`
                : 'No books found'}
            </div>
          </div>

          {isLoading || isFetching ? (
            <Loading fullScreen />
          ) : booksData?.data && booksData.data.length > 0 ? (
            <>
              <Row gutter={[12, 20]}>
                {booksData.data.map((book: TBook) => (
                  <Col xs={12} sm={8} md={6} lg={6} key={book._id}>
                    <BookCard book={book} />
                  </Col>
                ))}
              </Row>

              <div className='flex justify-center mt-8'>
                <Pagination
                  current={page}
                  pageSize={limit}
                  total={booksData.meta?.total || 0}
                  onChange={handlePageChange}
                  responsive
                />
              </div>
            </>
          ) : (
            <Empty
              description='No books found matching your criteria'
              className='!p-8 !bg-white !rounded-lg'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBooks;

import { useState, useEffect } from 'react';
import {
  Select,
  Button,
  Pagination,
  Empty,
  Row,
  Col,
  Spin,
  Drawer,
} from 'antd';
import { FilterOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { useGetBooksQuery } from '../../redux/features/book/book.api';
import { TBook, TQueryParam } from '../../types';
import { bookGenre } from '../../constants/global';
import BookCard from '../../components/books/BookCard';
import FilterSidebar from '../../components/books/FilterSidebar';

const { Option } = Select;

const AllBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState('');
  const [showFeatured, setShowFeatured] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

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

    if (priceRange[1] < 1000) {
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
    setPriceRange([0, 1000]);
    setSortBy('');
    setShowFeatured(false);
    setShowDiscount(false);
    setPage(1);
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
          className='w-full'
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
        <div className='hidden p-6 bg-white rounded-lg shadow-sm lg:block lg:col-span-1'>
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

        <div className='lg:col-span-3'>
          <div className='flex flex-col justify-between items-start p-4 mb-6 bg-white rounded-lg shadow-sm sm:flex-row sm:items-center'>
            <div className='flex items-center mb-4 sm:mb-0'>
              <SortAscendingOutlined className='mr-2' />
              <span className='mr-2 font-medium'>Sort By:</span>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                style={{ width: 180 }}
                placeholder='Select option'
              >
                <Option value='price,asc'>Price: Low to High</Option>
                <Option value='price,desc'>Price: High to Low</Option>
                <Option value='title,asc'>Title: A to Z</Option>
                <Option value='title,desc'>Title: Z to A</Option>
                <Option value='createdAt,desc'>Newest First</Option>
                <Option value='createdAt,asc'>Oldest First</Option>
                <Option value='discountedPrice,asc'>
                  Discount: Low to High
                </Option>
                <Option value='discountedPrice,desc'>
                  Discount: High to Low
                </Option>
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
            <div className='flex justify-center items-center h-64'>
              <Spin size='large' />
            </div>
          ) : booksData?.data && booksData.data.length > 0 ? (
            <>
              <Row gutter={[12, 20]}>
                {booksData.data.map((book: TBook) => (
                  <Col xs={12} sm={8} md={6} lg={6} key={book._id}>
                    {/* Remove the onAddToCart prop */}
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
              className='p-8 bg-white rounded-lg'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBooks;

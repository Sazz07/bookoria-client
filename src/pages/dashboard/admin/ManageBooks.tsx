import { useState } from 'react';
import {
  Button,
  Card,
  Input,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
  Pagination,
  Checkbox,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { toast } from 'sonner';
import {
  useCreateBookMutation,
  useDeleteBookMutation,
  useEditBookMutation,
  useGetBooksQuery,
} from '../../../redux/features/book/book.api';
import { FieldValues } from 'react-hook-form';
import BookForm from './components/BookForm';
import PageBreadcrumb from '../../../components/shared/PageBreadcrumb';
import {
  HomeOutlined,
  DashboardOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { TBook, TQueryParam } from '../../../types';
import { bookGenre } from '../../../constants/global';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

const breadcrumbItems = [
  {
    title: 'Home',
    href: '/',
    icon: <HomeOutlined />,
  },
  {
    title: 'Dashboard',
    href: '/dashboard/admin',
    icon: <DashboardOutlined />,
  },
  {
    title: 'Manage Books',
    icon: <BookOutlined />,
  },
];

const ManageBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<TBook | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genreSearchTerm, setGenreSearchTerm] = useState('');

  const createQueryParams = (): TQueryParam[] => {
    const params: TQueryParam[] = [
      { name: 'page', value: page },
      { name: 'limit', value: limit },
    ];

    if (searchTerm) {
      params.push({ name: 'searchTerm', value: searchTerm });
    }

    if (selectedGenres.length > 0) {
      params.push({ name: 'genre', value: selectedGenres.join(',') });
    }

    return params;
  };

  const { data: booksData, isLoading } = useGetBooksQuery(createQueryParams());

  const [createBook, { isLoading: isCreating }] = useCreateBookMutation();
  const [editBook, { isLoading: isEditing }] = useEditBookMutation();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const tableData = booksData?.data?.map(
    ({ _id, title, author, genre, price, stock, coverImage, ...rest }) => ({
      key: _id,
      _id,
      title,
      author,
      genre,
      price,
      stock,
      coverImage,
      ...rest,
    })
  );

  const handleAddBook = async (data: FieldValues) => {
    try {
      const result = await createBook(data).unwrap();
      if (result.success) {
        toast.success('Book added successfully');
        setIsAddModalOpen(false);
      }
    } catch {
      toast.error('Failed to add book');
    }
  };

  const handleEditBook = async (data: FieldValues) => {
    if (!selectedBook) return;

    try {
      const result = await editBook({
        id: selectedBook._id,
        body: data,
      }).unwrap();

      if (result.success) {
        toast.success('Book updated successfully');
        setIsEditModalOpen(false);
        setSelectedBook(null);
      }
    } catch {
      toast.error('Failed to update book');
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      const result = await deleteBook(id).unwrap();
      if (result.success) {
        toast.success('Book deleted successfully');
      }
    } catch {
      toast.error('Failed to delete book');
    }
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setPage(page);
    if (pageSize) setLimit(pageSize);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedBook(null);
  };

  const handleGenreFilter = (genres: string[]) => {
    setSelectedGenres(genres);
    setPage(1);
  };

  const filteredGenres = bookGenre.filter((genre) =>
    genre.toLowerCase().includes(genreSearchTerm.toLowerCase())
  );

  const columns: ColumnsType<TBook> = [
    {
      title: 'Cover',
      key: 'coverImage',
      render: (item: TBook) => (
        <img
          src={item.coverImage || 'https://placehold.co/60x90?text=No+Image'}
          alt='Book Cover'
          style={{ width: 60, height: 90, objectFit: 'cover' }}
        />
      ),
      width: 80,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a: TBook, b: TBook) => a.title.localeCompare(b.title),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      sorter: (a: TBook, b: TBook) => a.author.localeCompare(b.author),
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
      render: (genre: string) => <Tag color='blue'>{genre}</Tag>,
      filterDropdown: ({ clearFilters }) => (
        <div
          style={{
            padding: 8,
            maxHeight: '300px',
            overflow: 'auto',
            width: '250px',
          }}
        >
          <Input
            placeholder='Search genres'
            value={genreSearchTerm}
            onChange={(e) => setGenreSearchTerm(e.target.value)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <div style={{ maxHeight: '200px', overflow: 'auto' }}>
            {filteredGenres.map((genre) => (
              <div key={genre} style={{ marginBottom: 4 }}>
                <Checkbox
                  checked={selectedGenres.includes(genre)}
                  onChange={(e) => {
                    const newSelectedGenres = e.target.checked
                      ? [...selectedGenres, genre]
                      : selectedGenres.filter((g) => g !== genre);
                    setSelectedGenres(newSelectedGenres);
                    handleGenreFilter(newSelectedGenres);
                  }}
                  style={{ width: '100%', padding: '4px 8px' }}
                >
                  {genre}
                </Checkbox>
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 8,
            }}
          >
            <Button
              onClick={() => {
                clearFilters?.();
                setSelectedGenres([]);
                setGenreSearchTerm('');
                handleGenreFilter([]);
              }}
              size='small'
            >
              Reset
            </Button>
          </div>
        </div>
      ),
      filteredValue: selectedGenres,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
      sorter: (a: TBook, b: TBook) => a.price - b.price,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <Tag color={stock > 10 ? 'green' : stock > 0 ? 'orange' : 'red'}>
          {stock}
        </Tag>
      ),
      sorter: (a: TBook, b: TBook) => a.stock - b.stock,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (item: TBook) => (
        <Space size='middle'>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedBook(item);
              setIsEditModalOpen(true);
            }}
          />
          <Popconfirm
            title='Delete this book?'
            description='This action cannot be undone.'
            onConfirm={() => handleDeleteBook(item._id)}
            okText='Yes'
            cancelText='No'
          >
            <Button danger icon={<DeleteOutlined />} loading={isDeleting} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PageBreadcrumb items={breadcrumbItems} />

      <div className='flex justify-between items-center mb-6'>
        <Title level={2} className='!text-accent !my-2'>
          Manage Books
        </Title>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => setIsAddModalOpen(true)}
          size='large'
        >
          Add New Book
        </Button>
      </div>

      <Card className='mb-6'>
        <div className='mb-4'>
          <Input
            placeholder='Search books by title, author, or genre'
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchTerm(e.target.value)}
            size='large'
            allowClear
            className='max-w-md'
          />
        </div>

        <Table
          columns={columns}
          dataSource={tableData}
          loading={isLoading}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />

        <div className='!flex !justify-center !mt-8'>
          <Pagination
            current={page}
            pageSize={limit}
            total={booksData?.meta?.total || 0}
            onChange={handlePageChange}
            showSizeChanger
            pageSizeOptions={['10', '20', '50']}
            showTotal={(total) => `Total ${total} books`}
            responsive
          />
        </div>
      </Card>

      <BookForm
        isModalOpen={isAddModalOpen}
        setIsModalOpen={setIsAddModalOpen}
        onSubmit={handleAddBook}
        title='Add New Book'
        isLoading={isCreating}
      />

      {selectedBook && (
        <BookForm
          isModalOpen={isEditModalOpen}
          setIsModalOpen={handleCloseEditModal}
          onSubmit={handleEditBook}
          initialValues={selectedBook}
          title='Edit Book'
          isLoading={isEditing}
        />
      )}
    </div>
  );
};

export default ManageBooks;

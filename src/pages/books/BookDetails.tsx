import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Empty, Image, Tag } from 'antd';
import { HomeOutlined, ReadOutlined } from '@ant-design/icons';
import { useGetBookQuery } from '../../redux/features/book/book.api';
import {
  useGetReviewsByBookQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
} from '../../redux/features/review/review.api';
import { useAppSelector } from '../../redux/hook';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import { toast } from 'sonner';
import { TQueryParam, TReview } from '../../types';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import BookInfo from '../../components/books/BookInfo';
import ReviewSummary from '../../components/reviews/ReviewSummary';
import ReviewsList from '../../components/reviews/ReviewsList';
import EditReviewModal from '../../components/reviews/EditReviewModal';
import Loading from '../../components/shared/Loading';
import PageBreadcrumb from '../../components/shared/PageBreadcrumb';
import { formatDate } from '../../utils/dateUtils';
import { no_cover_image } from '../../assets/images';

const BookDetails = () => {
  const { bookId } = useParams();
  const [reviewPage, setReviewPage] = useState(1);
  const [reviewRating, setReviewRating] = useState(0);
  const [showRatingError, setShowRatingError] = useState(false);
  const currentUser = useAppSelector(selectCurrentUser);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editReviewId, setEditReviewId] = useState('');
  const [editReviewRating, setEditReviewRating] = useState(0);
  const [editReviewComment, setEditReviewComment] = useState('');
  const [showEditRatingError, setShowEditRatingError] = useState(false);
  const [userHasReviewed, setUserHasReviewed] = useState(false);

  const { data: bookData, isLoading: bookLoading } = useGetBookQuery(bookId);
  const book = bookData?.data;

  const getStockStatusColor = (stock: number) => {
    if (stock === 0) return 'red';
    if (stock <= 5) return 'orange';
    return 'green';
  };

  const getStockStatusText = (stock: number) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <= 5) return `Low Stock: ${stock} remaining`;
    return `In Stock: ${stock} available`;
  };

  const reviewQueryParams: TQueryParam[] = [
    { name: 'page', value: reviewPage },
    { name: 'limit', value: 4 },
  ];

  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    refetch: refetchReviews,
  } = useGetReviewsByBookQuery(
    {
      bookId,
      args: reviewQueryParams,
    },
    { skip: bookLoading }
  );

  useEffect(() => {
    if (currentUser && reviewsData?.data) {
      const hasReviewOnCurrentPage = reviewsData.data.some(
        (review) => review.user?._id === currentUser?.userId
      );

      if (hasReviewOnCurrentPage) {
        setUserHasReviewed(true);
      } else if (reviewPage === 1) {
        setUserHasReviewed(false);
      }
    }
  }, [reviewsData, currentUser, reviewPage]);

  const [createReview, { isLoading: isSubmittingReview }] =
    useCreateReviewMutation();

  const [updateReview, { isLoading: isUpdatingReview }] =
    useUpdateReviewMutation();

  const hasUserReviewed = () => {
    return userHasReviewed;
  };

  const handleReviewSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!currentUser) {
      toast.error('Please login to submit a review');
      return;
    }

    if (reviewRating === 0) {
      setShowRatingError(true);
      toast.error('Please select a rating');
      return;
    }

    try {
      await createReview({
        bookId: bookId as string,
        body: {
          rating: reviewRating,
          comment: data.comment,
        },
      }).unwrap();

      toast.success('Review submitted successfully');
      setReviewRating(0);
      setShowRatingError(false);
      refetchReviews();
    } catch {
      toast.error('Failed to submit review');
    }
  };

  const handleEditReview = (review: TReview) => {
    setEditReviewId(review._id);
    setEditReviewRating(review.rating);
    setEditReviewComment(review.comment);
    setShowEditRatingError(false);
    setIsEditModalVisible(true);
  };

  const handleUpdateReview = async () => {
    if (editReviewRating === 0) {
      setShowEditRatingError(true);
      toast.error('Please select a rating');
      return;
    }

    if (!editReviewComment.trim()) {
      toast.error('Please enter your review');
      return;
    }

    try {
      await updateReview({
        id: editReviewId,
        body: {
          rating: editReviewRating,
          comment: editReviewComment.trim(),
        },
      }).unwrap();

      toast.success('Review updated successfully');
      setIsEditModalVisible(false);
      setShowEditRatingError(false);
      refetchReviews();
    } catch {
      toast.error('Failed to update review');
    }
  };

  if (bookLoading) {
    return <Loading fullScreen />;
  }

  if (!book) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Empty description='Book not found' />
      </div>
    );
  }

  return (
    <div className='container px-4 py-8 mx-auto'>
      <PageBreadcrumb
        items={[
          {
            title: 'Home',
            href: '/',
            icon: <HomeOutlined />,
          },
          {
            title: 'Books',
            href: '/books',
            icon: <ReadOutlined />,
          },
          {
            title: book.title,
          },
        ]}
      />

      {/* Book Details Section */}
      <div className='overflow-hidden mt-4 bg-white rounded-lg shadow-md'>
        <Row gutter={[24, 24]} className='p-6'>
          {/* Book Cover Image */}
          <Col
            xs={24}
            sm={24}
            md={10}
            lg={8}
            className='flex justify-center items-center h-full'
          >
            <div className='flex relative justify-center w-full h-full'>
              <Image
                src={book.coverImage || no_cover_image}
                alt={book.title}
                className='!rounded-md !shadow-lg !w-full'
                style={{
                  objectFit: 'cover',
                  height: '100%',
                  minHeight: '400px',
                  maxHeight: '600px',
                  width: '100%',
                }}
                fallback={no_cover_image}
                preview={{
                  mask: 'Preview',
                }}
                rootClassName='!w-full'
                wrapperClassName='!w-full'
              />
              {book.discount > 0 && (
                <div className='absolute top-0 right-0 z-10 px-2 py-1 font-bold text-white bg-red-500 rounded-bl-lg'>
                  {book.discount}% OFF
                </div>
              )}
              {book.featured && (
                <div className='absolute top-0 left-0 z-10 px-2 py-1 font-bold text-white bg-amber-500 rounded-br-lg'>
                  Featured
                </div>
              )}
              <div className='absolute bottom-0 left-0 z-10 px-2 py-1 m-2'>
                <Tag
                  color={getStockStatusColor(book.stock)}
                  className='!text-sm !font-medium !px-3 !py-1'
                >
                  {getStockStatusText(book.stock)}
                </Tag>
              </div>
            </div>
          </Col>

          {/* Book Information */}
          <Col xs={24} sm={24} md={14} lg={16}>
            <BookInfo book={book} />
          </Col>
        </Row>
      </div>

      {/* Reviews Section*/}
      <div className='mt-10'>
        <div className='flex items-center mb-8'>
          <h2 className='text-2xl font-bold text-primary'>Customer Reviews</h2>
        </div>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {/* Review Summary */}
          <div className='lg:col-span-1'>
            <ReviewSummary
              rating={book.rating || 0}
              totalReviews={reviewsData?.meta?.total || 0}
              currentUser={currentUser}
              hasUserReviewed={hasUserReviewed()}
              reviewRating={reviewRating}
              setReviewRating={setReviewRating}
              showRatingError={showRatingError}
              isSubmittingReview={isSubmittingReview}
              onSubmit={handleReviewSubmit}
            />
          </div>

          {/* Reviews List */}
          <div className='lg:col-span-2'>
            <ReviewsList
              reviewsLoading={reviewsLoading}
              reviewsData={reviewsData}
              reviewPage={reviewPage}
              setReviewPage={setReviewPage}
              currentUserId={currentUser?.userId}
              onEditReview={handleEditReview}
              formatDate={formatDate}
            />
          </div>
        </div>
      </div>

      {/* Edit Review Modal */}
      <EditReviewModal
        isVisible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        editReviewRating={editReviewRating}
        setEditReviewRating={setEditReviewRating}
        editReviewComment={editReviewComment}
        setEditReviewComment={setEditReviewComment}
        showEditRatingError={showEditRatingError}
        isUpdatingReview={isUpdatingReview}
        onUpdate={handleUpdateReview}
      />
    </div>
  );
};

export default BookDetails;

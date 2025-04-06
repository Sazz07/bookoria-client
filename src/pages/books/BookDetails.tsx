import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Spin, Empty, Breadcrumb } from 'antd';
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (bookLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spin size='large' />
      </div>
    );
  }

  if (!book) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Empty description='Book not found' />
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <Breadcrumb style={{ marginBottom: '16px' }}>
        <Breadcrumb.Item href='/'>
          <HomeOutlined /> Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href='/books'>
          <ReadOutlined /> Books
        </Breadcrumb.Item>
        <Breadcrumb.Item>{book.title}</Breadcrumb.Item>
      </Breadcrumb>

      {/* Book Details Section */}
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <Row gutter={[24, 24]} className='p-6'>
          {/* Book Cover Image */}
          <Col xs={24} sm={24} md={10} lg={8} className='flex justify-center'>
            <div className='relative w-full max-w-[300px]'>
              <img
                src={
                  book.coverImage ||
                  'https://placehold.co/300x450/e2e8f0/1e293b?text=No+Image'
                }
                alt={book.title}
                className='w-full h-auto object-cover rounded-md shadow-lg'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    'https://placehold.co/300x450/e2e8f0/1e293b?text=No+Image';
                }}
              />
              {book.discount > 0 && (
                <div className='absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-bl-lg font-bold'>
                  {book.discount}% OFF
                </div>
              )}
              {book.featured && (
                <div className='absolute top-0 left-0 bg-amber-500 text-white px-2 py-1 rounded-br-lg font-bold'>
                  Featured
                </div>
              )}
            </div>
          </Col>

          {/* Book Information */}
          <Col xs={24} sm={24} md={14} lg={16}>
            <BookInfo book={book} formatDate={formatDate} />
          </Col>
        </Row>
      </div>

      {/* Reviews Section*/}
      <div className='mt-10'>
        <div className='flex items-center mb-8'>
          <h2 className='text-2xl font-bold text-primary'>Customer Reviews</h2>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
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

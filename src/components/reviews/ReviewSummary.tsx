import { Button, Divider, Rate } from 'antd';
import { Link } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import { FieldValues, SubmitHandler } from 'react-hook-form';

type ReviewSummaryProps = {
  rating: number;
  totalReviews: number;
  currentUser: { userId: string } | null;
  hasUserReviewed: boolean;
  reviewRating: number;
  setReviewRating: (rating: number) => void;
  showRatingError: boolean;
  isSubmittingReview: boolean;
  onSubmit: SubmitHandler<FieldValues>;
};

const ReviewSummary = ({
  rating,
  totalReviews,
  currentUser,
  hasUserReviewed,
  reviewRating,
  setReviewRating,
  showRatingError,
  isSubmittingReview,
  onSubmit,
}: ReviewSummaryProps) => {
  return (
    <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-6'>
      <div className='flex items-center mb-6'>
        <div className='mr-4'>
          <span className='text-5xl font-bold text-primary'>
            {rating ? rating.toFixed(1) : '0.0'}
          </span>
        </div>
        <div>
          <Rate disabled allowHalf value={rating || 0} />
          <div className='text-sm text-gray-500 mt-1'>
            Based on {totalReviews} reviews
          </div>
        </div>
      </div>

      <Divider className='my-4' />

      {/* Write a review section */}
      {currentUser ? (
        hasUserReviewed ? (
          <div className='p-5 bg-blue-50 rounded-xl border border-blue-100'>
            <p className='text-center text-gray-700'>
              You have already reviewed this book. Thank you for your feedback!
            </p>
          </div>
        ) : (
          <ReviewForm
            reviewRating={reviewRating}
            setReviewRating={setReviewRating}
            showRatingError={showRatingError}
            isSubmittingReview={isSubmittingReview}
            onSubmit={onSubmit}
          />
        )
      ) : (
        <div className='p-6 bg-gray-50 rounded-xl text-center border border-gray-200'>
          <p className='mb-4 text-gray-700'>Please sign in to write a review</p>
          <Link to='/login'>
            <Button
              type='primary'
              className='!rounded-lg !h-10 !px-6 !font-medium'
            >
              Sign In
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ReviewSummary;
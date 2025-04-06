import { Button, Rate } from 'antd';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AppForm from '../form/AppForm';
import AppTextArea from '../form/AppTextArea';

const reviewSchema = z.object({
  comment: z.string().min(1, 'Review is required'),
});

type ReviewFormProps = {
  reviewRating: number;
  setReviewRating: (rating: number) => void;
  showRatingError: boolean;
  isSubmittingReview: boolean;
  onSubmit: SubmitHandler<FieldValues>;
};

const ReviewForm = ({
  reviewRating,
  setReviewRating,
  showRatingError,
  isSubmittingReview,
  onSubmit,
}: ReviewFormProps) => {
  return (
    <div>
      <h3 className='text-lg font-semibold mb-4'>Write a Review</h3>
      <div className='mb-4'>
        <span className='block mb-2 font-medium'>Your Rating</span>
        <Rate
          value={reviewRating}
          onChange={setReviewRating}
          className='text-amber-500'
        />
        {showRatingError && reviewRating === 0 && (
          <div className='mt-1'>
            <small style={{ color: 'red' }}>Please select a rating</small>
          </div>
        )}
      </div>
      <AppForm onSubmit={onSubmit} resolver={zodResolver(reviewSchema)}>
        <AppTextArea
          name='comment'
          placeholder='Share your thoughts about this book...'
          rows={4}
        />
        <Button
          type='primary'
          htmlType='submit'
          loading={isSubmittingReview}
          className='!rounded-lg !h-10 !px-6 !font-medium w-full'
        >
          Submit Review
        </Button>
      </AppForm>
    </div>
  );
};

export default ReviewForm;
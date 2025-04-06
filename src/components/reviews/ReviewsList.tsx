import { Empty, Pagination } from 'antd';
import { TReview, TMeta } from '../../types';
import ReviewCard from './ReviewCard';
import Loading from '../shared/Loading';

type ReviewsListProps = {
  reviewsLoading: boolean;
  reviewsData:
    | {
        data: TReview[] | undefined;
        meta?: TMeta;
      }
    | undefined;
  reviewPage: number;
  setReviewPage: (page: number) => void;
  currentUserId?: string;
  onEditReview: (review: TReview) => void;
  formatDate: (date: string) => string;
};

const ReviewsList = ({
  reviewsLoading,
  reviewsData,
  reviewPage,
  setReviewPage,
  currentUserId,
  onEditReview,
  formatDate,
}: ReviewsListProps) => {
  if (reviewsLoading) {
    return <Loading />;
  }

  if (!reviewsData?.data || reviewsData.data.length === 0) {
    return (
      <div className='bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100'>
        <Empty
          description={
            <span className='text-gray-500 text-lg'>
              No reviews yet. Be the first to review this book!
            </span>
          }
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          className='my-8'
        />
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
      {reviewsData.data.map((review) => (
        <ReviewCard
          key={review._id}
          review={review}
          currentUserId={currentUserId}
          onEditReview={onEditReview}
          formatDate={formatDate}
        />
      ))}

      {/* Pagination */}
      {reviewsData.meta && reviewsData.meta.totalPage > 1 && (
        <div className='col-span-1 xl:col-span-2 flex justify-center mt-8'>
          <Pagination
            current={reviewPage}
            total={reviewsData.meta.total}
            pageSize={4}
            onChange={(page) => setReviewPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewsList;

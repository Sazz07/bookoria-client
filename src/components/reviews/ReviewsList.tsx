import { Empty, Pagination } from 'antd';
import { TReview, TMeta, TUser } from '../../types';
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
  currentUser?: TUser | null;
  onEditReview: (review: TReview) => void;
  formatDate: (date: string) => string;
};

const ReviewsList = ({
  reviewsLoading,
  reviewsData,
  reviewPage,
  setReviewPage,
  currentUser,
  onEditReview,
  formatDate,
}: ReviewsListProps) => {
  if (reviewsLoading) {
    return <Loading />;
  }

  if (!reviewsData?.data || reviewsData.data.length === 0) {
    return (
      <div className='p-8 text-center bg-white rounded-xl border border-gray-100 shadow-lg'>
        <Empty
          description={
            <span className='text-lg text-gray-500'>No reviews yet!</span>
          }
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          className='!my-8'
        />
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-6 xl:grid-cols-2'>
      {reviewsData.data.map((review) => (
        <ReviewCard
          key={review._id}
          review={review}
          currentUserId={currentUser?.userId}
          onEditReview={onEditReview}
          formatDate={formatDate}
        />
      ))}

      {/* Pagination */}
      {reviewsData.meta && reviewsData.meta.totalPage > 1 && (
        <div className='flex col-span-1 justify-center mt-8 xl:col-span-2'>
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

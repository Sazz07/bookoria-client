import { Avatar, Button, Rate } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { TReview } from '../../types';

type ReviewCardProps = {
  review: TReview;
  currentUserId?: string;
  onEditReview: (review: TReview) => void;
  formatDate: (date: string) => string;
};

const ReviewCard = ({
  review,
  currentUserId,
  onEditReview,
  formatDate,
}: ReviewCardProps) => {
  return (
    <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100 transition-all hover:shadow-xl'>
      <div className='flex items-start gap-2'>
        <Avatar
          size={48}
          icon={<UserOutlined />}
          src={review.user?.image}
          className='mr-4'
        />
        <div className='flex-1'>
          <div className='flex justify-between items-start'>
            <div>
              <h4 className='text-lg font-medium mb-1'>
                {review.user?.fullName}
              </h4>
              <div className='flex items-center'>
                <Rate disabled value={review.rating} className='text-sm' />
                <span className='ml-2 text-gray-500 text-sm'>
                  {formatDate(review.createdAt)}
                </span>
              </div>
            </div>
            {currentUserId && review.user?._id === currentUserId && (
              <Button
                type='text'
                icon={<EditOutlined />}
                onClick={() => onEditReview(review)}
                className='!text-accent hover:!text-accent-dark'
              >
                Edit
              </Button>
            )}
          </div>
          <p className='mt-4 text-gray-700 leading-relaxed'>{review?.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
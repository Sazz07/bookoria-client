import { Button, Input, Modal, Rate } from 'antd';

type EditReviewModalProps = {
  isVisible: boolean;
  onCancel: () => void;
  editReviewRating: number;
  setEditReviewRating: (rating: number) => void;
  editReviewComment: string;
  setEditReviewComment: (comment: string) => void;
  showEditRatingError: boolean;
  isUpdatingReview: boolean;
  onUpdate: () => void;
};

const EditReviewModal = ({
  isVisible,
  onCancel,
  editReviewRating,
  setEditReviewRating,
  editReviewComment,
  setEditReviewComment,
  showEditRatingError,
  isUpdatingReview,
  onUpdate,
}: EditReviewModalProps) => {
  return (
    <Modal
      title={<div className='text-xl font-medium'>Edit Your Review</div>}
      open={isVisible}
      onCancel={onCancel}
      width={600}
      footer={[
        <Button
          key='cancel'
          onClick={onCancel}
          className='!rounded-lg !h-10 !px-6'
        >
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          loading={isUpdatingReview}
          onClick={onUpdate}
          className='!rounded-lg !h-10 !px-6 !font-medium'
        >
          Update Review
        </Button>,
      ]}
    >
      <div className='mb-6 mt-4'>
        <h4 className='mb-3 font-medium'>Your Rating</h4>
        <Rate
          value={editReviewRating}
          onChange={setEditReviewRating}
          className='text-amber-500 text-2xl'
        />
        {showEditRatingError && editReviewRating === 0 && (
          <div className='mt-2'>
            <small style={{ color: 'red' }}>Please select a rating</small>
          </div>
        )}
      </div>
      <div>
        <h4 className='mb-3 font-medium'>Your Review</h4>
        <Input.TextArea
          value={editReviewComment}
          onChange={(e) => setEditReviewComment(e.target.value)}
          rows={5}
          placeholder='Share your thoughts about this book...'
          className='rounded-lg'
        />
        {!editReviewComment && (
          <div className='mt-2'>
            <small style={{ color: 'red' }}>Review is required</small>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EditReviewModal;
import { Card, Typography, Button } from 'antd';
import AppForm from '../../../../components/form/AppForm';
import AppInput from '../../../../components/form/AppInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import ImageUpload, {
  ImageUploadRef,
} from '../../../../components/form/ImageUpload';
import { profileSchema } from '../../../../schemas/profile.schema';
import { TProfile } from '../../../../types';

const { Title } = Typography;

type ProfileInformationTabProps = {
  profile: TProfile | null;
  imageUploadRef: React.RefObject<ImageUploadRef | null>;
  handleImageChange: (newImageUrl: string | null, file?: File) => void;
  handleProfileUpdate: SubmitHandler<FieldValues>;
  isUpdating: boolean;
};

const ProfileInformationTab = ({
  profile,
  imageUploadRef,
  handleImageChange,
  handleProfileUpdate,
  isUpdating,
}: ProfileInformationTabProps) => {
  return (
    <Card className='!mb-6'>
      <div className='!flex !flex-col md:!flex-row !gap-8'>
        <div className='!mb-6 md:!mb-0 !flex !flex-col !items-center'>
          <ImageUpload
            initialImage={profile?.image}
            onImageChange={handleImageChange}
            width={120}
            height={120}
            ref={imageUploadRef}
          />
        </div>

        <div className='!flex-1'>
          <Title level={4} className='!mb-4'>
            Personal Information
          </Title>

          <AppForm
            key={`profile-form-${profile?.name.firstName}-${profile?.name.lastName}`}
            onSubmit={handleProfileUpdate}
            resolver={zodResolver(profileSchema)}
            defaultValues={{
              firstName: profile?.name.firstName || '',
              middleName: profile?.name.middleName || '',
              lastName: profile?.name.lastName || '',
            }}
          >
            <div className='!grid !grid-cols-1 md:!grid-cols-2 !gap-4'>
              <AppInput
                type='text'
                name='firstName'
                label='First Name'
                placeholder='Enter your first name'
                disabled={isUpdating}
              />

              <AppInput
                type='text'
                name='middleName'
                label='Middle Name (Optional)'
                placeholder='Enter your middle name'
                disabled={isUpdating}
              />
            </div>

            <AppInput
              type='text'
              name='lastName'
              label='Last Name'
              placeholder='Enter your last name'
              disabled={isUpdating}
            />

            <div className='!mt-6'>
              <Button
                type='primary'
                htmlType='submit'
                loading={isUpdating}
                size='large'
              >
                Save Changes
              </Button>
            </div>
          </AppForm>
        </div>
      </div>
    </Card>
  );
};

export default ProfileInformationTab;

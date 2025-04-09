import { Card, Typography, Button, Divider } from 'antd';
import AppForm from '../../../../components/form/AppForm';
import AppInput from '../../../../components/form/AppInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { passwordSchema } from '../../../../schemas/auth.schema';

const { Title, Text } = Typography;

type ChangePasswordTabProps = {
  handlePasswordChange: SubmitHandler<FieldValues>;
  isChangingPassword: boolean;
};

const ChangePasswordTab = ({
  handlePasswordChange,
  isChangingPassword,
}: ChangePasswordTabProps) => {
  return (
    <Card>
      <Title level={4} className='!mb-4'>
        Change Password
      </Title>
      <Text type='secondary' className='!block !mb-6'>
        Ensure your account remains secure by creating a strong
        password that you don't use for other websites.
      </Text>
      <Divider />

      <AppForm
        onSubmit={handlePasswordChange}
        resolver={zodResolver(passwordSchema)}
      >
        <AppInput
          type='password'
          name='oldPassword'
          label='Current Password'
          placeholder='Enter your current password'
          disabled={isChangingPassword}
        />

        <AppInput
          type='password'
          name='newPassword'
          label='New Password'
          placeholder='Enter your new password'
          disabled={isChangingPassword}
        />

        <AppInput
          type='password'
          name='confirmPassword'
          label='Confirm New Password'
          placeholder='Confirm your new password'
          disabled={isChangingPassword}
        />

        <div className='!mt-6'>
          <Button
            type='primary'
            htmlType='submit'
            loading={isChangingPassword}
            size='large'
          >
            Update Password
          </Button>
        </div>
      </AppForm>
    </Card>
  );
};

export default ChangePasswordTab;
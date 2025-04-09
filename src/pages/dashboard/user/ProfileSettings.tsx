import { useRef, useState } from 'react';
import { Tabs, Typography } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  HomeOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import {
  logout,
  selectUserProfile,
  setProfile,
} from '../../../redux/features/auth/authSlice';
import { useEditMyProfileMutation, useGetMyProfileQuery } from '../../../redux/features/profile/profile.api';
import PageBreadcrumb from '../../../components/shared/PageBreadcrumb';
import { toast } from 'sonner';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { ImageUploadRef } from '../../../components/form/ImageUpload';
import { useChangePasswordMutation } from '../../../redux/features/auth/auth.api';
import { useNavigate } from 'react-router-dom';
import ProfileInformationTab from './components/ProfileInformationTab';
import ChangePasswordTab from './components/ChangePasswordTab';

const { Title } = Typography;

const breadcrumbItems = [
  {
    title: 'Home',
    href: '/',
    icon: <HomeOutlined />,
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardOutlined />,
  },
  {
    title: 'Profile Settings',
  },
];

const ProfileSettings = () => {
  const profile = useAppSelector(selectUserProfile);
  const [editProfile, { isLoading: isUpdating }] = useEditMyProfileMutation();
  const { refetch } = useGetMyProfileQuery(undefined, {
    skip: !profile,
  });
  const [imageUrl, setImageUrl] = useState<string | undefined>(profile?.image);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState('1');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const imageUploadRef = useRef<ImageUploadRef>(null);

  const handleProfileUpdate: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Updating profile...');

    try {
      let finalImageUrl = imageUrl;

      if (imageFile && imageUploadRef.current) {
        const cloudinaryUrl = await imageUploadRef.current.uploadToCloud();
        if (cloudinaryUrl) {
          finalImageUrl = cloudinaryUrl;
        } else {
          console.warn('Using local preview as Cloudinary upload failed');
        }
      }

      const payload = {
        name: {
          firstName: data.firstName,
          middleName: data.middleName || '',
          lastName: data.lastName,
        },
        image: finalImageUrl,
      };

      const result = await editProfile(payload).unwrap();

      if (result.success) {
        const refreshedData = await refetch().unwrap();

        if (refreshedData) {
          dispatch(setProfile(refreshedData.data));
        }
      }

      toast.success('Profile updated successfully', {
        id: toastId,
        duration: 2000,
      });
    } catch {
      toast.error('Failed to update profile', {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const handleImageChange = (newImageUrl: string | null, file?: File) => {
    setImageUrl(newImageUrl || undefined);
    setImageFile(file || null);
  };

  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const handlePasswordChange: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Changing password...');

    try {
      const result = await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();

      if (result.success) {
        toast.success('Password changed successfully', {
          id: toastId,
          duration: 2000,
        });

        dispatch(logout());
        navigate('/login');
      } else {
        toast.error(result.message || 'Failed to change password', {
          id: toastId,
          duration: 2000,
        });
      }
    } catch {
      toast.error('Failed to change password', {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className='!profile-settings-container'>
      <PageBreadcrumb items={breadcrumbItems} />

      <Title level={2} className='!my-4'>
        Profile Settings
      </Title>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className='!profile-tabs'
        items={[
          {
            key: '1',
            label: (
              <span>
                <UserOutlined /> Profile Information
              </span>
            ),
            children: (
              <ProfileInformationTab
                profile={profile}
                imageUploadRef={imageUploadRef}
                handleImageChange={handleImageChange}
                handleProfileUpdate={handleProfileUpdate}
                isUpdating={isUpdating}
              />
            ),
          },
          {
            key: '2',
            label: (
              <span>
                <LockOutlined /> Change Password
              </span>
            ),
            children: (
              <ChangePasswordTab
                handlePasswordChange={handlePasswordChange}
                isChangingPassword={isChangingPassword}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default ProfileSettings;

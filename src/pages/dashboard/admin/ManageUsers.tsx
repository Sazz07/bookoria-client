import { useState } from 'react';
import {
  Button,
  Card,
  Input,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
  Pagination,
  Avatar,
  Modal,
} from 'antd';
import {
  DeleteOutlined,
  SearchOutlined,
  LockOutlined,
  UnlockOutlined,
  UserOutlined,
  HomeOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { toast } from 'sonner';
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useBlockUserMutation,
  useDeleteUserMutation,
} from '../../../redux/features/admin/adminUserManagement.api';
import { TUserData, TQueryParam } from '../../../types';
import PageBreadcrumb from '../../../components/shared/PageBreadcrumb';
import { formatDate } from '../../../utils/dateUtils';
import { Select } from 'antd';
import { ROLES } from '../../../constants/global';

const { Title, Text } = Typography;

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
    title: 'Manage Users',
    icon: <UserOutlined />,
  },
];

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [, setSelectedUser] = useState<TUserData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const createQueryParams = (): TQueryParam[] => {
    const params: TQueryParam[] = [
      { name: 'page', value: page },
      { name: 'limit', value: limit },
    ];

    if (searchTerm) {
      params.push({ name: 'searchTerm', value: searchTerm });
    }

    return params;
  };

  const { data: usersData, isLoading } = useGetAllUsersQuery(
    createQueryParams()
  );
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handlePageChange = (page: number, pageSize?: number) => {
    setPage(page);
    if (pageSize) setLimit(pageSize);
  };

  const handleBlockUser = async (id: string, isCurrentlyBlocked: boolean) => {
    try {
      const result = await blockUser(id).unwrap();
      if (result.success) {
        toast.success(
          `User ${isCurrentlyBlocked ? 'unblocked' : 'blocked'} successfully`
        );
      }
    } catch {
      toast.error(`Failed to ${isCurrentlyBlocked ? 'unblock' : 'block'} user`);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const result = await deleteUser(id).unwrap();
      if (result.success) {
        toast.success('User deleted successfully');
      }
    } catch {
      toast.error('Failed to delete user');
    }
  };

  const tableData: TUserData[] | undefined = usersData?.data?.map((user) => ({
    ...user,
    key: user.id,
  }));

  const handleRoleChange = async (
    newRole: string,
    userId: string,
    currentRole: string
  ) => {
    if (currentRole === ROLES.ADMIN && newRole === ROLES.USER) {
      toast.error('Admin role cannot be downgraded to user');
      return;
    }

    try {
      const result = await updateUser({
        id: userId,
        body: { role: newRole },
      }).unwrap();

      if (result.success) {
        toast.success('User role updated successfully');
      }
    } catch {
      toast.error('Failed to update user role');
    }
  };

  const columns = [
    {
      title: 'User',
      key: 'user',
      render: (item: TUserData) => (
        <div className='flex gap-1 items-center'>
          <Avatar
            src={item?.image}
            icon={!item?.image && <UserOutlined />}
            size={40}
            className='mr-3'
          />
          <div>
            <div className='font-medium'>{item?.fullName}</div>
            <div className='text-sm text-gray-500'>{item?.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string, item: TUserData) => (
        <div>
          <Select
            value={role}
            style={{ width: 120 }}
            onChange={(newRole) => handleRoleChange(newRole, item.id, role)}
            disabled={isUpdating || role === 'admin'}
            options={[
              { value: 'user', label: 'USER' },
              { value: 'admin', label: 'ADMIN' },
            ]}
          />
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isBlocked',
      key: 'isBlocked',
      render: (isBlocked: boolean) => (
        <Tag color={isBlocked ? 'red' : 'green'}>
          {isBlocked ? 'BLOCKED' : 'ACTIVE'}
        </Tag>
      ),
    },
    {
      title: 'Joined',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (item: TUserData) => (
        <Space size='middle'>
          <Button
            icon={item?.isBlocked ? <UnlockOutlined /> : <LockOutlined />}
            onClick={() => handleBlockUser(item?.id, item?.isBlocked)}
            loading={isBlocking}
          />
          <Popconfirm
            title='Delete this user?'
            description='This action cannot be undone.'
            onConfirm={() => handleDeleteUser(item?.id)}
            okText='Yes'
            cancelText='No'
          >
            <Button danger icon={<DeleteOutlined />} loading={isDeleting} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PageBreadcrumb items={breadcrumbItems} />

      <div className='flex justify-between items-center mb-6'>
        <Title level={2} className='!text-accent'>
          Manage Users
        </Title>
      </div>

      <Card className='!mb-6'>
        <div className='mb-4'>
          <Input
            placeholder='Search users by name or email'
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchTerm(e.target.value)}
            size='large'
            allowClear
            className='!max-w-md'
          />
        </div>

        <Table
          columns={columns}
          dataSource={tableData}
          loading={isLoading}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />

        <div className='flex justify-center mt-8'>
          <Pagination
            current={page}
            pageSize={limit}
            total={usersData?.meta?.total || 0}
            onChange={handlePageChange}
            showSizeChanger
            pageSizeOptions={['10', '20', '50']}
            showTotal={(total) => `Total ${total} users`}
            responsive
          />
        </div>
      </Card>

      <Modal
        title='Edit User'
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        footer={null}
      >
        <div>
          <Text>Edit user functionality will be implemented here.</Text>
          <div className='flex justify-end mt-4'>
            <Button
              type='primary'
              loading={isUpdating}
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedUser(null);
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageUsers;

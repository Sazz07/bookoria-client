import { useState } from 'react';
import { Card, Input, Typography, Pagination } from 'antd';
import {
  SearchOutlined,
  HomeOutlined,
  DashboardOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { toast } from 'sonner';
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} from '../../../redux/features/order/order.api';
import { TOrder, TQueryParam } from '../../../types';
import PageBreadcrumb from '../../../components/shared/PageBreadcrumb';
import OrderTable from './components/OrderTable';
import OrderDetailsDrawer from './components/OrderDetailsDrawer';

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
    title: 'Manage Orders',
    icon: <ShoppingOutlined />,
  },
];

const ManageOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const { data: ordersData, isLoading } = useGetAllOrdersQuery(
    createQueryParams()
  );
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  const tableData = ordersData?.data?.map((order) => ({
    ...order,
    key: order._id,
  }));

  const handlePageChange = (page: number, pageSize?: number) => {
    setPage(page);
    if (pageSize) setLimit(pageSize);
  };

  const handleStatusChange = async (newStatus: string, orderId: string) => {
    try {
      const result = await updateOrderStatus({
        id: orderId,
        body: { status: newStatus },
      }).unwrap();

      if (result.success) {
        toast.success('Order status updated successfully');
      }
    } catch {
      toast.error('Failed to update order status');
    }
  };

  const handleDeleteOrder = async (id: string) => {
    try {
      const result = await deleteOrder(id).unwrap();
      if (result.success) {
        toast.success('Order deleted successfully');
      }
    } catch {
      toast.error('Failed to delete order');
    }
  };

  const showOrderDetails = (order: TOrder) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  return (
    <div>
      <PageBreadcrumb items={breadcrumbItems} />

      <div className='flex justify-between items-center my-2'>
        <Title level={2} className='!text-accent'>
          Manage Orders
        </Title>
      </div>

      <Card className='mb-6'>
        <div className='mb-4'>
          <Input
            placeholder='Search orders by ID or customer name'
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchTerm(e.target.value)}
            size='large'
            allowClear
            className='!max-w-md'
          />
        </div>

        <OrderTable
          data={tableData}
          loading={isLoading}
          isDeleting={isDeleting}
          isUpdating={isUpdating}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteOrder}
          onViewDetails={showOrderDetails}
        />

        <div className='flex justify-center mt-8'>
          <Pagination
            current={page}
            pageSize={limit}
            total={ordersData?.meta?.total || 0}
            onChange={handlePageChange}
            showSizeChanger
            pageSizeOptions={['10', '20', '50']}
            showTotal={(total) => `Total ${total} orders`}
            responsive
          />
        </div>
      </Card>

      <OrderDetailsDrawer
        isOpen={isDrawerOpen}
        order={selectedOrder}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default ManageOrders;

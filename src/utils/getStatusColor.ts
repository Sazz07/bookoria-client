export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'processing';
    case 'Processing':
      return 'warning';
    case 'Shipped':
      return 'blue';
    case 'Delivered':
      return 'success';
    case 'Cancelled':
      return 'error';
    default:
      return 'default';
  }
};

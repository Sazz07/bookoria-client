import moment from 'moment';

export const formatDate = (dateString: string): string => {
  return moment(dateString).format('MMMM D, YYYY');
};
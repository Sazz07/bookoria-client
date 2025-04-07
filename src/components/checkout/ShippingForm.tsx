import { Button, Typography } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema } from '../../schemas/checkout.schema';
import AppForm from '../form/AppForm';
import AppInput from '../form/AppInput';
import AppSelect from '../form/AppSelect';
import { countryOptions } from '../../constants/global';
import { TProfile, TShippingAddress } from '../../types';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const { Title } = Typography;

type ShippingFormProps = {
  profile: TProfile | null;
  onBack: () => void;
  onSubmit: (data: Omit<TShippingAddress, '_id'>) => void;
};

const ShippingForm = ({ profile, onBack, onSubmit }: ShippingFormProps) => {
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data as Omit<TShippingAddress, '_id'>);
  };

  return (
    <div>
      <Title level={4}>Shipping Information</Title>
      <AppForm
        onSubmit={handleSubmit}
        resolver={zodResolver(checkoutSchema)}
        defaultValues={{
          name: profile?.fullName || '',
        }}
      >
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <AppInput
            type='text'
            name='name'
            label='Name'
            placeholder='Enter your name'
            disable
          />
          <AppInput
            type='text'
            name='phone'
            label='Phone Number'
            placeholder='Enter your phone number'
          />
        </div>

        <AppInput
          type='text'
          name='address'
          label='Address'
          placeholder='Enter your street address'
        />

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <AppInput
            type='text'
            name='city'
            label='City'
            placeholder='Enter your city'
          />
          <AppInput
            type='text'
            name='postalCode'
            label='Postal Code'
            placeholder='Enter postal code'
          />
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <AppSelect name='country' label='Country' options={countryOptions} />
        </div>

        <div className='flex flex-col justify-between mt-6 space-y-4 sm:flex-row sm:space-y-0'>
          <Button size='large' onClick={onBack}>
            Back to Cart
          </Button>
          <Button type='primary' size='large' htmlType='submit'>
            Continue to Payment
          </Button>
        </div>
      </AppForm>
    </div>
  );
};

export default ShippingForm;

import { DatePicker, Form } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Controller } from 'react-hook-form';
import moment from 'moment';

type TDatePickerProps = {
  name: string;
  size?: SizeType;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

const AppDatePicker = ({
  label,
  name,
  size = 'large',
  placeholder,
  disabled,
}: TDatePickerProps) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => {
          const value = field.value ? moment(field.value) : null;

          return (
            <Form.Item label={label}>
              <DatePicker
                size={size}
                style={{ width: '100%' }}
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                onChange={(date) => {
                  field.onChange(date ? date.toISOString() : null);
                }}
              />
              {error && <small style={{ color: 'red' }}>{error.message}</small>}
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default AppDatePicker;

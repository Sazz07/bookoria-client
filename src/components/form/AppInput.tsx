import { Form, Input } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Controller } from 'react-hook-form';

type TInputProps = {
  type: string;
  name: string;
  size?: SizeType;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};
const AppInput = ({
  type,
  name,
  size = 'large',
  label,
  placeholder,
  disabled,
}: TInputProps) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name}
              size={size}
              placeholder={placeholder}
              disabled={disabled}
            />
            {error && <small style={{ color: 'red' }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default AppInput;

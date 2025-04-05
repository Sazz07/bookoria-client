import { Form, Select } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Controller } from 'react-hook-form';

type TPHSelectProps = {
  label: string;
  name: string;
  size?: SizeType;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: 'multiple' | undefined;
};

const AppSelect = ({
  label,
  name,
  size = 'large',
  options,
  disabled,
  mode,
}: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            style={{ width: '100%' }}
            {...field}
            options={options}
            size={size}
            disabled={disabled}
          />
          {error && <small style={{ color: 'red' }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default AppSelect;

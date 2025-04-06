import { Form, Input } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Controller } from 'react-hook-form';

const { TextArea } = Input;

type TTextAreaProps = {
  name: string;
  size?: SizeType;
  label?: string;
  placeholder?: string;
  rows?: number;
};

const AppTextArea = ({
  name,
  size = 'large',
  label,
  placeholder,
  rows = 4,
}: TTextAreaProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <TextArea
            {...field}
            id={name}
            size={size}
            placeholder={placeholder}
            rows={rows}
          />
          {error && <small style={{ color: 'red' }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default AppTextArea;

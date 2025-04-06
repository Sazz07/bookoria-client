import { Spin } from 'antd';
import { cn } from '../../utils/cn';

type LoadingProps = {
  fullScreen?: boolean;
  size?: 'small' | 'default' | 'large';
  tip?: string;
  height?: string;
  className?: string;
};

const Loading = ({
  fullScreen = false,
  size = 'large',
  tip,
  height,
  className,
}: LoadingProps) => {
  const containerClass = cn(
    'flex justify-center items-center',
    fullScreen ? 'min-h-screen' : height || 'h-64',
    className
  );

  return (
    <div className={containerClass}>
      <Spin size={size} tip={tip} />
    </div>
  );
};

export default Loading;

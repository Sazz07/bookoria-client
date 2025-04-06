import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

type BreadcrumbItem = {
  title: ReactNode;
  href?: string;
  icon?: ReactNode;
};

type PageBreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

const PageBreadcrumb = ({ items, className }: PageBreadcrumbProps) => {
  return (
    <Breadcrumb className={cn('mb-4', className)}>
      {items.map((item, index) => (
        <Breadcrumb.Item key={index}>
          {item.href && index !== items.length - 1 ? (
            <Link to={item.href}>
              {item.icon && <span className='mr-1'>{item.icon}</span>}
              {item.title}
            </Link>
          ) : (
            <>
              {item.icon && <span className='mr-1'>{item.icon}</span>}
              <span className='font-medium'>{item.title}</span>
            </>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default PageBreadcrumb;

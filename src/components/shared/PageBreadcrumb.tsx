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
  const antdItems = items.map((item, index) => {
    const isLast = index === items.length - 1;

    const titleElement = (
      <>
        {item.icon && <span className='mr-1'>{item.icon}</span>}
        {isLast ? (
          <span className='font-medium'>{item.title}</span>
        ) : (
          item.title
        )}
      </>
    );

    return {
      title:
        item.href && !isLast ? (
          <Link to={item.href}>{titleElement}</Link>
        ) : (
          titleElement
        ),
    };
  });

  return <Breadcrumb className={cn('mb-4', className)} items={antdItems} />;
};

export default PageBreadcrumb;

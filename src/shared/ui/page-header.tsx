import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string | ReactNode;
  description?: string | ReactNode;
  badge?: ReactNode;
  button?: ReactNode;
};
export const PageHeader = ({ title, description, badge, button }: PageHeaderProps) => {
  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-start justify-between mb-12'>
      <div className='space-y-2'>
        <h1 className='sm:text-2xl text-xl font-medium sm:font-bold tracking-tight flex flex-row flex-wrap items-center'>
          {title}
        </h1>
        {description && <p className='text-sm text-muted-foreground'>{description}</p>}
        {badge && badge}
      </div>
      {button && button}
    </div>
  );
};

import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  description?: string;
  button?: ReactNode;
};
export const PageHeader = ({ title, description, button }: PageHeaderProps) => {
  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:items-center justify-between'>
      <div className='space-y-0 5'>
        <h1 className='sm:text-2xl text-xl font-medium sm:font-bold tracking-tight'>{title}</h1>
        {description && <p className='text-sm text-muted-foreground'>{description}</p>}
      </div>
      {button && button}
    </div>
  );
};

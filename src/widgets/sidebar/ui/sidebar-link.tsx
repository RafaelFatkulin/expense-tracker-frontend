import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '~shared/lib/cn';

export type SidebarLinkProps = {
  path: string;
  children: ReactNode;
  icon?: ReactNode;
};

export const SidebarLink = ({ path, children }: SidebarLinkProps) => {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          'inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium' +
            ' transition-colors focus-visible:outline-none focus-visible:ring-1' +
            ' focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50' +
            ' hover:bg-accent hover:text-primary h-9 px-4 py-2 w-full justify-start',
          isActive && 'bg-secondary text-primary shadow-sm hover:bg-secondary/80'
        )
      }
      to={path}
    >
      {children}
    </NavLink>
  );
};

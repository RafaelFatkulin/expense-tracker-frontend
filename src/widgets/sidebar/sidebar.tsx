import type { ReactNode } from 'react';
import { Settings, WalletCards } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { LogoutButton } from '~features/logout-button';
import { cn } from '~shared/lib/cn';
import { pathKeys } from '~shared/lib/react-router';

export type SidebarLinkProps = {
  path: string;
  children: ReactNode;
  icon?: ReactNode;
};

const SidebarLink = ({ path, children }: SidebarLinkProps) => {
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

const sidebarLinks: { path: string; icon: ReactNode; text: string }[] = [
  {
    path: pathKeys.wallet.root(),
    icon: <WalletCards className='mr-2 size-5' />,
    text: 'Кошельки'
  },
  {
    path: pathKeys.settings(),
    icon: <Settings className='mr-2 size-5' />,
    text: 'Настройки'
  }
];

export const Sidebar = () => {
  return (
    <aside>
      <nav className='hidden md:flex flex-col gap-1 py-6 pr-6 lg:py-8'>
        {sidebarLinks.map(({ path, icon, text }) => (
          <SidebarLink path={path} key={path}>
            {icon}
            {text}
          </SidebarLink>
        ))}

        <LogoutButton />
      </nav>
    </aside>
  );
};

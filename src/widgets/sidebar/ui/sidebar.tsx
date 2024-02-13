import { LogoutButton } from '~features/logout-button';
import { navLinks } from '~shared/lib/react-router';
import { SidebarLink } from './sidebar-link';

export const Sidebar = () => {
  return (
    <aside>
      <nav className='hidden md:flex flex-col gap-1 py-6 pr-6 lg:py-8'>
        {navLinks.map(({ path, icon, text }) => (
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

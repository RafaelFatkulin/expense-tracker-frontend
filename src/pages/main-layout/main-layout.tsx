import type { ReactNode } from 'react';
import { Home, Menu } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { ThemeToggler } from '~features/theme';
import { cn } from '~shared/lib/cn';
import { pathKeys } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { Container } from '~shared/ui/container';
import { Logo } from '~shared/ui/logo';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '~shared/ui/sheet';
import { Footer } from '~widgets/footer';

const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <Container>
        <div className='flex flex-row items-center justify-between py-3'>
          <Logo path={pathKeys.wallet.root()} />

          <div className='flex flex-row items-center gap-2'>
            <ThemeToggler />

            <Sheet>
              <SheetTrigger asChild>
                <Button className='md:hidden' variant='ghost' size='icon'>
                  <Menu className='size-6' />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Username</SheetTitle>
                  <SheetDescription>username@mail.com</SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
};

type SidebarLinkProps = {
  path: string;
  children: ReactNode;
  icon?: ReactNode;
};

const SidebarLink = ({ path, children, icon }: SidebarLinkProps) => {
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
      {icon}
      {children}
    </NavLink>
  );
};

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main className='flex-1'>
        <Container>
          <div className='grid grid-cols-1 md:grid-cols-[200px_minmax(360px,_1fr)]'>
            <aside>
              <nav className='hidden md:flex flex-col gap-1 py-6 pr-6 lg:py-8'>
                <SidebarLink icon={<Home className='mr-2 size-4' />} path={pathKeys.home()}>
                  Главная
                </SidebarLink>
                <SidebarLink path={pathKeys.login()}>Войти</SidebarLink>
                <SidebarLink path={pathKeys.signup()}>Регистрация</SidebarLink>
                <SidebarLink path={pathKeys.wallet.root()}>Кошельки</SidebarLink>
                <SidebarLink path={pathKeys.settings()}>Настройки</SidebarLink>

                <button>logout</button>
              </nav>
            </aside>
            <Outlet />
          </div>
        </Container>
      </main>
      <Footer path={pathKeys.wallet.root()} />
    </>
  );
};

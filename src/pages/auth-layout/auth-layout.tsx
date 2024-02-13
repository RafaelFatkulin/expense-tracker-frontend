// import { useEffect } from 'react';
import { Menu } from 'lucide-react';
import {
  Navigate,
  NavLink,
  Outlet
  // useNavigate
} from 'react-router-dom';
import { useCurrentUserQuery } from '~entities/session';
import { ThemeToggler } from '~features/theme';
import { pathKeys } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { Container } from '~shared/ui/container';
// import { Loader } from '~shared/ui/loader';
import { Loader } from '~shared/ui/loader';
import { Logo } from '~shared/ui/logo';
import {
  Sheet,
  SheetClose,
  SheetContent,
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
          <Logo path={pathKeys.home()} />
          <NavLink to='/wallets'>wallets</NavLink>
          <div className='flex items-center gap-2'>
            <ThemeToggler />

            <div className='hidden md:flex items-center gap-2'>
              <Button variant='default' asChild>
                <NavLink to={pathKeys.login()}>Войти</NavLink>
              </Button>
              <Button variant='outline' asChild>
                <NavLink to={pathKeys.signup()}>Регистрация</NavLink>
              </Button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button className='md:hidden' variant='ghost' size='icon'>
                  <Menu className='size-6' />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Меню</SheetTitle>
                </SheetHeader>

                <nav className='grid grid-cols-1 gap-2 pt-10'>
                  <Button variant='default' asChild>
                    <SheetClose asChild>
                      <NavLink to={pathKeys.login()}>Войти</NavLink>
                    </SheetClose>
                  </Button>
                  <Button variant='outline' asChild>
                    <SheetClose asChild>
                      <NavLink to={pathKeys.signup()}>Регистрация</NavLink>
                    </SheetClose>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
};

export const AuthLayout = () => {
  const { data: user, isLoading, isPending } = useCurrentUserQuery();

  if (user && !isLoading && !isPending) {
    console.log('auth user', user);
    // navigate('/wallets');
    return <Navigate to='/wallets' />;
  }

  if (isLoading) {
    return (
      <div className='absolute inset-0 min-w-full min-h-screen flex items-center justify-center'>
        <Loader className='text-primary' variant='xl' />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className='flex-1 pt-8'>
        <Outlet />
      </main>
      <Footer path={pathKeys.home()} />
    </>
  );
};

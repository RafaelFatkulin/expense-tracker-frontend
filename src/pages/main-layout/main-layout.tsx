import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { sessionQueries } from '~entities/session';
import type { User } from '~entities/session/session.types';
import { ThemeToggler } from '~features/theme';
import { pathKeys } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { Container } from '~shared/ui/container';
import { Loader } from '~shared/ui/loader';
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
import { Sidebar } from '~widgets/sidebar';

type HeaderProps = {
  user: User | null;
};

const Header = ({ user }: HeaderProps) => {
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
                {user && (
                  <SheetHeader>
                    <SheetTitle>{user?.username}</SheetTitle>
                    <SheetDescription>{user?.email}</SheetDescription>
                  </SheetHeader>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
};

export const MainLayout = () => {
  const { data: user, isLoading } = sessionQueries.useCurrentUserQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/', { replace: true });
    }
  }, [isLoading, user]);

  if (isLoading) {
    return (
      <div className='absolute inset-0 min-w-full min-h-screen flex items-center justify-center'>
        <Loader className='text-primary' variant='xl' />
      </div>
    );
  }

  return (
    <>
      <Header user={user || null} />
      <main className='flex-1'>
        <Container>
          <div className='grid grid-cols-1 md:grid-cols-[200px_minmax(360px,_1fr)]'>
            <Sidebar />
            <Outlet />
          </div>
        </Container>
      </main>
      <Footer path={pathKeys.wallet.root()} />
    </>
  );
};

import { KeyRound, LogIn, Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { ThemeToggler } from '~features/theme';
import { pathKeys } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { Container } from '~shared/ui/container';
import { Logo } from '~shared/ui/logo';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '~shared/ui/sheet';

export const AuthHeader = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <Container>
        <div className='flex flex-row items-center justify-between py-3'>
          <Logo path={pathKeys.home()} />

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
                      <NavLink to={pathKeys.login()}>
                        <LogIn className='size-5 mr-2' /> Войти
                      </NavLink>
                    </SheetClose>
                  </Button>
                  <Button variant='outline' asChild>
                    <SheetClose asChild>
                      <NavLink to={pathKeys.signup()}>
                        <KeyRound className='size-5 mr-2' />
                        Регистрация
                      </NavLink>
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

import { Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import type { User } from '~entities/session';
import { LogoutButton } from '~features/logout-button';
import { ThemeToggler } from '~features/theme';
import { navLinks, pathKeys } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { Container } from '~shared/ui/container';
import { Logo } from '~shared/ui/logo';
import { Separator } from '~shared/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '~shared/ui/sheet';

type Props = {
  user: User | null;
};

export const MainHeader = ({ user }: Props) => {
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
                  <>
                    <SheetHeader>
                      <SheetTitle>{user?.username}</SheetTitle>
                      <SheetDescription>{user?.email}</SheetDescription>
                    </SheetHeader>

                    <nav className='grid grid-cols-1 gap-2 pt-10'>
                      {navLinks.map(({ path, icon, text }) => (
                        <Button
                          key={path}
                          variant='ghost'
                          className='justify-start hover:text-primary'
                          asChild
                        >
                          <SheetClose asChild>
                            <NavLink to={path}>
                              {icon}
                              {text}
                            </NavLink>
                          </SheetClose>
                        </Button>
                      ))}

                      <Separator />

                      <LogoutButton />
                    </nav>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
};

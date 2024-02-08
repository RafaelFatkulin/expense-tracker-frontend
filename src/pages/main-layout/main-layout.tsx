import { Outlet } from 'react-router-dom';
import { ThemeToggler } from '~features/theme';
import { Container } from '~shared/ui/container';

export const MainLayout = () => {
  return (
    <>
      <header>
        <Container>
          header <ThemeToggler />
        </Container>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  );
};

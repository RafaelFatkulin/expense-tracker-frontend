import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUserQuery } from '~entities/session';
import { pathKeys } from '~shared/lib/react-router';
import { Container } from '~shared/ui/container';
import { Loader } from '~shared/ui/loader';
import { Footer } from '~widgets/footer';
import { MainHeader } from '~widgets/main-header';
import { Sidebar } from '~widgets/sidebar';

export const MainLayout = () => {
  const { data: user, isLoading } = useCurrentUserQuery();

  if (!user && !isLoading) {
    return <Navigate to='/' />;
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
      <MainHeader user={user || null} />
      <div className='flex-1'>
        <Container>
          <div className='grid grid-cols-1 md:grid-cols-[200px_minmax(360px,_1fr)]'>
            <Sidebar />
            <main className='py-6 lg:py-8'>
              <Outlet />
            </main>
          </div>
        </Container>
      </div>

      <Footer path={pathKeys.wallet.root()} />
    </>
  );
};

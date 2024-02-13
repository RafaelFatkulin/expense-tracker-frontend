import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUserQuery } from '~entities/session';
import { pathKeys } from '~shared/lib/react-router';
import { Loader } from '~shared/ui/loader';
import { AuthHeader } from '~widgets/auth-header';
import { Footer } from '~widgets/footer';

export const AuthLayout = () => {
  const { data: user, isLoading, isPending } = useCurrentUserQuery();

  if (user && !isLoading && !isPending) {
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
      <AuthHeader />
      <main className='flex-1 py-6 lg:py-8'>
        <Outlet />
      </main>
      <Footer path={pathKeys.home()} />
    </>
  );
};

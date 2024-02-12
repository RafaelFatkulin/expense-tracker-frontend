import { ThemeProvider } from '~features/theme';
import { withSuspense } from '~shared/lib/react';
import { Loader } from '~shared/ui/loader';
import { QueryClientProvider } from './query-client-provider';
import { BrowserRouter } from './router-provider';
import '~shared/main.css';
import { Toaster } from '~shared/ui/toaster';

const Providers = () => {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <BrowserRouter />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export const Provider = withSuspense(Providers, {
  fallback: (
    <div className='min-w-full min-h-screen flex items-center justify-center'>
      <Loader className='text-primary' variant='xl' />
    </div>
  )
});

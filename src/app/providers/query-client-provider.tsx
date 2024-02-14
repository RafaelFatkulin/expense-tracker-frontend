import type { ReactNode } from 'react';
import { QueryClientProvider as TanStackQueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '~shared/lib/react-query';

type Props = {
  children: ReactNode;
};

export const QueryClientProvider = ({ children }: Props) => {
  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </TanStackQueryClientProvider>
  );
};

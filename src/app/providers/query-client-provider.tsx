import { ReactNode } from "react";
import { QueryClientProvider as TanStackQueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from "~shared/lib/react-query";

type Props = {
  children: ReactNode
}

export function QueryClientProvider({ children }: Props) {
  return <TanStackQueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools/>
  </TanStackQueryClientProvider>
}

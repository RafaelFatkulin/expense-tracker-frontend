import type { ReactNode } from 'react';

export const Ruble = ({ children }: { children: ReactNode }) => {
  return <span>{children} &#8381;</span>;
};

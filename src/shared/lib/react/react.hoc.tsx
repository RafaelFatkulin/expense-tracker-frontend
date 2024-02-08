import type { FC, SuspenseProps } from 'react';
import { Suspense } from 'react';

export function withSuspense<WrappedProps extends NonNullable<unknown>>(
  WrappedComponent: FC<WrappedProps>,
  suspenseProps: SuspenseProps
): FC<WrappedProps> {
  return (props: WrappedProps) => {
    return (
      <Suspense {...suspenseProps}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
}

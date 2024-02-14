import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { Loader as LoaderIcon } from 'lucide-react';
import { cn } from '~shared/lib/cn';

const loaderVariants = cva('animate-spin', {
  variants: {
    variant: {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-8'
    }
  },
  defaultVariants: {
    variant: 'sm'
  }
});

interface Props extends VariantProps<typeof loaderVariants> {
  className?: string;
}

export const Loader = ({ variant, className }: Props) => (
  <LoaderIcon className={cn(loaderVariants({ variant }), className)} />
);

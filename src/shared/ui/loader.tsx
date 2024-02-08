import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { Loader as LoaderIcon } from 'lucide-react';
import { cn } from '~shared/lib/cn';

const loaderVariants = cva('animate-spin', {
  variants: {
    variant: {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8'
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

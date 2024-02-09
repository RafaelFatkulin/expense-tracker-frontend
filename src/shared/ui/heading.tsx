import type { ElementType, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from '~shared/lib/cn';

const headingVariants = cva('scroll-m-20 tracking-tight', {
  variants: {
    variant: {
      h1: 'text-4xl font-extrabold lg:text-5xl',
      h2: 'text-3xl font-semibold',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-semibold'
    }
  },
  defaultVariants: {
    variant: 'h1'
  }
});

export interface HeadingProps extends VariantProps<typeof headingVariants> {
  children: ReactNode;
  className?: string;
}

const headingTagVariants = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4'
};

export const Heading = ({ variant = 'h1', children, className }: HeadingProps) => {
  const Tag: ElementType = variant
    ? (headingTagVariants[variant] as ElementType)
    : ('p' as ElementType);

  return <Tag className={cn(className, headingVariants({ variant }))}>{children}</Tag>;
};

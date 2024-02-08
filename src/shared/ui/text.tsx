import type { ElementType, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from '~shared/lib/cn';

const textVariants = cva('', {
  variants: {
    variant: {
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      th: 'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
      td: 'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
      ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground'
    }
  },
  defaultVariants: {
    variant: 'p'
  }
});

export interface TextProps extends VariantProps<typeof textVariants> {
  children: ReactNode;
  className?: string;
}

const textTagVariants = {
  p: 'p',
  th: 'th',
  td: 'td',
  ul: 'ul',
  lead: 'p',
  large: 'p',
  small: 'small',
  muted: 'p'
};

export const Text = ({ variant = 'p', children, className }: TextProps) => {
  const Tag: ElementType = variant
    ? (textTagVariants[variant] as ElementType)
    : ('p' as ElementType);

  return <Tag className={cn(className, textVariants({ variant }))}>{children}</Tag>;
};

import type { HTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import type { TransactionType } from '~entities/transaction';
import { cn } from '~shared/lib/cn';

const typeChevronVariants = cva('mr-2', {
  variants: {
    type: {
      INCOME: 'text-success',
      EXPENSE: 'text-destructive'
    },
    size: {
      sm: 'size-4',
      md: 'size-5'
    }
  },
  defaultVariants: {
    type: 'INCOME',
    size: 'sm'
  }
});

interface TypeChevronProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof typeChevronVariants> {
  type: TransactionType;
}

export const TypeChevron = ({ type, size }: TypeChevronProps) => {
  return type === 'INCOME' ? (
    <ChevronsUp className={cn(typeChevronVariants({ size, type }))} />
  ) : (
    <ChevronsDown className={cn(typeChevronVariants({ size, type }))} />
  );
};

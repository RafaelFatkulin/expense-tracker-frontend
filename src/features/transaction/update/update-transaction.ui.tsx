import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import { Pencil } from 'lucide-react';
import { useUpdateTransactionContext } from '~features/transaction';
import { Button } from '~shared/ui/button';
import { Dialog, DialogTrigger } from '~shared/ui/dialog';

type Props = {
  children: ReactNode;
} & HTMLAttributes<HTMLButtonElement>;

export const UpdateTransactionButton = forwardRef<HTMLButtonElement, Props>(
  ({ children }: Props, ref) => {
    const { isOpen, setIsOpen } = useUpdateTransactionContext();

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button ref={ref} variant='ghost' size='icon'>
            <Pencil className='size-4' />
          </Button>
        </DialogTrigger>
        {children}
      </Dialog>
    );
  }
);

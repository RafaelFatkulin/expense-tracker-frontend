import type { HTMLAttributes } from 'react';
import { useState, forwardRef } from 'react';
import { Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import type { Transaction } from '~entities/transaction';
import { useDeleteTransactionMutation } from '~entities/transaction';
import { Button } from '~shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~shared/ui/dialog';
import { Loader } from '~shared/ui/loader';

type Props = {
  transaction: Transaction;
} & HTMLAttributes<HTMLButtonElement>;

export const DeleteTransactionButton = forwardRef<HTMLButtonElement, Props>(
  ({ transaction }: Props, ref) => {
    const { walletId } = useParams();
    const { mutate, isPending } = useDeleteTransactionMutation(transaction.id, +walletId!);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClick = () =>
      mutate(
        {
          id: transaction.id
        },
        {
          onSuccess: () => {
            setIsOpen(false);
          }
        }
      );

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button ref={ref} variant='ghost'>
            <Trash2 className='size-4' />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить транзакцию</DialogTitle>
            <DialogDescription>
              Вы действительно хотите удалить транзакцию &quot;{transaction.title}&quot;?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={handleClick}
              className='w-full sm:w-auto sm:ml-0 mr-auto'
              variant='destructive'
              disabled={isPending}
            >
              {isPending ? (
                <Loader variant='sm' className='mr-2' />
              ) : (
                <Trash2 className='size-4 mr-2' />
              )}
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

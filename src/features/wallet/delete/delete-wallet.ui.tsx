import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { Trash2 } from 'lucide-react';
import type { Wallet } from '~entities/wallet';
import { useDeleteWalletMutation } from '~entities/wallet';
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

type Props = {
  wallet: Wallet;
} & HTMLAttributes<HTMLButtonElement>;

export const DeleteWalletButton = forwardRef<HTMLButtonElement, Props>(({ wallet }: Props, ref) => {
  const { mutate } = useDeleteWalletMutation(wallet.id);

  const handleClick = () => mutate();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          ref={ref}
          className='w-full px-2 py-1.5 justify-start cursor-pointer'
          variant='ghost'
        >
          <Trash2 className='size-4 mr-2' />
          Удалить
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Удалить кошелек</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить кошелек &quot;{wallet.title}&quot;?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleClick}
            className='w-full sm:w-auto sm:ml-0 mr-auto'
            variant='destructive'
          >
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

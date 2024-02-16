import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '~shared/ui/button';
import { Dialog, DialogTrigger } from '~shared/ui/dialog';

export const CreateTransactionButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <DialogTrigger asChild>
      <Button onClick={onClick}>
        <PlusCircle className='mr-2 size-5' /> Добавить транзакцию
      </Button>
    </DialogTrigger>
  );
};

type CreateWalletDialogProps = {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const CreateTransactionDialog = ({ children, open, setOpen }: CreateWalletDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
    </Dialog>
  );
};

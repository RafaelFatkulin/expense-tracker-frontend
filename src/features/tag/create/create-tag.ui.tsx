import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '~shared/ui/button';
import { Dialog, DialogTrigger } from '~shared/ui/dialog';

export const CreateTagDialog = ({
  children,
  open,
  setOpen
}: {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
    </Dialog>
  );
};

export const CreateTagButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <DialogTrigger asChild>
      <Button onClick={onClick}>
        <PlusCircle className='mr-2 size-5' /> Создать
      </Button>
    </DialogTrigger>
  );
};

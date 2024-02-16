import type { HTMLAttributes } from 'react';
import { useState, forwardRef } from 'react';
import { Pencil } from 'lucide-react';
import type { Tag } from '~entities/tag';
import { Button } from '~shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~shared/ui/dialog';

type Props = {
  tag: Tag;
} & HTMLAttributes<HTMLButtonElement>;

export const UpdateTagButton = forwardRef<HTMLButtonElement, Props>(({ tag }: Props, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen(!open);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          ref={ref}
          variant='secondary'
          className='px-2 py-1.5 bg-background hover:bg-accent justify-start'
          onClick={toggle}
        >
          <Pencil className='size-4 mr-2' />
          Редактировать
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать тэг</DialogTitle>
          <DialogDescription>Введите новую информацию для тэга.</DialogDescription>
        </DialogHeader>
        {tag.title}
      </DialogContent>
    </Dialog>
  );
});

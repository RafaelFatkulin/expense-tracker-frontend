import type { HTMLAttributes } from 'react';
import { useState, forwardRef } from 'react';
import { Trash2 } from 'lucide-react';
import type { Tag } from '~entities/tag';
import { useDeleteTagMutation } from '~entities/tag';
import { Button } from '~shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~shared/ui/dialog';
import { Loader } from '~shared/ui/loader';

type Props = {
  tag: Tag;
} & HTMLAttributes<HTMLButtonElement>;

export const DeleteTagButton = forwardRef<HTMLButtonElement, Props>(({ tag }: Props, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen(!open);

  const { mutate, isPending } = useDeleteTagMutation(tag.id);

  const handleClick = () => mutate();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          ref={ref}
          variant='secondary'
          className='px-2 py-1.5 bg-background hover:bg-accent justify-start'
          onClick={toggle}
        >
          <Trash2 className='size-4 mr-2' />
          Удалить
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Удалить тэг</DialogTitle>
          <DialogDescription>
            Вы действительно хотите удалить тэг &quot;{tag.title}&quot;?
          </DialogDescription>
        </DialogHeader>

        <Button
          onClick={handleClick}
          variant='destructive'
          disabled={isPending}
          className='md:w-fit'
        >
          {isPending ? (
            <Loader variant='sm' className='mr-2' />
          ) : (
            <Trash2 className='size-4 mr-2' />
          )}
          Удалить
        </Button>
      </DialogContent>
    </Dialog>
  );
});

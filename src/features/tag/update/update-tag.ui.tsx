import type { HTMLAttributes } from 'react';
import { useState, forwardRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { Tag, UpdateTagDto } from '~entities/tag';
import { useUpdateTagMutation, UpdateTagDtoSchema } from '~entities/tag';
import { Button } from '~shared/ui/button';
import { ColorPicker } from '~shared/ui/color-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~shared/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~shared/ui/form';
import { Input } from '~shared/ui/input';
import { Loader } from '~shared/ui/loader';

type Props = {
  tag: Tag;
} & HTMLAttributes<HTMLButtonElement>;

export const UpdateTagButton = forwardRef<HTMLButtonElement, Props>(({ tag }: Props, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen(!open);

  const form = useForm({
    resolver: zodResolver(UpdateTagDtoSchema),
    defaultValues: {
      title: tag.title || '',
      color: tag.color || ''
    }
  });

  const { mutate, isPending } = useUpdateTagMutation(tag.id);

  const onSubmit = (values: UpdateTagDto) =>
    mutate(
      {
        id: tag.id,
        updateTagDto: values
      },
      {
        onSuccess: () => {
          toggle();
          form.reset();
        }
      }
    );

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

        <Form {...form}>
          <form className='grid gap-3' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name='title'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input placeholder='Tag #1' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='color'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цвет</FormLabel>
                  <FormControl>
                    <div>
                      <Input placeholder='Tag #1' type='hidden' {...field} />
                      <ColorPicker value={form.getValues('color')} setValue={form.setValue} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full sm:w-auto sm:ml-0 mr-auto' disabled={isPending}>
              {isPending ? (
                <Loader variant='sm' className='mr-2' />
              ) : (
                <Save className='size-4 mr-2' />
              )}
              Сохранить
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});

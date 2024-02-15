import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCurrentUserQuery } from '~entities/session';
import type { CreateTagDto } from '~entities/tag';
import { CreateTagDtoSchema, useCreateTagMutation } from '~entities/tag';
import { Button } from '~shared/ui/button';
import { ColorPicker } from '~shared/ui/color-picker';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~shared/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~shared/ui/form';
import { Input } from '~shared/ui/input';
import { Loader } from '~shared/ui/loader';

export const CreateTagForm = ({ closeDialog }: { closeDialog: () => void }) => {
  const { mutate, isPending } = useCreateTagMutation();
  const { data: user } = useCurrentUserQuery();

  const form = useForm({
    resolver: zodResolver(CreateTagDtoSchema),
    defaultValues: {
      title: '',
      color: '',
      userId: user ? user.id : 0
    }
  });

  const onSubmit = (values: CreateTagDto) => {
    mutate(values, {
      onSuccess: () => {
        closeDialog();
        form.reset();
      }
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Создание тэга</DialogTitle>
        <DialogDescription>Введите название и выберите цвет тэга.</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form className='grid gap-3' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input placeholder='Tag #1' {...field} />
                </FormControl>
                <FormMessage />
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

          <Button type='submit' disabled={isPending}>
            {isPending && <Loader variant='sm' className='mr-2' />}
            Создать
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCurrentUserQuery } from '~entities/session';
import type { CreateWalletDto } from '~entities/wallet';
import { CreateWalletDtoSchema, useCreateWalletMutation } from '~entities/wallet';
import { Button } from '~shared/ui/button';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~shared/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~shared/ui/form';
import { Input } from '~shared/ui/input';
import { Loader } from '~shared/ui/loader';

export const CreateWalletForm = ({ closeDialog }: { closeDialog: () => void }) => {
  const { mutate, isPending } = useCreateWalletMutation();

  const { data: user } = useCurrentUserQuery();

  const form = useForm({
    resolver: zodResolver(CreateWalletDtoSchema),
    defaultValues: {
      title: '',
      userId: user ? user.id : 0
    }
  });

  const onSubmit = (values: CreateWalletDto) =>
    mutate(values, {
      onSuccess: () => {
        closeDialog();
        form.reset();
      }
    });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Создание кошелька</DialogTitle>
        <DialogDescription>Введите название кошелька</DialogDescription>
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
                  <Input placeholder='Wallet #1' {...field} />
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

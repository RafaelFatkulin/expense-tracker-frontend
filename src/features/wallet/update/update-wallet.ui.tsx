import type { HTMLAttributes } from 'react';
import { useState, forwardRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { UpdateWalletDto, Wallet } from '~entities/wallet';
import { UpdateWalletDtoSchema, useUpdateWalletMutation } from '~entities/wallet';
import { Button } from '~shared/ui/button';
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
  wallet: Wallet;
} & HTMLAttributes<HTMLButtonElement>;

export const UpdateWalletButton = forwardRef<HTMLButtonElement, Props>(({ wallet }: Props, ref) => {
  const form = useForm({
    resolver: zodResolver(UpdateWalletDtoSchema),
    defaultValues: {
      title: wallet.title || ''
    }
  });

  const { mutate, isPending } = useUpdateWalletMutation(wallet.id);
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen(!open);
  const onSubmit = (values: UpdateWalletDto) =>
    mutate(
      {
        id: wallet.id,
        updateWalletDto: values
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
        <Button ref={ref} variant='secondary' onClick={toggle}>
          Редактировать
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать кошелек</DialogTitle>
          <DialogDescription>Введите новое название кошелька</DialogDescription>
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

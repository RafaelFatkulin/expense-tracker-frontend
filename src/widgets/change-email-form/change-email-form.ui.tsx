import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Save, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  ChangeEmailDtoSchema,
  useChangeEmailMutation,
  useCurrentUserQuery
} from '~entities/session';
import type { ChangeEmailDto } from '~entities/session';
import { Button } from '~shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~shared/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~shared/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '~shared/ui/form';
import { Input } from '~shared/ui/input';
import { Loader } from '~shared/ui/loader';

export const ChangeEmailForm = () => {
  const { data: user } = useCurrentUserQuery();
  const { mutate, isPending } = useChangeEmailMutation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<ChangeEmailDto>({
    resolver: zodResolver(ChangeEmailDtoSchema),
    defaultValues: {
      newEmail: user?.email
    },
    mode: 'all'
  });

  useEffect(() => {
    form.reset({
      newEmail: user?.email
    });
  }, [form, user]);

  const onSubmit = (values: ChangeEmailDto) => {
    if (user) {
      mutate(values, {
        onSuccess: () => {
          form.reset();
          setIsOpen(false);
        }
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>Email</CardTitle>
        <CardDescription>Изменить Email</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className='grid gap-3'
            onSubmit={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            <FormField
              control={form.control}
              name='newEmail'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  className='w-full lg:w-fit'
                  type='button'
                  disabled={
                    form.getValues('newEmail') === user?.email || !!form.formState.errors.newEmail
                  }
                >
                  <Save className='size-4 mr-2' />
                  Изменить
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Внимание</DialogTitle>
                  <DialogDescription>
                    Вы действительно хотите поменять Email на &quot;{form.getValues('newEmail')}
                    &quot;?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className='grid grid-cols-2'>
                  <Button type='button' disabled={isPending} onClick={form.handleSubmit(onSubmit)}>
                    {isPending ? (
                      <Loader variant='sm' className='mr-2' />
                    ) : (
                      <Check className='size-4 mr-2' />
                    )}
                    Да
                  </Button>
                  <DialogClose asChild>
                    <Button type='button' onClick={() => form.reset()} variant='destructive'>
                      <X className='size-4 mr-2' />
                      Нет
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

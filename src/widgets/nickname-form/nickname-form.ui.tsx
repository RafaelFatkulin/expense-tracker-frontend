import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Save, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { UpdateUserDto } from '~entities/session';
import { UpdateUserDtoSchema, useCurrentUserQuery, useUpdateUserMutation } from '~entities/session';
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

export const NicknameForm = () => {
  const { data: user } = useCurrentUserQuery();
  const { mutate, isPending } = useUpdateUserMutation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<UpdateUserDto>({
    resolver: zodResolver(UpdateUserDtoSchema),
    defaultValues: {
      username: user?.username
    }
  });

  useEffect(() => {
    form.reset({
      username: user?.username
    });
  }, [form, user]);

  const onSubmit = (values: UpdateUserDto) => {
    if (user) {
      mutate(
        {
          userId: +user.id,
          updateUserDto: values
        },
        {
          onSuccess: () => {
            form.reset();
            setIsOpen(false);
          }
        }
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Никнейм</CardTitle>
        <CardDescription>Редактировать никнейм</CardDescription>
        <CardContent className='p-0 pt-4'>
          <Form {...form}>
            <form className='grid gap-3'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Никнейм' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button type='button' disabled={form.getValues('username') === user?.username}>
                    <Save className='size-4 mr-2' />
                    Изменить
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Внимание</DialogTitle>
                    <DialogDescription>
                      Вы действительно хотите поменять никнейм на &quot;
                      {form.getValues('username')}&quot;?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className='grid grid-cols-2'>
                    <Button
                      type='button'
                      onClick={form.handleSubmit(onSubmit)}
                      disabled={isPending}
                    >
                      {isPending && <Loader variant='sm' className='mr-2' />}
                      <Check className='size-4 mr-2' />
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
      </CardHeader>
    </Card>
  );
};

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { sessionTypes } from '~entities/session';
import { sessionContracts, sessionQueries } from '~entities/session';
import { Button } from '~shared/ui/button';
import { Checkbox } from '~shared/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~shared/ui/form';
import { Input } from '~shared/ui/input';
import { Loader } from '~shared/ui/loader';
import { PasswordInput } from '~shared/ui/password-input';

export const LoginForm = () => {
  const { mutate, isPending } = sessionQueries.useLoginMutation();

  const form = useForm({
    resolver: zodResolver(sessionContracts.LoginDtoSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false
    }
  });

  const onSubmit = (values: sessionTypes.LoginDto) => {
    console.log(values);
    try {
      mutate(values);
    } catch (error) {
      // Handle error appropriately, e.g., show an error message
      console.error('Error during login:', error);
    }
  };

  return (
    <Form {...form}>
      <form className='grid gap-3' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder='email@email.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='remember'
          render={({ field }) => (
            <FormItem className='flex items-center gap-2'>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className='!mt-0'>Запомнить меня</FormLabel>
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isPending}>
          {isPending && <Loader variant='sm' className='mr-2' />}
          Войти
        </Button>
      </form>
    </Form>
  );
};

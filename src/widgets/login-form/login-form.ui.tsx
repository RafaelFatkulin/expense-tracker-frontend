import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import type { LoginDto } from '~entities/session';
import { LoginDtoSchema, useLoginMutation } from '~entities/session';
import { pathKeys } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { Checkbox } from '~shared/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~shared/ui/form';
import { Input } from '~shared/ui/input';
import { Loader } from '~shared/ui/loader';
import { PasswordInput } from '~shared/ui/password-input';
import { Text } from '~shared/ui/text';

export const LoginForm = () => {
  const { mutate, isPending } = useLoginMutation();

  const form = useForm({
    resolver: zodResolver(LoginDtoSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false
    }
  });

  const onSubmit = form.handleSubmit((values: LoginDto) => {
    mutate(values);
  });

  return (
    <Form {...form}>
      <form className='grid gap-3' onSubmit={onSubmit}>
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
        <Text variant='muted'>
          Нет аккаунта?{' '}
          <Link
            className='underline ml-1 transition-colors hover:text-primary'
            to={pathKeys.signup()}
          >
            Создать
          </Link>
        </Text>
      </form>
    </Form>
  );
};

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import type { SignupDto } from '~entities/session';
import { SignupDtoSchema, useSignupMutation } from '~entities/session';
import { pathKeys } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~shared/ui/form';
import { Input } from '~shared/ui/input';
import { Loader } from '~shared/ui/loader';
import { PasswordInput } from '~shared/ui/password-input';
import { Text } from '~shared/ui/text';

export const SignupForm = () => {
  const { mutate, isPending } = useSignupMutation();
  const form = useForm<SignupDto>({
    resolver: zodResolver(SignupDtoSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = form.handleSubmit((values: SignupDto) => {
    mutate(values);
  });

  return (
    <Form {...form}>
      <form className='grid gap-3' onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Никнейм</FormLabel>
              <FormControl>
                <Input placeholder='username' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Повторите пароль</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isPending}>
          {isPending && <Loader variant='sm' className='mr-2' />}
          Регистрация
        </Button>

        <Text variant='muted'>
          Уже есть аккаунт?
          <Link
            className='underline ml-1 transition-colors hover:text-primary'
            to={pathKeys.login()}
          >
            Войти
          </Link>
        </Text>
      </form>
    </Form>
  );
};

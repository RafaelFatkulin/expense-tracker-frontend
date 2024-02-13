import { AuthPageHeader } from '~shared/ui/auth-page-header';
import { Container } from '~shared/ui/container';
import { LoginForm } from '~widgets/login-form';

const Login = () => {
  return (
    <section>
      <Container>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 max-w-[420px] lg:p-8'>
          <AuthPageHeader
            title='Войдите в аккаунт'
            description='Введите ваши данные для входа в аккаунт'
          />
          <LoginForm />
        </div>
      </Container>
    </section>
  );
};
export default Login;

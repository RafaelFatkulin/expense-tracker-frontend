import { AuthHeader } from '~shared/ui/auth-header';
import { Container } from '~shared/ui/container';
import { SignupForm } from '~widgets/signup-form';

const Signup = () => {
  return (
    <section>
      <Container>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 max-w-[420px] lg:p-8'>
          <AuthHeader
            title='Создайте аккаунт'
            description='Введите данные для регистрации аккаунта'
          />
          <SignupForm />
        </div>
      </Container>
    </section>
  );
};

export default Signup;

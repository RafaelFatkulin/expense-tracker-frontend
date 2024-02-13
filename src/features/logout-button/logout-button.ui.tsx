import { LogOut } from 'lucide-react';
import { useLogoutMutation } from '~entities/session';
import { Button } from '~shared/ui/button';
import { Loader } from '~shared/ui/loader';

export const LogoutButton = () => {
  const { mutate, isPending } = useLogoutMutation();

  const onClick = () => {
    mutate();
  };

  return (
    <Button
      className='justify-start hover:text-primary'
      onClick={onClick}
      variant='ghost'
      disabled={isPending}
    >
      {isPending ? <Loader className='mr-2 size-5' /> : <LogOut className='mr-2 size-5' />}
      <span className='text-center'>Выйти</span>
    </Button>
  );
};

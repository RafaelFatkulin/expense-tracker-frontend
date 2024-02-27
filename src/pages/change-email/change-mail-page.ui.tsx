import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChangeEmailQuery } from '~entities/session';
import { queryClient } from '~shared/lib/react-query';
import { pathKeys } from '~shared/lib/react-router';
import { Container } from '~shared/ui/container';
import { Loader } from '~shared/ui/loader';
import { useToast } from '~shared/ui/use-toast';

const ChangeMailPage = () => {
  const { data, isLoading } = useChangeEmailQuery();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const invalidate = async () => {
      await queryClient.invalidateQueries({ queryKey: ['session', 'currentUser'] });
    };
    if (data && !isLoading) {
      toast({
        title: 'Успех',
        description: data.message
      });
      navigate(pathKeys.settings());
      invalidate().catch((err: Error) => {
        toast({
          title: 'Произошла ошибка при обновлении данных',
          description: err.message,
          variant: 'destructive'
        });
      });
    }
  }, [data, isLoading, navigate, toast]);

  return (
    <Container>
      <div className='flex items-center justify-center'>
        <Loader variant='xl' />
      </div>
    </Container>
  );
};

export default ChangeMailPage;

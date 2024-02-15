import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVefiryEmailQuery } from '~entities/session';
import { pathKeys } from '~shared/lib/react-router';
import { Container } from '~shared/ui/container';
import { Loader } from '~shared/ui/loader';
import { useToast } from '~shared/ui/use-toast';

const VerifyMailPage = () => {
  const { data, isLoading } = useVefiryEmailQuery();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && !isLoading) {
      toast({
        title: 'Успех',
        description: data.message
      });
      navigate(pathKeys.login());
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

export default VerifyMailPage;

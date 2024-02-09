import { Container } from '~shared/ui/container';
import { Heading } from '~shared/ui/heading';

export const Hero = () => {
  return (
    <section className='mb-16'>
      <Container>
        <div className='flex items-center justify-center bg-primary h-96 rounded-md '>
          <Heading>Hero Block</Heading>
        </div>
      </Container>
    </section>
  );
};

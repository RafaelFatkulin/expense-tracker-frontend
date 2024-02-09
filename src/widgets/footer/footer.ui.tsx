import { Container } from '~shared/ui/container';
import { Logo } from '~shared/ui/logo';
import { Text } from '~shared/ui/text';

type Props = {
  path: string;
};

export const Footer = ({ path }: Props) => {
  return (
    <footer className='border-t border-border/40 bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <Container>
        <div className='py-2 flex flex-row items-center justify-between'>
          <Logo path={path} />
          <Text variant='muted'>Created by RafaelFatkulin</Text>
        </div>
      </Container>
    </footer>
  );
};

import { Banknote } from 'lucide-react';
import { NavLink } from 'react-router-dom';

type Props = {
  path: string;
};

export const Logo = ({ path }: Props) => {
  return (
    <NavLink
      to={path}
      className='flex flex-row gap-2 items-center hover:text-primary transition-colors'
    >
      <Banknote className='size-8' />
      <span className='leading-none font-bold pb-0.5'>e-wallet</span>
    </NavLink>
  );
};

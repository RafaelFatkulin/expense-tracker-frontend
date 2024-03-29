import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import { Badge } from '~shared/ui/badge';
import { Card, CardFooter, CardHeader, CardTitle } from '~shared/ui/card';
import type { Wallet } from './wallet.types';

type Props = {
  wallet: Wallet;
  updateButton?: ReactNode;
  deleteButton?: ReactNode;
};

export const badgeVariant = (wallet: Wallet) => {
  if (wallet.balance) {
    if (wallet?.balance > 0) return 'success';
    if (wallet?.balance < 0) return 'destructive';
  }
  return 'outline';
};

export const WalletCard = ({ wallet, updateButton, deleteButton }: Props) => {
  return (
    <Card className='flex flex-col justify-between'>
      <CardHeader className='flex-row justify-between items-center gap-2 flex-wrap'>
        <CardTitle className='text-xl transition-colors hover:text-primary'>
          <Link to={pathKeys.wallet.byId(wallet.id)}>{wallet.title}</Link>
        </CardTitle>
        <Badge className='text-sm' variant={badgeVariant(wallet)}>
          {wallet.balance} ₽
        </Badge>
      </CardHeader>
      <CardFooter className='justify-between gap-2 flex-wrap'>
        {deleteButton}
        {updateButton}
      </CardFooter>
    </Card>
  );
};

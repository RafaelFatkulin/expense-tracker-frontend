import type { ReactNode } from 'react';
import { ExternalLink, MoreHorizontal, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import { Badge } from '~shared/ui/badge';
import { Button } from '~shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~shared/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~shared/ui/dropdown-menu';
import type { Wallet } from './wallet.types';

type Props = {
  wallet: Wallet;
  openButton?: ReactNode;
  updateButton?: ReactNode;
  deleteButton?: ReactNode;
};

export const WalletCard = ({ wallet, openButton, updateButton, deleteButton }: Props) => {
  const badgeVariant = () => {
    if (wallet.balance) {
      if (wallet?.balance > 0) return 'success';
      if (wallet?.balance < 0) return 'destructive';
    }
    return 'secondary';
  };

  return (
    <Card className='flex flex-col justify-between'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='text-xl transition-colors hover:text-primary'>
          <Link to={pathKeys.wallet.byId(wallet.id)}>{wallet.title}</Link>
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon'>
              <MoreHorizontal className='size-6' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {openButton && (
              <DropdownMenuItem asChild onClick={() => console.log('open')}>
                <Button className='w-full px-2 py-1.5 justify-start cursor-pointer' variant='ghost'>
                  <ExternalLink className='size-4 mr-2' />
                  Открыть
                </Button>
              </DropdownMenuItem>
            )}
            {updateButton && (
              <DropdownMenuItem asChild onClick={() => console.log('edit')}>
                <Button className='w-full px-2 py-1.5 justify-start cursor-pointer' variant='ghost'>
                  <Pencil className='size-4 mr-2' />
                  Редактировать
                </Button>
              </DropdownMenuItem>
            )}
            {deleteButton && <DropdownMenuItem asChild>{deleteButton}</DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <Badge variant={badgeVariant()}>{wallet.balance} ₽</Badge>
      </CardContent>
    </Card>
  );
};

import { ChevronsDown, ChevronsUp, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetLastDayTransactionsOfWallet } from '~entities/wallet';
import { pathKeys } from '~shared/lib/react-router';
import { translateDate } from '~shared/lib/time';
import { Badge } from '~shared/ui/badge';
import { Button } from '~shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '~shared/ui/card';
import { Loader } from '~shared/ui/loader';
import { Ruble } from '~shared/ui/ruble';

export const LastDayTransactions = ({ walletId }: { walletId: number }) => {
  const { data, isPending } = useGetLastDayTransactionsOfWallet(walletId);

  if (isPending) {
    return <Loader className='w-full' variant='md' />;
  }

  if (!data) {
    return null;
  }

  return (
    <Card className='flex flex-col'>
      <CardHeader>
        <CardTitle className='text-xl'>История</CardTitle>
        <CardDescription>Транзакции за {data && translateDate(data[0]?.createdAt)}</CardDescription>
      </CardHeader>
      <CardContent className='flex-1'>
        <ul className='flex flex-col gap-1'>
          {data &&
            data.map(({ id, type, title, amount, transactionTag }) => (
              <li
                key={id}
                className='flex flex-row items-start sm:items-center gap-4 not-last-child:border-b not-last-child:pb-2 not-first-child:mt-2'
              >
                {type === 'INCOME' ? (
                  <ChevronsUp className='size-5 text-success ' />
                ) : (
                  <ChevronsDown className='size-5 text-destructive ' />
                )}{' '}
                <span className='flex flex-col items-start sm:items-center sm:flex-row gap-1 sm:gap-2 text-sm'>
                  {title}

                  <Badge variant='outline' className='w-fit h-fit'>
                    <i
                      className='size-3 rounded-full mr-2'
                      style={{ backgroundColor: transactionTag.color }}
                    />
                    {transactionTag.title}
                  </Badge>
                </span>
                <span className='ml-auto text-sm min-w-max'>
                  <Ruble>{amount}</Ruble>
                </span>
              </li>
            ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className='w-full md:w-fit' variant='outline' asChild>
          <Link to={pathKeys.wallet.transactions(walletId)}>
            <LayoutGrid className='size-4 mr-2' />
            Показать еще
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

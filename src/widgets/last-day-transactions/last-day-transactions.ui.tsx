import { ChevronsDown, ChevronsUp } from 'lucide-react';
import { useGetLastDayTransactionsOfWallet } from '~entities/wallet';
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
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>История</CardTitle>
        <CardDescription>Транзакции за {data && translateDate(data[0]?.createdAt)}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='flex flex-col gap-1'>
          {data &&
            data.map(({ id, type, title, amount, transactionTag }) => (
              <li key={id} className='flex flex-row gap-4'>
                {type === 'INCOME' ? (
                  <ChevronsUp className='size-5 text-success' />
                ) : (
                  <ChevronsDown className='size-5 text-destructive' />
                )}{' '}
                <span className='flex-1 flex flex-row gap-4'>
                  {title}

                  <Badge variant='outline'>
                    <i
                      className='size-3 rounded-full mr-2'
                      style={{ backgroundColor: transactionTag.color }}
                    />
                    {transactionTag.title}
                  </Badge>
                </span>
                <span className='ml-auto'>
                  <Ruble>{amount}</Ruble>
                </span>
              </li>
            ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className='lg:w-fit mt-4' variant='outline'>
          Показать еще
        </Button>
      </CardFooter>
    </Card>
  );
};

import { Badge } from '~shared/ui/badge';
import { Card, CardFooter, CardHeader, CardTitle } from '~shared/ui/card';
import type { Transaction } from './transaction.types';

type Props = {
  transaction: Transaction;
};
export const TransactionCard = ({ transaction }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{transaction.title}</CardTitle>
      </CardHeader>
      <CardFooter>
        <Badge variant={transaction.amount > 0 ? 'success' : 'destructive'}>
          {transaction.amount}
        </Badge>
      </CardFooter>
    </Card>
  );
};

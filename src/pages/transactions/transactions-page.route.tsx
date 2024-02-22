import { useParams } from 'react-router-dom';
import { useGetOneWalletQuery } from '~entities/wallet';
import { PageHeader } from '~shared/ui/page-header';
import { TransactionsTable } from '~widgets/transactions-table';

const TransactionsPage = () => {
  const { walletId } = useParams();
  const { data: walletData } = useGetOneWalletQuery(walletId ? +walletId : 0);

  if (!walletData) {
    return null;
  }

  return (
    <>
      <PageHeader
        title='Транзакции'
        description={`История транзакций кошелька "${walletData.title || ''}"`}
      />
      <TransactionsTable />
    </>
  );
};

export default TransactionsPage;

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { badgeVariant, useGetOneWalletQuery } from '~entities/wallet';
import { CreateTransactionButton, CreateTransactionDialog } from '~features/transaction';
import { Badge } from '~shared/ui/badge';
import { Loader } from '~shared/ui/loader';
import { PageHeader } from '~shared/ui/page-header';
import { CreateTransactionForm } from '~widgets/create-transaction-form';
import { LastDayTransactions } from '~widgets/last-day-transactions';

const WalletPage = () => {
  const { walletId = '' } = useParams();

  const { data: wallet, isLoading } = useGetOneWalletQuery(+walletId);

  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const toggleOpenCreate = () => setOpenCreate(() => !openCreate);

  if (!wallet) {
    return 'No wallet found';
  }

  return (
    <>
      <PageHeader
        title={isLoading ? <Loader /> : wallet.title}
        badge={
          <Badge className='text-sm w-auto' variant={badgeVariant(wallet)}>
            {wallet.balance} ₽
          </Badge>
        }
        button={
          <CreateTransactionDialog open={openCreate} setOpen={setOpenCreate}>
            <CreateTransactionButton onClick={toggleOpenCreate} />
            <CreateTransactionForm walletId={+walletId} closeDialog={toggleOpenCreate} />
          </CreateTransactionDialog>
        }
      />

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <LastDayTransactions walletId={+walletId} />
        <LastDayTransactions walletId={+walletId} />
      </div>
    </>
  );
};

export default WalletPage;

import { useParams } from 'react-router-dom';
import { useGetOneWalletQuery } from '~entities/wallet';
import { Loader } from '~shared/ui/loader';
import { PageHeader } from '~shared/ui/page-header';

const WalletPage = () => {
  const { walletId = '' } = useParams();

  const { data: wallet, isLoading } = useGetOneWalletQuery(+walletId);

  return (
    <PageHeader
      title={isLoading ? <Loader /> : wallet?.title}
      description={isLoading ? null : 'Информация о кошельке'}
    />
  );
};

export default WalletPage;

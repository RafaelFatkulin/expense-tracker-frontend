import { useParams } from 'react-router-dom';
import { useGetOneWalletQuery } from '~entities/wallet';
import { PageHeader } from '~shared/ui/page-header';

const StatisticsPage = () => {
  const { walletId } = useParams();
  const { data } = useGetOneWalletQuery(walletId ? +walletId : 0);

  return <PageHeader title='Статистика' description={`Статистика кошелька "${data?.title}"`} />;
};

export default StatisticsPage;

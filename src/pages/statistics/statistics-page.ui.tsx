import { useParams } from 'react-router-dom';
import { useGetOneWalletQuery } from '~entities/wallet';
import { PageHeader } from '~shared/ui/page-header';
import { Calendar } from '~widgets/calendar';
import { TagBars } from '~widgets/tag-bars';

const StatisticsPage = () => {
  const { walletId } = useParams();
  const { data } = useGetOneWalletQuery(walletId ? +walletId : 0);

  return (
    <>
      <PageHeader title='Статистика' description={`Статистика кошелька "${data?.title}"`} />

      <div className='flex flex-col gap-8'>
        <Calendar />
        <TagBars />
      </div>
    </>
  );
};

export default StatisticsPage;

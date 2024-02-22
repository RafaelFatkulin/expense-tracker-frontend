import { ResponsivePie } from '@nivo/pie';
import { PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetWalletTransactionSumQuery } from '~entities/wallet';
import { pathKeys } from '~shared/lib/react-router';
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

type Props = {
  walletId: number;
};

export const WalletStats = ({ walletId }: Props) => {
  const { data, isPending } = useGetWalletTransactionSumQuery(walletId);

  if (!data || (!data[0].value && !data[1].value)) {
    return null;
  }

  if (isPending) {
    return <Loader className='w-full' variant='md' />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>Статистика</CardTitle>
        <CardDescription>Доходы и расходы за последний месяц</CardDescription>
      </CardHeader>
      <CardContent className='max-h-72 h-full'>
        <ResponsivePie
          data={data.map((item) => ({
            id: item.name === 'expense' ? 'Расходы' : 'Доходы',
            label: item.name,
            value: item.value,
            color: item.name === 'expense' ? 'hsl(0 84.2% 60.2%)' : 'hsl(142.1 76.2% 36.3%)'
          }))}
          margin={{ top: 12, right: 12, bottom: 12, left: 12 }}
          innerRadius={0.2}
          padAngle={4}
          cornerRadius={6}
          activeOuterRadiusOffset={8}
          borderWidth={0.5}
          borderColor={{ from: 'color', modifiers: [['darker', 0.01]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor='hsl(var(--popover-foreground))'
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={100}
          arcLabelsTextColor='hsl(var(--popover-foreground))'
          valueFormat={(value) => `${Number(value).toLocaleString('ru-RU')} ₽`}
          colors={(bar) =>
            bar.label === 'expense' ? 'hsl(0 84.2% 60.2%)' : 'hsl(142.1 76.2% 36.3%)'
          }
          theme={{
            labels: {
              text: {
                fontSize: 14
              }
            },
            text: {
              fontFamily: "'Inter', sans-serif"
            },
            tooltip: {
              basic: {},
              container: {
                color: 'hsl(var(--popover-foreground))',
                backgroundColor: 'hsl(var(--popover))',
                borderColor: 'hsl(var(--border))',
                borderWidth: 1
              }
            }
          }}
        />
      </CardContent>
      <CardFooter>
        <Button className='w-full md:w-fit' variant='outline' asChild>
          <Link to={pathKeys.wallet.statistics(walletId)}>
            <PieChart className='size-4 mr-2' />
            Подробнее
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

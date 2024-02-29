import { useParams } from 'react-router-dom';
import type { TooltipProps } from 'recharts';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { useGetTagsDataQuery } from '~entities/wallet';
import { useMediaQuery } from '~shared/lib/media';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~shared/ui/card';
import { Loader } from '~shared/ui/loader';

const TooltipContent = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (!active || !payload || !payload[0]) {
    return null;
  }

  return (
    <div className='bg-popover text-popover-foreground shadow rounded-md px-4 py-2'>
      <div className='flex items-center justify-between gap-2'>
        <span className='text-sm font-medium text-popover-foreground'>{label}</span>
        <span className='text-sm font-medium text-popover-foreground'>
          {Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB'
          }).format(payload[0].value as number)}
        </span>
      </div>
    </div>
  );
};

export const TagBars = () => {
  const { walletId = 0 } = useParams();
  const { data, isPending } = useGetTagsDataQuery(+walletId);

  const isDesktop = useMediaQuery('(min-width: 992px)');

  if (isPending) {
    return <Loader className='w-full' variant='md' />;
  }

  if (!data) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>Тэги</CardTitle>
        <CardDescription>Доходы и расходы по тэгам</CardDescription>
      </CardHeader>
      <CardContent className='h-[360px] lg:h-[480px]'>
        <ResponsiveContainer>
          <BarChart data={data.filter((entry) => entry.amount > 0)} layout='horizontal'>
            <XAxis
              hide={!isDesktop}
              dataKey='tag'
              stroke='hsl(var(--secondary-foreground))'
              fontSize={14}
            />
            <Tooltip cursor={{ fill: 'hsl(var(--border))' }} content={TooltipContent} />
            <Bar
              layout='vertical'
              direction={1}
              dataKey='amount'
              fill='hsl(var(--primary))'
              radius={[6, 6, 0, 0]}
              label={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

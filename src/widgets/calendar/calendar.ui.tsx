import { ResponsiveCalendar } from '@nivo/calendar';
import { useParams } from 'react-router-dom';
import { useGetCalendarQuery } from '~entities/wallet';
import { cn } from '~shared/lib/cn';
import { useMediaQuery } from '~shared/lib/media';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~shared/ui/card';
import { Loader } from '~shared/ui/loader';

type CalendarTooltipProps = {
  day: string;
  color: string;
  value: string;
};

const CalendarTooltip = ({ color, day, value }: CalendarTooltipProps) => {
  return (
    <div className='px-3 py-1.5 bg-popover text-popover-foreground shadow-md rounded-md border text-sm flex flex-row items-center'>
      <div className='size-4 w-4 h-4 mr-2 rounded-full' style={{ backgroundColor: color }} />
      <span className='mr-2'>{new Intl.DateTimeFormat('ru-RU').format(new Date(day))}</span>
      <span className='font-semibold'>
        {new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: 'RUB'
        }).format(+value)}
      </span>
    </div>
  );
};

const MonthLegend = (date: Date) => {
  const monthName = new Intl.DateTimeFormat('ru-RU', {
    month: 'short'
  })
    .format(date)
    .toString();

  return monthName.charAt(0).toUpperCase() + monthName.slice(1);
};

export const Calendar = () => {
  const { walletId } = useParams();
  const { data, isPending } = useGetCalendarQuery(walletId ? +walletId : 0);

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
        <CardTitle className='text-xl'>Календарь</CardTitle>
        <CardDescription>Доходы и расходы за последний год</CardDescription>
      </CardHeader>
      <CardContent className='h-[720px] lg:h-[360px]'>
        <div className={cn('w-full h-full', !isDesktop && 'p-8')}>
          <ResponsiveCalendar
            data={data}
            from={new Date(new Date().getFullYear(), 0, 1)}
            to={new Date(new Date().getFullYear(), 11, 31)}
            emptyColor='hsl(var(--card))'
            colors={[
              '#f47560',
              '#e47f6a',
              '#d38974',
              '#c3927e',
              '#b39c88',
              '#a2a693',
              '#92b09d',
              '#82b9a7',
              '#71c3b1',
              '#61cdbb'
            ]}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={40}
            monthBorderColor='hsl(var(--border))'
            dayBorderWidth={1}
            monthBorderWidth={1}
            monthLegend={(_a, _b, date) => MonthLegend(date)}
            dayBorderColor='hsl(var(--border))'
            tooltip={CalendarTooltip}
            direction={isDesktop ? 'horizontal' : 'vertical'}
            theme={{
              text: {
                fill: 'currentColor',
                fontSize: 14
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

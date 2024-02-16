import type { KeyboardEvent } from 'react';
import { memo } from 'react';
import { Palette } from 'lucide-react';
import type { UseFormSetValue } from 'react-hook-form';
import { cn } from '~shared/lib/cn';
import { colors } from '~shared/lib/colors';
import { Button } from '~shared/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '~shared/ui/popover';
import { ScrollArea } from '~shared/ui/scroll-area';

type Props = {
  value: string;
  setValue: UseFormSetValue<any>;
};

export const ColorPicker = memo(({ value, setValue }: Props) => {
  const onClick = (color: string) => setValue('color', color);
  const onKeyDown = (event: KeyboardEvent<HTMLElement>, color: string) => {
    if ((!event.defaultPrevented && event.key === ' ') || event.key === 'Enter') {
      setValue('color', color);
    }
  };

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button type='button' variant='outline' className='justify-start w-full'>
          {value ? (
            <>
              <div
                style={{ backgroundColor: `${value}` }}
                className='h-4 w-4 mr-2 rounded !bg-center !bg-cover transition-all'
              />
              {value}
            </>
          ) : (
            <>
              <Palette className='h-4 w-4 mr-2' />
              <span>Выберите цвет</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='w-[17rem]'>
        <ScrollArea className='w-full h-[200px] rounded scroll-pr-2.5'>
          <div className='flex flex-row flex-wrap gap-1.5'>
            {colors.map((color) => (
              <i
                tabIndex={0}
                role='button'
                key={color}
                aria-label={color}
                className={cn(
                  'w-5 h-5 rounded cursor-pointer',
                  color === value && 'outline outline-offset-1 outline-primary'
                )}
                style={{ backgroundColor: color }}
                onClick={() => onClick(color)}
                onKeyDown={(e) => onKeyDown(e, color)}
              />
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
});

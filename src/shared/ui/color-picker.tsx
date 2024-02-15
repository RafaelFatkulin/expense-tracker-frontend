import { Palette } from 'lucide-react';
import type { UseFormSetValue } from 'react-hook-form';
import { colors } from '~shared/lib/colors';
import { Button } from '~shared/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '~shared/ui/popover';
import { ScrollArea } from '~shared/ui/scroll-area';

type Props = {
  value: string;
  setValue: UseFormSetValue<any>;
};

export const ColorPicker = ({ value, setValue }: Props) => {
  console.log('render');
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
      <PopoverContent align='start' className='w-64'>
        <ScrollArea className='w-full h-[200px] rounded scroll-pr-2.5'>
          <div className=' flex flex-row flex-wrap gap-1'>
            {colors.map((color) => (
              <div
                tabIndex={0}
                role='button'
                key={color}
                className='w-5 h-5 rounded cursor-pointer'
                style={{ backgroundColor: color }}
                onClick={() => setValue('color', color)}
                onKeyDown={(event) => {
                  if ((!event.defaultPrevented && event.key === ' ') || event.key === 'Enter') {
                    setValue('color', color);
                  }
                }}
              >
                <span className='sr-only'>{color}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

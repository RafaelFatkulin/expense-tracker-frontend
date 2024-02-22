import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons';
import type { Table } from '@tanstack/react-table';
import { cn } from '~shared/lib/cn';
import { Button } from '~shared/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~shared/ui/select';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  selectable?: boolean;
}

export const TablePagination = <TData,>({
  table,
  selectable = false
}: DataTablePaginationProps<TData>) => (
  <div className='flex items-center justify-between px-2 mt-4'>
    {selectable && (
      <div className='flex-1 text-sm text-muted-foreground'>
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} строк выбрано.
      </div>
    )}
    <div
      className={cn('flex items-center flex-wrap gap-2', !selectable && 'flex-1 justify-between')}
    >
      <div className='flex items-center space-x-2'>
        <p className='text-sm font-medium'>Кол-во строк</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className='h-8 w-[70px]'>
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side='top'>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='flex  items-center justify-center text-sm font-medium'>
        Страница {table.getState().pagination.pageIndex + 1} из {table.getPageCount()}
      </div>
      <div className='flex items-center'>
        <Button
          variant='outline'
          className='hidden h-8 w-8 p-0 lg:flex'
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className='sr-only'>Начало</span>
          <DoubleArrowLeftIcon className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className='sr-only'>Предыдущая</span>
          <ChevronLeftIcon className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className='sr-only'>Следующая</span>
          <ChevronRightIcon className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          className='hidden h-8 w-8 p-0 lg:flex'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className='sr-only'>Последняя</span>
          <DoubleArrowRightIcon className='h-4 w-4' />
        </Button>
      </div>
    </div>
  </div>
);

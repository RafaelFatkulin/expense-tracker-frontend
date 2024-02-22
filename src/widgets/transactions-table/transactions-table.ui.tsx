import { useState } from 'react';
import type { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/react-table';
import {
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { useParams } from 'react-router-dom';
import type { Tag } from '~entities/tag';
import type { Transaction, TransactionType } from '~entities/transaction';
import { useGetWalletTransactionsQuery } from '~entities/transaction';
import { translateType } from '~shared/lib/translator';
import { Badge } from '~shared/ui/badge';
import { Button } from '~shared/ui/button';
import { Input } from '~shared/ui/input';
import { Loader } from '~shared/ui/loader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~shared/ui/table';
import { TablePagination } from '~shared/ui/table-pagination';
import { TypeChevron } from '~shared/ui/type-chevron';

const columns: ColumnDef<Transaction, unknown>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <div className='flex flex-row items-center gap-2'>
          <Input
            placeholder='Название'
            className='h-auto px-1.5 py-1 max-w-448'
            value={column.getFilterValue() as string}
            onChange={(e) => column.setFilterValue(e.target.value)}
          />
          <Button
            variant='ghost'
            size='icon'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown className='size-4' />
          </Button>
        </div>
      );
    }
  },
  {
    accessorKey: 'transactionTag',
    sortingFn: (curr, next, columnId) => {
      const currentVal: Tag = curr.getValue(columnId);
      const nextVal: Tag = next.getValue(columnId);

      if (currentVal.title < nextVal.title) return 1;
      if (currentVal.title > nextVal.title) return -1;
      return 0;
    },
    filterFn: (row, columnId, filterValue: string, addMeta) => {
      const value: Tag = row.getValue(columnId);

      if (value.title.toLowerCase().includes(filterValue.toLowerCase())) {
        addMeta({
          filterMatched: true
        });
        return true;
      }

      return false;
    },
    header: ({ column }) => {
      return (
        <div className='flex flex-row items-center gap-2 w-fit'>
          <Input
            placeholder='Тэг'
            className='h-auto px-1.5 py-1 max-w-32'
            value={column.getFilterValue() as string}
            onChange={(e) => column.setFilterValue(e.target.value)}
          />
          <Button
            variant='ghost'
            size='icon'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown className='size-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const transactionTag: Tag = row.getValue('transactionTag');
      return (
        <Badge variant='outline'>
          <i
            className='size-2 rounded-full mr-2'
            style={{ backgroundColor: transactionTag.color }}
          />
          {transactionTag.title}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <div className='flex flex-row items-center gap-2'>
          Тип
          <Button
            variant='ghost'
            size='icon'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown className='size-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const type: string = row.getValue('type');
      return (
        <span className='flex flex-row items-center'>
          <TypeChevron type={type as TransactionType} />
          {translateType(type)}
        </span>
      );
    }
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <div className='flex flex-row items-center gap-2'>
          <Input
            placeholder='Дата'
            type='date'
            className='h-auto px-1.5 py-1 max-w-32'
            value={column.getFilterValue() as string}
            onChange={(e) => column.setFilterValue(e.target.value)}
          />
          <Button
            variant='ghost'
            size='icon'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown className='size-4' />
          </Button>
        </div>
      );
    },
    sortingFn: 'datetime',
    cell: ({ row }) => {
      const date: Date = row.getValue('createdAt');
      return new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(date));
    }
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <div className='flex flex-row items-center gap-2'>
          Сумма
          <Button
            variant='ghost'
            size='icon'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown className='size-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB'
      }).format(amount);
    }
  }
];

export const TransactionsTable = () => {
  const { walletId } = useParams();
  const { data, isPending } = useGetWalletTransactionsQuery(walletId ? +walletId : 0);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    }
  });

  if (isPending) {
    return <Loader className='w-full' variant='md' />;
  }

  return (
    <>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>Нет данных</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination table={table} />
    </>
  );
};

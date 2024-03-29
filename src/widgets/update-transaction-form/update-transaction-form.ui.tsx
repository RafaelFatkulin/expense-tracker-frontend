import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { ChevronsDown, ChevronsUp, Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useGetAllTagsQuery } from '~entities/tag';
import {
  transactionTypes,
  UpdateTransactionDtoSchema,
  useUpdateTransactionMutation
} from '~entities/transaction';
import type { Transaction, UpdateTransactionDto, TransactionType } from '~entities/transaction';
import { useUpdateTransactionContext } from '~features/transaction';
import { cn } from '~shared/lib/cn';
import { Button } from '~shared/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '~shared/ui/command';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~shared/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~shared/ui/form';
import { Input } from '~shared/ui/input';
import { Loader } from '~shared/ui/loader';
import { Popover, PopoverContent, PopoverTrigger } from '~shared/ui/popover';

type Props = {
  transaction: Transaction;
};

export const UpdateTransactionForm = ({ transaction }: Props) => {
  const { walletId } = useParams();
  const { setIsOpen } = useUpdateTransactionContext();
  const { data: tags, isPending: isPendingTags } = useGetAllTagsQuery();
  const { mutate, isPending } = useUpdateTransactionMutation(transaction.id, +walletId!);

  const [typesOpen, setTypesOpen] = useState<boolean>(false);
  const [tagsOpen, setTagsOpen] = useState<boolean>(false);

  const form = useForm<UpdateTransactionDto>({
    resolver: zodResolver(UpdateTransactionDtoSchema),
    defaultValues: {
      title: transaction.title || '',
      type: transaction.type || '',
      amount: transaction.amount || '',
      transactionTagId: transaction.transactionTag.id || 0
    }
  });
  const onTypeSelect = (value: TransactionType) => {
    form.setValue('type', value);
    setTypesOpen(false);
  };

  const onTagSelect = (id: number) => {
    form.setValue('transactionTagId', id);
    setTagsOpen(false);
  };

  const onSubmit = (values: UpdateTransactionDto) =>
    mutate(
      {
        id: transaction.id,
        updateTransactionDto: values
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          form.reset();
        }
      }
    );

  useEffect(() => {
    form.reset({
      title: transaction.title || '',
      type: transaction.type || '',
      amount: transaction.amount || '',
      transactionTagId: transaction.transactionTag.id || 0
    });
  }, [form, transaction]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Редактирование транзакции</DialogTitle>
        <DialogDescription>Введите новую информацию для транзакции.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form className='grid gap-3' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input placeholder='Transaction #1' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Тип</FormLabel>
                <Popover open={typesOpen} onOpenChange={setTypesOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn(
                          'w-full justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          <span className='flex flex-row items-center'>
                            {transactionTypes.find((type) => type.value === field.value)?.value ===
                            'EXPENSE' ? (
                              <ChevronsDown className='size-4 mr-2 text-destructive' />
                            ) : (
                              <ChevronsUp className='size-4 mr-2 text-success' />
                            )}
                            {transactionTypes.find((type) => type.value === field.value)?.label}
                          </span>
                        ) : (
                          'Выберите тип'
                        )}
                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align='start' className='w-[15rem] p-0'>
                    <Command>
                      <CommandInput placeholder='Поиск типа...' className='h-9' />
                      <CommandEmpty>Типы не найдены.</CommandEmpty>
                      <CommandGroup>
                        {transactionTypes.map((type) => (
                          <CommandItem
                            value={type.label}
                            key={type.value}
                            onSelect={() => onTypeSelect(type.value)}
                          >
                            {type.value === 'EXPENSE' ? (
                              <ChevronsDown className='size-4 mr-2 text-destructive' />
                            ) : (
                              <ChevronsUp className='size-4 mr-2 text-success' />
                            )}
                            {type.label}
                            <CheckIcon
                              className={cn(
                                'ml-auto h-4 w-4',
                                type.value === field.value ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='transactionTagId'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Тэг</FormLabel>
                <Popover open={tagsOpen} onOpenChange={setTagsOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn(
                          'w-full justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {isPendingTags && <Loader variant='sm' className='mr-2' />}
                        {field.value && tags ? (
                          <div className='flex flex-row gap-2 items-center'>
                            <div
                              className='size-4 rounded'
                              style={{
                                backgroundColor: tags.find((tag) => tag.id === field.value)?.color
                              }}
                            />
                            <span className='flex flex-row'>
                              {tags.find((tag) => tag.id === field.value)?.title}
                            </span>
                          </div>
                        ) : (
                          'Выберите тип'
                        )}
                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align='start' className='w-[15rem] p-0'>
                    <Command>
                      <CommandInput placeholder='Поиск типа...' className='h-9' />
                      <CommandEmpty>Типы не найдены.</CommandEmpty>
                      <CommandGroup>
                        {tags &&
                          tags.map((tag) => (
                            <CommandItem
                              value={tag.title}
                              key={tag.title}
                              onSelect={() => onTagSelect(tag.id)}
                            >
                              <div
                                className='size-4 rounded mr-2'
                                style={{ backgroundColor: tag.color }}
                              />
                              {tag.title}
                              <CheckIcon
                                className={cn(
                                  'ml-auto h-4 w-4',
                                  tag.id === field.value ? 'opacity-100' : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Сумма(в рублях)</FormLabel>
                <FormControl>
                  <Input type='number' step='0.01' placeholder='Введите сумму' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={isPending}>
            {isPending ? (
              <Loader variant='sm' className='mr-2' />
            ) : (
              <Pencil className='size-4 mr-2' />
            )}
            Редактировать
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useGetAllTagsQuery } from '~entities/tag';
import type { CreateTransactionDto } from '~entities/transaction';
import {
  CreateTransactionDtoSchema,
  TransactionType,
  useCreateTransactionMutation
} from '~entities/transaction';
import { cn } from '~shared/lib/cn';
import { Button } from '~shared/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '~shared/ui/command';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~shared/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~shared/ui/form';
import { Input } from '~shared/ui/input';
import { Loader } from '~shared/ui/loader';
import { Popover, PopoverContent, PopoverTrigger } from '~shared/ui/popover';

const types = [
  { label: 'Доход', value: TransactionType.INCOME },
  { label: 'Расход', value: TransactionType.EXPENSE }
] as const;

export const CreateTransactionForm = ({
  walletId,
  closeDialog
}: {
  walletId: number;
  closeDialog: () => void;
}) => {
  const { mutate, isPending } = useCreateTransactionMutation(walletId);
  const { data: tags, isPending: isPandingTags } = useGetAllTagsQuery();

  const form = useForm({
    resolver: zodResolver(CreateTransactionDtoSchema),
    defaultValues: {
      title: '',
      type: TransactionType.EXPENSE,
      amount: '',
      walletId,
      transactionTagId: ''
    }
  });

  const onSubmit = (values: CreateTransactionDto) => {
    mutate(values, {
      onSuccess: () => {
        closeDialog();
        form.reset();
      }
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Добавление транзакции</DialogTitle>
        <DialogDescription>Введите данные транзакции.</DialogDescription>
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
                <Popover>
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
                            {types.find((type) => type.value === field.value)?.value ===
                            TransactionType.EXPENSE ? (
                              <ChevronsDown className='size-4 mr-2 text-destructive' />
                            ) : (
                              <ChevronsUp className='size-4 mr-2 text-success' />
                            )}
                            {types.find((type) => type.value === field.value)?.label}
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
                        {types.map((type) => (
                          <CommandItem
                            value={type.value}
                            key={type.value}
                            onSelect={() => form.setValue('type', type.value)}
                          >
                            {type.value === TransactionType.EXPENSE ? (
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
                <Popover>
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
                        {isPandingTags ? (
                          <Loader variant='sm' className='mr-2' />
                        ) : field.value && tags ? (
                          <span className='flex flex-row'>
                            {tags.find((tag) => tag.id === +field.value)?.title}
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
                        {tags &&
                          tags.map((tag) => (
                            <CommandItem
                              value={`${tag.id}`}
                              key={tag.title}
                              onSelect={() => form.setValue('transactionTagId', tag.id)}
                            >
                              <div
                                className='size-4 rounded mr-2'
                                style={{ backgroundColor: tag.color }}
                              />
                              {tag.title}
                              <CheckIcon
                                className={cn(
                                  'ml-auto h-4 w-4',
                                  tag.id === +field.value ? 'opacity-100' : 'opacity-0'
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
          <Button type='submit'>Добавить</Button>
        </form>
      </Form>
    </DialogContent>
  );
};

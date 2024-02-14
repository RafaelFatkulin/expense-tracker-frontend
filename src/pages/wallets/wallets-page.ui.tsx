import { useState } from 'react';
import { useGetAllWalletsQuery, WalletCard } from '~entities/wallet';
import { CreateWalletButton, CreateWalletDialog, DeleteWalletButton } from '~features/wallet';
import { Loader } from '~shared/ui/loader';
import { PageHeader } from '~shared/ui/page-header';
import { Text } from '~shared/ui/text';
import { CreateWalletForm } from '~widgets/create-wallet-form';

const WalletsPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: wallets, isLoading } = useGetAllWalletsQuery();

  const toggleOpen = () => setOpen(() => !open);

  return (
    <>
      <PageHeader
        title='Кошельки'
        description='Управляйте вашими кошельками'
        button={
          <CreateWalletDialog open={open} setOpen={setOpen}>
            <CreateWalletButton onClick={toggleOpen} />
            <CreateWalletForm closeDialog={toggleOpen} />
          </CreateWalletDialog>
        }
      />

      {isLoading && <Loader className='w-full' variant='md' />}
      {wallets &&
        (wallets.length > 0 ? (
          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {wallets.map((wallet) => (
              <WalletCard
                key={wallet.id}
                wallet={wallet}
                deleteButton={<DeleteWalletButton wallet={wallet} />}
              />
            ))}
          </ul>
        ) : (
          <Text>У вас ещё нет кошельков? Попробуйте создать один.</Text>
        ))}
    </>
  );
};

export default WalletsPage;

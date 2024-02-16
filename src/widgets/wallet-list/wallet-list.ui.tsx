import { useGetAllWalletsQuery, WalletCard } from '~entities/wallet';
import { DeleteWalletButton, UpdateWalletButton } from '~features/wallet';
import { Loader } from '~shared/ui/loader';
import { Text } from '~shared/ui/text';

export const WalletList = () => {
  const { data: wallets, isLoading } = useGetAllWalletsQuery();

  if (isLoading) {
    return <Loader className='w-full' variant='md' />;
  }

  return (
    wallets &&
    (wallets.length > 0 ? (
      <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8'>
        {wallets.map((wallet) => (
          <WalletCard
            key={wallet.id}
            wallet={wallet}
            updateButton={<UpdateWalletButton wallet={wallet} />}
            deleteButton={<DeleteWalletButton wallet={wallet} />}
          />
        ))}
      </div>
    ) : (
      <Text>У вас ещё нет кошельков? Попробуйте создать один.</Text>
    ))
  );
};

import { useState } from 'react';
import { useGetAllWalletsQuery } from '~entities/wallet';
import { CreateWalletButton, CreateWalletDialog } from '~features/wallet/create';
import { Loader } from '~shared/ui/loader';
import { PageHeader } from '~shared/ui/page-header';
import { CreateWalletForm } from '~widgets/create-wallet-form';

const WalletsPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetAllWalletsQuery();

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
      {data && (
        <ul>
          {data.map(({ id, title, balance }) => (
            <li key={id}>
              {title} - {balance}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default WalletsPage;

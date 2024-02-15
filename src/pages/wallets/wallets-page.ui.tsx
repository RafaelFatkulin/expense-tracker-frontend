import { useState } from 'react';
import { CreateWalletButton, CreateWalletDialog } from '~features/wallet';
import { PageHeader } from '~shared/ui/page-header';
import { CreateWalletForm } from '~widgets/create-wallet-form';
import { WalletList } from '~widgets/wallet-list';

const WalletsPage = () => {
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const toggleOpenCreate = () => setOpenCreate(() => !openCreate);

  return (
    <>
      <PageHeader
        title='Кошельки'
        description='Управляйте вашими кошельками'
        button={
          <CreateWalletDialog open={openCreate} setOpen={setOpenCreate}>
            <CreateWalletButton onClick={toggleOpenCreate} />
            <CreateWalletForm closeDialog={toggleOpenCreate} />
          </CreateWalletDialog>
        }
      />

      <WalletList />
    </>
  );
};

export default WalletsPage;

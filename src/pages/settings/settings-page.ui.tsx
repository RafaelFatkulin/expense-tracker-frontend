import { PageHeader } from '~shared/ui/page-header';
import { ChangeEmailForm } from '~widgets/change-email-form';
import { NicknameForm } from '~widgets/nickname-form';

const SettingsPage = () => {
  return (
    <>
      <PageHeader title='Настройки' description='Редактируйте данные аккаунта' />

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <NicknameForm />
        <ChangeEmailForm />
        <div>Dolorem ipsam natus neque numquam qui quia quod repellendus sunt?</div>
        <div>Cum eaque in nulla quisquam. Beatae cupiditate dolorem quaerat soluta.</div>
      </div>
    </>
  );
};

export default SettingsPage;

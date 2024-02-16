import { useState } from 'react';
import { CreateTagButton, CreateTagDialog } from '~features/tag';
import { PageHeader } from '~shared/ui/page-header';
import { CreateTagForm } from '~widgets/create-tag-form';
import { TagList } from '~widgets/tag-list';

const TagsPage = () => {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const toggleOpenCreate = () => setOpenCreate(() => !openCreate);

  return (
    <>
      <PageHeader
        title='Тэги'
        description='Управляйте вашими тегами'
        button={
          <CreateTagDialog open={openCreate} setOpen={setOpenCreate}>
            <CreateTagButton onClick={toggleOpenCreate} />
            <CreateTagForm closeDialog={toggleOpenCreate} />
          </CreateTagDialog>
        }
      />
      <TagList />
    </>
  );
};

export default TagsPage;

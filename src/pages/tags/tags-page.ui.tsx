import { useState } from 'react';
import { useGetAllTagsQuery } from '~entities/tag';
import { CreateTagButton, CreateTagDialog } from '~features/tag';
import { Badge } from '~shared/ui/badge';
import { Loader } from '~shared/ui/loader';
import { PageHeader } from '~shared/ui/page-header';
import { Text } from '~shared/ui/text';
import { CreateTagForm } from '~widgets/create-tag-form';

const TagsPage = () => {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const toggleOpenCreate = () => setOpenCreate(() => !openCreate);

  const { data: tags, isLoading } = useGetAllTagsQuery();

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

      {isLoading && <Loader className='w-full' variant='md' />}

      {!isLoading && tags && tags.length > 0 ? (
        <ul className='flex flex-wrap flex-row gap-2'>
          {tags.map(({ id, title, color }) => (
            <Badge
              variant='default'
              className='px-4 py-2 !text-sm rounded-md'
              key={id}
              style={{ color: `${color}` }}
            >
              {title}
            </Badge>
          ))}
        </ul>
      ) : (
        <Text>У вас ещё нет тэгов? Попробуйте создать один.</Text>
      )}
    </>
  );
};

export default TagsPage;

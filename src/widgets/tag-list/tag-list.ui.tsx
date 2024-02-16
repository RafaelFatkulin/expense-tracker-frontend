import { TagListItem, useGetAllTagsQuery } from '~entities/tag';
import { DeleteTagButton, UpdateTagButton } from '~features/tag';
import { Loader } from '~shared/ui/loader';
import { Text } from '~shared/ui/text';

export const TagList = () => {
  const { data: tags, isLoading } = useGetAllTagsQuery();

  if (isLoading) {
    return <Loader className='w-full' variant='md' />;
  }

  return tags && tags.length > 0 ? (
    <div className='flex flex-wrap flex-row gap-2'>
      {tags.map((tag) => (
        <TagListItem
          key={tag.title}
          tag={tag}
          updateButton={<UpdateTagButton tag={tag} />}
          deleteButton={<DeleteTagButton tag={tag} />}
        />
      ))}
    </div>
  ) : (
    <Text>У вас ещё нет тэгов? Попробуйте создать один.</Text>
  );
};

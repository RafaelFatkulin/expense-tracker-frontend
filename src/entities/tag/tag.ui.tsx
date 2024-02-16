import type { ReactNode } from 'react';
import type { Tag } from '~entities/tag/tag.types';
import { Button } from '~shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '~shared/ui/dropdown-menu';

type Props = {
  tag: Tag;
  updateButton?: ReactNode;
  deleteButton?: ReactNode;
};

export const TagListItem = ({ tag, updateButton, deleteButton }: Props) => {
  const { id, title, color } = tag;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='px-4 py-2 whitespace-nowrap !text-sm rounded-md cursor-pointer hover:shadow-md'
          key={id}
        >
          <div className='size-5 rounded mr-2' style={{ backgroundColor: `${color}` }} />
          {title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='flex flex-col'>
        <DropdownMenuLabel>Действия</DropdownMenuLabel>
        {updateButton && <DropdownMenuItem asChild>{updateButton}</DropdownMenuItem>}
        {deleteButton && <DropdownMenuItem asChild>{deleteButton}</DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

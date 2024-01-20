import {
  flagIcon,
  todoIcon,
  linkIcon,
  teamIcon,
  searchIcon,
  commentsIcon,
  editIcon,
  filterIcon,
  eyeIcon,
  eyeClosedIcon,
  listIcon,
  plusIcon,
} from 'assets/icons';

import TemplateIcon from './TemplateIcon/TemplateIcon';

export const FlagIcon = (props: any) => <TemplateIcon {...props} icon={flagIcon} />;
export const TodoIcon = (props: any) => <TemplateIcon {...props} icon={todoIcon} />;
export const LinkIcon = (props: any) => <TemplateIcon {...props} icon={linkIcon} />;
export const TeamIcon = (props: any) => <TemplateIcon {...props} icon={teamIcon} />;
export const SearchIcon = (props: any) => <TemplateIcon {...props} icon={searchIcon} />;
export const FilterIcon = (props: any) => <TemplateIcon {...props} icon={filterIcon} />;
export const CommentsIcon = (props: any) => (
  <TemplateIcon {...props} icon={commentsIcon} />
);
export const EyeIcon = (props: any) => (
  <TemplateIcon {...props} icon={eyeIcon} width={16} height={16} />
);
export const EyeClosedIcon = (props: any) => (
  <TemplateIcon {...props} icon={eyeClosedIcon} />
);
export const EditIcon = (props: any) => <TemplateIcon {...props} icon={editIcon} />;
export const ListIcon = (props: any) => <TemplateIcon {...props} icon={listIcon} />;
export const PlusIcon = (props: any) => <TemplateIcon {...props} icon={plusIcon} />;

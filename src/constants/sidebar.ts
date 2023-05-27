import { LinkItemProps } from 'components/Sidebar/Sidebar.interface';
import { FiHome, FiEdit } from 'react-icons/fi';
import { ROUTES } from 'constants/common';

export const LINK_ITEMS: LinkItemProps[] = [
  { name: 'Home', icon: FiHome, path: ROUTES.HOME },
  { name: 'Editor', icon: FiEdit, path: ROUTES.EDITOR },
];

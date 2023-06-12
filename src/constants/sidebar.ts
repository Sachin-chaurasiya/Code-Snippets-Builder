import { LinkItemProps } from 'components/Sidebar/Sidebar.interface';
import { FiHome, FiEdit } from 'react-icons/fi';
import { ROUTES } from 'constants/common';
import { RxDashboard } from 'react-icons/rx';

export const LINK_ITEMS: LinkItemProps[] = [
  { name: 'Home', icon: FiHome, path: ROUTES.HOME },
  { name: 'Dashboard', icon: RxDashboard, path: ROUTES.DASHBOARD },
  { name: 'Editor', icon: FiEdit, path: ROUTES.EDITOR },
];

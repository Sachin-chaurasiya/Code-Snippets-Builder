import { LinkItemProps } from 'components/Sidebar/Sidebar.interface';
import { FiHome } from 'react-icons/fi';
import { ROUTES } from 'constants/common';
import { RxDashboard } from 'react-icons/rx';
import { TbTemplate } from 'react-icons/tb';

export const LINK_ITEMS: LinkItemProps[] = [
  { name: 'Home', icon: FiHome, path: ROUTES.HOME },
  { name: 'Dashboard', icon: RxDashboard, path: ROUTES.DASHBOARD },
  { name: 'Templates', icon: TbTemplate, path: ROUTES.TEMPLATES },
];

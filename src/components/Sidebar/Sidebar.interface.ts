import { FlexProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';

export interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  path: string;
}

export interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

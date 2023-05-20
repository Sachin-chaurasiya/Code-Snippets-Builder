import React, { FC } from 'react';
import { Box, useColorModeValue, BoxProps } from '@chakra-ui/react';
import { FiHome, FiEdit } from 'react-icons/fi';
import { IconType } from 'react-icons';
import NavItem from './NavItem';
import { ROUTES } from 'constant';

import BrandLogo from 'components/BrandLogo';

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, path: ROUTES.HOME },
  { name: 'Editor', icon: FiEdit, path: ROUTES.EDITOR },
];

const LeftSidebar: FC<BoxProps> = () => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w="60"
      pos="fixed"
      h="full"
      shadow="md"
    >
      <BrandLogo ml={2} />
      {LinkItems.map((link) => (
        <NavItem path={link.path} key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default LeftSidebar;

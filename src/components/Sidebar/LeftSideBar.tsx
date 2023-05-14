import React, { FC } from 'react';
import { Box, Flex, useColorModeValue, Text, BoxProps } from '@chakra-ui/react';
import { FiHome, FiEdit } from 'react-icons/fi';
import { BiCodeBlock } from 'react-icons/bi';
import { IconType } from 'react-icons';
import NavItem from './NavItem';
import { ROUTES } from '../../constants';

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, path: ROUTES.HOME },
  { name: 'Editor', icon: FiEdit, path: ROUTES.EDITOR },
];

const RightSidebar: FC<BoxProps> = () => {
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
      <Flex h="20" alignItems="center" mx="8" gap={2}>
        <BiCodeBlock fontSize={32} />
        <Text fontSize="xl" fontWeight="bold">
          Builder
        </Text>
      </Flex>
      {LinkItems.map((link) => (
        <NavItem path={link.path} key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default RightSidebar;

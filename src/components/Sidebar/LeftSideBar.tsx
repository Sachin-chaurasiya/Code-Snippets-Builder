import React, { FC } from 'react';
import { Box, Flex, useColorModeValue, Text, BoxProps } from '@chakra-ui/react';
import { FiHome, FiEdit } from 'react-icons/fi';
import { IconType } from 'react-icons';
import NavItem from './NavItem';
import { ROUTES } from 'constant';
import { AiFillCode } from 'react-icons/ai';

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
      <Flex h="20" alignItems="center" mx="8" gap={2}>
        <AiFillCode color="#2d3748" fontSize={32} />
        <Text
          fontSize="xl"
          fontWeight="bold"
          backgroundImage="linear-gradient(270deg, rgb(20, 30, 48), rgb(36, 59, 85))"
          color="transparent"
          backgroundClip="text"
        >
          <span>Snippet</span>
          <span>Builder</span>
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

export default LeftSidebar;

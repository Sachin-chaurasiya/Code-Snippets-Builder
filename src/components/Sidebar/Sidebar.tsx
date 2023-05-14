import React from 'react';
import { Box, Flex, useColorModeValue, Text } from '@chakra-ui/react';
import { FiHome, FiEdit } from 'react-icons/fi';
import { BiCodeBlock } from 'react-icons/bi';
import { IconType } from 'react-icons';
import NavItem from './NavItem';

interface LinkItemProps {
  name: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Editor', icon: FiEdit },
];

export default function Sidebar() {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w="60"
      pos="fixed"
      h="full"
    >
      <Flex h="20" alignItems="center" mx="8" gap={2}>
        <BiCodeBlock fontSize={32} />
        <Text fontSize="xl" fontWeight="bold">
          Builder
        </Text>
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}

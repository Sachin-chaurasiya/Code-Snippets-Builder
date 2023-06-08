import React, { FC } from 'react';
import { Box, useColorModeValue, BoxProps, Flex } from '@chakra-ui/react';
import NavItem from './NavItem';
import { ROUTES } from 'constants/common';

import BrandLogo from 'components/Common/BrandLogo/BrandLogo';
import { useNavigate } from 'react-router-dom';
import { LINK_ITEMS } from 'constants/sidebar';
import { FiLogOut } from 'react-icons/fi';
import { API_CLIENT } from 'api';

const LeftSidebar: FC<BoxProps> = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate(ROUTES.HOME);
  };
  return (
    <Box
      as={Flex}
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w="60"
      pos="fixed"
      h="full"
      shadow="md"
      overflow="auto"
      direction="column"
      justifyContent="space-between">
      <Box>
        <BrandLogo ml={2} onClick={handleNavigateHome} cursor="pointer" />
        {LINK_ITEMS.map((link) => (
          <NavItem path={link.path} key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
      </Box>
      <Box>
        <NavItem
          path="#"
          key="Logout"
          icon={FiLogOut}
          handleClick={API_CLIENT.logout}>
          Logout
        </NavItem>
      </Box>
    </Box>
  );
};

export default LeftSidebar;

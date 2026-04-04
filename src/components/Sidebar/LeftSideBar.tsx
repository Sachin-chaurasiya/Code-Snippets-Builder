import React, { FC, Fragment } from 'react';
import {
  Box,
  BoxProps,
  Flex,
  Spinner,
  Text,
  Avatar,
  VStack,
  Divider,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import NavItem from './NavItem';
import { ROUTES, SESSION_KEY } from 'constants/common';

import BrandLogo from 'components/Common/BrandLogo/BrandLogo';
import { useNavigate } from 'react-router-dom';
import { LINK_ITEMS } from 'constants/sidebar';
import { FiLogOut } from 'react-icons/fi';
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from 'react-icons/tb';
import { API_CLIENT } from 'api';
import Cookies from 'js-cookie';
import { useAppProvider } from 'AppProvider';

const LeftSidebar: FC<BoxProps> = () => {
  const navigate = useNavigate();
  const {
    onUpdateSession,
    isFetchingUser,
    loggedInUser,
    isSidebarCollapsed,
    onToggleSidebar,
  } = useAppProvider();

  const handleNavigateHome = () => {
    navigate(ROUTES.DASHBOARD);
  };

  const handleLogout = async () => {
    try {
      await API_CLIENT.logout();
      Cookies.remove(SESSION_KEY);
      onUpdateSession(undefined);
      navigate(ROUTES.SIGN_IN, { replace: true });
      navigate(0);
    } catch (error) {
      // do not throw toast message for this API
    }
  };

  return (
    <Fragment>
      <Box
        as={Flex}
        bg="white"
        borderRight="1px solid"
        borderColor="gray.100"
        w={isSidebarCollapsed ? '72px' : '240px'}
        pos="fixed"
        h="full"
        overflow="hidden"
        direction="column"
        justifyContent="space-between"
        display={{ base: 'none', md: 'flex' }}
        transition="width 0.2s ease"
        zIndex={10}>
        <Box>
          {/* Logo + collapse toggle */}
          <Flex
            px={isSidebarCollapsed ? 2 : 4}
            py={4}
            align="center"
            justify={isSidebarCollapsed ? 'center' : 'space-between'}>
            {isSidebarCollapsed ? (
              <Tooltip
                label="Expand sidebar"
                placement="right"
                borderRadius="lg"
                hasArrow>
                <IconButton
                  aria-label="Expand sidebar"
                  icon={<TbLayoutSidebarLeftExpand size={20} />}
                  variant="ghost"
                  size="sm"
                  color="gray.500"
                  borderRadius="lg"
                  _hover={{ color: 'brand.500', bg: 'brand.50' }}
                  onClick={onToggleSidebar}
                />
              </Tooltip>
            ) : (
              <>
                <BrandLogo
                  onClick={handleNavigateHome}
                  cursor="pointer"
                  logoSize="x-small"
                />
                <Tooltip label="Collapse sidebar" borderRadius="lg" hasArrow>
                  <IconButton
                    aria-label="Collapse sidebar"
                    icon={<TbLayoutSidebarLeftCollapse size={20} />}
                    variant="ghost"
                    size="sm"
                    color="gray.400"
                    borderRadius="lg"
                    _hover={{ color: 'brand.500', bg: 'brand.50' }}
                    onClick={onToggleSidebar}
                  />
                </Tooltip>
              </>
            )}
          </Flex>

          {/* Nav items */}
          <Box px={isSidebarCollapsed ? 2 : 3} mt={2}>
            {!isSidebarCollapsed && (
              <Text
                fontSize="xs"
                fontWeight="600"
                color="gray.400"
                textTransform="uppercase"
                letterSpacing="wider"
                px={3}
                mb={2}>
                Menu
              </Text>
            )}
            {LINK_ITEMS.map((link) => (
              <NavItem
                path={link.path}
                key={link.name}
                icon={link.icon}
                isCollapsed={isSidebarCollapsed}>
                {link.name}
              </NavItem>
            ))}
          </Box>
        </Box>

        {/* Bottom section */}
        <Box px={isSidebarCollapsed ? 2 : 3} pb={4}>
          <Divider mb={4} borderColor="gray.100" />

          {loggedInUser && !isFetchingUser && (
            <Tooltip
              label={
                isSidebarCollapsed ? loggedInUser.name || 'Profile' : undefined
              }
              placement="right"
              borderRadius="lg"
              hasArrow>
              <Flex
                align="center"
                p={isSidebarCollapsed ? 2 : 3}
                mb={2}
                borderRadius="xl"
                cursor="pointer"
                overflow="hidden"
                justify={isSidebarCollapsed ? 'center' : 'flex-start'}
                _hover={{ bg: 'gray.50' }}
                onClick={() => {
                  navigate(ROUTES.PROFILE);
                }}
                transition="all 0.2s">
                <Avatar
                  size="sm"
                  name={loggedInUser.name || loggedInUser.email}
                  bg="brand.500"
                  color="white"
                  flexShrink={0}
                />
                {!isSidebarCollapsed && (
                  <VStack
                    align="start"
                    spacing={0}
                    ml={3}
                    flex={1}
                    minW={0}
                    overflow="hidden">
                    <Text fontSize="sm" fontWeight="600" w="full" isTruncated>
                      {loggedInUser.name || 'Profile'}
                    </Text>
                    <Text fontSize="xs" color="gray.500" w="full" isTruncated>
                      {loggedInUser.email}
                    </Text>
                  </VStack>
                )}
              </Flex>
            </Tooltip>
          )}
          {isFetchingUser && (
            <Spinner
              display="block"
              margin="auto"
              size="sm"
              color="brand.500"
            />
          )}
          <NavItem
            path="#"
            key="Logout"
            icon={FiLogOut}
            handleClick={handleLogout}
            isCollapsed={isSidebarCollapsed}>
            Logout
          </NavItem>
        </Box>
      </Box>
    </Fragment>
  );
};

export default LeftSidebar;

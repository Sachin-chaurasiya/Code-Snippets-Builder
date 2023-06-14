import React, { FC, Fragment, useEffect, useState } from 'react';
import {
  Box,
  useColorModeValue,
  BoxProps,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import NavItem from './NavItem';
import { ROUTES, SESSION_KEY } from 'constants/common';

import BrandLogo from 'components/Common/BrandLogo/BrandLogo';
import { useNavigate } from 'react-router-dom';
import { LINK_ITEMS } from 'constants/sidebar';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { API_CLIENT } from 'api';
import Cookies from 'js-cookie';
import { useAppProvider } from 'AppProvider';
import { AppwriteException, Models } from 'appwrite';

const LeftSidebar: FC<BoxProps> = () => {
  const navigate = useNavigate();
  const { onUpdateSession } = useAppProvider();

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] =
    useState<Models.User<Models.Preferences>>();

  const fetchCurrentUserData = async () => {
    try {
      setIsFetching(true);
      const user = await API_CLIENT.getLoggedInUser();
      setLoggedInUser(user);
    } catch (error) {
      const exception = error as AppwriteException;
      if (exception.code === 401) {
        // handle error
        Cookies.remove(SESSION_KEY);
        navigate(ROUTES.SIGN_IN);
        navigate(0);
      }
    } finally {
      setIsFetching(false);
    }
  };

  const handleNavigateHome = () => {
    navigate(ROUTES.HOME);
  };

  const handleLogout = async () => {
    try {
      await API_CLIENT.logout();

      // remove the session
      Cookies.remove(SESSION_KEY);

      // update the session
      onUpdateSession(undefined);

      // navigate to signin page
      navigate(ROUTES.SIGN_IN, { replace: true });

      // reload the page
      navigate(0);
    } catch (error) {
      // do not throw toast message for this API
    }
  };

  useEffect(() => {
    fetchCurrentUserData();
  }, []);

  return (
    <Fragment>
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
          {loggedInUser && !isFetching && (
            <NavItem
              path={ROUTES.PROFILE}
              key={loggedInUser.name}
              icon={FiUser}>
              {loggedInUser.name ?? 'Profile'}
            </NavItem>
          )}
          {isFetching && <Spinner display="block" margin="auto" size="sm" />}
          <NavItem
            path="#"
            key="Logout"
            icon={FiLogOut}
            handleClick={handleLogout}>
            Logout
          </NavItem>
        </Box>
      </Box>
    </Fragment>
  );
};

export default LeftSidebar;

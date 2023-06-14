import { API_CLIENT } from 'api';
import { ROUTES, SESSION_KEY } from 'constants/common';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDateByDateString } from 'utils/DateTimeUtils';
import Loader from './Common/Loader/Loader';
import { Text, useToast } from '@chakra-ui/react';
import { AppwriteException } from 'appwrite';

const AuthCallback = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isFetchingSession, setIsFetchingSession] = useState<boolean>(false);

  const fetchCurrentSession = async () => {
    try {
      setIsFetchingSession(true);
      const session = await API_CLIENT.getLoggedInUserSession();

      const expiry = getDateByDateString(session.expire);

      // store the session
      Cookies.set(SESSION_KEY, session.userId, { expires: expiry });

      // navigate to home
      navigate(ROUTES.DASHBOARD);

      // refresh the page
      navigate(0);
    } catch (error) {
      const exception = error as AppwriteException;

      toast({
        description: exception.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });

      // navigate to sign in page
      navigate(ROUTES.SIGN_IN);
    } finally {
      setIsFetchingSession(false);
    }
  };

  useEffect(() => {
    fetchCurrentSession();
  }, []);

  if (isFetchingSession) {
    return <Loader />;
  }

  return <Text>Redirecting...</Text>;
};

export default AuthCallback;

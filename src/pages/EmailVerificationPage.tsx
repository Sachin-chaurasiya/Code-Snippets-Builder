import { useToast } from '@chakra-ui/react';
import { useAppProvider } from 'AppProvider';
import { API_CLIENT } from 'api';
import { AppwriteException, Models } from 'appwrite';
import Loader from 'components/Common/Loader/Loader';
import { ROUTES } from 'constants/common';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EmailVerificationPage = () => {
  const { handleUpdateLoggedInUser, loggedInUser } = useAppProvider();
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const handleUpdateVerification = async (userId: string, secret: string) => {
    try {
      await API_CLIENT.account.updateVerification(userId, secret);
      handleUpdateLoggedInUser({
        ...(loggedInUser as Models.User<Models.Preferences>),
        emailVerification: true,
      });
      navigate(ROUTES.DASHBOARD);
      toast({
        description: 'Email verified successfully!',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      const exception = error as AppwriteException;
      toast({
        description: exception.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      navigate(ROUTES.DASHBOARD);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');

    if (userId && secret) {
      handleUpdateVerification(userId, secret);
    } else {
      navigate(ROUTES.PROFILE);
    }
  }, [location.search]);

  return <Loader />;
};

export default EmailVerificationPage;

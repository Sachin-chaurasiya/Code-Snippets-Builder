import { Box, Heading, Stack } from '@chakra-ui/react';
import { useAppProvider } from 'AppProvider';

import EmailVerification from 'components/Common/EmailVerification';
import Loader from 'components/Common/Loader/Loader';
import SnippetList from 'components/SnippetList/SnippetList';
import { BORDER_RADIUS_LARGE } from 'constants/common';

import React from 'react';

const DashboardPage = () => {
  const { loggedInUser, isFetchingUser } = useAppProvider();

  if (isFetchingUser) {
    return <Loader />;
  }

  return (
    <Box bg="white" minH="100vh" borderRadius={BORDER_RADIUS_LARGE} p={4}>
      {loggedInUser?.emailVerification ? (
        <Stack spacing={6}>
          <Heading as="h4" size="md">
            Your Snippets
          </Heading>
          <SnippetList />
        </Stack>
      ) : (
        <EmailVerification email={loggedInUser?.email ?? ''} />
      )}
    </Box>
  );
};

export default DashboardPage;

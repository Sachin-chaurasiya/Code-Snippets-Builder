import { Box, Button, Divider, Heading, Stack } from '@chakra-ui/react';
import { useAppProvider } from 'AppProvider';

import EmailVerification from 'components/Common/EmailVerification';
import Loader from 'components/Common/Loader/Loader';
import SnippetList from 'components/SnippetList/SnippetList';
import SnippetTemplates from 'components/SnippetTemplates/SnippetTemplates';
import { BORDER_RADIUS_LARGE } from 'constants/common';

import React from 'react';
import { MdOutlineTour } from 'react-icons/md';

const DashboardPage = () => {
  const { loggedInUser, isFetchingUser, onStartTour } = useAppProvider();

  if (isFetchingUser) {
    return <Loader />;
  }

  return (
    <Box bg="white" minH="100vh" borderRadius={BORDER_RADIUS_LARGE} p={4}>
      {loggedInUser?.emailVerification ? (
        <Stack spacing={6}>
          <Stack justifyContent="space-between" direction="row">
            <Heading>Your Snippets</Heading>
            <Button leftIcon={<MdOutlineTour />} onClick={onStartTour}>
              Tour
            </Button>
          </Stack>
          <SnippetTemplates />
          <Divider variant="dashed" />
          <SnippetList />
        </Stack>
      ) : (
        <EmailVerification email={loggedInUser?.email ?? ''} />
      )}
    </Box>
  );
};

export default DashboardPage;

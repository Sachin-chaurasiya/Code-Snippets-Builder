import { Box, Heading, Stack } from '@chakra-ui/react';
import { useAppProvider } from 'AppProvider';
import { withVerifiedUser } from 'Hoc/withVerifiedUser';
import Loader from 'components/Common/Loader/Loader';
import SnippetList from 'components/SnippetList/SnippetList';
import { BORDER_RADIUS_LARGE } from 'constants/common';

const DashboardPage = () => {
  const { isFetchingUser } = useAppProvider();

  if (isFetchingUser) {
    return <Loader />;
  }

  return (
    <Box bg="white" minH="100vh" borderRadius={BORDER_RADIUS_LARGE} p={4}>
      <Stack spacing={6}>
        <Heading as="h4" size="md">
          Your Snippets
        </Heading>
        <SnippetList />
      </Stack>
    </Box>
  );
};

export default withVerifiedUser(DashboardPage);

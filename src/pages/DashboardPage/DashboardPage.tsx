import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useAppProvider } from 'AppProvider';
import { withVerifiedUser } from 'Hoc/withVerifiedUser';
import Loader from 'components/Common/Loader/Loader';
import SnippetList from 'components/SnippetList/SnippetList';

const DashboardPage = () => {
  const { isFetchingUser, loggedInUser } = useAppProvider();

  if (isFetchingUser) {
    return <Loader />;
  }

  const firstName = loggedInUser?.name?.split(' ')[0];

  return (
    <Box minH="100vh" p={{ base: 4, md: 8 }}>
      <Stack spacing={1} mb={8}>
        <Heading as="h3" size="lg" color="gray.900">
          {firstName ? `Welcome back, ${firstName}` : 'Your Snippets'}
        </Heading>
        <Text color="gray.500" fontSize="sm">
          Manage and organize your code snippets
        </Text>
      </Stack>
      <SnippetList />
    </Box>
  );
};

export default withVerifiedUser(DashboardPage);

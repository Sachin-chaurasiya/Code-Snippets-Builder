import { Box } from '@chakra-ui/react';
import { withVerifiedUser } from 'Hoc/withVerifiedUser';
import SnippetTemplates from 'components/SnippetTemplates/SnippetTemplates';
import React from 'react';

const TemplatesPage = () => {
  return (
    <Box minH="100vh" p={{ base: 4, md: 8 }}>
      <SnippetTemplates />
    </Box>
  );
};

export default withVerifiedUser(TemplatesPage);

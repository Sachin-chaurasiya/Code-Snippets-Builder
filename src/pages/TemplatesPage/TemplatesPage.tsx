import { Box } from '@chakra-ui/react';
import { withVerifiedUser } from 'Hoc/withVerifiedUser';
import SnippetTemplates from 'components/SnippetTemplates/SnippetTemplates';
import { BORDER_RADIUS_LARGE } from 'constants/common';
import React from 'react';

const TemplatesPage = () => {
  return (
    <Box bg="white" minH="100vh" borderRadius={BORDER_RADIUS_LARGE} p={4}>
      <SnippetTemplates />
    </Box>
  );
};

export default withVerifiedUser(TemplatesPage);

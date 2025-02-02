import React from 'react';
import { Text, VStack, Icon } from '@chakra-ui/react';
import { FiFilePlus } from 'react-icons/fi';

const NoSnippets: React.FC = () => {
  return (
    <VStack spacing={6} minHeight="100vh" p={4}>
      <Icon as={FiFilePlus} boxSize={24} color="gray.400" />
      <Text fontSize="xl" fontWeight="semibold">
        Looks like you&apos;re starting with a clean slate.
      </Text>
      <Text fontSize="lg" textAlign="center">
        No snippets have been created yet. Start by adding your first snippet
        and let your creativity flow!
      </Text>
    </VStack>
  );
};

export default NoSnippets;

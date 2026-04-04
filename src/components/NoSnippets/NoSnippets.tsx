import React from 'react';
import { Text, VStack, Icon, Box, Button } from '@chakra-ui/react';
import { FiFilePlus, FiPlus } from 'react-icons/fi';
import { DEFAULT_TEMPLATE } from 'constants/templates';
import { Snippet } from 'interfaces/AppProvider.interface';

interface NoSnippetsProps {
  onCreateSnippet?: (data: Snippet) => void;
  isCreating?: boolean;
}

const NoSnippets: React.FC<NoSnippetsProps> = ({
  onCreateSnippet,
  isCreating,
}) => {
  return (
    <VStack spacing={5} py={20} px={4}>
      <Box
        w={20}
        h={20}
        borderRadius="2xl"
        bg="brand.50"
        display="flex"
        alignItems="center"
        justifyContent="center">
        <Icon as={FiFilePlus} boxSize={10} color="brand.400" />
      </Box>
      <VStack spacing={2}>
        <Text fontSize="lg" fontWeight="700" color="gray.800">
          No snippets yet
        </Text>
        <Text fontSize="sm" color="gray.500" textAlign="center" maxW="sm">
          Create your first snippet to start showcasing your code beautifully.
        </Text>
      </VStack>
      {onCreateSnippet && (
        <Button
          variant="brand"
          size="sm"
          leftIcon={<FiPlus />}
          isLoading={isCreating}
          onClick={() => {
            onCreateSnippet(DEFAULT_TEMPLATE);
          }}>
          Create your first snippet
        </Button>
      )}
    </VStack>
  );
};

export default NoSnippets;

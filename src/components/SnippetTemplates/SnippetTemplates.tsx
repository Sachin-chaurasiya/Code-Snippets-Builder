import {
  Box,
  Grid,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { useAppProvider } from 'AppProvider';
import { API_CLIENT } from 'api';
import { AppwriteException } from 'appwrite';
import { COLLECTION_ID, DATABASE_ID, ROUTES } from 'constants/common';
import { TEMPLATES } from 'constants/templates';
import { Snippet } from 'interfaces/AppProvider.interface';
import { map, startCase } from 'lodash';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUniqueId } from 'utils/EditorUtils';

const SnippetTemplates = () => {
  const { session } = useAppProvider();
  const toast = useToast();
  const navigate = useNavigate();

  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleNavigate = (id: string) => {
    navigate(`${ROUTES.EDITOR}?id=${id}`);
  };

  const createSnippet = async (data: Snippet) => {
    const dataWithCreator: Snippet = {
      ...data,
      creator: session ?? '',
    };
    const uniqueId = getUniqueId();

    try {
      setIsCreating(true);

      const snippet = await API_CLIENT.database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        uniqueId,
        { ...dataWithCreator, snapshot: uniqueId, cover_image_base64_url: '' }
      );
      handleNavigate(snippet.$id);
      toast({
        description: 'Snippet created successfully!',
        status: 'success',
        duration: 2000,
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
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Stack spacing={6} id="templates">
      <Box>
        <Heading as="h4" size="md" color="gray.900" mb={1}>
          Templates
        </Heading>
        <Text fontSize="sm" color="gray.500">
          Start with a pre-built template to save time
        </Text>
      </Box>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={5}>
        {map(TEMPLATES, (template) => (
          <Box
            key={template.name}
            bg="white"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.100"
            overflow="hidden"
            cursor="pointer"
            transition="all 0.2s"
            _hover={{
              borderColor: 'brand.200',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
            }}
            onClick={() => {
              setSelectedTemplate(template.name);
              createSnippet(template.data);
            }}>
            {template.name === selectedTemplate && isCreating ? (
              <Flex h="160px" align="center" justify="center">
                <Spinner color="brand.500" />
              </Flex>
            ) : (
              <>
                <Image
                  src={template.image}
                  w="full"
                  h="160px"
                  objectFit="cover"
                  bg="gray.50"
                />
                <Box px={4} py={3}>
                  <Text fontSize="sm" fontWeight="600" color="gray.700">
                    {startCase(template.name)}
                  </Text>
                </Box>
              </>
            )}
          </Box>
        ))}
      </Grid>
    </Stack>
  );
};

export default SnippetTemplates;

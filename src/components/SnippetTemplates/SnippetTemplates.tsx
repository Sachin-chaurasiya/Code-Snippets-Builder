import {
  AspectRatio,
  Button,
  Grid,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useAppProvider } from 'AppProvider';
import { API_CLIENT } from 'api';
import { AppwriteException } from 'appwrite';
import {
  BORDER_RADIUS_LARGE,
  BORDER_RADIUS_MEDIUM,
  COLLECTION_ID,
  DATABASE_ID,
  ROUTES,
} from 'constants/common';
import { TEMPLATES } from 'constants/templates';
import { motion } from 'framer-motion';
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
    <Stack spacing={4} id="templates">
      <Heading as="h4" size="md">
        Templates
      </Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        {map(TEMPLATES, (template) => (
          <AspectRatio
            key={template.name}
            as={motion.div}
            whileHover={{
              scale: 1.1,
            }}
            ratio={1}
            borderRadius={BORDER_RADIUS_LARGE}>
            <Button
              aspectRatio="auto"
              bg="transparent"
              _hover={{ background: 'transparent' }}
              onClick={() => {
                setSelectedTemplate(template.name);
                createSnippet(template.data);
              }}>
              {template.name === selectedTemplate && isCreating ? (
                <Spinner />
              ) : (
                <Stack>
                  <Image
                    borderRadius={BORDER_RADIUS_MEDIUM}
                    src={template.image}
                    width="100%"
                    height="100%"
                  />
                  <Text fontWeight={400}>{startCase(template.name)}</Text>
                </Stack>
              )}
            </Button>
          </AspectRatio>
        ))}
      </Grid>
    </Stack>
  );
};

export default SnippetTemplates;

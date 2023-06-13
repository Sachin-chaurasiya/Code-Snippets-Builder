import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { API_CLIENT } from 'api';
import { AppwriteException, Models, Query } from 'appwrite';
import {
  BORDER_RADIUS_LARGE,
  BORDER_RADIUS_MEDIUM,
  COLLECTION_ID,
  DATABASE_ID,
  PRIMARY_GRADIENT_COLOR,
  ROUTES,
  SESSION_KEY,
} from 'constants/common';
import { TEMPLATES } from 'constants/templates';
import { Snippet, SnippetData } from 'interfaces/AppProvider.interface';
import Cookies from 'js-cookie';
import { map, startCase } from 'lodash';
import React, { useEffect, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { getFormattedDate } from 'utils/DateTimeUtils';
import { getUniqueId } from 'utils/EditorUtils';

const DashboardPage = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [selectedTemplate, setTemplate] = useState<string>('');

  const [isFetching, setIsFetching] = useState<boolean>(false);

  const [snippets, setSnippets] = useState<Models.DocumentList<SnippetData>>();

  const handleNavigate = (id: string) => {
    navigate(`${ROUTES.EDITOR}?id=${id}`);
  };

  const fetchSnippets = async () => {
    try {
      setIsFetching(true);
      const snippetList = await API_CLIENT.database.listDocuments<SnippetData>(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal('creator', Cookies.get(SESSION_KEY) ?? '')]
      );
      setSnippets(snippetList);
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
      setIsFetching(false);
    }
  };

  const createSnippet = async (data: Snippet) => {
    const dataWithCreator: Snippet = {
      ...data,
      creator: Cookies.get(SESSION_KEY) ?? '',
    };

    try {
      setIsCreating(true);
      const snippet = await API_CLIENT.database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        getUniqueId(),
        dataWithCreator
      );
      handleNavigate(snippet.$id);
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

  useEffect(() => {
    fetchSnippets();
  }, []);

  return (
    <Box bg="white" minH="100vh" borderRadius={BORDER_RADIUS_LARGE} p={4}>
      <Stack spacing={6}>
        <Flex gap={4}>
          <Heading>Your Snippets</Heading>
          <Button
            _hover={{
              bgGradient: PRIMARY_GRADIENT_COLOR,
            }}
            bgGradient={PRIMARY_GRADIENT_COLOR}
            color="white"
            leftIcon={<BsPlus />}
            pl={2}>
            New
          </Button>
        </Flex>
        <Stack spacing={4}>
          <Heading as="h4" size="md">
            Templates
          </Heading>
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            {map(TEMPLATES, (template) => (
              <AspectRatio
                key={template.name}
                ratio={1}
                borderRadius={BORDER_RADIUS_LARGE}>
                <Button
                  aspectRatio="auto"
                  bg="transparent"
                  _hover={{ background: 'gray.100' }}
                  onClick={() => {
                    setTemplate(template.name);
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
                      <Text>{startCase(template.name)}</Text>
                    </Stack>
                  )}
                </Button>
              </AspectRatio>
            ))}
          </Grid>
        </Stack>
        <Divider variant="dashed" />
        {isFetching ? (
          <Spinner size="lg" css={{ margin: '16px auto !important' }} />
        ) : (
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            {map(snippets?.documents, (snippet) => (
              <AspectRatio
                key={snippet.$id}
                ratio={1}
                maxHeight="200px"
                borderRadius={BORDER_RADIUS_LARGE}>
                <Button
                  variant="link"
                  as="a"
                  href={`${ROUTES.EDITOR}?id=${snippet.$id ?? ''}`}
                  color="white"
                  bgGradient={snippet.background}
                  _hover={{ background: snippet.background }}>
                  <Text>{getFormattedDate(snippet.$createdAt)}</Text>
                </Button>
              </AspectRatio>
            ))}
            <AspectRatio
              ratio={1}
              maxHeight="200px"
              border="1px"
              borderStyle="dashed"
              borderColor="gray.400"
              borderRadius={BORDER_RADIUS_LARGE}>
              <Button bg="transparent" _hover={{ background: 'gray.100' }}>
                <Stack align="center" justify="center" color={'gray.500'}>
                  <BsPlus fontSize={64} />
                  <Text>Add snippet</Text>
                </Stack>
              </Button>
            </AspectRatio>
          </Grid>
        )}
      </Stack>
    </Box>
  );
};

export default DashboardPage;

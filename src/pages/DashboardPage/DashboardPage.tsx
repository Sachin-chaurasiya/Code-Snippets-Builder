import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Grid,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useAppProvider } from 'AppProvider';
import { API_CLIENT } from 'api';
import { AppwriteException, Models, Query } from 'appwrite';
import {
  BORDER_RADIUS_LARGE,
  BORDER_RADIUS_MEDIUM,
  BUCKET_ID,
  COLLECTION_ID,
  DATABASE_ID,
  ROUTES,
} from 'constants/common';
import { DEFAULT_TEMPLATE, TEMPLATES } from 'constants/templates';
import { Snippet, SnippetData } from 'interfaces/AppProvider.interface';
import { map, startCase } from 'lodash';
import React, { useEffect, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { MdDelete, MdOutlineTour } from 'react-icons/md';
import { RxCopy } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { getUniqueId } from 'utils/EditorUtils';

const DashboardPage = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const { session, onStartTour } = useAppProvider();

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [selectedTemplate, setTemplate] = useState<string>('');

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isDuplicating, setIsDuplicating] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>('');

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
        [Query.equal('creator', session ?? '')]
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
      creator: session ?? '',
    };
    const uniqueId = getUniqueId();

    const file = new File([], uniqueId, { type: 'image/png' });

    try {
      setIsCreating(true);

      await API_CLIENT.storage.createFile(BUCKET_ID, uniqueId, file);

      const snippet = await API_CLIENT.database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        uniqueId,
        { ...dataWithCreator, snapshot: uniqueId }
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

  const duplicateSnippet = async (data: Snippet) => {
    const uniqueId = getUniqueId();

    try {
      setIsDuplicating(true);

      const snippet = await API_CLIENT.database.createDocument<SnippetData>(
        DATABASE_ID,
        COLLECTION_ID,
        uniqueId,
        data
      );

      setSnippets((prev) => ({
        ...prev,
        documents: [...(prev?.documents ?? []), snippet],
        total: (prev?.total ?? 0) + 1,
      }));
      toast({
        description: 'Snippet duplicated successfully!',
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
      setIsDuplicating(false);
    }
  };

  const deleteSnippet = async (id: string) => {
    try {
      setIsDeleting(true);
      await API_CLIENT.database.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      setSnippets((prev) => ({
        ...prev,
        documents: prev?.documents.filter((doc) => doc.$id !== id) ?? [],
        total: (prev?.total ?? 0) - 1,
      }));
      toast({
        description: 'Snippet deleted successfully!',
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
      setIsDeleting(false);
      setDeleteId('');
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  return (
    <Box bg="white" minH="100vh" borderRadius={BORDER_RADIUS_LARGE} p={4}>
      <Stack spacing={6}>
        <Stack justifyContent="space-between" direction="row">
          <Heading>Your Snippets</Heading>
          <Button leftIcon={<MdOutlineTour />} onClick={onStartTour}>
            Tour
          </Button>
        </Stack>
        <Stack spacing={4} id="templates">
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
                  _hover={{ background: 'transparent' }}
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
          <Grid templateColumns="repeat(4, 1fr)" gap={4} id="your-snippets">
            {map(snippets?.documents, (snippet) => (
              <AspectRatio
                maxHeight="200px"
                maxWidth="300px"
                key={snippet.$id}
                ratio={1}
                borderRadius={BORDER_RADIUS_LARGE}>
                <Button
                  role="group"
                  position="relative"
                  bg="transparent"
                  _hover={{ bg: 'transparent' }}
                  onClick={() => {
                    handleNavigate(snippet.$id);
                  }}>
                  <Stack
                    zIndex={5}
                    _groupHover={{ display: 'flex' }}
                    position="absolute"
                    direction="row"
                    display={'none'}>
                    <Button
                      variant="ghost"
                      color="white"
                      _hover={{ color: 'gray.600', bg: 'gray.100' }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setDeleteId(snippet.$id);
                      }}>
                      <MdDelete />
                    </Button>
                    <Button
                      isLoading={isDuplicating}
                      variant="ghost"
                      color="white"
                      _hover={{ color: 'gray.600', bg: 'gray.100' }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        duplicateSnippet({
                          background: snippet.background,
                          hideWaterMark: snippet.hideWaterMark,
                          profileInfo: snippet.profileInfo,
                          nodes: snippet.nodes,
                          creator: snippet.creator,
                          snapshot: snippet.snapshot,
                        });
                      }}>
                      <RxCopy />
                    </Button>
                  </Stack>
                  <Image
                    _groupHover={{ opacity: 0.8 }}
                    borderRadius={BORDER_RADIUS_MEDIUM}
                    src={
                      API_CLIENT.storage.getFilePreview(
                        BUCKET_ID,
                        snippet.snapshot
                      ).href
                    }
                  />
                </Button>
              </AspectRatio>
            ))}
            <AspectRatio
              id="add-snippet-button"
              maxHeight="200px"
              maxWidth="300px"
              ratio={1}
              border="1px"
              borderStyle="dashed"
              borderColor="gray.400"
              borderRadius={BORDER_RADIUS_LARGE}>
              <Button
                bg="transparent"
                _hover={{ background: 'gray.100' }}
                onClick={() => {
                  setTemplate('default');
                  createSnippet(DEFAULT_TEMPLATE);
                }}>
                {selectedTemplate === 'default' && isCreating ? (
                  <Spinner />
                ) : (
                  <Stack align="center" justify="center" color={'gray.500'}>
                    <BsPlus fontSize={64} />
                    <Text>Add snippet</Text>
                  </Stack>
                )}
              </Button>
            </AspectRatio>
          </Grid>
        )}
      </Stack>
      {deleteId ? (
        <Modal
          isCentered
          isOpen={Boolean(deleteId)}
          onClose={() => {
            setIsDeleting(false);
          }}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Are you sure?</ModalHeader>

            <ModalBody>
              The snippet will be permanently deleted. This action is
              irreversible.
            </ModalBody>

            <ModalFooter>
              <Button
                variant="ghost"
                mr={3}
                onClick={() => {
                  setDeleteId('');
                }}>
                Close
              </Button>
              <Button
                isLoading={isDeleting}
                variant="solid"
                colorScheme="red"
                onClick={() => {
                  deleteSnippet(deleteId);
                }}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : null}
    </Box>
  );
};

export default DashboardPage;

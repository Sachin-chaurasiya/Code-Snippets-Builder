import {
  AspectRatio,
  Box,
  Button,
  Grid,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  useToast,
  GridItem,
} from '@chakra-ui/react';
import { useAppProvider } from 'AppProvider';
import { API_CLIENT } from 'api';
import { AppwriteException, Models, Query } from 'appwrite';
import SpinnerLoader from 'components/Common/Loader/SpinnerLoader';
import Pagination from 'components/Pagination/Pagination';
import Sorting, { SORTING_OPTIONS } from 'components/Sorting/Sorting';
import {
  BORDER_RADIUS_LARGE,
  BORDER_RADIUS_MEDIUM,
  BUCKET_ID,
  COLLECTION_ID,
  DATABASE_ID,
  PAGE_SIZE,
  ROUTES,
} from 'constants/common';
import { DEFAULT_TEMPLATE } from 'constants/templates';
import { motion } from 'framer-motion';
import {
  Pagination as PaginationType,
  Snippet,
  SnippetData,
} from 'interfaces/AppProvider.interface';
import { map } from 'lodash';
import NoSnippetsPage from 'pages/NoSnippetsPage/NoSnippetsPage';
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { RxCopy } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { getUniqueId } from 'utils/EditorUtils';

const SnippetList = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { session, loggedInUser, isFetchingUser } = useAppProvider();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isDuplicating, setIsDuplicating] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>('');

  const [snippets, setSnippets] = useState<Models.DocumentList<SnippetData>>();

  const [pagination, setPagination] = useState<PaginationType>({
    currentPage: 1,
    totalPages: 1,
  });

  const [sortingQuery, setSortingQuery] = useState<string>(
    Query.orderDesc(SORTING_OPTIONS[0])
  );

  const handleNavigate = (id: string) => {
    navigate(`${ROUTES.EDITOR}?id=${id}`);
  };

  const fetchSnippets = async (offset = 0) => {
    try {
      setIsFetching(true);
      const snippetList = await API_CLIENT.database.listDocuments<SnippetData>(
        DATABASE_ID,
        COLLECTION_ID,
        [
          Query.equal('creator', session ?? ''),
          Query.limit(PAGE_SIZE),
          Query.offset(offset),
          sortingQuery,
        ]
      );
      setSnippets(snippetList);
      setPagination({
        currentPage: Math.ceil(offset / PAGE_SIZE) + 1,
        totalPages:
          snippetList.total === 0
            ? 1
            : Math.ceil(snippetList.total / PAGE_SIZE),
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
      setIsFetching(false);
    }
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
    if (loggedInUser?.emailVerification) {
      fetchSnippets();
    }
  }, [loggedInUser, sortingQuery]);

  if (isFetchingUser) return <SpinnerLoader />;

  return (
    <Box p={4} w="full" h="full">
      <Stack
        direction="row"
        justifyContent="space-between"
        mb={4}
        px={isFetching ? 0 : 4}>
        <Button
          _hover={{ bg: 'brand.500' }}
          borderRadius={BORDER_RADIUS_MEDIUM}
          bg="brand.500"
          color="white"
          isLoading={isCreating}
          isDisabled={isFetching}
          size="sm"
          onClick={() => {
            createSnippet(DEFAULT_TEMPLATE);
          }}>
          Create Snippet
        </Button>
        <Sorting isLoading={isFetching} onChange={setSortingQuery} />
      </Stack>

      <Grid templateColumns="repeat(4, 1fr)" gap={4} id="your-snippets">
        {isFetching ? (
          <>
            {map(Array.from(Array(12).keys()), (index) => (
              <AspectRatio
                key={index}
                ratio={1}
                maxHeight="200px"
                maxWidth="250px"
                borderRadius={BORDER_RADIUS_LARGE}>
                <Skeleton
                  borderRadius={BORDER_RADIUS_LARGE}
                  startColor="gray.200"
                  endColor="gray.100"
                  isLoaded={false}
                  bg="gray.500"
                  color="white"
                  fadeDuration={1}
                />
              </AspectRatio>
            ))}
          </>
        ) : (
          <>
            {snippets?.total === 0 ? (
              <GridItem colSpan={4}>
                <NoSnippetsPage />
              </GridItem>
            ) : (
              map(snippets?.documents, (snippet) => (
                <AspectRatio
                  as={motion.div}
                  whileHover={{
                    scale: 1.1,
                  }}
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
                            cover_image_base64_url:
                              snippet.cover_image_base64_url,
                          });
                        }}>
                        <RxCopy />
                      </Button>
                    </Stack>
                    <Image
                      _groupHover={{ opacity: 0.8 }}
                      borderRadius={BORDER_RADIUS_MEDIUM}
                      src={
                        snippet?.cover_image_base64_url ??
                        API_CLIENT.storage.getFilePreview(
                          BUCKET_ID,
                          snippet.snapshot
                        ).href
                      }
                    />
                  </Button>
                </AspectRatio>
              ))
            )}
          </>
        )}
      </Grid>

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onChange={fetchSnippets}
        isFetching={isFetching}
      />
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

export default SnippetList;

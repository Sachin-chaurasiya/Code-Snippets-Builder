import {
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
  Flex,
  IconButton,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useAppProvider } from 'AppProvider';
import { API_CLIENT } from 'api';
import { AppwriteException, Models, Query } from 'appwrite';
import SpinnerLoader from 'components/Common/Loader/SpinnerLoader';
import NoSnippets from 'components/NoSnippets/NoSnippets';
import Pagination from 'components/Pagination/Pagination';
import Sorting, { SORTING_OPTIONS } from 'components/Sorting/Sorting';
import {
  BUCKET_ID,
  COLLECTION_ID,
  DATABASE_ID,
  PAGE_SIZE,
  ROUTES,
} from 'constants/common';
import { DEFAULT_TEMPLATE } from 'constants/templates';
import {
  Pagination as PaginationType,
  Snippet,
  SnippetData,
} from 'interfaces/AppProvider.interface';
import { map } from 'lodash';
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { RxCopy } from 'react-icons/rx';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getUniqueId } from 'utils/EditorUtils';
import { getFormattedDate } from 'utils/DateTimeUtils';

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
    <Box w="full" h="full">
      <Flex justify="space-between" align="center" mb={6}>
        <Button
          variant="brand"
          leftIcon={<FiPlus />}
          isLoading={isCreating}
          isDisabled={isFetching}
          size="sm"
          onClick={() => {
            createSnippet(DEFAULT_TEMPLATE);
          }}>
          New Snippet
        </Button>
        <Sorting isLoading={isFetching} onChange={setSortingQuery} />
      </Flex>

      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)',
        }}
        gap={5}
        id="your-snippets">
        {isFetching ? (
          <>
            {map(Array.from(Array(12).keys()), (index) => (
              <Box key={index}>
                <Skeleton
                  borderRadius="xl"
                  height="180px"
                  startColor="gray.100"
                  endColor="gray.50"
                />
              </Box>
            ))}
          </>
        ) : (
          <>
            {snippets?.total === 0 ? (
              <GridItem colSpan={4}>
                <NoSnippets
                  onCreateSnippet={createSnippet}
                  isCreating={isCreating}
                />
              </GridItem>
            ) : (
              map(snippets?.documents, (snippet) => (
                <Box
                  key={snippet.$id}
                  role="group"
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
                    handleNavigate(snippet.$id);
                  }}>
                  <Box position="relative" overflow="hidden">
                    <Image
                      h="160px"
                      w="full"
                      objectFit="cover"
                      bg="gray.50"
                      src={
                        snippet?.cover_image_base64_url ??
                        API_CLIENT.storage
                          .getFilePreview(BUCKET_ID, snippet.snapshot)
                          .toString()
                      }
                    />
                    {/* Hover actions overlay */}
                    <Flex
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      bg="blackAlpha.400"
                      opacity={0}
                      _groupHover={{ opacity: 1 }}
                      transition="opacity 0.2s"
                      align="center"
                      justify="center"
                      gap={2}>
                      <Tooltip label="Delete" borderRadius="lg">
                        <IconButton
                          aria-label="Delete snippet"
                          icon={<MdDelete />}
                          size="sm"
                          colorScheme="whiteAlpha"
                          color="white"
                          borderRadius="lg"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDeleteId(snippet.$id);
                          }}
                        />
                      </Tooltip>
                      <Tooltip label="Duplicate" borderRadius="lg">
                        <IconButton
                          aria-label="Duplicate snippet"
                          icon={<RxCopy />}
                          size="sm"
                          colorScheme="whiteAlpha"
                          color="white"
                          borderRadius="lg"
                          isLoading={isDuplicating}
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
                          }}
                        />
                      </Tooltip>
                    </Flex>
                  </Box>
                  <Box px={4} py={3}>
                    <Text fontSize="xs" color="gray.400">
                      {getFormattedDate(snippet.$createdAt)}
                    </Text>
                  </Box>
                </Box>
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
            setDeleteId('');
          }}>
          <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(4px)" />
          <ModalContent borderRadius="2xl" mx={4}>
            <ModalHeader fontSize="lg" fontWeight="700" pt={6}>
              Delete snippet?
            </ModalHeader>

            <ModalBody color="gray.600" fontSize="sm">
              This will permanently delete the snippet. Are you sure?
            </ModalBody>

            <ModalFooter pb={6} gap={3}>
              <Button
                variant="ghost"
                size="sm"
                borderRadius="lg"
                onClick={() => {
                  setDeleteId('');
                }}>
                Cancel
              </Button>
              <Button
                isLoading={isDeleting}
                colorScheme="red"
                size="sm"
                borderRadius="lg"
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

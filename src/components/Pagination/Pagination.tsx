import { Button, HStack, IconButton, Text } from '@chakra-ui/react';
import { PAGE_SIZE } from 'constants/common';
import React, { FC } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (offset: number) => void;
  isFetching?: boolean;
}
const Pagination: FC<PaginationProps> = ({
  currentPage,
  onChange,
  totalPages,
  isFetching,
}) => {
  if (totalPages <= 1) return null;

  return (
    <HStack justifyContent="center" mt={8} spacing={3}>
      <IconButton
        aria-label="Previous page"
        icon={<FiChevronLeft />}
        size="sm"
        variant="ghost"
        borderRadius="lg"
        color="gray.500"
        isDisabled={currentPage === 1 || isFetching}
        onClick={() => {
          onChange((currentPage - 2) * PAGE_SIZE);
        }}
      />
      <Text
        fontSize="sm"
        color="gray.500"
        fontWeight="500"
        minW="80px"
        textAlign="center">
        Page {currentPage} of {totalPages}
      </Text>
      <IconButton
        aria-label="Next page"
        icon={<FiChevronRight />}
        size="sm"
        variant="ghost"
        borderRadius="lg"
        color="gray.500"
        isDisabled={currentPage === totalPages || isFetching}
        onClick={() => {
          onChange(currentPage * PAGE_SIZE);
        }}
      />
    </HStack>
  );
};

export default Pagination;

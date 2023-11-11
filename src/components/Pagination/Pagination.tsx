import { Button, Stack } from '@chakra-ui/react';
import { PAGE_SIZE } from 'constants/common';
import React, { FC } from 'react';

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
  return (
    <Stack direction="row" justifyContent="center" mt={4}>
      <Button
        onClick={() => {
          onChange((currentPage - 2) * PAGE_SIZE);
        }}
        isDisabled={currentPage === 1 || isFetching}>
        Previous
      </Button>

      <Button variant="ghost" _hover={{ background: 'transparent' }}>
        {currentPage} / {totalPages}
      </Button>
      <Button
        onClick={() => {
          onChange(currentPage * PAGE_SIZE);
        }}
        isDisabled={currentPage === totalPages || isFetching}>
        Next
      </Button>
    </Stack>
  );
};

export default Pagination;

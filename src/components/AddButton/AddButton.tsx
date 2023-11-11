import { AspectRatio, Button, Spinner, Stack, Text } from '@chakra-ui/react';
import { BORDER_RADIUS_LARGE } from 'constants/common';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { BsPlus } from 'react-icons/bs';

interface AddButtonProps {
  isLoading: boolean;
  label: string;
  onClick?: () => void;
}

const AddButton: FC<AddButtonProps> = ({ onClick, isLoading, label }) => {
  return (
    <AspectRatio
      as={motion.div}
      whileHover={{
        scale: 1.05,
      }}
      id="add-snippet-button"
      maxHeight="200px"
      maxWidth="250px"
      ratio={1}
      border="1px"
      borderStyle="dashed"
      borderColor="gray.400"
      borderRadius={BORDER_RADIUS_LARGE}>
      <Button
        bg="transparent"
        _hover={{ background: 'gray.100' }}
        onClick={onClick}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Stack align="center" justify="center" color={'gray.500'}>
            <BsPlus fontSize={64} />
            <Text>{label}</Text>
          </Stack>
        )}
      </Button>
    </AspectRatio>
  );
};

export default AddButton;

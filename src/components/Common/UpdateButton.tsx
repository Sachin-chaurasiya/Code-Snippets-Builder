import { Button, ButtonProps } from '@chakra-ui/react';
import { BRAND_BORDER_RADIUS } from 'constants/common';
import React, { FC } from 'react';

const UpdateButton: FC<ButtonProps> = ({
  onClick,
  isDisabled,
  isLoading,
  children,
  ...rest
}) => {
  return (
    <Button
      _disabled={{
        bg: 'brand.300',
        cursor: 'not-allowed',
        _hover: {
          bg: 'brand.300',
        },
      }}
      _hover={{
        bg: 'brand.500',
      }}
      bg="brand.500"
      borderRadius={BRAND_BORDER_RADIUS}
      color="white"
      alignSelf="end"
      isDisabled={isDisabled}
      isLoading={isLoading}
      onClick={onClick}
      {...rest}>
      {children}
    </Button>
  );
};

export default UpdateButton;

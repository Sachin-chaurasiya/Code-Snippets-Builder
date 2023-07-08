import { Button, ButtonProps } from '@chakra-ui/react';
import { PRIMARY_GRADIENT_COLOR } from 'constants/common';
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
        bgGradient: 'none',
        cursor: 'not-allowed',
        _hover: {
          bgGradient: 'none',
        },
      }}
      _hover={{
        bgGradient: PRIMARY_GRADIENT_COLOR,
      }}
      bgGradient={PRIMARY_GRADIENT_COLOR}
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

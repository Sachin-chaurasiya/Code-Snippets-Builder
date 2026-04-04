import { Button, ButtonProps } from '@chakra-ui/react';
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
      variant="brand"
      size="sm"
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

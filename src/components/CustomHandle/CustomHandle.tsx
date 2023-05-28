import { Box, BoxProps } from '@chakra-ui/react';
import React, { FC } from 'react';

const CustomHandle: FC<BoxProps> = (props) => {
  return (
    <Box
      className="custom_handle"
      position="absolute"
      minWidth="5px"
      minHeight="6px"
      border="1px solid white"
      borderRadius="100%"
      {...props}
    />
  );
};

export default CustomHandle;

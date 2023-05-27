import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import BrandLogo from './BrandLogo/BrandLogo';

const MobileViewMessage = () => {
  return (
    <Box
      margin="auto"
      direction="column"
      as={Flex}
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      gap={8}
    >
      <BrandLogo gap={4} />
      <Text fontSize="md" textAlign="center">
        For the best experience, please use the desktop version of our website.
      </Text>
    </Box>
  );
};

export default MobileViewMessage;

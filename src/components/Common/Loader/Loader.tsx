import { Box, Flex, Spinner } from '@chakra-ui/react';
import React from 'react';
import BrandLogo from '../BrandLogo/BrandLogo';

const Loader = () => {
  return (
    <Box
      height="100vh"
      margin="auto"
      direction="column"
      as={Flex}
      justifyContent="center"
      alignItems="center"
    >
      <BrandLogo logoSize="large" />
      <Spinner size="lg" />
    </Box>
  );
};

export default Loader;

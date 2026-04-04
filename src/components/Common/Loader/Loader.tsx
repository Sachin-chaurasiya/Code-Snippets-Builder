import { Flex, Spinner, VStack } from '@chakra-ui/react';
import React from 'react';
import BrandLogo from '../BrandLogo/BrandLogo';

const Loader = () => {
  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <VStack spacing={6}>
        <BrandLogo logoSize="large" />
        <Spinner size="md" color="brand.500" thickness="3px" />
      </VStack>
    </Flex>
  );
};

export default Loader;

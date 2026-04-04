import React from 'react';
import { Flex, Text, VStack, Icon, Box } from '@chakra-ui/react';
import BrandLogo from '../Common/BrandLogo/BrandLogo';
import { FiMonitor } from 'react-icons/fi';

const MobileViewMessage = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bg="white"
      px={8}>
      <VStack spacing={6} textAlign="center" maxW="sm">
        <BrandLogo />
        <Box
          w={16}
          h={16}
          borderRadius="2xl"
          bg="brand.50"
          display="flex"
          alignItems="center"
          justifyContent="center">
          <Icon as={FiMonitor} boxSize={8} color="brand.500" />
        </Box>
        <VStack spacing={2}>
          <Text fontSize="lg" fontWeight="700" color="gray.800">
            Desktop recommended
          </Text>
          <Text fontSize="sm" color="gray.500" lineHeight="tall">
            The snippet editor works best on larger screens. Please switch to a
            desktop browser for the full experience.
          </Text>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default MobileViewMessage;

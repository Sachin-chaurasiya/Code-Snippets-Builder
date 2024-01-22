import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import CrashedErrorImage from 'assets/svg/crashed-error.svg';
import { BRAND_BORDER_RADIUS } from 'constants/common';
import React from 'react';
import { FallbackProps } from 'react-error-boundary';

const ErrorFallback: React.FC<FallbackProps> = ({ resetErrorBoundary }) => {
  return (
    <Box
      margin="auto"
      direction="column"
      as={Flex}
      justifyContent="center"
      alignItems="center"
      minHeight="100vh">
      <Image
        src={CrashedErrorImage}
        width={{ lg: '500px', md: '500px', sm: '400px', base: '350px' }}
      />
      <Text mb={2} fontSize="2xl">
        Something went wrong!
      </Text>
      <Button
        _hover={{
          bg: 'brand.500',
        }}
        bg="brand.500"
        borderRadius={BRAND_BORDER_RADIUS}
        color="white"
        size="md"
        onClick={resetErrorBoundary}>
        Home
      </Button>
    </Box>
  );
};

export default ErrorFallback;

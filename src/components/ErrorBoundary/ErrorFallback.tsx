import { Box, Button, Flex, Text } from '@chakra-ui/react';
import BrandLogo from 'components/Common/BrandLogo/BrandLogo';
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
      <BrandLogo />
      <Text mb={2}>Something went wrong!</Text>
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

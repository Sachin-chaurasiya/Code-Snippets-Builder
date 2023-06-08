import { Box, Button, Flex, Text } from '@chakra-ui/react';
import BrandLogo from 'components/Common/BrandLogo/BrandLogo';
import { PRIMARY_GRADIENT_COLOR } from 'constants/common';
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
          bgGradient: PRIMARY_GRADIENT_COLOR,
        }}
        bgGradient={PRIMARY_GRADIENT_COLOR}
        color="white"
        size="md"
        onClick={resetErrorBoundary}>
        Home
      </Button>
    </Box>
  );
};

export default ErrorFallback;

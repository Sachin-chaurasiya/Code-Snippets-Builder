import { Box, Button, Flex, Text } from '@chakra-ui/react';
import BrandLogo from 'components/BrandLogo';
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
      minHeight="100vh"
      gap={8}
    >
      <BrandLogo />
      <Text>Something went wrong!</Text>
      <Button
        _hover={{
          background:
            'linear-gradient(135deg, rgb(102, 126, 234), rgb(118, 75, 162))',
        }}
        background="linear-gradient(135deg, rgb(102, 126, 234), rgb(118, 75, 162))"
        color="white"
        size="lg"
        onClick={resetErrorBoundary}
      >
        Home
      </Button>
    </Box>
  );
};

export default ErrorFallback;

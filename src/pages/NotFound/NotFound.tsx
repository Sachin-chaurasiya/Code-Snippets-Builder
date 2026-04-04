import { Box, Heading, Text, Button, Flex, VStack } from '@chakra-ui/react';
import { ROUTES } from 'constants/common';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Flex
      bg="white"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
      px={6}>
      <VStack spacing={6}>
        <Box>
          <Text
            fontSize="8xl"
            fontWeight="900"
            bgGradient="linear(to-r, brand.400, brand.600)"
            bgClip="text"
            lineHeight="1">
            404
          </Text>
        </Box>
        <VStack spacing={2}>
          <Heading size="lg" color="gray.900">
            Page not found
          </Heading>
          <Text color="gray.500" fontSize="sm" maxW="sm">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </Text>
        </VStack>
        <Button
          variant="brand"
          leftIcon={<FiArrowLeft />}
          onClick={() => {
            navigate(ROUTES.HOME);
          }}>
          Back to Home
        </Button>
      </VStack>
    </Flex>
  );
};

export default NotFound;

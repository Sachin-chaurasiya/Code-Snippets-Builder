import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import { PRIMARY_GRADIENT_COLOR, ROUTES } from 'constants/common';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      as={Flex}
      justifyContent="center"
      alignItems="center"
      direction="column"
      minHeight="100vh"
      textAlign="center"
      py={10}
      px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient={PRIMARY_GRADIENT_COLOR}
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you&lsquo;re looking for does not seem to exist
      </Text>

      <Button
        colorScheme="rgb(102, 126, 234)"
        bgGradient={PRIMARY_GRADIENT_COLOR}
        color="white"
        variant="solid"
        onClick={() => {
          navigate(ROUTES.HOME);
        }}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;

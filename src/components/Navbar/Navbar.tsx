import { Stack, Flex, Button, Box } from '@chakra-ui/react';
import BrandLogo from 'components/Common/BrandLogo/BrandLogo';
import { ROUTES } from 'constants/common';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      h="72px"
      bg="rgba(255, 255, 255, 0.8)"
      backdropFilter="blur(12px)"
      borderBottom="1px solid"
      borderColor="gray.100"
      px={{ base: 4, md: 8 }}
      pos="fixed"
      top="0"
      width="full"
      zIndex="999">
      <Box>
        <BrandLogo onClick={handleNavigateHome} cursor="pointer" />
      </Box>
      <Stack direction="row" spacing={3} align="center">
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          variant="ghost"
          fontWeight="500"
          color="gray.600"
          borderRadius="lg"
          _hover={{ color: 'gray.900', bg: 'gray.100' }}
          onClick={() => {
            navigate(ROUTES.SIGN_IN);
          }}>
          Sign In
        </Button>
        <Button
          variant="brand"
          size="md"
          onClick={() => {
            navigate(ROUTES.SIGN_UP);
          }}>
          Get Started
        </Button>
      </Stack>
    </Flex>
  );
};

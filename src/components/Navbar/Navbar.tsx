import { Stack, Flex, Button } from '@chakra-ui/react';
import BrandLogo from 'components/Common/BrandLogo/BrandLogo';
import { BRAND_BORDER_RADIUS, ROUTES } from 'constants/common';
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
      h="100px"
      bg="white"
      px={4}
      pr={8}
      py={8}
      pos="fixed"
      top="0"
      width="full"
      zIndex="999">
      <Stack direction={'row'} spacing={4}>
        <BrandLogo onClick={handleNavigateHome} cursor="pointer" />
      </Stack>
      <Stack direction={'row'} spacing={4}>
        <Button
          _hover={{ bg: 'transparent' }}
          variant={'ghost'}
          border="1px solid #101828"
          borderRadius={BRAND_BORDER_RADIUS}
          onClick={() => {
            navigate(ROUTES.SIGN_IN);
          }}>
          Sign In
        </Button>
        <Button
          borderRadius={BRAND_BORDER_RADIUS}
          _hover={{ bg: 'brand.500' }}
          bg="brand.500"
          color="white"
          onClick={() => {
            navigate(ROUTES.SIGN_UP);
          }}>
          Sign Up
        </Button>
      </Stack>
    </Flex>
  );
};

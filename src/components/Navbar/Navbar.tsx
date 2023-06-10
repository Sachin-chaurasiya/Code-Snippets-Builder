import { Stack, Flex, Button } from '@chakra-ui/react';
import BrandLogo from 'components/Common/BrandLogo/BrandLogo';
import { PRIMARY_GRADIENT_COLOR, ROUTES } from 'constants/common';
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
      h="64px"
      bg="white"
      px={4}
      pr={8}
      py={2}
      pos="fixed"
      top="0"
      width="full"
      zIndex="999"
      boxShadow="sm"
      css={{
        backdropFilter: 'saturate(180%) blur(5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}>
      <Stack direction={'row'} spacing={4}>
        <BrandLogo onClick={handleNavigateHome} cursor="pointer" />
      </Stack>
      <Stack direction={'row'} spacing={4}>
        <Button as={'a'} variant={'ghost'} href={ROUTES.SIGN_IN}>
          Sign In
        </Button>
        <Button
          as={'a'}
          href={ROUTES.SIGN_UP}
          _hover={{
            bgGradient: PRIMARY_GRADIENT_COLOR,
          }}
          bgGradient={PRIMARY_GRADIENT_COLOR}
          color="white">
          Sign Up
        </Button>
      </Stack>
    </Flex>
  );
};

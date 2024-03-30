import {
  Box,
  Stack,
  HStack,
  VStack,
  Link as ChakraLink,
  Divider,
  Text,
  Button,
} from '@chakra-ui/react';
import { BsGithub, BsTwitter } from 'react-icons/bs';
import BrandLogo from '../BrandLogo/BrandLogo';
import { ROUTES } from 'constants/common';
import { Link } from 'react-router-dom';
import { GITHUB_LINK, TWITTER_LINK } from 'constants/links';

const Footer = () => {
  return (
    <>
      <Box bg="brand.500" p={{ base: 5, md: 8 }} width="100vw">
        <Stack
          spacing={{ base: 8, md: 0 }}
          justifyContent="space-between"
          direction={{ base: 'column', md: 'row' }}
          marginBottom={8}>
          <Box maxW="500px">
            <BrandLogo textColor="white" cursor="pointer" />
            <Text textColor="white" mt={2} fontSize="md">
              Drag and drop code snippet builder to showcase your code in a
              beautiful and professional manner.
            </Text>
          </Box>
          <HStack
            spacing={4}
            justifyContent={{ sm: 'space-between', md: 'normal' }}>
            <VStack spacing={4} alignItems="flex-start">
              <Text textColor="white" fontSize="md" fontWeight="bold">
                Quick Links
              </Text>
              <VStack spacing={2} alignItems="flex-start" color="white">
                <Link to={ROUTES.HOME}>Home</Link>
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
              </VStack>
            </VStack>
          </HStack>
          <HStack>
            <VStack spacing={4} alignItems="flex-start">
              <Text textColor="white" fontSize="md" fontWeight="bold">
                Social Links
              </Text>
              <VStack spacing={2} alignItems="flex-start" color="white">
                <ChakraLink href={TWITTER_LINK} target="_blank">
                  <Button
                    pl={0}
                    leftIcon={<BsTwitter />}
                    variant="ghost"
                    colorScheme="black">
                    Twitter
                  </Button>
                </ChakraLink>
                <ChakraLink href={GITHUB_LINK} target="_blank">
                  <Button
                    pl={0}
                    leftIcon={<BsGithub />}
                    variant="ghost"
                    colorScheme="black">
                    GitHub
                  </Button>
                </ChakraLink>
              </VStack>
            </VStack>
          </HStack>
        </Stack>
        <Divider my={8} />
        <Text textColor="white" textAlign="center">
          © {new Date().getFullYear()} SnippetBuilder. All rights reserved.
        </Text>
      </Box>
    </>
  );
};

export default Footer;

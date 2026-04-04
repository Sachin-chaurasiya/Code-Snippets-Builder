import {
  Box,
  Stack,
  HStack,
  VStack,
  Link as ChakraLink,
  Divider,
  Text,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { BsGithub } from 'react-icons/bs';
import BrandLogo from '../BrandLogo/BrandLogo';
import { ROUTES } from 'constants/common';
import { Link } from 'react-router-dom';
import { GITHUB_LINK } from 'constants/links';

const Footer = () => {
  return (
    <Box bg="gray.900" px={{ base: 6, md: 12 }} pt={16} pb={8}>
      <Stack
        spacing={{ base: 10, md: 0 }}
        justifyContent="space-between"
        direction={{ base: 'column', md: 'row' }}
        mb={12}>
        <Box maxW="360px">
          <BrandLogo textColor="white" logoType="light" cursor="pointer" />
          <Text color="gray.400" mt={3} fontSize="sm" lineHeight="tall">
            Create stunning code snippets with our drag-and-drop builder.
            Showcase your code beautifully and professionally.
          </Text>
        </Box>

        <HStack spacing={{ base: 12, md: 16 }} align="start">
          <VStack spacing={4} alignItems="flex-start">
            <Text
              color="gray.400"
              fontSize="xs"
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="wider">
              Product
            </Text>
            <VStack spacing={3} alignItems="flex-start">
              <Link to={ROUTES.HOME}>
                <Text
                  color="gray.300"
                  fontSize="sm"
                  _hover={{ color: 'white' }}
                  transition="color 0.15s">
                  Home
                </Text>
              </Link>
              <Link to={ROUTES.SIGN_IN}>
                <Text
                  color="gray.300"
                  fontSize="sm"
                  _hover={{ color: 'white' }}
                  transition="color 0.15s">
                  Sign In
                </Text>
              </Link>
              <Link to={ROUTES.SIGN_UP}>
                <Text
                  color="gray.300"
                  fontSize="sm"
                  _hover={{ color: 'white' }}
                  transition="color 0.15s">
                  Sign Up
                </Text>
              </Link>
            </VStack>
          </VStack>

          <VStack spacing={4} alignItems="flex-start">
            <Text
              color="gray.400"
              fontSize="xs"
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="wider">
              Connect
            </Text>
            <VStack spacing={3} alignItems="flex-start">
              <ChakraLink
                href={GITHUB_LINK}
                target="_blank"
                _hover={{ textDecoration: 'none' }}>
                <Flex
                  align="center"
                  gap={2}
                  color="gray.300"
                  _hover={{ color: 'white' }}
                  transition="color 0.15s">
                  <Icon as={BsGithub} fontSize="sm" />
                  <Text fontSize="sm">GitHub</Text>
                </Flex>
              </ChakraLink>
            </VStack>
          </VStack>
        </HStack>
      </Stack>

      <Divider borderColor="gray.700" />

      <Text color="gray.500" textAlign="center" mt={8} fontSize="sm">
        &copy; {new Date().getFullYear()} SnippetBuilder. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;

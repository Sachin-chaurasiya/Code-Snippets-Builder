import {
  Box,
  Button,
  Grid,
  Link as ChakraLink,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  GITHUB_CONTRIBUTORS,
  GITHUB_LINK,
  PERSONAL_WEBSITE,
  TWITTER_LINK,
} from 'constants/links';
import { BsGithub, BsTwitter } from 'react-icons/bs';
import BrandLogo from '../BrandLogo/BrandLogo';
import { ROUTES } from 'constants/common';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box as="footer" bg="brand.500" py={8} textColor="white">
      <Grid templateColumns="repeat(3, 1fr)" gap={8} px={8} pb={4}>
        <Box>
          <Stack spacing={0}>
            <BrandLogo ml="-10px" textColor="white" cursor="pointer" />
            <Text>
              Drag and drop code snippet builder to showcase your code in a
              beautiful and professional manner.
            </Text>
          </Stack>
        </Box>
        <Box>
          <Stack spacing={2}>
            <Text fontWeight="bold">Quick Links</Text>
            <Link to={ROUTES.HOME}>Home</Link>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
          </Stack>
        </Box>
        <Box>
          <Stack spacing={2}>
            <Text fontWeight="bold">Social Links</Text>
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
          </Stack>
        </Box>
      </Grid>
      <Text textAlign="center">
        Made with ❤️ by{' '}
        <ChakraLink href={PERSONAL_WEBSITE} target="_blank">
          Sachin Chaurasiya{' '}
        </ChakraLink>
        and{' '}
        <ChakraLink href={GITHUB_CONTRIBUTORS} target="_blank">
          Folks
        </ChakraLink>{' '}
      </Text>
    </Box>
  );
};

export default Footer;

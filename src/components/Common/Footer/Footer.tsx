import { Box, Button, Link, Stack, Text } from '@chakra-ui/react';
import {
  GITHUB_CONTRIBUTORS,
  GITHUB_LINK,
  PERSONAL_WEBSITE,
  TWITTER_LINK,
} from 'constants/links';
import React from 'react';
import { BsGithub, BsTwitter } from 'react-icons/bs';

const Footer = () => {
  return (
    <Box as="footer" bg="gray.100" py={4}>
      <Stack
        px={8}
        direction="row"
        align="center"
        justifyContent="space-between">
        <Box>
          <Text>
            Made with ❤️ by{' '}
            <Link href={PERSONAL_WEBSITE} target="_blank">
              Sachin Chaurasiya{' '}
            </Link>
            and{' '}
            <Link href={GITHUB_CONTRIBUTORS} target="_blank">
              Folks
            </Link>{' '}
          </Text>
        </Box>
        <Stack direction="row" spacing={0}>
          <Link href={TWITTER_LINK} target="_blank">
            <Button
              leftIcon={<BsTwitter />}
              variant="ghost"
              colorScheme="twitter">
              Twitter
            </Button>
          </Link>
          <Link href={GITHUB_LINK} target="_blank">
            <Button leftIcon={<BsGithub />} variant="ghost" colorScheme="black">
              GitHub
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;

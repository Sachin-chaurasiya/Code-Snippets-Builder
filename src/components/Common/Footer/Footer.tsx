import { Box, Link, Text } from '@chakra-ui/react';
import { PERSONAL_WEBSITE } from 'constants/links';
import React from 'react';

const Footer = () => {
  return (
    <Box as="footer" bg="gray.100" py={4}>
      <Box maxWidth="container.md" mx="auto" textAlign="center">
        <Text>
          Made with ❤️ by <Link href={PERSONAL_WEBSITE}>Sachin Chaurasiya</Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;

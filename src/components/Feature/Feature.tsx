import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { APP_TEXT_COLOR } from 'constants/common';
import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

interface FeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const Feature: FC<FeatureProps> = ({ icon, title, description }) => (
  <Stack
    as={motion.div}
    whileHover={{
      scale: 1.1,
    }}
    spacing={4}
    bg="white"
    align="center"
    justifyContent="center"
    border="1px solid transparent"
    borderRadius="1.25rem"
    p={4}>
    <Box boxSize={10}>{icon}</Box>
    <Stack spacing={4} align="center" justifyContent="center">
      <Heading size="md" color={APP_TEXT_COLOR}>
        {title}
      </Heading>
      <Text color={APP_TEXT_COLOR} textAlign="center">
        {description}
      </Text>
    </Stack>
  </Stack>
);

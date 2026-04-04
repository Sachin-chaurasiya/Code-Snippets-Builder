import { Box, Heading, Stack, Text } from '@chakra-ui/react';
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
      y: -4,
    }}
    spacing={5}
    bg="rgba(255, 255, 255, 0.1)"
    backdropFilter="blur(10px)"
    border="1px solid rgba(255, 255, 255, 0.15)"
    borderRadius="2xl"
    p={8}
    cursor="default"
    transition="all 0.3s ease">
    <Box
      w={14}
      h={14}
      borderRadius="xl"
      bg="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="0 4px 14px rgba(94, 113, 228, 0.15)">
      {icon}
    </Box>
    <Stack spacing={3}>
      <Heading size="md" color="white" fontWeight="700">
        {title}
      </Heading>
      <Text color="whiteAlpha.800" lineHeight="tall" fontSize="sm">
        {description}
      </Text>
    </Stack>
  </Stack>
);

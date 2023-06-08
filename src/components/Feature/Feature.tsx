import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface FeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const Feature: FC<FeatureProps> = ({ icon, title, description }) => (
  <Flex>
    <Box boxSize={10}>{icon}</Box>
    <Flex direction="column">
      <Heading size="md" ml={3} color="white">
        {title}
      </Heading>
      <Text color="white" ml={3}>
        {description}
      </Text>
    </Flex>
  </Flex>
);

import { Box, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';
import CountUp from 'react-countup';

interface StatsCardProps {
  count: number;
  description: string;
  index: number;
}

const StatsCard: FC<StatsCardProps> = ({ count, description }) => {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="2xl"
      p={8}
      position="relative"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{
        borderColor: 'brand.200',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 30px rgba(94, 113, 228, 0.08)',
      }}>
      <Box
        position="absolute"
        top={0}
        right={0}
        w="80px"
        h="80px"
        bg="brand.50"
        borderBottomLeftRadius="full"
        opacity={0.6}
      />
      <Heading as="h2" fontSize="3xl" mb={2} color="brand.500" fontWeight="800">
        <CountUp end={count} suffix="+" duration={5} />
      </Heading>
      <Text fontWeight="500" fontSize="sm" color="gray.500">
        {description}
      </Text>
    </Box>
  );
};

export default StatsCard;

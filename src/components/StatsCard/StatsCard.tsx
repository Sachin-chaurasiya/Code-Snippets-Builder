import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { FC } from 'react';
import StatsImage from 'assets/svg/stats.svg';
import SpikesImage from 'assets/svg/spikes.svg';
import CountUp from 'react-countup';

interface StatsCardProps {
  count: number;
  description: string;
  index: number;
}

const StatsCard: FC<StatsCardProps> = ({ count, description, index }) => {
  return (
    <Box
      css={{
        backgroundColor: '#fcfcfc',
        border: '1px solid #dce1f9',
        borderRadius: '1.25rem',
        padding: '2rem',
        position: 'relative',
        boxShadow: '0 0 52px rgba(30,34,52,.1)',
      }}>
      <Heading as="h2" mb="1rem" color="brand.500">
        <span className="counterup">
          <CountUp end={count} suffix="+" />
        </span>
      </Heading>
      <Text fontWeight={400} fontSize="1.125rem">
        {description}
      </Text>
      <Image
        src={index % 2 === 0 ? StatsImage : SpikesImage}
        position="absolute"
        top="1rem"
        bottom="auto"
        right="1rem"
        left="auto"
        width="2.25rem"
        height="2.25rem"
      />
    </Box>
  );
};

export default StatsCard;

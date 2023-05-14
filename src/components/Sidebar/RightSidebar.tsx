import React, { FC } from 'react';
import { Box, Flex, useColorModeValue, Text, BoxProps } from '@chakra-ui/react';

const RightSidebar: FC<BoxProps> = () => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderLeft="1px"
      borderLeftColor={useColorModeValue('gray.200', 'gray.700')}
      w="80"
      pos="fixed"
      h="full"
      right={0}
      top={0}
      bottom={0}
      shadow="md"
    >
      <Flex h="20" alignItems="center" mx="8" gap={2}>
        <Text fontWeight="bold">Configure</Text>
      </Flex>
    </Box>
  );
};

export default RightSidebar;

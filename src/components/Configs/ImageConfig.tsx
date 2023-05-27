import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useAppProvider } from 'AppProvider';
import { BORDER_RADIUS } from 'constants/editor';
import { map } from 'lodash';
import React from 'react';

const ImageConfig = () => {
  const { image, onUpdateImageData } = useAppProvider();

  return (
    <Box alignItems="flex-start" as={VStack} mb={4}>
      <Text fontSize="lg" fontWeight="bold">
        Image
      </Text>
      <Divider />
      <VStack w="100%" alignItems="flex-start">
        <FormControl>
          <FormLabel>Border Radius</FormLabel>
          <Select
            value={image.borderRadius}
            onChange={(e) =>
              onUpdateImageData({
                ...image,
                borderRadius: e.target.value,
              })
            }
          >
            {map(BORDER_RADIUS, (size) => (
              <option key={size} value={`${size}px`}>
                {`${size}px`}
              </option>
            ))}
          </Select>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default ImageConfig;

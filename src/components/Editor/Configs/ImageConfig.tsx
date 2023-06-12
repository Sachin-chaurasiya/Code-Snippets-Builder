import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BORDER_RADIUS } from 'constants/editor';
import { COMMON_TEXT_PROPS } from 'constants/text';
import { NodeData } from 'interfaces/Editor.interface';
import { map } from 'lodash';
import React, { FC } from 'react';

type ImageConfigProps = {
  nodeId: string;
} & NodeData;

const ImageConfig: FC<ImageConfigProps> = ({
  nodeId,
  onUpdate,
  borderRadius,
}) => {
  return (
    <Box alignItems="flex-start" as={VStack} mb={4}>
      <Text fontSize="lg" fontWeight="bold" {...COMMON_TEXT_PROPS}>
        Image
      </Text>
      <Divider />
      <VStack w="100%" alignItems="flex-start">
        <FormControl>
          <FormLabel>Border Radius</FormLabel>
          <Select
            value={borderRadius}
            onChange={(e) => {
              onUpdate(nodeId, {
                borderRadius: e.target.value,
              });
            }}>
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

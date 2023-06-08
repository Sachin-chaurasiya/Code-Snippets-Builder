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
import { BORDER_RADIUS, FONT_SIZES, NAMED_COLORS } from 'constants/editor';
import { COMMON_TEXT_PROPS } from 'constants/text';
import { map, startCase, toNumber } from 'lodash';
import React from 'react';

const TextConfig = () => {
  const { text, onUpdateTextData } = useAppProvider();

  return (
    <Box alignItems="flex-start" as={VStack} mb={4}>
      <Text fontSize="lg" fontWeight="bold" {...COMMON_TEXT_PROPS}>
        Text
      </Text>
      <Divider />
      <VStack w="100%" alignItems="flex-start">
        <FormControl>
          <FormLabel>Background Color</FormLabel>
          <Select
            value={text.background}
            onChange={(e) => {
              onUpdateTextData({
                ...text,
                background: e.target.value,
              });
            }}>
            {map(NAMED_COLORS, (color) => (
              <option key={color} value={color}>
                {startCase(color)}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Font Size</FormLabel>
          <Select
            value={text.fontSize}
            onChange={(e) => {
              onUpdateTextData({
                ...text,
                fontSize: toNumber(e.target.value),
              });
            }}>
            {map(FONT_SIZES, (size) => (
              <option key={size} value={size}>
                {`${size}px`}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Border Radius</FormLabel>
          <Select
            value={text.borderRadius}
            onChange={(e) => {
              onUpdateTextData({
                ...text,
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

export default TextConfig;

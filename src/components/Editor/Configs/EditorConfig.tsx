import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FONT_SIZES, LANGUAGE_OPTIONS, THEME_OPTIONS } from 'constants/editor';
import { COMMON_TEXT_PROPS } from 'constants/text';
import { NodeData } from 'interfaces/Editor.interface';
import { map, startCase, toNumber } from 'lodash';
import React, { FC } from 'react';

type EditorConfigProps = {
  nodeId: string;
} & NodeData;

const EditorConfig: FC<EditorConfigProps> = ({
  nodeId,
  onUpdate,
  language,
  theme,
  fontSize,
}) => {
  return (
    <Box alignItems="flex-start" as={VStack} mb={4}>
      <Text fontSize="lg" fontWeight="bold" {...COMMON_TEXT_PROPS}>
        Editor
      </Text>
      <Divider />
      <VStack w="100%" alignItems="flex-start">
        <FormControl>
          <FormLabel>Language</FormLabel>
          <Select
            value={language}
            onChange={(e) => {
              onUpdate(nodeId, {
                language: e.target.value,
              });
            }}>
            {map(LANGUAGE_OPTIONS, (language: string) => (
              <option key={language} value={language}>
                {startCase(language)}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Theme</FormLabel>
          <Select
            value={theme}
            onChange={(e) => {
              onUpdate(nodeId, {
                theme: e.target.value,
              });
            }}>
            {map(THEME_OPTIONS, (name) => (
              <option key={name} value={name}>
                {startCase(name)}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Font Size</FormLabel>
          <Select
            value={fontSize}
            onChange={(e) => {
              onUpdate(nodeId, {
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
      </VStack>
    </Box>
  );
};

export default EditorConfig;

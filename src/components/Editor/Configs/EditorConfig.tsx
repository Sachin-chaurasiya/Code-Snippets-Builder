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
import { FONT_SIZES, LANGUAGE_OPTIONS, THEME_OPTIONS } from 'constants/editor';
import { COMMON_TEXT_PROPS } from 'constants/text';
import { map, startCase, toNumber } from 'lodash';
import React from 'react';

const EditorConfig = () => {
  const { editor, onUpdateEditorData } = useAppProvider();

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
            value={editor.language}
            onChange={(e) => {
              onUpdateEditorData({
                ...editor,
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
            value={editor.theme}
            onChange={(e) => {
              onUpdateEditorData({
                ...editor,
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
            value={editor.fontSize}
            onChange={(e) => {
              onUpdateEditorData({
                ...editor,
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

import React, { FC } from 'react';
import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  BoxProps,
  Select,
  VStack,
  FormLabel,
  FormControl,
  Divider,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';

import { map, startCase, toNumber } from 'lodash';
import {
  BORDER_RADIUS,
  FONT_SIZES,
  GRADIENT_COLORS,
  LANGUAGE_OPTIONS,
  NAMED_COLORS,
  THEME_OPTIONS,
} from 'constants/editor';
import { useAppProvider } from 'AppProvider';
import { BiCheckCircle } from 'react-icons/bi';

const EditorSidebar: FC<BoxProps> = () => {
  const {
    editor,
    text,
    image,
    background,
    onUpdateEditorData,
    onUpdateTextData,
    onUpdateImageData,
    onUpdateBackground,
  } = useAppProvider();

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
      px="6"
      overflow="auto"
    >
      <Flex h="20" alignItems="center" gap={2}>
        <Text fontSize="xl" fontWeight="bold">
          Configure
        </Text>
      </Flex>

      <Box alignItems="flex-start" as={VStack} mb={4}>
        <FormControl>
          <FormLabel fontSize="lg" fontWeight="bold">
            Background
          </FormLabel>
          <SimpleGrid columns={5} gap={4}>
            {GRADIENT_COLORS.map((c) => (
              <Button
                key={c}
                aria-label={c}
                background={c}
                height="40px"
                width="40px"
                padding={0}
                minWidth="unset"
                borderRadius={3}
                _hover={{ background: c }}
                onClick={() => onUpdateBackground(c)}
              >
                {background === c ? (
                  <BiCheckCircle
                    color="white"
                    style={{ display: 'block', margin: 'auto' }}
                  />
                ) : (
                  <></>
                )}
              </Button>
            ))}
          </SimpleGrid>
        </FormControl>
      </Box>

      <Box alignItems="flex-start" as={VStack} mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          Editor
        </Text>
        <Divider />
        <VStack w="100%" alignItems="flex-start">
          <FormControl>
            <FormLabel>Language</FormLabel>
            <Select
              value={editor.language}
              onChange={(e) =>
                onUpdateEditorData({
                  ...editor,
                  language: e.target.value,
                })
              }
            >
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
              onChange={(e) =>
                onUpdateEditorData({
                  ...editor,
                  theme: e.target.value,
                })
              }
            >
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
              onChange={(e) =>
                onUpdateEditorData({
                  ...editor,
                  fontSize: toNumber(e.target.value),
                })
              }
            >
              {map(FONT_SIZES, (size) => (
                <option key={size} value={size}>
                  {`${size}px`}
                </option>
              ))}
            </Select>
          </FormControl>
        </VStack>
      </Box>

      <Box alignItems="flex-start" as={VStack} mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          Text
        </Text>
        <Divider />
        <VStack w="100%" alignItems="flex-start">
          <FormControl>
            <FormLabel>Background Color</FormLabel>
            <Select
              value={text.background}
              onChange={(e) =>
                onUpdateTextData({
                  ...text,
                  background: e.target.value,
                })
              }
            >
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
              onChange={(e) =>
                onUpdateTextData({
                  ...text,
                  fontSize: toNumber(e.target.value),
                })
              }
            >
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
              onChange={(e) =>
                onUpdateTextData({
                  ...text,
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
    </Box>
  );
};

export default EditorSidebar;

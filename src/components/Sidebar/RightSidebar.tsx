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
} from '@chakra-ui/react';
import * as prismStyles from 'react-syntax-highlighter/dist/esm/styles/prism';
import languages from 'react-syntax-highlighter/dist/esm/languages/prism/supported-languages';
import { map, startCase, toNumber } from 'lodash';
import { FONT_SIZES } from '../../constants';
import { useAppProvider } from '../../AppProvider';

const RightSidebar: FC<BoxProps> = () => {
  const {
    data: { theme, fontSize, language },
    onUpdate,
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
    >
      <Flex h="20" alignItems="center" gap={2}>
        <Text fontWeight="bold">Configure</Text>
      </Flex>

      <VStack alignItems="flex-start">
        <FormControl>
          <FormLabel>Language</FormLabel>
          <Select
            value={language}
            onChange={(e) =>
              onUpdate({ fontSize, theme, language: e.target.value })
            }
          >
            {map(languages, (language: string) => (
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
            onChange={(e) =>
              onUpdate({ fontSize, theme: e.target.value, language })
            }
          >
            {map(prismStyles, (_, name) => (
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
            onChange={(e) =>
              onUpdate({ fontSize: toNumber(e.target.value), theme, language })
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
  );
};

export default RightSidebar;

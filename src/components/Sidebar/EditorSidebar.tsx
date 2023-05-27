import React, { FC } from 'react';
import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  BoxProps,
  VStack,
  FormLabel,
  FormControl,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';

import { GRADIENT_COLORS } from 'constants/editor';
import { useAppProvider } from 'AppProvider';
import { BiCheckCircle } from 'react-icons/bi';
import EditorConfig from 'components/Configs/EditorConfig';
import TextConfig from 'components/Configs/TextConfig';
import ImageConfig from 'components/Configs/ImageConfig';
import ProfileConfig from 'components/Configs/ProfileConfig';

const EditorSidebar: FC<BoxProps> = () => {
  const { background, onUpdateBackground } = useAppProvider();

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

      <EditorConfig />
      <TextConfig />
      <ImageConfig />
      <ProfileConfig />
    </Box>
  );
};

export default EditorSidebar;

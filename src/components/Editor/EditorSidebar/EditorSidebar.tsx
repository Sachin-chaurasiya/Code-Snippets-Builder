import React, { FC } from 'react';
import { Box, Flex, useColorModeValue, Text, BoxProps } from '@chakra-ui/react';

import EditorConfig from 'components/Editor/Configs/EditorConfig';
import TextConfig from 'components/Editor/Configs/TextConfig';
import ImageConfig from 'components/Editor/Configs/ImageConfig';
import ProfileConfig from 'components/Editor/Configs/ProfileConfig';

import { COMMON_TEXT_PROPS } from 'constants/text';
import BackgroundConfig from '../Configs/BackgroundConfig';
import { useAppProvider } from 'AppProvider';
import { CUSTOM_NODES } from 'constants/editor';

const EditorSidebar: FC<BoxProps> = () => {
  const { selectedNode } = useAppProvider();

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
      overflow="auto">
      <Flex h="20" alignItems="center" gap={2}>
        <Text fontSize="xl" fontWeight="bold" {...COMMON_TEXT_PROPS}>
          Configure
        </Text>
      </Flex>

      {selectedNode?.type === CUSTOM_NODES.EDITOR_NODE && (
        <EditorConfig nodeId={selectedNode.id} {...selectedNode.data} />
      )}
      {selectedNode?.type === CUSTOM_NODES.TEXT_NODE && (
        <TextConfig nodeId={selectedNode.id} {...selectedNode.data} />
      )}
      {selectedNode?.type === CUSTOM_NODES.IMAGE_NODE && (
        <ImageConfig nodeId={selectedNode.id} {...selectedNode.data} />
      )}

      <BackgroundConfig />
      <ProfileConfig />
    </Box>
  );
};

export default EditorSidebar;

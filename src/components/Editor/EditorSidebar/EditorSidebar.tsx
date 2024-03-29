import React, { FC } from 'react';
import { Box, Flex, useColorModeValue, Text, Button } from '@chakra-ui/react';

import EditorConfig from 'components/Editor/Configs/EditorConfig';
import TextConfig from 'components/Editor/Configs/TextConfig';
import ImageConfig from 'components/Editor/Configs/ImageConfig';
import ProfileConfig from 'components/Editor/Configs/ProfileConfig';

import { COMMON_TEXT_PROPS } from 'constants/text';
import BackgroundConfig from '../Configs/BackgroundConfig';
import { useAppProvider } from 'AppProvider';
import { CUSTOM_NODES } from 'constants/editor';
import { EditorSidebarProps } from 'interfaces/Editor.interface';
import { MdOutlineTour } from 'react-icons/md';
import { BRAND_BORDER_RADIUS, BRAND_COLOR } from 'constants/common';

const EditorSidebar: FC<EditorSidebarProps> = ({
  background,
  profile,
  hideWaterMark,
  onUpdateBackground,
  onUpdateProfileData,
  onUpdateWaterMark,
}) => {
  const { selectedNode, onStartTour } = useAppProvider();

  return (
    <Box
      id="editor-sidebar"
      bg={useColorModeValue('white', 'gray.900')}
      borderLeft="1px solid #dce1f9"
      w="80"
      pos="fixed"
      h="full"
      right={0}
      top={0}
      bottom={0}
      px="6"
      overflow="auto">
      <Flex h="20" justifyContent="space-between" alignItems="center" gap={2}>
        <Text fontSize="xl" fontWeight="bold" {...COMMON_TEXT_PROPS}>
          Configure
        </Text>
        <Button
          _hover={{ bg: 'brand.500' }}
          textColor="white"
          bg={BRAND_COLOR}
          borderRadius={BRAND_BORDER_RADIUS}
          leftIcon={<MdOutlineTour />}
          onClick={onStartTour}>
          Tour
        </Button>
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

      <BackgroundConfig
        background={background}
        hideWaterMark={hideWaterMark}
        onUpdateBackground={onUpdateBackground}
        onUpdateWaterMark={onUpdateWaterMark}
      />
      <ProfileConfig
        profile={profile}
        onUpdateProfileData={onUpdateProfileData}
      />
    </Box>
  );
};

export default EditorSidebar;

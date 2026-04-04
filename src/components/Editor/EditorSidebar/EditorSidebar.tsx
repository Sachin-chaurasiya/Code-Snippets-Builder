import React, { FC } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';

import EditorConfig from 'components/Editor/Configs/EditorConfig';
import TextConfig from 'components/Editor/Configs/TextConfig';
import ImageConfig from 'components/Editor/Configs/ImageConfig';
import ProfileConfig from 'components/Editor/Configs/ProfileConfig';

import BackgroundConfig from '../Configs/BackgroundConfig';
import { useAppProvider } from 'AppProvider';
import { CUSTOM_NODES } from 'constants/editor';
import { EditorSidebarProps } from 'interfaces/Editor.interface';
import { MdOutlineTour } from 'react-icons/md';
import {
  TbLayoutSidebarRightCollapse,
  TbLayoutSidebarRightExpand,
} from 'react-icons/tb';

const EditorSidebar: FC<EditorSidebarProps> = ({
  background,
  profile,
  hideWaterMark,
  isCollapsed,
  onToggleCollapse,
  onUpdateBackground,
  onUpdateProfileData,
  onUpdateWaterMark,
}) => {
  const { selectedNode, onStartTour } = useAppProvider();

  return (
    <Box
      id="editor-sidebar"
      bg="white"
      borderLeft="1px solid"
      borderColor="gray.100"
      w={isCollapsed ? '48px' : '80'}
      pos="fixed"
      h="full"
      right={0}
      top={0}
      bottom={0}
      overflow={isCollapsed ? 'hidden' : 'auto'}
      transition="width 0.2s ease"
      zIndex={10}>
      {isCollapsed ? (
        <Flex direction="column" align="center" pt={4} gap={2}>
          <Tooltip
            label="Expand sidebar"
            placement="left"
            borderRadius="lg"
            hasArrow>
            <IconButton
              aria-label="Expand sidebar"
              icon={<TbLayoutSidebarRightExpand size={18} />}
              variant="ghost"
              size="sm"
              color="gray.400"
              borderRadius="lg"
              _hover={{ color: 'brand.500', bg: 'brand.50' }}
              onClick={onToggleCollapse}
            />
          </Tooltip>
        </Flex>
      ) : (
        <>
          <Flex
            h="16"
            px={6}
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid"
            borderColor="gray.100">
            <Text fontSize="sm" fontWeight="700" color="gray.900">
              Configure
            </Text>
            <Flex gap={1}>
              <Button
                variant="ghost"
                size="xs"
                color="gray.500"
                borderRadius="lg"
                leftIcon={<MdOutlineTour />}
                _hover={{ color: 'brand.500', bg: 'brand.50' }}
                onClick={onStartTour}>
                Tour
              </Button>
              <Tooltip label="Collapse sidebar" borderRadius="lg" hasArrow>
                <IconButton
                  aria-label="Collapse sidebar"
                  icon={<TbLayoutSidebarRightCollapse size={18} />}
                  variant="ghost"
                  size="xs"
                  color="gray.400"
                  borderRadius="lg"
                  _hover={{ color: 'brand.500', bg: 'brand.50' }}
                  onClick={onToggleCollapse}
                />
              </Tooltip>
            </Flex>
          </Flex>

          <VStack spacing={0} align="stretch" px={6} py={4}>
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
          </VStack>
        </>
      )}
    </Box>
  );
};

export default EditorSidebar;

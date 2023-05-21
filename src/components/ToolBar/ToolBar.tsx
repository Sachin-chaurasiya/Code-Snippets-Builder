import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import { BiCodeBlock, BiImage, BiText } from 'react-icons/bi';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { CUSTOM_NODES } from 'constants/editor';
import ExportButton from 'components/ExportButton/ExportButton';
import { toLower } from 'lodash';

interface ToolBarItemsProps {
  label: string;
  icon: IconType;
  nodeType: string;
}

export const ToolBarItems: ToolBarItemsProps[] = [
  {
    label: 'Editor',
    icon: BiCodeBlock,
    nodeType: CUSTOM_NODES.EDITOR_NODE,
  },
  { label: 'Text', icon: BiText, nodeType: CUSTOM_NODES.TEXT_NODE },
  { label: 'Image', icon: BiImage, nodeType: CUSTOM_NODES.IMAGE_NODE },
];

const ToolBar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Box
      as={Flex}
      justifyContent="space-between"
      alignItems="center"
      w="full"
      mb={4}
      p={4}
      bg="white"
      borderRadius="md"
      shadow="md"
    >
      <ButtonGroup>
        {ToolBarItems.map(({ label, icon, nodeType }) => (
          <Tooltip key={label} label={`Add ${label}`} borderRadius="4px">
            <Button
              shadow="md"
              aria-label={`drag and drop ${toLower(label)}`}
              _hover={{
                background: 'white',
              }}
              background="white"
              p={4}
              draggable
              cursor="grab"
              rightIcon={<RxDragHandleDots2 />}
              leftIcon={<Icon as={icon} fontSize="20px" />}
              onDragStart={(event) => onDragStart(event, nodeType)}
            />
          </Tooltip>
        ))}
      </ButtonGroup>
      <ExportButton />
    </Box>
  );
};

export default ToolBar;

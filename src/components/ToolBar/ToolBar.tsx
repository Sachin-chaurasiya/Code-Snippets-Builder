import { Box, Button, ButtonGroup, Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import { BiCodeBlock, BiImage, BiText } from 'react-icons/bi';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { CUSTOM_NODES } from 'constant';
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
      <ButtonGroup variant="outline">
        {ToolBarItems.map(({ label, icon, nodeType }) => (
          <Button
            key={label}
            aria-label={`drag and drop ${toLower(label)}`}
            _hover={{ background: 'gray.700' }}
            bg="gray.700"
            color="white"
            p={4}
            draggable
            cursor="grab"
            rightIcon={<RxDragHandleDots2 />}
            leftIcon={<Icon as={icon} />}
            onDragStart={(event) => onDragStart(event, nodeType)}
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>
      <ExportButton />
    </Box>
  );
};

export default ToolBar;
